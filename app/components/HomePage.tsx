import { Hero } from './Hero';
import { StudioIntro } from './StudioIntro';
import { FourArms } from './FourArms';
import { Contact } from './Contact';
import { Footer } from './Footer';

export function HomePage() {
  return (
    <>
      <Hero />
      <StudioIntro />
      <FourArms />
      <Contact />
      <Footer />
    </>
  );
}
