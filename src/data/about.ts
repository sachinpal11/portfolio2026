export type Experience = {
  role: string;
  from: string;
  to: string;
};

export type Social = {
  label: "X" | "LinkedIn" | "Instagram";
  href: string;
};

/** Placeholder copy — replace the paragraph, job history and social links with real ones. */
export const about = {
  eyebrow: "/ Who Am I",
  heading: "Pushing Boundaries",
  headingMuted: "since 2024",
  text: "A web developer passionate about building fast, intuitive digital experiences. I've collaborated with startups and growing brands to ship websites and apps that blend clean engineering with thoughtful design, focusing on solving real problems end to end.",
  role: "Web Developer",
  experience: [
    { role: "Web Developer", from: "2025", to: "Now" },
    { role: "App Developer", from: "2026", to: "Now" },
    { role: "Graphic Designer", from: "2024", to: "Now" },
    { role: "Social Media Manager", from: "2025", to: "Now" },
  ] satisfies Experience[],
  socials: [
    { label: "X", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
  ] satisfies Social[],
};
