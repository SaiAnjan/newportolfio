import type { Metadata } from "next";

import { PrinciplesJournal } from "./principles-journal";

export const metadata: Metadata = {
  title: "AI Design Engineering Principles — Sai Anjan",
  description:
    "A growing field journal of principles for designing and engineering with AI.",
};

export default function PrinciplesPage() {
  return <PrinciplesJournal />;
}
