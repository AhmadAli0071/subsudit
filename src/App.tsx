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
    <div className="min-h-screen bg-slate-50/65 text-slate-800 font-sans selection:bg-blue-500/10 selection:text-blue-900 overflow-x-hidden">
      
      {/* Hero + Waitlist Section */}
      <section className="relative overflow-hidden py-10 sm:py-16">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 bg-slate-50">
          <div className="absolute inset-0 bg-[url('/assets/bg.jpg')] bg-contain bg-center bg-no-repeat opacity-30 scale-90" />
        </div>

        <div className="relative z-10 py-16 sm:py-24 w-full">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            
            {/* Centered Logo */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 mb-3">
                <Bell className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Sub<span className="text-blue-600">Audit</span>
              </span>
            </div>

            {/* Tagline */}
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-50/90 border border-blue-200 rounded-full mb-5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-xs font-bold text-blue-700">Early Bird — 50% Lifetime Discount</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                Never Get Surprised by <br/>
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Subscription Charges
                </span>{' '}
                Again
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
                Track your subscriptions, get smart renewal reminders, and stop paying for services you forgot about.
              </p>
            </div>

            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-14 sm:py-20 relative bg-slate-50/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <h4 className="text-xs font-bold text-blue-600 font-mono tracking-widest uppercase mb-2">FAQ</h4>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Have questions? We are here to help at <a href="mailto:infosubaudit@gmail.com" className="text-blue-600 font-bold hover:underline">infosubaudit@gmail.com</a>.
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
                      ? 'bg-white border-blue-400 shadow-xs' 
                      : 'bg-white border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left px-5 sm:px-6 py-5 flex justify-between items-center gap-4 transition-colors cursor-pointer select-none"
                  >
                    <span className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                      {faq.question}
                    </span>
                    <span className={`w-6 h-6 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 text-slate-550 hover:text-blue-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
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
                        <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
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
      <footer className="bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-500 font-medium">
        <p>© 2026 SubAudit. All rights reserved.</p>
      </footer>

    </div>
  );
}
