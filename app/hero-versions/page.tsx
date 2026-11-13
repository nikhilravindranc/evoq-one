import type { ReactNode } from "react";
import { OverviewOriginalStory } from "@/components/hero/OverviewOriginalStory";
import { OverviewBoardStory } from "@/components/hero/OverviewBoardStory";
import { OverviewCastStory } from "@/components/hero/OverviewCastStory";
import { OverviewCastPhotoStory } from "@/components/hero/OverviewCastPhotoStory";
import { OverviewStackStory } from "@/components/hero/OverviewStackStory";
import { OverviewTreeStory } from "@/components/hero/OverviewTreeStory";
import { OverviewStory } from "@/components/hero/OverviewStory";

/* Internal page: every version of the home hero overview visual tried so far, side by side, in order.
   Not linked anywhere and excluded from search engines. Each version lives in its own file in components/hero;
   the home page uses OverviewCastPhotoStory (version 9). */
export const metadata = {
  title: "Hero overview versions",
  robots: { index: false, follow: false },
};

const GRADIENT = `radial-gradient(90% 75% at 100% 15%, #9333EA 0%, rgba(147,51,234,0.7) 40%, rgba(147,51,234,0) 72%),
  radial-gradient(70% 55% at 0% 0%, rgba(255,255,255,0.4) 0%, rgba(226,220,255,0.22) 40%, rgba(255,255,255,0) 88%),
  linear-gradient(96deg, #6366F6 0%, #6658F2 32%, #6D4AE8 58%, #7C3AED 78%, #9333EA 100%)`;

type Version = {
  n: number;
  name: string;
  file: string;
  idea: string;
  feedback: string;
  tag?: string;
  visual: ReactNode;
};

const VERSIONS: Version[] = [
  {
    n: 1, name: "Cast tree", file: "OverviewOriginalStory.tsx", tag: "First version, the one on the site before this work",
    idea: "EVI in front, a line down to five agents (one per category), each with its apps. A spotlight visits the agents and EVI in turn and shows an outcome note.",
    feedback: "The concept was fine. The wish was to use fewer AI characters.",
    visual: <OverviewOriginalStory />,
  },
  {
    n: 2, name: "Work board", file: "OverviewBoardStory.tsx",
    idea: "One board, \"This week across EVOQ\", with a row from each app. The five agents take a row each and move its status, then EVI answers with sources.",
    feedback: "Not liked. It felt like AI generated style.",
    visual: <OverviewBoardStory />,
  },
  {
    n: 3, name: "Cast cards", file: "OverviewCastStory.tsx",
    idea: "After Monday's hero. A manager's portrait card in front with four agent cards behind and a frosted prompt inside it, then the board where agents finish work in turn and the manager approves.",
    feedback: "Approved at the time. Still uses several AI characters.",
    visual: <OverviewCastStory />,
  },
  {
    n: 4, name: "App window stack", file: "OverviewStackStory.tsx",
    idea: "A fanned stack of EVOQ app windows. The front one cycles through CRM, Desk, Billing and HRMS, each showing one small change. No characters.",
    feedback: "The tree from version 1 was preferred as the base idea.",
    visual: <OverviewStackStory />,
  },
  {
    n: 5, name: "Tree without agents", file: "OverviewTreeStory.tsx",
    idea: "Version 1's tree with the agent portraits removed. EVOQ at the top, the five categories shown by their app icons, EVI once as a small pill.",
    feedback: "Do not show the app icons.",
    visual: <OverviewTreeStory />,
  },
  {
    n: 6, name: "Ask bar with autonomy dial", file: "OverviewStory.tsx",
    idea: "A plain question in the ask bar, answers from three apps with their source, then one suggested next step that changes as the dial moves from Manual to Ask first, Plan and Auto. No tree, labels, icons or characters.",
    feedback: "Replaced on the home page by version 9.",
    visual: <OverviewStory />,
  },
  {
    n: 7, name: "Cast cards with a stock photo", file: "OverviewCastPhotoStory.tsx", tag: "New option, based on version 3",
    idea: "Version 3 with the manager's AI character replaced by a stock portrait of a middle aged woman, and the whole loop about 25 percent slower (about 20 seconds). The four agent cards are unchanged.",
    feedback: "Waiting for review. The photo is the stock image already used on the Skillberry card (public/team/people-skillberry.jpg), cropped to head and shoulders.",
    visual: <OverviewCastPhotoStory photo="/characters/dana-photo.webp" />,
  },
  {
    n: 8, name: "Cast cards with an Asian woman", file: "OverviewCastPhotoStory.tsx", tag: "New option, based on version 7",
    idea: "The same as version 7 with a different stock portrait for the manager: a smiling Asian woman with glasses. Same slower loop.",
    feedback: "Waiting for review. The photo is the stock image used on the Billing card (public/team/ops-billing.jpg), cropped to head and shoulders. She reads as late thirties to forties, a little younger than version 7.",
    visual: <OverviewCastPhotoStory photo="/characters/dana-photo-asian.webp" />,
  },
  {
    n: 9, name: "Cast cards with the supplied photo", file: "OverviewCastPhotoStory.tsx", tag: "On the home page now",
    idea: "The same as versions 7 and 8 with the photo you supplied for the manager: a smiling woman at a laptop. Same slower loop.",
    feedback: "Chosen for the home page hero. Cropped to the card shape from the attached image.",
    visual: <OverviewCastPhotoStory />,
  },
];

export default function HeroVersionsPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#F6F5FF", padding: "48px 24px 80px", fontFamily: "var(--font-sans), system-ui, sans-serif", color: "#1F2430" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <p style={{ margin: 0, fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "#6D5BFF" }}>Internal</p>
        <h1 style={{ margin: "6px 0 8px", fontSize: 32, fontWeight: 700, letterSpacing: "-.02em", fontFamily: "var(--font-display), system-ui, sans-serif" }}>Hero overview versions</h1>
        <p style={{ margin: 0, maxWidth: 680, fontSize: 15, lineHeight: 1.6, color: "#4B5563" }}>
          Every version of the home hero overview visual tried so far, in the order they were made. Each one is playing live, with its own file in <code>components/hero</code>.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 560px), 1fr))", gap: 28, marginTop: 36 }}>
          {VERSIONS.map((v) => (
            <section key={v.n} style={{ background: "#fff", borderRadius: 20, padding: 20, boxShadow: "0 18px 40px -26px rgba(20,24,60,.35), 0 0 0 1px rgba(31,36,48,.06)", display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
              <header>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <span style={{ width: 28, height: 28, borderRadius: 8, background: "#EEEBFF", color: "#4B3FD6", display: "grid", placeItems: "center", fontSize: 13, fontWeight: 800 }}>{v.n}</span>
                  <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{v.name}</h2>
                  {v.tag && <span style={{ padding: "3px 10px", borderRadius: 999, background: v.n === 6 ? "#E7F7EE" : "#F1F2F6", color: v.n === 6 ? "#167A43" : "#4B5563", fontSize: 11.5, fontWeight: 700 }}>{v.tag}</span>}
                </div>
                <p style={{ margin: "10px 0 0", fontSize: 14, lineHeight: 1.55, color: "#374151" }}>{v.idea}</p>
                <p style={{ margin: "8px 0 0", fontSize: 13.5, lineHeight: 1.5, color: "#4B5563" }}><b style={{ color: "#1F2430" }}>Feedback:</b> {v.feedback}</p>
                <p style={{ margin: "6px 0 0", fontSize: 12, color: "#8A90A0" }}><code>components/hero/{v.file}</code></p>
              </header>

              <div style={{ background: GRADIENT, borderRadius: 16, padding: "24px 20px 44px", display: "flex", justifyContent: "center", overflow: "hidden" }}>
                <div style={{ width: "100%", maxWidth: 520 }}>{v.visual}</div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
