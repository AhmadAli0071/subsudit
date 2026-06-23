import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  Crown, 
  Sparkle, 
  Share2, 
  Gift, 
  Sparkles, 
  Users, 
  Award, 
  ShieldCheck, 
  ArrowRight,
  ClipboardCheck,
  Zap
} from 'lucide-react';
import { WAITLIST_OPTIONS } from '../data';
import { WaitlistData } from '../types';

export default function WaitlistForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedSubs, setSelectedSubs] = useState<string[]>([]);
  const [forgottenChargeHistory, setForgottenChargeHistory] = useState<string>('Yes, once or twice');
  const [submitted, setSubmitted] = useState(false);
  const [userData, setUserData] = useState<WaitlistData | null>(null);
  const [localRegistryCount, setLocalRegistryCount] = useState(1427);
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  // Load existing submission if any
  useEffect(() => {
    const saved = localStorage.getItem('subaudit_waitlist_signup');
    const existingCount = localStorage.getItem('subaudit_total_registry_count');
    
    if (saved) {
      const parsed = JSON.parse(saved) as WaitlistData;
      setUserData(parsed);
      setSubmitted(true);
    }
    
    if (existingCount) {
      setLocalRegistryCount(parseInt(existingCount));
    } else {
      const initialCount = 1420 + Math.floor(Math.random() * 50);
      setLocalRegistryCount(initialCount);
      localStorage.setItem('subaudit_total_registry_count', String(initialCount));
    }
  }, []);

  const handleToggleSub = (name: string) => {
    setSelectedSubs(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name) 
        : [...prev, name]
    );
  };

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText('FOUNDER50');
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 2000);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    const nextQueueNumber = localRegistryCount + 1;
    setLocalRegistryCount(nextQueueNumber);
    localStorage.setItem('subaudit_total_registry_count', String(nextQueueNumber));

    const newSignup: WaitlistData = {
      fullName,
      email,
      subscriptions: selectedSubs,
      forgottenChargeHistory: forgottenChargeHistory as any,
      joinedAt: new Date().toISOString(),
      queueNumber: nextQueueNumber
    };

    localStorage.setItem('subaudit_waitlist_signup', JSON.stringify(newSignup));

    // Send data to backend server
    try {
      fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSignup)
      }).catch(() => {});
    } catch(err) {
      // ignore
    }

    setUserData(newSignup);
    setSubmitted(true);

    // Track a simulation events
    try {
      // Mock tracking event log
      console.log('SubAudit Early Access registered: ', newSignup);
    } catch(err) {
      // ignore
    }
  };

  const handleReset = () => {
    localStorage.removeItem('subaudit_waitlist_signup');
    setUserData(null);
    setSubmitted(false);
    setFullName('');
    setEmail('');
    setSelectedSubs([]);
    setForgottenChargeHistory('Yes, once or twice');
  };

  return (
    <div id="waitlist" className="w-full bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl shadow-slate-100/60 relative max-w-3xl mx-auto">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="p-6 sm:p-8 lg:p-12">
        
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="h-6 px-2.5 text-[10px] font-extrabold uppercase tracking-widest text-blue-600 border border-blue-200 bg-blue-50 rounded-full flex items-center gap-1.5 animate-pulse">
                  <Sparkles className="w-3 h-3 text-blue-500" />
                  Early Bird Program
                </div>
                <span className="text-xs font-bold text-slate-400 font-mono">Limited Spots Left</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-850 tracking-tight mb-3">
                Lock in 50% Lifetime discount
              </h3>
              <p className="text-sm text-slate-550 leading-relaxed mb-8">
                Complete the questionnaire below. We are compiling statistics on common unwanted subscription charges to build automated cancellation patterns.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Grid fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Oliver Jones"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-3 text-sm text-slate-850 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-semibold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. oliver@gmail.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-3 text-sm text-slate-850 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-semibold"
                    />
                  </div>
                </div>

                {/* Multi-select Checklist */}
                <div className="space-y-2.5">
                  <div className="flex justify-between items-baseline">
                    <label className="text-xs font-bold text-slate-700 block">
                      Which subscriptions do you currently pay for?
                    </label>
                    <span className="text-[10px] text-slate-500 font-mono font-bold">
                      {selectedSubs.length} Selected
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-slate-50 border border-slate-150 p-4 rounded-2xl max-h-[220px] overflow-y-auto">
                    {WAITLIST_OPTIONS.map(opt => {
                      const isChecked = selectedSubs.includes(opt.name);
                      return (
                        <button
                          type="button"
                          key={opt.name}
                          onClick={() => handleToggleSub(opt.name)}
                          className={`flex items-center gap-2 px-3 py-2.5 border rounded-xl text-left transition-all text-xs font-bold cursor-pointer ${
                            isChecked 
                              ? 'bg-blue-50 border-blue-400 text-blue-700 shadow-sm' 
                              : 'bg-white border-slate-200 text-slate-600 hover:text-slate-950 hover:border-slate-300'
                          }`}
                        >
                          <span className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 border transition-all ${
                            isChecked 
                              ? 'bg-blue-600 border-blue-500 text-white' 
                              : 'border-slate-300 bg-white'
                          }`}>
                            {isChecked && <Check className="w-2.5 h-2.5 stroke-[3px]" />}
                          </span>
                          <span className="truncate">{opt.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Survey Question 2: Have you been charged? */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">
                    Have you ever been charged for a subscription you forgot about?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      'Yes, multiple times',
                      'Yes, once or twice',
                      'No'
                    ].map(option => (
                      <button
                        type="button"
                        key={option}
                        onClick={() => setForgottenChargeHistory(option)}
                        className={`px-4 py-3 text-xs font-bold border rounded-xl transition-all cursor-pointer text-center ${
                          forgottenChargeHistory === option
                            ? 'bg-blue-50 border-blue-400 text-blue-700'
                            : 'bg-white border-slate-200 text-slate-650 hover:text-slate-900 hover:border-slate-300'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:via-indigo-500 hover:to-blue-405 text-white font-extrabold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/15 cursor-pointer"
                >
                  <Award className="w-4.5 h-4.5" />
                  Reserve My Spot & Lock Lifetime Discount
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </form>
            </motion.div>
          ) : (
            // Success Spot Receipt Ticket Representation!
            <motion.div
              key="ticket"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="text-center p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 w-fit mx-auto">
                <Check className="w-5 h-5 text-emerald-600 bg-emerald-150 rounded-full p-0.5" />
                <span className="text-xs font-bold text-emerald-700">Position Secured! You are now locked in.</span>
              </div>

              {/* Glassmorphic Early Access Ticket */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-3xl p-6 relative overflow-hidden shadow-lg max-w-md mx-auto">
                
                {/* Decorative Ticket Side Cuts inside CSS */}
                <div className="absolute top-1/2 -left-3.5 -translate-y-1/2 w-7 h-7 bg-white border border-slate-200 rounded-full z-10" />
                <div className="absolute top-1/2 -right-3.5 -translate-y-1/2 w-7 h-7 bg-white border border-slate-200 rounded-full z-10" />

                {/* Top segment */}
                <div className="border-b border-dashed border-slate-350 pb-6 mb-6 flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-black text-slate-800 tracking-widest uppercase font-mono">
                      SUBAUDIT
                    </h4>
                    <p className="text-[10px] text-slate-450 font-mono tracking-widest mt-1">FOUNDING MEMBER PASS</p>
                  </div>
                  <div className="w-9 h-9 bg-yellow-105 border border-yellow-250 text-yellow-600 rounded-lg flex items-center justify-center">
                    <Crown className="w-5 h-5 animate-bounce-slow" />
                  </div>
                </div>

                {/* Mid Segment ticket details */}
                <div className="space-y-4 text-xs font-semibold text-slate-650">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] uppercase text-slate-450 font-mono block">Holder Name</span>
                      <span className="text-sm font-bold text-slate-800 tracking-tight">{userData?.fullName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-slate-450 font-mono block">Secure Code</span>
                      <span className="text-sm font-mono font-bold text-blue-600">{userData?.email.split('@')[0].toUpperCase()}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] uppercase text-slate-450 font-mono block">Waitlist Spot</span>
                      <span className="text-lg font-black text-indigo-600 font-mono tracking-tight block">
                        #{userData?.queueNumber}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-slate-455 font-mono block">Status Granted</span>
                      <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 mt-0.5">
                        <ShieldCheck className="w-3.5 h-3.5 inline-block text-emerald-600" /> 50% Off Lifetime
                      </span>
                    </div>
                  </div>

                  {/* Promo offer code block */}
                  <div className="bg-white border border-slate-200 p-3 rounded-xl flex items-center justify-between shadow-xs">
                    <div>
                      <span className="text-[9px] text-slate-450 uppercase tracking-wider block font-mono">Your Activation Coupon</span>
                      <span className="text-sm font-black text-slate-800 font-mono tracking-wide">FOUNDER50</span>
                    </div>
                    <button 
                      onClick={handleCopyCoupon}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                        copiedCoupon 
                          ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                          : 'bg-blue-600 text-white hover:bg-blue-500'
                      }`}
                    >
                      {copiedCoupon ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>

                {/* Ticket footer barcode aesthetic */}
                <div className="pt-6 mt-6 border-t border-slate-200 text-center">
                  <div className="h-9 flex gap-1.5 justify-center opacity-75 max-w-[200px] mx-auto select-none">
                    {[1, 3, 2, 4, 1, 3, 4, 2, 1, 2, 3, 1, 4, 2, 3, 1].map((w, idx) => (
                      <div 
                        key={idx} 
                        className="bg-slate-800 h-full animate-pulse-slow" 
                        style={{ width: `${w * 1.5}px` }} 
                      />
                    ))}
                  </div>
                  <span className="text-[9px] text-slate-450 font-mono uppercase tracking-widest mt-2 block font-semibold">
                    SECURED WITH SUBAUDIT SHIELD V4
                  </span>
                </div>

              </div>

              <div className="text-center">
                <p className="text-xs text-slate-500 font-medium">
                   An activation invite has been queued for <span className="text-slate-800 font-bold">{userData?.email}</span>.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-4 text-xs text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-xl border border-blue-105 transition-all font-bold font-mono"
                >
                  REGISTER ANOTHER EMAIL
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
