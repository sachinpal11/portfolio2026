import { Container } from "@/components/ui/Container";
import { testimonials } from "@/data/testimonials";
import { TestimonialCard } from "./TestimonialCard";

/**
 * Two-column quotes split by a hairline. On md+ the second column is dropped
 * lower so the pair reads as a staggered spread; on mobile they simply stack.
 */
export function Testimonials() {
  return (
    <section id="testimonials" className="relative bg-white py-12 md:py-24">
      <Container>
        <div className="relative grid divide-y divide-foreground/10 md:grid-cols-2 md:divide-x md:divide-y-0">
          {testimonials.map((item, i) => (
            <div key={i} className={i % 2 === 1 ? "md:mt-24" : undefined}>
              <TestimonialCard {...item} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
