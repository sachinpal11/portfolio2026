import { About } from "@/components/sections/about/About";
import { Footer } from "@/components/sections/footer/Footer";
import { Hero } from "@/components/sections/hero/Hero";
import { LogoMarquee } from "@/components/sections/marquee/LogoMarquee";
import { Process } from "@/components/sections/process/Process";
import { Statement } from "@/components/sections/statement/Statement";
import { Testimonials } from "@/components/sections/testimonials/Testimonials";
import { Work } from "@/components/sections/work/Work";
import { getLogos } from "@/lib/logos";

export default function Home() {
  return (
    <main>
      <Hero />
      <LogoMarquee logos={getLogos()} />
      <Statement />
      <Work />
      <Process />
      <Testimonials />
      <About />
      <Footer />
    </main>
  );
}
