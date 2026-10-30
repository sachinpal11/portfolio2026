export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  /** Headshot in /public; without one the avatar shows the name's initial. */
  image?: string;
};

/** Placeholder copy — replace with real client quotes, names and roles. */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Working with Sachin was seamless from start to finish. He understood our goals quickly, asked the right questions, and delivered a website that scaled perfectly with our growing business.",
    name: "Dheeraj Kumar",
    role: "Founder, h2o Fitness",
    image: "/heroclients/2.png",
  },
  {
    quote:
      "Sachin brought our product vision to life with incredible attention to detail. His ability to balance business needs with user empathy made our platform not just beautiful — but genuinely useful.",
    name: "Rakesh Sharma",
    role: "Manager, Brivio",
  },
];
