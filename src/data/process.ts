export type ProcessStep = {
  number: string;
  title: string;
  text: string;
  /** Desktop placement inside the 1100×450 stage, as percentages of it. */
  pos: { left: string; top: string };
  /** Resting tilt in degrees. */
  rotate: number;
};

export const process = {
  eyebrow: "/ My Process Explained",
  heading: "Here's how it works",
  steps: [
    {
      number: "01",
      title: "Discover",
      text: "Understanding your goals, users, and challenges through research and strategy.",
      pos: { left: "0%", top: "14%" },
      rotate: -3,
    },
    {
      number: "02",
      title: "Design",
      text: "Transforming insights into intuitive, beautiful, and functional product experiences.",
      pos: { left: "34.5%", top: "2%" },
      rotate: 3,
    },
    {
      number: "03",
      title: "Deliver",
      text: "Testing, refining, and launching the final product with clarity and precision.",
      pos: { left: "69%", top: "9%" },
      rotate: -2,
    },
  ] satisfies ProcessStep[],
};
