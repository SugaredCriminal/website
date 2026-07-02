import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import logo from '../../imports/Logo.svg';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{ backgroundColor: 'rgba(12, 11, 9, 0.8)' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <EnsoCircle />
            <div className="tracking-[0.15em] text-[#c8a96e] uppercase text-sm">
              <span style={{ fontFamily: "'TeX Gyre Termes', serif" }}>Gneiss</span>
              {' '}
              <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>Studio</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            <button
              onClick={() => handleNavClick('hero')}
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              className="text-[#ede8dc] hover:text-[#c8a96e] transition-colors uppercase tracking-[0.15em] text-xs"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('about')}
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              className="text-[#ede8dc] hover:text-[#c8a96e] transition-colors uppercase tracking-[0.15em] text-xs"
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('work')}
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              className="text-[#ede8dc] hover:text-[#c8a96e] transition-colors uppercase tracking-[0.15em] text-xs"
            >
              Work
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              className="text-[#ede8dc] hover:text-[#c8a96e] transition-colors uppercase tracking-[0.15em] text-xs"
            >
              Contact
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[#ede8dc] hover:text-[#c8a96e] transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#0c0b09] md:hidden"
          style={{ paddingTop: '5rem' }}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-8 pb-20">
            <button
              onClick={() => handleNavClick('hero')}
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              className="text-[#ede8dc] hover:text-[#c8a96e] transition-colors uppercase tracking-[0.15em] text-lg"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('about')}
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              className="text-[#ede8dc] hover:text-[#c8a96e] transition-colors uppercase tracking-[0.15em] text-lg"
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('work')}
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              className="text-[#ede8dc] hover:text-[#c8a96e] transition-colors uppercase tracking-[0.15em] text-lg"
            >
              Work
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              className="text-[#ede8dc] hover:text-[#c8a96e] transition-colors uppercase tracking-[0.15em] text-lg"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function EnsoCircle() {
  return (
    <img src={logo} alt="Gneiss Studio Logo" height="32" className="h-8 w-auto" />
  );
}
