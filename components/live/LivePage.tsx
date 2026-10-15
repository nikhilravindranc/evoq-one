import { Topbar } from "@/components/hero/Topbar";
import { Footer } from "@/components/sections/Footer";
import { LiveFrame } from "./LiveFrame";
import themes from "./themes.json";

export type LiveTheme = keyof typeof themes;

/* Each product microsite has its own header and footer colours, taken from the live site's pages (themes.json). */
export function LivePage({ file, title }: { file: string; title: string }) {
  const key = file.replace(/^products-/, "").replace(/\.html$/, "") as LiveTheme;
  const th = themes[key];
  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <div style={{ background: th.headerBg, borderBottom: `1px solid ${th.logoWhite ? "rgba(255,255,255,.18)" : "rgba(15,23,42,.1)"}` }}>
        <Topbar darkCTA={false} light={!th.logoWhite} theme={{ navBg: th.navBg, navFg: th.navFg, ctaBg: th.ctaBg, ctaFg: th.ctaFg, loginFg: th.loginFg }} />
      </div>
      <LiveFrame file={file} title={title} after={<Footer background={th.footerBg} darkText={th.footerLight} socialHover={th.socialHover} />} />
    </div>
  );
}
