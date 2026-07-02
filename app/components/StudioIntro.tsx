export function StudioIntro() {
  return (
    <section id="about" className="bg-[#0c0b09] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <p
            style={{ fontFamily: "'TeX Gyre Termes', serif", fontStyle: 'italic' }}
            className="text-[#c8a96e] text-xs tracking-[0.2em] uppercase mb-6"
          >
            Gneiss Studio
          </p>

          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              maxWidth: '60ch',
              lineHeight: '1.7'
            }}
            className="text-[#ede8dc] text-lg"
          >
            <p>
              Gneiss Studio is a creative and technology company built in Wollongong, NSW. We work across photography and visual art, digital products, workflow automation, and community events. Four distinct arms, one set of values running through all of them. We make things that are seen, used, and felt. We build for people who are often not made for, and we stay honest about why any of it exists. Grassroots by origin and by choice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
