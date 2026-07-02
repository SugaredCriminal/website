import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import { Footer } from './Footer';

export function CollectiveLearnMore() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-135f9c19/email-signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            email,
            source: 'collective',
          }),
        }
      );

      const data = await response.json();
      console.log('Response status:', response.status);
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit email');
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error('Error submitting email:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <main className="max-w-2xl mx-auto px-8 py-24 md:py-32">
        <div className="space-y-8">
          <p className="font-['IBM_Plex_Mono'] text-[#c8a96e] text-xs uppercase tracking-[0.2em]">
            Gneiss Collective
          </p>

          <h1 className="font-['Tex_Gyre_Termes'] text-[#ede8dc] text-5xl md:text-6xl leading-tight">
            Learn More
          </h1>

          <p className="font-['Tex_Gyre_Termes'] italic text-[#c8a96e] text-lg md:text-xl uppercase tracking-[0.15em] leading-relaxed">
            community, culture, and people coming together
          </p>

          <p className="font-['Inter'] text-[#ede8dc] font-light text-base md:text-lg leading-relaxed max-w-xl">
            Gneiss Collective creates space for communities and stories that don't always get a stage, through film, music, art, and people coming together. We have a flagship project in development in Wollongong. Stay in the loop as things take shape.
          </p>

          {!isSubmitted ? (
            <div className="space-y-6 pt-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your email address"
                  required
                  className="w-full bg-transparent border border-[#ede8dc]/20 text-[#ede8dc] font-['Inter'] px-6 py-4 rounded-sm placeholder:text-[#ede8dc]/40 focus:outline-none focus:border-[#8c1c2e] focus:ring-1 focus:ring-[#8c1c2e] transition-colors"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#8c1c2e] text-[#ede8dc] font-['IBM_Plex_Mono'] uppercase tracking-[0.2em] text-xs py-4 rounded-sm hover:bg-[#8c1c2e]/90 focus:outline-none focus:ring-2 focus:ring-[#8c1c2e] focus:ring-offset-2 focus:ring-offset-[#0c0b09] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Keep me posted'}
                </button>
              </form>

              {error && (
                <p className="font-['Inter'] text-[#c9848a] text-sm">{error}</p>
              )}

              <p className="font-['Inter'] text-[#ede8dc]/70 font-light text-sm leading-relaxed">
                Want to get involved, perform, exhibit, or partner with us? Reach out at{' '}
                <a
                  href="mailto:hello@gneissstudio.com.au"
                  className="text-[#c8a96e] hover:text-[#ede8dc] transition-colors"
                >
                  hello@gneissstudio.com.au
                </a>
              </p>
            </div>
          ) : (
            <div className="pt-8">
              <p className="font-['Tex_Gyre_Termes'] italic text-[#ede8dc] text-xl md:text-2xl text-center leading-relaxed">
                Thanks for your interest. We'll be in touch.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
