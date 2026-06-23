import { Bell } from 'lucide-react';
import WaitlistForm from './components/WaitlistForm';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-950 via-neutral-900 to-zinc-950 text-white font-sans selection:bg-amber-500/20 selection:text-white overflow-x-hidden relative">
      
      <div className="absolute top-1/3 left-1/3 w-[700px] h-[700px] bg-amber-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-rose-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-500/3 blur-[200px] rounded-full pointer-events-none" />

      <section className="py-12 sm:py-16 lg:py-0 lg:min-h-screen lg:flex lg:items-center p-4 sm:p-6 lg:p-8 relative">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center justify-center lg:justify-start gap-3 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight">
                Sub<span className="text-amber-400">Audit</span>
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6">
              Never Get Surprised by<br/>
              <span className="bg-gradient-to-r from-amber-200 via-yellow-200 to-rose-200 bg-clip-text text-transparent">
                Subscription Charges
              </span>{' '}
              Again
            </h1>
            <p className="text-base sm:text-lg text-stone-400 leading-relaxed max-w-lg font-medium mb-10">
              Track your subscriptions, get smart renewal reminders, and stop paying for services you forgot about.
            </p>

            <div className="hidden lg:flex items-center gap-4">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-rose-500 border-2 border-stone-950 ring-2 ring-stone-950" />
                ))}
              </div>
              <div className="text-sm">
                <span className="text-stone-500">Join </span>
                <span className="text-amber-300 font-bold">2,000+</span>
                <span className="text-stone-500"> early adopters</span>
              </div>
            </div>
          </div>

          <div className="w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto">
            <WaitlistForm />
          </div>

        </div>
      </section>

    </div>
  );
}
