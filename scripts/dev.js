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

const child = spawn(process.execPath, [nextBin, "dev", "--port", port], {
  stdio: "inherit",
  env: { ...process.env, PORT: port, HOSTNAME: host },
});

child.on("exit", (code) => process.exit(code ?? 0));
