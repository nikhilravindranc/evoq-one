// Dev-server launcher for Kimi Work preview compatibility.
// Resolves the port from CLI args (--port/-p), the PORT env var, or 3000,
// then forwards everything to `next dev`.
const { spawn } = require("node:child_process");
const path = require("node:path");

function resolvePort(argv) {
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if ((arg === "--port" || arg === "-p") && argv[i + 1]) {
      return argv[i + 1];
    }
    const inline = arg.match(/^(?:--port|-p)[= ](\d+)$/);
    if (inline) return inline[1];
  }
  return process.env.PORT || "3000";
}

const port = resolvePort(process.argv.slice(2));
const host = process.env.HOST || "localhost";

const nextBin = path.join(
  __dirname,
  "..",
  "node_modules",
  "next",
  "dist",
  "bin",
  "next"
);

// Safety net: a stale Turbopack cache once made `next dev` balloon to the whole
// RAM + pagefile and freeze the machine. (1) Wipe .next whenever the checked-out
// commit changes, (2) kill the server if its memory runs away.
const fs = require("node:fs");
const { execFileSync } = require("node:child_process");
const root = path.join(__dirname, "..");
const nextDir = path.join(root, ".next");
const stamp = path.join(nextDir, ".dev-head");

function gitHead() {
  try {
    return execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim();
  } catch {
    return "";
  }
}

const head = gitHead();
let previous = "";
try { previous = fs.readFileSync(stamp, "utf8"); } catch {}
// Always start from a clean cache. A leftover Turbopack cache has made every /products/* route 404
// after `npm run build`, new route folders or a second dev server, so a few extra seconds on start is cheaper.
if (head && previous !== head) console.log("[dev] commit changed since last run, clearing .next cache");
else console.log("[dev] clearing .next cache for a clean start");
fs.rmSync(nextDir, { recursive: true, force: true });
fs.mkdirSync(nextDir, { recursive: true });
if (head) fs.writeFileSync(stamp, head);

const child = spawn(process.execPath, [nextBin, "dev", "--port", port], {
  stdio: "inherit",
  env: { ...process.env, PORT: port, HOSTNAME: host },
});

const LIMIT_MB = Number(process.env.DEV_MEM_LIMIT_MB || 4096);
const FLOOR_MB = Number(process.env.DEV_MIN_FREE_MB || 1536);
const os = require("node:os");

function killTree() {
  try {
    if (process.platform === "win32") {
      execFileSync("taskkill", ["/PID", String(child.pid), "/T", "/F"], { stdio: "ignore" });
    } else {
      child.kill("SIGKILL");
    }
  } catch {}
}

function treeMemoryMB() {
  try {
    if (process.platform === "win32") {
      const out = execFileSync(
        "powershell",
        ["-NoProfile", "-Command",
          `(Get-CimInstance Win32_Process -Filter "Name='node.exe'" | Where-Object { $_.ParentProcessId -eq ${child.pid} -or $_.ProcessId -eq ${child.pid} } | Measure-Object WorkingSetSize -Sum).Sum / 1MB`],
        { encoding: "utf8", timeout: 4000 }
      );
      return Number(out.trim()) || 0;
    }
    const out = execFileSync("ps", ["-o", "rss=", "-p", String(child.pid)], { encoding: "utf8" });
    return Number(out.trim()) / 1024 || 0;
  } catch {
    return 0;
  }
}

const watchdog = setInterval(() => {
  const used = treeMemoryMB();
  const free = os.freemem() / 1048576;
  // Low system RAM only counts against the server when the server is a big part of it;
  // other apps (browser, editor, tsc) dipping under the floor must not kill a healthy server.
  if (used > LIMIT_MB || (free < FLOOR_MB && used > LIMIT_MB / 2)) {
    console.error(
      `[dev] memory runaway (server ${Math.round(used)} MB, system free ${Math.round(free)} MB), stopping. ` +
        "Delete .next and retry; raise DEV_MEM_LIMIT_MB if this is expected."
    );
    killTree();
    process.exit(1);
  }
}, 2000);
watchdog.unref();

child.on("exit", (code) => process.exit(code ?? 0));
process.on("SIGINT", () => { killTree(); process.exit(0); });
process.on("SIGTERM", () => { killTree(); process.exit(0); });
