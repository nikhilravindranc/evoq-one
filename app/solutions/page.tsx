import { SolutionsPage } from "@/components/solutions/SolutionsPage";

export const metadata = {
  title: "EVOQ Solutions — Software solutions for the way your industry operates",
  description:
    "Explore EVOQ solutions for healthcare, construction, engineering and real estate, manufacturing, field service, facilities and maintenance, and hospitality, travel and F&B.",
  alternates: { canonical: "/solutions" },
};

export default function Solutions() {
  return <SolutionsPage />;
}
