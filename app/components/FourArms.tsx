import { Link } from 'react-router';
import creativeImage from '../../imports/BloodlineFC_R1_2026-04-18_076-1.jpg';
import labsImage from '../../imports/DSC_0612.jpg';
import appsImage from '../../imports/edit5-1.jpg';
import collectiveImage from '../../imports/DSC_0900-1.jpg';

interface ArmCardProps {
  title: string;
  descriptor: string;
  blurb: string;
  cta: string;
  ctaHref?: string;
  ctaScrollTo?: string;
  ctaRoute?: string;
  accentColor: string;
  image?: string;
  secondWordFont: string;
}

function ArmCard({ title, descriptor, blurb, cta, ctaHref, ctaScrollTo, ctaRoute, accentColor, image, secondWordFont }: ArmCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (ctaScrollTo) {
      e.preventDefault();
      const element = document.getElementById(ctaScrollTo);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const linkContent = (
    <>
      {cta}
      <span>→</span>
    </>
  );

  const linkClasses = "text-[#c8a96e] hover:text-[#ede8dc] transition-colors inline-flex items-center gap-2 cursor-pointer";
  const linkStyle = { fontFamily: "'Inter', sans-serif" };

  return (
    <div className="group relative bg-[#13120f] overflow-hidden">
      <div
        className="h-1"
        style={{ backgroundColor: accentColor }}
      />

      {image ? (
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div
          className="aspect-[4/3]"
          style={{ backgroundColor: accentColor }}
        />
      )}

      <div className="p-8">
        <h3
          style={{
            fontSize: '1.75rem',
            lineHeight: '1.3'
          }}
          className="text-[#ede8dc] mb-3"
        >
          <span style={{ fontFamily: "'TeX Gyre Termes', serif" }}>
            {title.split(' ')[0]}
          </span>
          {' '}
          <span style={{ fontFamily: secondWordFont }}>
            {title.split(' ')[1]}
          </span>
        </h3>

        <p
          style={{ fontFamily: "'TeX Gyre Termes', serif", fontStyle: 'italic' }}
          className="text-[#c8a96e] text-xs tracking-[0.15em] uppercase mb-4"
        >
          {descriptor}
        </p>

        <p
          style={{ fontFamily: "'Inter', sans-serif", lineHeight: '1.7' }}
          className="text-[#ede8dc] mb-6 opacity-90"
        >
          {blurb}
        </p>

        {ctaRoute ? (
          <Link to={ctaRoute} style={linkStyle} className={linkClasses}>
            {linkContent}
          </Link>
        ) : (
          <a
            href={ctaHref || "#"}
            onClick={handleClick}
            target={ctaHref ? "_blank" : undefined}
            rel={ctaHref ? "noopener noreferrer" : undefined}
            style={linkStyle}
            className={linkClasses}
          >
            {linkContent}
          </a>
        )}
      </div>
    </div>
  );
}

export function FourArms() {
  return (
    <section id="work" className="bg-[#0c0b09] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ArmCard
            title="GNEISS CREATIVE"
            descriptor="Photography, writing, visual art."
            blurb="Photography, writing, and visual art rooted in the everyday. We shoot sport, people, and place, currently in an ongoing partnership with Bloodline FC and working through a body of work from Japan shot in winter 2026. Sessions available on request."
            cta="See the work"
            ctaHref="https://gneisscreative.com.au/"
            accentColor="#7a8c52"
            image={creativeImage}
            secondWordFont="'Nunito', sans-serif"
          />

          <ArmCard
            title="GNEISS LABS"
            descriptor="Workflow automation and systems consulting."
            blurb="Workflow automation, systems design, and agentic consulting for small businesses. We look at how your operation actually runs, find where time is being lost to manual processes, and build the systems that fix it. Based in Wollongong, working locally and beyond."
            cta="Get in touch"
            ctaScrollTo="contact"
            accentColor="#3a4a5c"
            image={labsImage}
            secondWordFont="'IBM Plex Mono', monospace"
          />

          <ArmCard
            title="GNEISS APPS"
            descriptor="Digital products built around how you actually feel."
            blurb="We build digital products that start by asking how you're actually feeling, not what an algorithm assumes. Our first app, Fuyu, is a mood and health-based activity companion entering alpha now, with full launch planned for early 2027."
            cta="Stay in the loop"
            ctaRoute="/apps"
            accentColor="#5c3a5e"
            image={appsImage}
            secondWordFont="'DM Sans', sans-serif"
          />

          <ArmCard
            title="GNEISS COLLECTIVE"
            descriptor="Community, culture, and events."
            blurb="Community, culture, and events. We create space for communities and stories that don't always get a stage, through film, music, art, and people coming together. Our current flagship project is Cedar & Olive, a film, music, and culture event in Wollongong, NSW."
            cta="Learn more"
            ctaRoute="/collective"
            accentColor="#8c1c2e"
            image={collectiveImage}
            secondWordFont="'Lora', serif"
          />
        </div>
      </div>
    </section>
  );
}
