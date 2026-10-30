export const site = {
  name: "Sachin",
  roles: [
    "Web Developer",
    "App Developer",
    "Graphic Designer",
    "Social Media Manager",
  ],
  tagline:
    "Passionate about building fast, intuitive web experiences that connect users with value.",
  availability: "Available for new opportunities",
  cta: { label: "Hire Me", href: "#contact" },
  /** Placeholder — replace with the real address; the footer CTA opens a mail to it. */
  email: "sachinpal2076@gmail.com",
  footer: {
    heading: "Let's Make It Happen",
    text: "Always open to new opportunities, collaborations, and creative challenges. Let's work together to bring your ideas to life.",
    cta: "Get In Touch",
  },
  nav: [
    { label: "Home", href: "#" },
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  clients: {
    count: "10+ happy clients",
    suffix: "across web and product projects.",
    avatars: ["/heroclients/1.png", "/heroclients/2.png", "/heroclients/3.png"],
  },
  images: {
    background: "/bluethemebg-2.png",
    portrait: "/main-character.png",
    signature: "/sachin-signature.png",
    footerBackground: "/footer-bg.webp",
  },
} as const;
