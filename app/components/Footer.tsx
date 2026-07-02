import aboriginalFlag from '../../imports/Australian_Aboriginal_Flag.svg';
import torresStraitFlag from '../../imports/TSI_flag.jpg';
import progressPrideFlag from '../../imports/LGBTQ+_rainbow_flag_Quasar__Progress__variant.svg';

export function Footer() {
  return (
    <footer className="bg-[#0c0b09] border-t border-[#c8a96e]/20 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div
          style={{ fontFamily: "'Inter', sans-serif" }}
          className="text-[#ede8dc] text-sm space-y-8 max-w-3xl mx-auto"
        >
          <div className="flex items-center gap-3">
            <div className="flex gap-2 flex-shrink-0">
              <img src={aboriginalFlag} alt="Aboriginal Flag" style={{ height: '36px', width: 'auto' }} />
              <img src={torresStraitFlag} alt="Torres Strait Islander Flag" style={{ height: '36px', width: 'auto' }} />
            </div>
            <p className="opacity-90 leading-relaxed">
              Gneiss Studio operates on the unceded lands of the Dharawal people.
              We pay our respects to Elders past and present. Sovereignty was never ceded.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <img src={progressPrideFlag} alt="Intersex-Inclusive Progress Pride Flag" style={{ height: '36px', width: 'auto' }} />
            </div>
            <p className="opacity-90 leading-relaxed">
              Gneiss Studio is queer-founded and led. We are committed to being a safe, inclusive, and affirming space in the work we make, the people we work with, and the communities we serve.
            </p>
          </div>

          <p className="text-center opacity-60 pt-8">
            © 2026 Gneiss Studio
          </p>
        </div>
      </div>
    </footer>
  );
}
