import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import { Footer } from './Footer';

export function StayInLoop() {
  const [email, setEmail] = useState('');
  const [interestedInPartnerships, setInterestedInPartnerships] = useState(false);
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
            interestedInPartnerships,
            source: 'apps',
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

      // If partnership checkbox was checked, open mailto link
      if (data.requiresMailto) {
        window.location.href = 'mailto:hello@gneissstudio.com.au?subject=Gneiss%20Apps%20%E2%80%94%20partnership%20and%20media%20enquiry';
      }
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
            Gneiss Apps
          </p>

          <h1 className="font-['Tex_Gyre_Termes'] text-[#ede8dc] text-5xl md:text-6xl leading-tight">
            Stay in the Loop
          </h1>

          <p className="font-['Tex_Gyre_Termes'] italic text-[#c8a96e] text-lg md:text-xl uppercase tracking-[0.15em] leading-relaxed">
            digital products that start by asking how you're feeling
          </p>

          <p className="font-['Inter'] text-[#ede8dc] font-light text-base md:text-lg leading-relaxed max-w-xl">
            Gneiss Apps builds digital products that start by asking how you're actually feeling. Our first app is entering alpha now, with more in the pipeline. Leave your email to stay updated on launches, early access, and what we're building next.
          </p>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6 pt-4">
              <div className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your email address"
                  required
                  className="w-full bg-transparent border border-[#ede8dc]/20 text-[#ede8dc] font-['Inter'] px-6 py-4 rounded-sm placeholder:text-[#ede8dc]/40 focus:outline-none focus:border-[#5c3a5e] focus:ring-1 focus:ring-[#5c3a5e] transition-colors"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#5c3a5e] text-[#ede8dc] font-['IBM_Plex_Mono'] uppercase tracking-[0.2em] text-xs py-4 rounded-sm hover:bg-[#5c3a5e]/90 focus:outline-none focus:ring-2 focus:ring-[#5c3a5e] focus:ring-offset-2 focus:ring-offset-[#0c0b09] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Stay in the loop'}
                </button>
              </div>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={interestedInPartnerships}
                  onChange={(e) => setInterestedInPartnerships(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-[#5c3a5e] focus:ring-2 focus:ring-[#5c3a5e] focus:ring-offset-2 focus:ring-offset-[#0c0b09] rounded-sm cursor-pointer"
                />
                <span className="font-['Inter'] text-[#ede8dc] font-light text-sm leading-relaxed">
                  I'm interested in partnerships or media enquiries
                </span>
              </label>

              {error && (
                <p className="font-['Inter'] text-[#c9848a] text-sm">{error}</p>
              )}
            </form>
          ) : (
            <div className="pt-8">
              <p className="font-['Tex_Gyre_Termes'] italic text-[#ede8dc] text-xl md:text-2xl text-center leading-relaxed">
                You're on the list. We'll be in touch when the time is right.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
