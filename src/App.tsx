import { Bell } from 'lucide-react';
import WaitlistForm from './components/WaitlistForm';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-blue-900 to-slate-900 text-white font-sans selection:bg-blue-500/20 selection:text-white overflow-x-hidden relative">
      
      {/* Subtle ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <section className="min-h-screen flex items-center p-4 sm:p-6 lg:p-8 relative">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Left - Branding */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center justify-center lg:justify-start gap-3 mb-8">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/30 rotate-3 hover:rotate-0 transition-transform duration-300">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight">
                Sub<span className="text-blue-400">Audit</span>
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
              Never Get Surprised by<br/>
              <span className="bg-gradient-to-r from-blue-300 via-indigo-200 to-cyan-200 bg-clip-text text-transparent">
                Subscription Charges
              </span>{' '}
              Again
            </h1>
            <p className="text-base sm:text-lg text-blue-200/70 leading-relaxed max-w-lg font-medium mb-8">
              Track your subscriptions, get smart renewal reminders, and stop paying for services you forgot about.
            </p>

            {/* Trust indicator */}
            <div className="hidden lg:flex items-center gap-2 text-blue-300/50 text-xs font-medium">
              <div className="flex -space-x-1.5">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 border-2 border-indigo-950" />
                ))}
              </div>
              <span>Join <span className="text-blue-200 font-bold">2,000+</span> early adopters</span>
            </div>
          </div>

          {/* Right - Form */}
          <div className="w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto">
            <WaitlistForm />
          </div>

        </div>
      </section>

    </div>
  );
}
