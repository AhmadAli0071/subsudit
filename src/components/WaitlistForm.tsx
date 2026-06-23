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

      <div className="p-4 sm:p-6 lg:p-8">
        
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[10px] font-bold text-amber-300/80 font-mono tracking-wider uppercase">Early Access</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-1">
                <span className="bg-gradient-to-r from-amber-200 via-yellow-200 to-rose-200 bg-clip-text text-transparent">50% Lifetime</span> Discount
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed mb-4">
                Complete the quick questionnaire to secure your discount.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-stone-400 block">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Oliver Jones"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      className="w-full bg-white/[0.07] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:bg-white/[0.10] focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/20 transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-stone-400 block">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. oliver@gmail.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-white/[0.07] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:bg-white/[0.10] focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/20 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-baseline">
                    <label className="text-[10px] font-semibold text-stone-400 block">
                      Your subscriptions?
                    </label>
                    <span className="text-[9px] text-stone-500 font-mono font-semibold">
                      {selectedSubs.length} Selected
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 bg-black/20 border border-white/[0.06] p-2.5 rounded-xl">
                    {WAITLIST_OPTIONS.map(opt => {
                      const isChecked = selectedSubs.includes(opt.name);
                      return (
                        <button
                          type="button"
                          key={opt.name}
                          onClick={() => handleToggleSub(opt.name)}
                           className={`flex items-center gap-2 px-2.5 py-2 border rounded-lg text-left transition-all text-[10px] font-semibold cursor-pointer ${
                            isChecked 
                              ? 'bg-amber-500/20 border-amber-400/50 text-amber-200 shadow-sm shadow-amber-500/10' 
                              : 'bg-black/20 border-white/[0.06] text-stone-400 hover:text-stone-200 hover:border-white/20'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${opt.bgColor.replace('text-', 'bg-')}`} />
                          <span className="truncate">{opt.name}</span>
                          {isChecked && <Check className="w-2.5 h-2.5 stroke-[3px] text-amber-300 ml-auto shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold text-stone-400 block">
                    Ever charged for a forgotten subscription?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                    {[
                      'Yes, multiple times',
                      'Yes, once or twice',
                      'No'
                    ].map(option => (
                      <button
                        type="button"
                        key={option}
                        onClick={() => setForgottenChargeHistory(option)}
                         className={`px-3 py-2 text-[10px] font-semibold border rounded-xl transition-all cursor-pointer text-center ${
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
                  className="w-full py-3 px-5 bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 hover:from-amber-400 hover:via-rose-400 hover:to-amber-400 text-white font-extrabold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  <Bell className="w-3.5 h-3.5" />
                  Reserve My Spot
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="ticket"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="text-center p-3 bg-amber-500/10 border border-amber-400/30 rounded-2xl flex items-center gap-2.5 w-fit mx-auto">
                <Check className="w-4 h-4 text-amber-400 bg-amber-500/20 rounded-full p-0.5" />
                <span className="text-[10px] font-bold text-amber-300">Position Secured!</span>
              </div>

              <div className="bg-black/40 backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-5 relative overflow-hidden shadow-lg max-w-md mx-auto">
                
                <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 bg-stone-950 border border-white/10 rounded-full z-10" />
                <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 bg-stone-950 border border-white/10 rounded-full z-10" />

                <div className="border-b border-dashed border-white/10 pb-4 mb-4 flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-black text-white tracking-widest uppercase font-mono">
                      SUBAUDIT
                    </h4>
                  </div>
                  <div className="w-8 h-8 bg-amber-500/20 border border-amber-400/30 text-amber-400 rounded-lg flex items-center justify-center">
                    <Crown className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-3 text-[10px] font-semibold text-stone-400">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[8px] uppercase text-stone-500 font-mono block">Holder</span>
                      <span className="text-xs font-bold text-stone-200 tracking-tight">{userData?.fullName}</span>
                    </div>
                    <div>
                      <span className="text-[8px] uppercase text-stone-500 font-mono block">Code</span>
                      <span className="text-xs font-mono font-bold text-amber-400">{userData?.email.split('@')[0].toUpperCase()}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[8px] uppercase text-stone-500 font-mono block">Spot</span>
                      <span className="text-base font-black text-rose-400 font-mono tracking-tight block">
                        #{userData?.queueNumber}
                      </span>
                    </div>
                    <div>
                      <span className="text-[8px] uppercase text-stone-500 font-mono block">Status</span>
                      <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1 mt-0.5">
                        <ShieldCheck className="w-3 h-3 inline-block text-amber-400" /> 50% Off
                      </span>
                    </div>
                  </div>

                  <div className="bg-white/[0.06] border border-white/[0.08] p-2.5 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[8px] text-stone-500 uppercase tracking-wider block font-mono">Coupon</span>
                      <span className="text-xs font-black text-amber-300 font-mono tracking-wide">FOUNDER50</span>
                    </div>
                    <button 
                      onClick={handleCopyCoupon}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                        copiedCoupon 
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-400/30' 
                          : 'bg-amber-500 text-stone-950 hover:bg-amber-400'
                      }`}
                    >
                      {copiedCoupon ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 text-center">
                  <div className="h-7 flex gap-1 justify-center opacity-50 max-w-[160px] mx-auto select-none">
                    {[1, 3, 2, 4, 1, 3, 4, 2, 1, 2, 3, 1, 4, 2, 3, 1].map((w, idx) => (
                      <div 
                        key={idx} 
                        className="bg-stone-600 h-full" 
                        style={{ width: `${w * 1.5}px` }} 
                      />
                    ))}
                  </div>
                  <span className="text-[8px] text-stone-600 font-mono uppercase tracking-widest mt-1.5 block font-semibold">
                    SECURED
                  </span>
                </div>

              </div>

              <div className="text-center">
                <p className="text-[10px] text-stone-500 font-medium">
                  Invite queued for <span className="text-stone-300 font-bold">{userData?.email}</span>.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-3 text-[10px] text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 px-2.5 py-1.5 rounded-xl border border-amber-400/20 transition-all font-bold font-mono"
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
