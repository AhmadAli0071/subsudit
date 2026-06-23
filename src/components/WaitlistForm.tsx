import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  Crown, 
  Award, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Bell
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

    const apiUrl = import.meta.env.VITE_API_URL || '';
    try {
      fetch(`${apiUrl}/api/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSignup)
      }).catch(() => {});
    } catch(err) {}

    setUserData(newSignup);
    setSubmitted(true);
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
    <div id="waitlist" className="w-full bg-black/40 backdrop-blur-2xl border border-white/[0.08] rounded-3xl overflow-hidden shadow-2xl shadow-black/40 relative max-w-4xl mx-auto">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/15 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-500/15 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-b from-white/[0.12] via-transparent to-transparent pointer-events-none" />

      <div className="p-6 sm:p-8 lg:p-12">
        
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
            >
              <div className="flex items-center gap-2 mb-5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-amber-300/80 font-mono tracking-wider uppercase">Early Access</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                <span className="bg-gradient-to-r from-amber-200 via-yellow-200 to-rose-200 bg-clip-text text-transparent">50% Lifetime</span> Discount
              </h3>
              <p className="text-sm text-stone-400 leading-relaxed mb-8">
                Complete the questionnaire below. We are compiling statistics on common unwanted subscription charges to build automated cancellation patterns.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-400 block">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Oliver Jones"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      className="w-full bg-white/[0.07] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-stone-500 focus:outline-none focus:bg-white/[0.10] focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/20 transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-400 block">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. oliver@gmail.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-white/[0.07] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-stone-500 focus:outline-none focus:bg-white/[0.10] focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/20 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="flex justify-between items-baseline">
                    <label className="text-xs font-semibold text-stone-400 block">
                      Which subscriptions do you currently pay for?
                    </label>
                    <span className="text-[10px] text-stone-500 font-mono font-semibold">
                      {selectedSubs.length} Selected
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-black/20 border border-white/[0.06] p-4 rounded-2xl">
                    {WAITLIST_OPTIONS.map(opt => {
                      const isChecked = selectedSubs.includes(opt.name);
                      return (
                        <button
                          type="button"
                          key={opt.name}
                          onClick={() => handleToggleSub(opt.name)}
                           className={`flex items-center gap-2.5 px-3 py-2.5 border rounded-xl text-left transition-all text-xs font-semibold cursor-pointer ${
                            isChecked 
                              ? 'bg-amber-500/20 border-amber-400/50 text-amber-200 shadow-sm shadow-amber-500/10' 
                              : 'bg-black/20 border-white/[0.06] text-stone-400 hover:text-stone-200 hover:border-white/20'
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full shrink-0 ${opt.bgColor.replace('text-', 'bg-')}`} />
                          <span className="truncate">{opt.name}</span>
                          {isChecked && <Check className="w-3 h-3 stroke-[3px] text-amber-300 ml-auto shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-stone-400 block">
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
                         className={`px-4 py-3 text-xs font-semibold border rounded-xl transition-all cursor-pointer text-center ${
                          forgottenChargeHistory === option
                            ? 'bg-amber-500/20 border-amber-400/50 text-amber-200 shadow-sm shadow-amber-500/10'
                            : 'bg-black/20 border-white/[0.06] text-stone-400 hover:text-stone-200 hover:border-white/20'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 hover:from-amber-400 hover:via-rose-400 hover:to-amber-400 text-white font-extrabold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  <Bell className="w-4 h-4" />
                  Reserve My Spot & Lock Discount
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="ticket"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="text-center p-4 bg-amber-500/10 border border-amber-400/30 rounded-2xl flex items-center gap-3 w-fit mx-auto">
                <Check className="w-5 h-5 text-amber-400 bg-amber-500/20 rounded-full p-0.5" />
                <span className="text-xs font-bold text-amber-300">Position Secured! You are now locked in.</span>
              </div>

              <div className="bg-black/40 backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-6 relative overflow-hidden shadow-lg max-w-md mx-auto">
                
                <div className="absolute top-1/2 -left-3.5 -translate-y-1/2 w-7 h-7 bg-stone-950 border border-white/10 rounded-full z-10" />
                <div className="absolute top-1/2 -right-3.5 -translate-y-1/2 w-7 h-7 bg-stone-950 border border-white/10 rounded-full z-10" />

                <div className="border-b border-dashed border-white/10 pb-6 mb-6 flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-black text-white tracking-widest uppercase font-mono">
                      SUBAUDIT
                    </h4>
                  </div>
                  <div className="w-9 h-9 bg-amber-500/20 border border-amber-400/30 text-amber-400 rounded-lg flex items-center justify-center">
                    <Crown className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-4 text-xs font-semibold text-stone-400">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] uppercase text-stone-500 font-mono block">Holder</span>
                      <span className="text-sm font-bold text-stone-200 tracking-tight">{userData?.fullName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-stone-500 font-mono block">Code</span>
                      <span className="text-sm font-mono font-bold text-amber-400">{userData?.email.split('@')[0].toUpperCase()}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] uppercase text-stone-500 font-mono block">Spot</span>
                      <span className="text-lg font-black text-rose-400 font-mono tracking-tight block">
                        #{userData?.queueNumber}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-stone-500 font-mono block">Status</span>
                      <span className="text-xs font-bold text-amber-400 flex items-center gap-1 mt-0.5">
                        <ShieldCheck className="w-3.5 h-3.5 inline-block text-amber-400" /> 50% Off Lifetime
                      </span>
                    </div>
                  </div>

                  <div className="bg-white/[0.06] border border-white/[0.08] p-3 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-stone-500 uppercase tracking-wider block font-mono">Coupon</span>
                      <span className="text-sm font-black text-amber-300 font-mono tracking-wide">FOUNDER50</span>
                    </div>
                    <button 
                      onClick={handleCopyCoupon}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                        copiedCoupon 
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-400/30' 
                          : 'bg-amber-500 text-stone-950 hover:bg-amber-400'
                      }`}
                    >
                      {copiedCoupon ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 text-center">
                  <div className="h-9 flex gap-1.5 justify-center opacity-50 max-w-[200px] mx-auto select-none">
                    {[1, 3, 2, 4, 1, 3, 4, 2, 1, 2, 3, 1, 4, 2, 3, 1].map((w, idx) => (
                      <div 
                        key={idx} 
                        className="bg-stone-600 h-full" 
                        style={{ width: `${w * 1.5}px` }} 
                      />
                    ))}
                  </div>
                  <span className="text-[9px] text-stone-600 font-mono uppercase tracking-widest mt-2 block font-semibold">
                    SECURED
                  </span>
                </div>

              </div>

              <div className="text-center">
                <p className="text-xs text-stone-500 font-medium">
                  Invite queued for <span className="text-stone-300 font-bold">{userData?.email}</span>.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-4 text-xs text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-2 rounded-xl border border-amber-400/20 transition-all font-bold font-mono"
                >
                  REGISTER ANOTHER
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
