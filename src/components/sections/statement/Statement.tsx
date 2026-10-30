import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollFillText } from "@/components/ui/ScrollFillText";
import { statement } from "@/data/statement";
import { SkillPill } from "./SkillPill";

/**
 * Greeting + one big statement that fills from gray to dark as you scroll,
 * centered between skill chips floating on both sides (lg+) or wrapped
 * underneath it (smaller screens).
 */
export function Statement() {
  return (
    <section id="statement" className="relative bg-white py-16 md:py-28">
      <Container>
        <div className="relative lg:flex lg:min-h-[460px] lg:items-center">
          {/* Wide, but never so wide it runs under the floating chips */}
          <div className="mx-auto flex w-full max-w-[50rem] flex-col items-center text-center lg:max-w-[min(50rem,calc(100%-24rem))]">
            <Reveal inView>
              <p className="text-lg text-foreground/70 md:text-xl">
                {statement.eyebrow}
              </p>
            </Reveal>
            <ScrollFillText
              text={statement.text}
              className="mt-6 text-balance text-[clamp(1.6rem,3.2vw,2.8rem)] font-light leading-[1.14] tracking-[-0.04em]"
            />
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-4 lg:mt-0 lg:block">
            {statement.skills.map((skill, i) => (
              <SkillPill key={skill.label} {...skill} index={i} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
