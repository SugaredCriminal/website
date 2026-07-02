import heroImage from '../../imports/DSC_4889-1.jpg';

export function Hero() {
  return (
    <section id="hero" className="relative h-screen w-full">
      <div className="absolute inset-0 bg-[#0c0b09]" />

      <div className="absolute inset-0 opacity-60">
        <img
          src={heroImage}
          alt="Hero background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative z-10 text-center px-6 max-w-4xl">
        <h1
          style={{
            fontFamily: "'TeX Gyre Termes', serif",
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            lineHeight: '1.2'
          }}
          className="text-[#ede8dc] mb-6"
        >
          Built under pressure. Made to last.
        </h1>
        <p
          style={{ fontFamily: "'Inter', sans-serif" }}
          className="text-[#ede8dc] text-lg opacity-90"
        >
          A creative and technology studio from Wollongong.
        </p>
        </div>
      </div>
    </section>
  );
}
