export type SkillIconName =
  "code" | "phone" | "pen" | "image" | "heart" | "sparkle";

export type Skill = {
  label: string;
  icon: SkillIconName;
  /** Base color of the icon badge; it is drawn as a lighterâ†’darker gradient of this. */
  color: string;
  /** Desktop placement around the text, in % of the section; one of left/right is set. */
  pos: { top: string; left?: string; right?: string };
  rotate: number;
};

export const statement = {
  eyebrow: "Hello!",
  text: "I build fast, polished websites and apps that turn ideas into products people love, with clean code and thoughtful design",
  skills: [
    {
      label: "Web Development",
      icon: "code",
      color: "#3b95ff",
      pos: { top: "10%", left: "0%" },
      rotate: 4,
    },
    {
      label: "App Development",
      icon: "phone",
      color: "#1d4ed8",
      pos: { top: "42%", left: "1%" },
      rotate: 0,
    },
    {
      label: "UI / UX Design",
      icon: "pen",
      color: "#0b1220",
      pos: { top: "74%", left: "0%" },
      rotate: -4,
    },
    {
      label: "Graphic Design",
      icon: "image",
      color: "#2f86f0",
      pos: { top: "6%", right: "0%" },
      rotate: -4,
    },
    {
      label: "Social Media",
      icon: "heart",
      color: "#5aa9ff",
      pos: { top: "40%", right: "1%" },
      rotate: 0,
    },
    {
      label: "Brand Identity",
      icon: "sparkle",
      color: "#16181d",
      pos: { top: "72%", right: "0%" },
      rotate: 4,
    },
  ] satisfies Skill[],
};
