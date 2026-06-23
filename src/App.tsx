import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Bell, Sparkles } from 'lucide-react';
import WaitlistForm from './components/WaitlistForm';
import { FAQS } from './data';

export default function App() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-blue-900 to-slate-900 text-white font-sans selection:bg-blue-500/20 selection:text-white overflow-x-hidden">
      
      {/* Hero + Waitlist Section */}
      <section className="min-h-screen flex items-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Left - Branding */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center justify-center lg:justify-start gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight">
                Sub<span className="text-blue-400">Audit</span>
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/10 border border-white/20 rounded-full mb-6">
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              <span className="text-xs font-bold text-blue-200">Early Bird — 50% Lifetime Discount</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-5">
              Never Get Surprised by <br/>
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                Subscription Charges
              </span>{' '}
              Again
            </h1>
            <p className="text-base sm:text-lg text-blue-100/80 leading-relaxed max-w-lg font-medium">
              Track your subscriptions, get smart renewal reminders, and stop paying for services you forgot about.
            </p>

            {/* Floating decorative element */}
            <div className="hidden lg:block mt-12">
              <div className="flex gap-3 opacity-30">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto">
            <WaitlistForm />
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-14 sm:py-20 relative bg-slate-900/80 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <h4 className="text-xs font-bold text-blue-400 font-mono tracking-widest uppercase mb-2">FAQ</h4>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-blue-100/70 leading-relaxed font-medium">
              Have questions? Email us at <a href="mailto:infosubaudit@gmail.com" className="text-blue-400 font-bold hover:underline">infosubaudit@gmail.com</a>.
            </p>
          </div>

          <div className="space-y-3.5">
            {FAQS.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index} 
                  className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                    isOpen 
                      ? 'bg-white/10 border-blue-400/50 shadow-lg shadow-blue-500/5' 
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left px-5 sm:px-6 py-5 flex justify-between items-center gap-4 transition-colors cursor-pointer select-none"
                  >
                    <span className="text-sm sm:text-base font-bold text-white tracking-tight">
                      {faq.question}
                    </span>
                    <span className={`w-6 h-6 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center shrink-0 text-blue-300 hover:text-blue-200 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-blue-100/70 leading-relaxed border-t border-white/10">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-slate-900/80 border-t border-white/10 py-8 text-center text-xs text-blue-200/50 font-medium">
        <p>© 2026 SubAudit. All rights reserved.</p>
      </footer>

    </div>
  );
}
