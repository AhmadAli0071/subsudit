import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Tv, 
  Music, 
  Palette, 
  Sparkles, 
  Compass, 
  HardDrive, 
  BellRing, 
  Coins, 
  TrendingDown, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Smartphone, 
  ArrowUpRight, 
  Sparkle, 
  ShieldAlert,
  Info
} from 'lucide-react';
import { INITIAL_MOCK_SUBSCRIPTIONS } from '../data';
import { Subscription } from '../types';

export default function DashboardMockup() {
  const [subs, setSubs] = useState<Subscription[]>(INITIAL_MOCK_SUBSCRIPTIONS);
  const [filter, setFilter] = useState<string>('All');
  const [newSubName, setNewSubName] = useState('');
  const [newSubCost, setNewSubCost] = useState('');
  const [newSubCategory, setNewSubCategory] = useState<'Streaming' | 'Utility' | 'Productivity' | 'AI & Tech' | 'Design' | 'Others'>('Streaming');
  const [showAddForm, setShowAddForm] = useState(false);
  const [simulatedAlert, setSimulatedAlert] = useState<string | null>(null);
  const [activeAlertSub, setActiveAlertSub] = useState<Subscription | null>(null);
  
  // Real-time ticking stopwatch for countdown and alert simulation
  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 14,
    minutes: 42,
    seconds: 56
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        } else {
          return { days: 1, hours: 23, minutes: 59, seconds: 59 }; // Reset
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Helper function to map string icon names to Lucide Icon elements
  const renderIcon = (iconName: string, className: string = "w-5 h-5") => {
    switch (iconName) {
      case 'Tv': return <Tv className={className} />;
      case 'Music': return <Music className={className} />;
      case 'Palette': return <Palette className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      case 'Compass': return <Compass className={className} />;
      case 'HardDrive': return <HardDrive className={className} />;
      default: return <Tv className={className} />;
    }
  };

  // Toggle active/inactive
  const toggleSubActive = (id: string) => {
    setSubs(prev => prev.map(sub => {
      if (sub.id === id) {
        // Toggle active status as a mock state (using 'active' property, or just filtering cost to represent pausing)
        // Let's toggle custom status by storing an internal paused list or updating cost to 0 (visually crossed off)
        return { ...sub, cost: sub.cost > 0 ? 0 : (INITIAL_MOCK_SUBSCRIPTIONS.find(o => o.id === id)?.cost || 10.99) };
      }
      return sub;
    }));
  };

  const deleteSub = (id: string) => {
    setSubs(prev => prev.filter(sub => sub.id !== id));
  };

  const handleAddSub = (e: FormEvent) => {
    e.preventDefault();
    if (!newSubName || !newSubCost) return;
    
    const costNum = parseFloat(newSubCost);
    if (isNaN(costNum)) return;

    const newSub: Subscription = {
      id: `custom_${Date.now()}`,
      name: newSubName,
      cost: costNum,
      billingCycle: 'monthly',
      renewalDate: String(Math.floor(Math.random() * 25) + 3),
      category: newSubCategory,
      icon: newSubCategory === 'Streaming' ? 'Tv' : 
            newSubCategory === 'Design' ? 'Palette' :
            newSubCategory === 'AI & Tech' ? 'Sparkles' :
            newSubCategory === 'Utility' ? 'HardDrive' : 'Compass',
      bgColor: 'text-indigo-400 border-indigo-500/20 bg-indigo-500/5'
    };

    setSubs(prev => [newSub, ...prev]);
    setNewSubName('');
    setNewSubCost('');
    setShowAddForm(false);
  };

  // Trigger simulated reminder
  const triggerSimulation = (sub: Subscription) => {
    setActiveAlertSub(sub);
    const costText = sub.cost > 0 ? `$${sub.cost.toFixed(2)}` : "$16.99";
    setSimulatedAlert(`SubAudit Notification: Your ${sub.name} subscription auto-renews in 3 days. Estimated charge: ${costText}. Tap to manage or cancel.`);
    
    // Auto clear after 7s
    setTimeout(() => {
      setSimulatedAlert(null);
      setActiveAlertSub(null);
    }, 9000);
  };

  // Formatted sum of costs
  const activeSubs = subs.filter(s => s.cost > 0);
  const monthlySpend = subs.reduce((acc, curr) => acc + curr.cost, 0);
  const potentialSavings = INITIAL_MOCK_SUBSCRIPTIONS.reduce((acc, curr) => acc + curr.cost, 0) - monthlySpend;

  const filteredSubs = filter === 'All' 
    ? subs 
    : subs.filter(sub => sub.category === filter);

  return (
    <div id="interactive-dashboard" className="w-full relative bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl shadow-slate-100/50">
      {/* Top Banner Control Panel explaining how to interact */}
      <div className="bg-slate-50/80 border-b border-slate-150 px-6 py-4 flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-600 font-mono">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          INTERACTIVE PROTOTYPE
        </div>
        <div className="text-xs text-slate-650 flex items-center gap-1.5 leading-relaxed font-semibold">
          <Info className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
          <span>Click any card's <span className="text-blue-700 font-bold font-sans">"Test Alert"</span> to simulate a smart smartphone reminder!</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Main Interface: 8 Cols */}
        <div className="lg:col-span-8 p-6 lg:p-8 space-y-6">
          
          {/* Header Stats Widget */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Stat 1 */}
            <div className="bg-slate-50/45 border border-slate-150 rounded-2xl p-5 relative overflow-hidden group hover:border-slate-200 transition-colors">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full pointer-events-none" />
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500">Monthly Spending</span>
                <div className="w-7 h-7 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-600">
                  <Coins className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-slate-800 tracking-tight">
                  ${monthlySpend.toFixed(2)}
                </span>
                <span className="text-xs text-slate-500 font-semibold">/mo</span>
              </div>
              <div className="text-[11px] text-slate-450 mt-2 flex items-center gap-1 font-semibold">
                <span className="text-emerald-600 font-bold">Auto-calculated</span> from active plans
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-slate-50/45 border border-slate-150 rounded-2xl p-5 relative overflow-hidden group hover:border-slate-200 transition-colors">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full pointer-events-none" />
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500">Potential Savings</span>
                <div className="w-7 h-7 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-650">
                  <TrendingDown className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-emerald-600 tracking-tight">
                  ${potentialSavings > 0 ? potentialSavings.toFixed(2) : "0.00"}
                </span>
                <span className="text-xs text-slate-500 font-semibold font-mono">/mo saved</span>
              </div>
              <div className="text-[11px] text-slate-450 mt-2 font-semibold">
                {potentialSavings > 0 
                  ? `Saved by auditing ${INITIAL_MOCK_SUBSCRIPTIONS.length - activeSubs.length} services`
                  : "Pause any service below to test savings"}
              </div>
            </div>

            {/* Stat 3: Urgency Countdown */}
            <div className="bg-white border-2 border-blue-500/40 rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-bl-full pointer-events-none" />
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-blue-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  Next Alert In
                </span>
                <div className="w-7 h-7 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-650 animate-pulse">
                  <Clock className="w-4 h-4 animate-spin-slow" />
                </div>
              </div>
              <div className="font-mono text-xl font-extrabold text-slate-900 tracking-widest mt-1">
                {String(timeLeft.days).padStart(2, '0')}d:{String(timeLeft.hours).padStart(2, '0')}h:{String(timeLeft.minutes).padStart(2, '0')}m:{String(timeLeft.seconds).padStart(2, '0')}s
              </div>
              <div className="text-[11px] text-red-600 font-semibold mt-2 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0 animate-bounce" />
                <span>Spotify Family ($16.99)</span>
              </div>
            </div>

          </div>

          {/* Subscriptions Catalog List */}
          <div className="space-y-4">
            
            {/* Filter controls and add subscription action */}
            <div className="flex flex-wrap justify-between items-center gap-3">
              <div className="flex items-center gap-1 bg-slate-100/80 p-1 border border-slate-150 rounded-xl">
                {['All', 'Streaming', 'Design', 'AI & Tech', 'Utility'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      filter === tab 
                        ? 'bg-white text-slate-950 shadow-xs border border-slate-150/50' 
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-505 hover:to-indigo-550 text-white text-xs font-extrabold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-blue-500/15"
              >
                <Plus className="w-4.5 h-4.5" />
                Add Mock Sub
              </button>
            </div>

            {/* Animation Form to Mock Adding Subs */}
            <AnimatePresence>
              {showAddForm && (
                <motion.form 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  onSubmit={handleAddSub}
                  className="bg-slate-50 p-4 border border-slate-200 rounded-2xl space-y-4 overflow-hidden"
                >
                  <h4 className="text-xs font-bold text-blue-600 font-mono">NEW EXPERIMENTAL SUBSCRIPTION</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Claude.ai, gym"
                      value={newSubName}
                      onChange={e => setNewSubName(e.target.value)}
                      className="bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-850 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="Price ($/month)"
                      value={newSubCost}
                      onChange={e => setNewSubCost(e.target.value)}
                      className="bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-850 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    <select
                      value={newSubCategory}
                      onChange={e => setNewSubCategory(e.target.value as any)}
                      className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                    >
                      <option value="Streaming">Streaming</option>
                      <option value="Design">Design</option>
                      <option value="AI & Tech">AI & Tech</option>
                      <option value="Productivity">Productivity</option>
                      <option value="Utility">Utility</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-2.5">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="px-3.5 py-1.5 border border-slate-200 hover:bg-slate-100 text-slate-500 text-xs font-bold rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-lg transition-all shadow-md shadow-blue-500/15"
                    >
                      Create Custom
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Cards List Containers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredSubs.map(sub => {
                  const isPaused = sub.cost === 0;
                  const originalCost = INITIAL_MOCK_SUBSCRIPTIONS.find(o => o.id === sub.id)?.cost || 14.99;
                  const isSutAlertActive = activeAlertSub?.id === sub.id;

                  return (
                    <motion.div
                      key={sub.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={`border p-4 rounded-2xl flex flex-col justify-between h-42 transition-all relative overflow-hidden group ${
                        isPaused 
                          ? 'bg-slate-100/50 border-slate-200/90 opacity-65' 
                          : isSutAlertActive 
                          ? 'bg-white border-blue-500 shadow-md shadow-blue-100'
                          : 'bg-white border-slate-200 hover:border-blue-400/50 hover:shadow-md shadow-xs'
                      }`}
                    >
                      {/* Paused Overlay diagonal banner */}
                      {isPaused && (
                        <div className="absolute right-0 top-0 bg-slate-200 text-slate-600 text-[9px] font-bold px-3 py-1 font-mono rounded-bl-xl tracking-wider">
                          MUTED / SAVED
                        </div>
                      )}

                      <div>
                        {/* Title and Icon */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl border border-slate-150 bg-slate-50 flex items-center justify-center text-slate-600">
                              {renderIcon(sub.icon, "w-4.5 h-4.5")}
                            </div>
                            <div>
                              <h5 className="text-sm font-bold text-slate-850 group-hover:text-blue-650 transition-colors">
                                {sub.name}
                              </h5>
                              <span className="text-[10px] text-slate-450 font-bold font-mono uppercase tracking-wider block">
                                {sub.category}
                              </span>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => deleteSub(sub.id)}
                            className="text-slate-450 hover:text-red-500 p-1 rounded-lg hover:bg-red-50 transition-colors"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Charges Info */}
                        <div className="mt-4 flex items-baseline gap-1.5">
                          <span className={`text-lg font-bold tracking-tight ${isPaused ? 'text-slate-400 line-through' : 'text-slate-850'}`}>
                            ${originalCost.toFixed(2)}
                          </span>
                          <span className="text-[11px] text-slate-450 font-bold">/{sub.billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                        </div>
                      </div>

                      {/* Card Button footer */}
                      <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between items-center">
                        <span className="text-[10px] text-slate-500 flex items-center gap-1 font-mono font-semibold">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {isPaused ? 'Paused' : `Renews: Day ${sub.renewalDate}`}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => toggleSubActive(sub.id)}
                            className={`px-2 py-1 text-[10px] font-extrabold rounded-lg border transition-all cursor-pointer ${
                              isPaused 
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                                : 'bg-slate-50 text-slate-705 border-slate-205 hover:bg-slate-100 hover:border-slate-300'
                            }`}
                          >
                            {isPaused ? 'Activate' : 'Mute Savings'}
                          </button>

                          {!isPaused && (
                            <button
                              onClick={() => triggerSimulation(sub)}
                              disabled={isSutAlertActive}
                              className="px-2 py-1 bg-blue-50 hover:bg-blue-105 text-blue-600 text-[10px] font-extrabold rounded-lg border border-blue-200 transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50 shadow-xs"
                            >
                              <BellRing className="w-3 h-3 animate-pulse text-blue-500" />
                              Test Alert
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

          </div>

        </div>

        {/* Sidebar Simulator Phone: 4 Cols */}
        <div className="lg:col-span-4 bg-slate-50/50 border-t lg:border-t-0 lg:border-l border-slate-200 p-6 lg:p-8 flex flex-col justify-between items-center relative overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-full bg-blue-100/15 blur-3xl pointer-events-none" />

          <div className="w-full text-center lg:text-left mb-6 relative">
            <h4 className="text-xs font-bold text-blue-600 font-mono tracking-widest uppercase mb-1">Alert Simulator</h4>
            <h3 className="text-md font-bold text-slate-900 mb-2">Real-Time Mobile Reminders</h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              SubAudit monitors renewals server-side. Experience our smart reminder delivery loop below.
            </p>
          </div>

          {/* Interactive Phone mockup */}
          <div className="w-full max-w-[270px] aspect-[9/18.5] bg-[#0c101c] border-4 border-slate-800 rounded-[36px] p-2.5 relative shadow-xl overflow-hidden flex flex-col">
            
            {/* Phone Notch */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-4.5 bg-black rounded-full z-10 flex justify-center items-center">
              <div className="w-1.5 h-1.5 bg-slate-800 rounded-full mr-4" />
              <div className="w-8 h-1 bg-slate-900 rounded-full" />
            </div>

            {/* Phone Content Screen */}
            <div className="flex-1 rounded-[28px] overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/40 via-slate-950 to-slate-950 p-4 pt-10 flex flex-col justify-between relative">
              
              {/* Smartphone Top Bar Details */}
              <div className="flex justify-between items-center px-1 text-[9px] font-semibold text-slate-500 font-mono absolute top-2 left-0 right-0 py-1.5 px-6">
                <span>09:41</span>
                <span>5G 🔋</span>
              </div>

              {/* Smartphone Mock Lockscreen Background Details / Clock / Date */}
              <div className="text-center mt-3 relative z-0">
                <span className="text-[10px] text-slate-400 font-bold tracking-wide uppercase font-sans">
                  Tuesday, June 23
                </span>
                <h1 className="text-3xl font-extrabold text-white mt-1 select-none font-sans tracking-tight">09:41</h1>
                <span className="text-[9px] text-indigo-500 font-bold flex items-center justify-center gap-1 mt-1 bg-indigo-500/5 px-2 py-0.5 rounded-full border border-indigo-500/10 w-fit mx-auto">
                  <ShieldAlert className="w-3 h-3" />
                  SubAudit Armored
                </span>
              </div>

              {/* Push Notification Area */}
              <div className="my-auto space-y-3 z-10">
                <AnimatePresence mode="wait">
                  {simulatedAlert ? (
                    <motion.div
                      initial={{ opacity: 0, y: -20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 20, scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="bg-white/95 border border-slate-200 rounded-2xl p-3.5 shadow-xl relative pointer-events-auto"
                    >
                      {/* Glow indicator */}
                      <span className="absolute top-1.5 right-2 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                      </span>

                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-5 h-5 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow">
                          <BellRing className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-900">SUBAUDIT REMINDER</span>
                        <span className="text-[9px] text-slate-400 font-mono ml-auto">now</span>
                      </div>
                      <p className="text-[10.5px] leading-relaxed text-slate-700 font-medium font-semibold">
                        {simulatedAlert}
                      </p>
                      
                      {/* Cancel/Approve Buttons inside notification */}
                      <div className="mt-3 flex gap-2 border-t border-slate-100 pt-2.5">
                        <button className="flex-1 py-1 px-1.5 bg-red-50 hover:bg-red-100 text-red-650 text-[9px] font-semibold font-sans rounded-lg border border-red-100 transition-all select-none">
                          Decline & Cancel
                        </button>
                        <button className="flex-1 py-1 px-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[9px] font-semibold font-sans rounded-lg border border-emerald-100 transition-all select-none">
                          Approve Renew
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center p-4 bg-white/5 border border-dashed border-white/10 rounded-2xl select-none"
                    >
                      <Smartphone className="w-7 h-7 text-indigo-500/40 mx-auto mb-2" />
                      <p className="text-[10.5px] text-slate-400 leading-relaxed font-medium">
                        No active alerts pending.
                      </p>
                      <button 
                        onClick={() => triggerSimulation(subs[1] || subs[0])}
                        className="mt-2 text-[10px] text-indigo-400 hover:text-indigo-300 font-bold underline cursor-pointer"
                      >
                        Click "Test Alert" on items in the left section to test.
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Screen Slide to Unlock Indicator */}
              <div className="text-center pb-1 relative z-0">
                <div className="w-16 h-1 bg-slate-800 rounded-full mx-auto mb-2.5" />
                <span className="text-[8px] font-bold font-mono text-slate-500 tracking-wider">
                  🔒 SECURE END-TO-END FEED
                </span>
              </div>

            </div>

          </div>

          <div className="w-full mt-6 bg-white border border-slate-200/90 p-4 rounded-2xl flex flex-col justify-center items-center text-center shadow-xs">
            <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 mb-1 font-mono uppercase tracking-widest">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-555" /> Verified Savings
            </span>
            <p className="text-[11px] leading-relaxed text-slate-500 font-medium">
              Users save an average of <span className="text-slate-900 font-bold">$384/year</span> within 30 days of active auditing.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
