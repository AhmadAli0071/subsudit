import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Bell, 
  ShieldCheck, 
  Calendar, 
  Layers, 
  BarChart3, 
  Clock, 
  ArrowRight, 
  ChevronDown, 
  HeartHandshake, 
  AlertCircle, 
  Mail, 
  Play, 
  Sparkle, 
  Sparkles, 
  Star, 
  BadgeCheck, 
  Lock, 
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';
import DashboardMockup from './components/DashboardMockup';
import WaitlistForm from './components/WaitlistForm';
import { FAQS, FEATURES, TESTIMONIALS } from './data';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Monitor page scroll to change header background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50/65 text-slate-800 font-sans selection:bg-blue-500/10 selection:text-blue-900 overflow-x-hidden">
      
      {/* 1. Header Navigation */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 py-4 shadow-sm' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          
          {/* Logo brand */}
          <div 
            onClick={() => handleScrollTo('hero')} 
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#2563eb] p-0.5 flex items-center justify-center shadow-md shadow-blue-500/10">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center transition-colors group-hover:bg-slate-50">
                <Bell className="w-5.5 h-5.5 text-blue-600 transition-colors" />
              </div>
            </div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
              Sub<span className="text-blue-600 transition-colors">Audit</span>
            </span>
          </div>

          {/* Desktop Menu links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            {['Features', 'How It Works', 'FAQ', 'Contact'].map(item => {
              const elementId = item.toLowerCase().replace(/\s+/g, '-');
              return (
                <button
                  key={item}
                  onClick={() => handleScrollTo(elementId)}
                  className="hover:text-blue-600 transition-colors cursor-pointer relative py-1 group text-slate-600/90 hover:text-slate-900"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-500 transition-all group-hover:w-full" />
                </button>
              );
            })}
          </nav>

          {/* Desktop Call to Action */}
          <div className="hidden md:flex items-center gap-3.5">
            <button
              onClick={() => handleScrollTo('waitlist-section')}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-505 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 hover:shadow-blue-500/25 transition-all cursor-pointer flex items-center gap-1.5 transform active:scale-98"
            >
              Join Early Access
            </button>
          </div>

          {/* Mobile hamburger menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-600 hover:text-slate-900 p-1 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </header>

      {/* Mobile Drawer Menu Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed top-20 left-0 right-0 bg-white border-b border-slate-200 z-40 overflow-hidden shadow-md"
          >
            <div className="px-5 py-6 space-y-4 flex flex-col">
              {['Features', 'How It Works', 'FAQ', 'Contact'].map(item => {
                const elementId = item.toLowerCase().replace(/\s+/g, '-');
                return (
                  <button
                    key={item}
                    onClick={() => handleScrollTo(elementId)}
                    className="text-left text-base font-semibold text-slate-705 hover:text-slate-900 py-1"
                  >
                    {item}
                  </button>
                );
              })}
              <div className="pt-4 border-t border-slate-200 flex flex-col gap-3">
                <button
                  onClick={() => handleScrollTo('waitlist-section')}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl"
                >
                  Join Early Access
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 sm:pb-28 lg:pt-40 lg:pb-36 overflow-hidden bg-white">
        
        {/* Glow ambient backgrounds */}
        <div className="absolute top-0 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/45 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-indigo-100/35 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Badge Offer */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-50 border border-blue-150 rounded-full mb-6"
          >
            <span className="text-xs">🔥</span>
            <span className="text-xs font-bold text-blue-700 font-sans tracking-wide">
              Early Bird Offer — Get 50% Lifetime Discount
            </span>
          </motion.div>

          {/* Headline and tagline description */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6.5xl font-extrabold text-slate-900 tracking-tight leading-[1.08] max-w-4xl mx-auto"
          >
            Never Get Surprised by{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-550 bg-clip-text text-transparent">
              Subscription Charges
            </span>{' '}
            Again
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Track all your subscriptions, receive smart renewal reminders, and prevent unexpected charges before money leaves your account.
          </motion.p>

          {/* CTA Buttons row */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => handleScrollTo('waitlist-section')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-505 text-white font-extrabold text-sm rounded-xl transition-all shadow-xl shadow-blue-500/25 transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 animate-pulse text-white" />
              Join Early Access
            </button>
            <button
              onClick={() => handleScrollTo('how-it-works')}
              className="w-full sm:w-auto px-8 py-4 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 font-bold text-sm rounded-xl border border-slate-200 shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              See How It Works
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </motion.div>

          {/* Core Interactive Sandbox Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16 sm:mt-24 max-w-5xl mx-auto"
          >
            <div className="text-center mb-6">
              <span className="text-xs font-bold text-blue-600 font-mono tracking-widest uppercase block mb-1">
                DEMO SANDBOX
              </span>
              <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
                Tinker with active mock plans to test calculations or click <span className="text-blue-600 font-semibold font-sans">"Test Alert"</span> to simulate a renewal warning.
              </p>
            </div>
            <DashboardMockup />
          </motion.div>

        </div>
      </section>

      {/* 3. Trusted Payment & Safe Protocols Segment */}
      <section className="py-12 border-y border-slate-200 bg-slate-50/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold text-slate-400 font-mono tracking-widest uppercase block mb-6">
            BUILT ON TOP OF ENTERPRISE-GRADE INFRASTRUCTURE
          </span>
          <div className="flex flex-wrap justify-center items-center gap-10 sm:gap-16 opacity-75 grayscale hover:grayscale-0 transition-all">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 font-mono">
              <Lock className="w-5 h-5 text-blue-500" />
              STRIPE SECURED
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 font-mono">
              <ShieldCheck className="w-5 h-5 text-blue-500" />
              PLAID SYNC COMPLIANT
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 font-mono">
              <BadgeCheck className="w-5 h-5 text-blue-500" />
              SOC2 AUDITED
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 font-mono">
              <HeartHandshake className="w-5 h-5 text-blue-500" />
              PCI-DSS READY
            </div>
          </div>
        </div>
      </section>

      {/* 4. Features Section */}
      <section id="features" className="py-20 sm:py-32 relative bg-white">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-100/20 blur-3xl rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
            <h4 className="text-xs font-bold text-blue-600 font-mono tracking-widest uppercase mb-2">FEATURES DESIGN</h4>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Everything You Need to Claim Control
            </h2>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-medium">
              We design specialized systems to monitor micro-payments, track trial cancellations, analyze pricing hikes, and remind you before payment providers withdraw your capital.
            </p>
          </div>

          {/* Features Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {FEATURES.map((feature, idx) => {
              // Custom representation icon based on feature id/title
              const renderFeatureIcon = (id: string) => {
                switch (id) {
                  case 'f1': return <Bell className="w-6 h-6 text-white" />;
                  case 'f2': return <Layers className="w-6 h-6 text-white" />;
                  case 'f3': return <BarChart3 className="w-6 h-6 text-white" />;
                  case 'f4': return <Calendar className="w-6 h-6 text-white" />;
                  case 'f5': return <ShieldAlert className="w-6 h-6 text-white" />;
                  default: return <Sparkle className="w-6 h-6 text-white" />;
                }
              };

              // Make custom attractive gradient colors matching light blue
              let customColor = "from-blue-500 to-indigo-500";
              if (feature.id === 'f2') customColor = "from-cyan-500 to-blue-505";
              if (feature.id === 'f3') customColor = "from-blue-600 to-cyan-500";
              if (feature.id === 'f4') customColor = "from-indigo-600 to-blue-500";
              if (feature.id === 'f5') customColor = "from-indigo-500 to-cyan-501";

              return (
                <div 
                  key={feature.id}
                  className="bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl relative overflow-hidden group hover:border-blue-400/50 hover:shadow-lg transition-all duration-300 shadow-xs"
                >
                  <div className="absolute top-0 right-0 w-28 h-28 bg-blue-50/10 group-hover:bg-blue-50/40 rounded-bl-full pointer-events-none transition-all" />
                  
                  {/* Glowing vertical element */}
                  <div className="absolute top-6 left-0 w-1.2 h-12 bg-gradient-to-b from-blue-600 to-cyan-400 rounded-r-md opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Icon wrap */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${customColor} flex items-center justify-center mb-6 shadow-md shadow-blue-500/10`}>
                    {renderFeatureIcon(feature.id)}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-650 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. How It Works Section */}
      <section id="how-it-works" className="py-20 sm:py-32 bg-slate-50/75 border-y border-slate-200 relative">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100/20 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24 animate-fade-in">
            <h4 className="text-xs font-bold text-blue-650 font-mono tracking-widest uppercase mb-2">THE PIPELINE</h4>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Four Easy Steps to Peace of Mind
            </h2>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-medium">
              SubAudit integrates seamlessly into your standard financial routine. Take complete control in less than five minutes.
            </p>
          </div>

          {/* Timeline steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10 w-full">
            {[
              {
                step: '01',
                title: 'Add Your Subscriptions',
                desc: 'Connect your accounts via secure Plaid feeders, forward receipts, or list your active products manually in 10 seconds.',
                color: 'text-blue-600 border-blue-200 bg-blue-50'
              },
              {
                step: '02',
                title: 'Get Smart Reminders',
                desc: 'Receive push alerts, SMS notifications, and summary emails 1, 3, or 5 days before any renewal invoice occurs.',
                color: 'text-indigo-600 border-indigo-200 bg-indigo-50'
              },
              {
                step: '03',
                title: 'Decide to Renew or Cancel',
                desc: 'Open the alarm warning to approve and extend billing, or tap "Cancel" to kick off guided cancellation assistants.',
                color: 'text-sky-600 border-sky-200 bg-sky-50'
              },
              {
                step: '04',
                title: 'Save Money & Stay in Control',
                desc: 'Guarantee you never spend money on streaming or software you forget about, improving disposable income instantly.',
                color: 'text-emerald-700 border-emerald-200 bg-emerald-50'
              }
            ].map((step, idx) => (
              <div 
                key={step.step}
                className="bg-white border border-slate-200/90 p-6 rounded-2xl relative hover:border-blue-400 hover:shadow-sm transition-all duration-300 shadow-xs"
              >
                {/* Number emblem */}
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center font-mono font-bold text-sm mb-6 ${step.color}`}>
                  {step.step}
                </div>

                <h3 className="text-md sm:text-lg font-bold text-slate-900 mb-2 leading-relaxed">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                  {step.desc}
                </p>

                {/* Arrow connectors in desktop */}
                {idx < 3 && (
                  <div className="hidden md:block absolute top-12 -right-5 translate-x-1.2 z-20 text-slate-300">
                    <ArrowRight className="w-5 h-5 text-slate-300" />
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Waitlist Form Section CONTAINER */}
      <section id="waitlist-section" className="py-20 sm:py-32 relative bg-white">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-blue-100/10 blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold text-blue-600 font-mono tracking-widest uppercase block mb-1">
              JOIN PRE-LAUNCH ACCESS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Join the Early Access Program
            </h2>
            <p className="text-sm text-slate-505 leading-relaxed max-w-2xl mx-auto font-medium">
              Secure your spot, secure your founding discount, and tell us how we can construct the next generation subscription manager.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <WaitlistForm />
          </div>

        </div>
      </section>

      {/* 7. Social Proof / Testimonials */}
      <section className="py-20 sm:py-32 bg-slate-50/80 border-y border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
            <h4 className="text-xs font-bold text-blue-600 font-mono tracking-widest uppercase mb-2">TRUSTWORTHINESS</h4>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Hear From Our Founding Adopters
            </h2>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-medium">
              "Join early adopters helping shape the future of subscription management." Read stories of freelancers, designers, and managers saving money.
            </p>
          </div>

          {/* Testimonial grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div 
                key={idx}
                className="bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl relative flex flex-col justify-between shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-300"
              >
                <div>
                  {/* Stars counter */}
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>

                  {/* Body quote */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold italic mb-6">
                    "{t.quote}"
                  </p>
                </div>

                {/* Footer person */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-4">
                  <img
                    src={t.avatar}
                    referrerPolicy="no-referrer"
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                      {t.name}
                      {t.verified && <ShieldCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" />}
                    </h5>
                    <span className="text-[10px] text-slate-400 font-mono block">
                      {t.role}
                    </span>
                  </div>

                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-1 border border-emerald-150 rounded-lg ml-auto font-mono tracking-tight shrink-0 font-bold">
                    Saved ${t.savedAmount}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. FAQ Section Accordion */}
      <section id="faq" className="py-20 sm:py-32 relative bg-white">
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-blue-50/40 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-16 sm:mb-24">
            <h4 className="text-xs font-bold text-blue-600 font-mono tracking-widest uppercase mb-2">ANSWERS</h4>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Can't find what you are looking for? Our founding engineering team is ready to assist at <a href="mailto:infosubaudit@gmail.com" className="text-blue-650 font-bold hover:underline">infosubaudit@gmail.com</a>.
            </p>
          </div>

          {/* Accordion container */}
          <div className="space-y-3.5">
            {FAQS.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index} 
                  className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                    isOpen 
                      ? 'bg-slate-50/50 border-blue-400 shadow-xs' 
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

      {/* 9. Final CTA with Premium Gradients */}
      <section className="py-16 sm:py-24 relative overflow-hidden bg-white">
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-800 border border-blue-500/20 rounded-[36px] p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden shadow-2xl shadow-blue-500/25">
            
            {/* Ambient overlay vector colors */}
            <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-gradient-to-bl from-white/10 via-transparent to-transparent rounded-bl-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-gradient-to-tr from-cyan-400/10 via-transparent to-transparent rounded-tr-full pointer-events-none" />

            {/* Glowing badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/20 rounded-full mb-6 font-mono text-[10px] font-bold text-white tracking-wider">
              <Sparkle className="w-3 h-3 text-cyan-300 animate-spin-slow" />
              FINTECH FOUNDING CHARTER LIMITED
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
              Stop Paying for Subscriptions You Forgot About
            </h2>
            
            <p className="text-sm sm:text-base text-blue-105 max-w-2xl mx-auto leading-relaxed mb-10 font-medium">
              Join our exclusive waitlist list today, configure your smart notification triggers, and lock down your 50% discount forever.
            </p>

            <button
              onClick={() => handleScrollTo('waitlist-section')}
              className="w-full sm:w-auto px-10 py-5 bg-white hover:bg-slate-50 text-blue-700 hover:text-blue-800 font-extrabold text-sm rounded-xl transition-all shadow-xl shadow-indigo-950/30 font-sans tracking-wide cursor-pointer flex items-center justify-center gap-2.5 mx-auto hover:-translate-y-0.5 transform active:scale-98"
            >
              Join Early Access
              <ArrowRight className="w-4 h-4 ml-1 text-blue-600" />
            </button>

            {/* Micro-guarantee message */}
            <span className="text-[10px] text-blue-200/90 font-mono tracking-widest block mt-6">
              🔒 NO CREDIT CARD REQUIRED · INSTANT DISCOUNT ACTIVATION
            </span>

          </div>
        </div>
      </section>

      {/* 10. Contact / Support Assurances Widget */}
      <section id="contact" className="py-12 border-t border-slate-100 bg-slate-50 text-center">
        <div className="max-w-3xl mx-auto px-4 flex flex-col items-center">
          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-4 shadow-xs">
            <Mail className="w-4.5 h-4.5 text-blue-600" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 mb-1">Have special integration requests or questions?</h4>
          <p className="text-xs text-slate-500 leading-relaxed mb-3 font-medium">
            Whether you run custom payment gateways, corporate team cards, or require localized SMS providers.
          </p>
          <a 
            href="mailto:infosubaudit@gmail.com" 
            className="text-xs font-bold text-blue-600 bg-white hover:bg-slate-50 px-4 py-2 border border-slate-200 rounded-xl transition-all font-mono shadow-xs hover:border-slate-300"
          >
            infosubaudit@gmail.com
          </a>
        </div>
      </section>

      {/* 11. Footer Section */}
      <footer className="bg-white border-t border-slate-150 py-12 sm:py-16 text-xs text-slate-500 font-medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center col-span-12">
            
            {/* Primary corporate col */}
            <div className="md:col-span-5 text-center md:text-left space-y-3.5">
              <div className="flex justify-center md:justify-start items-center gap-2 cursor-pointer select-none" onClick={() => handleScrollTo('hero')}>
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-200 shadow-xs">
                  <Bell className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-base font-extrabold text-slate-900 tracking-tight">
                  Sub<span className="text-blue-600">Audit</span>
                </span>
              </div>
              <p className="text-xs font-sans font-normal leading-relaxed text-slate-500">
                Track subscriptions. Prevent surprise charges. Avoid unwanted billing schedules.
              </p>
            </div>

            {/* Quick Links col */}
            <div className="md:col-span-4 flex justify-center gap-6 text-xs font-bold text-slate-650">
              {['Features', 'How It Works', 'FAQ', 'Contact'].map(link => {
                const elementId = link.toLowerCase().replace(/\s+/g, '-');
                return (
                  <button
                    key={link}
                    onClick={() => handleScrollTo(elementId)}
                    className="hover:text-blue-650 transition-colors cursor-pointer"
                  >
                    {link}
                  </button>
                );
              })}
            </div>

            {/* Integrity seals */}
            <div className="md:col-span-3 text-center md:text-right space-y-2">
              <span className="text-[10px] font-mono tracking-widest block text-slate-400 uppercase font-semibold">
                COOPERATIVE SECURITY SYSTEM
              </span>
              <p className="text-[10px] text-slate-400 leading-relaxed font-normal">
                SubAudit respects user data security. Our monitoring loop enforces non-custodial protection protocols.
              </p>
            </div>

          </div>

          <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
            <p className="font-normal font-sans text-slate-400">
              © 2026 SubAudit. All rights reserved. Registered launch program.
            </p>
            <div className="flex gap-4 font-mono text-[10px] text-slate-400 font-semibold">
              <span className="hover:text-slate-600 cursor-pointer">PRIVACY PROTOCOL</span>
              <span>·</span>
              <span className="hover:text-slate-400 cursor-pointer">TERMS OF OPERATION</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

