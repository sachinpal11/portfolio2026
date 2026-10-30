import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { about } from "@/data/about";
import { ProfileCard } from "./ProfileCard";

/**
 * "Who am I": eyebrow + two-tone heading, then a tilted photo card on the left
 * and, on the right, a short bio above a ruled job-history table.
 */
export function About() {
  return (
    <section id="about" className="relative bg-white py-16 md:py-28">
      <Container>
        <div className="text-center">
          <Reveal inView>
            <p className="text-sm tracking-wide text-foreground/60">
              {about.eyebrow}
            </p>
          </Reveal>
          <Reveal inView delay={0.1} y={30}>
            <h2 className="mt-3 text-[clamp(2.25rem,5.5vw,4.5rem)] font-normal leading-[1.05] tracking-[-0.045em] text-accent">
              {about.heading}{" "}
              <span className="font-light text-foreground/40">
                {about.headingMuted}
              </span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-12 md:mt-20 md:grid-cols-[0.8fr_1fr] md:items-start md:gap-16">
          <ProfileCard />

          {/* pt matches the card wrapper's, so the bio's first line sits level with the card's top edge */}
          <div className="flex flex-col gap-8 md:gap-10 md:pt-4">
            <Reveal inView delay={0.1} y={30}>
              <p className="w-full text-base leading-relaxed text-foreground/80 md:text-lg">
                {about.text}
              </p>
            </Reveal>

            <ul className="border-l border-foreground/15 pl-5 md:pl-6">
              {about.experience.map((job, i) => (
                <li key={job.role}>
                  <Reveal inView delay={0.15 + i * 0.08} y={20}>
                    <div className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 border-b border-foreground/10 py-4">
                      <span className="text-base font-medium">{job.role}</span>
                      <span className="whitespace-nowrap text-sm tabular-nums md:text-base">
                        {job.from} <span aria-hidden>&rarr;</span> {job.to}
                      </span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
