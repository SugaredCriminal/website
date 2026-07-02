export function Contact() {
  return (
    <section id="contact" className="bg-[#0c0b09] py-32 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2
          style={{
            fontFamily: "'TeX Gyre Termes', serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)'
          }}
          className="text-[#ede8dc] mb-4"
        >
          Let's talk.
        </h2>

        <p
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          className="text-[#c8a96e] text-xs tracking-[0.2em] uppercase mb-8"
        >
          Contact
        </p>

        <a
          href="mailto:hello@gneissstudio.com.au"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '1.25rem'
          }}
          className="text-[#c8a96e] hover:text-[#ede8dc] transition-colors"
        >
          hello@gneissstudio.com.au
        </a>

        <p
          style={{ fontFamily: "'Inter', sans-serif" }}
          className="text-[#ede8dc] text-sm mt-4 opacity-70"
        >
          gneissstudio.com.au
        </p>
      </div>
    </section>
  );
}
