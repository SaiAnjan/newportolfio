import type { Metadata } from "next";

import { BrewCirclePrototype } from "./prototype";

export const metadata: Metadata = {
  title: "BrewCircle — Interactive prototype",
  description: "An interactive portfolio prototype for BrewCircle's social coffee community and Coffee DNA.",
};

export default function BrewCirclePage() {
  return <BrewCirclePrototype />;
}
