import { Subscription, FAQItem, FeatureItem, Testimonial } from './types';

export const WAITLIST_OPTIONS = [
  { name: 'Netflix', price: 15.49, category: 'Streaming', icon: 'Tv', bgColor: 'bg-red-500/10 text-red-500' },
  { name: 'Spotify', price: 10.99, category: 'Streaming', icon: 'Music', bgColor: 'bg-green-500/10 text-green-500' },
  { name: 'Adobe', price: 54.99, category: 'Design', icon: 'Palette', bgColor: 'bg-orange-500/10 text-orange-500' },
  { name: 'ChatGPT', price: 20.00, category: 'AI & Tech', icon: 'Sparkles', bgColor: 'bg-emerald-500/10 text-emerald-500' },
  { name: 'YouTube Premium', price: 13.99, category: 'Streaming', icon: 'Youtube', bgColor: 'bg-rose-500/10 text-rose-500' },
  { name: 'Amazon Prime', price: 14.99, category: 'Utility', icon: 'ShoppingBag', bgColor: 'bg-yellow-500/10 text-yellow-500' },
  { name: 'Microsoft 365', price: 9.99, category: 'Productivity', icon: 'FileText', bgColor: 'bg-blue-500/10 text-blue-500' },
  { name: 'Google One', price: 2.99, category: 'Utility', icon: 'Cloud', bgColor: 'bg-cyan-500/10 text-cyan-500' },
  { name: 'Canva Pro', price: 12.99, category: 'Design', icon: 'Compass', bgColor: 'bg-purple-500/10 text-purple-500' },
  { name: 'Dropbox', price: 11.99, category: 'Utility', icon: 'HardDrive', bgColor: 'bg-indigo-500/10 text-indigo-500' },
  { name: 'Apple Music', price: 10.99, category: 'Streaming', icon: 'Headphones', bgColor: 'bg-pink-500/10 text-pink-500' },
  { name: 'Disney+', price: 13.99, category: 'Streaming', icon: 'Film', bgColor: 'bg-teal-500/10 text-teal-500' },
  { name: 'Other', price: 15.00, category: 'Others', icon: 'CreditCard', bgColor: 'bg-slate-500/10 text-slate-500' }
];

export const INITIAL_MOCK_SUBSCRIPTIONS: Subscription[] = [
  {
    id: 'sub1',
    name: 'Netflix',
    cost: 15.49,
    billingCycle: 'monthly',
    renewalDate: '26', // Days from now
    category: 'Streaming',
    icon: 'Tv',
    bgColor: 'text-red-500 border-red-500/20 bg-red-500/5'
  },
  {
    id: 'sub2',
    name: 'Spotify Family',
    cost: 16.99,
    billingCycle: 'monthly',
    renewalDate: '2', // Days from now - VERY URGENT!
    category: 'Streaming',
    icon: 'Music',
    bgColor: 'text-green-500 border-green-500/20 bg-green-500/5'
  },
  {
    id: 'sub3',
    name: 'Adobe Creative Cloud',
    cost: 54.99,
    billingCycle: 'monthly',
    renewalDate: '5', // Days from now
    category: 'Design',
    icon: 'Palette',
    bgColor: 'text-orange-500 border-orange-500/20 bg-orange-500/5'
  },
  {
    id: 'sub4',
    name: 'ChatGPT Plus',
    cost: 20.00,
    billingCycle: 'monthly',
    renewalDate: '12',
    category: 'AI & Tech',
    icon: 'Sparkles',
    bgColor: 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5'
  },
  {
    id: 'sub5',
    name: 'Canva Pro',
    cost: 12.99,
    billingCycle: 'monthly',
    renewalDate: '18',
    category: 'Design',
    icon: 'Compass',
    bgColor: 'text-purple-500 border-purple-500/20 bg-purple-500/5'
  },
  {
    id: 'sub6',
    name: 'Dropbox Professional',
    cost: 119.90,
    billingCycle: 'yearly',
    renewalDate: '8', // Days from now - BIG UNEXPECTED CHARGE!
    category: 'Utility',
    icon: 'HardDrive',
    bgColor: 'text-indigo-500 border-indigo-500/20 bg-indigo-500/5'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "How does SubAudit work?",
    answer: "SubAudit acts as your centralized subscription command center. You can securely log your active services, and SubAudit automatically calculates their upcoming renewal schedules. We send you smart notifications (via SMS, email, or web pushes) days before a renewal invoice hits, allowing you to cancel or approve, zeroing out surprise bills."
  },
  {
    question: "When will the product launch?",
    answer: "SubAudit is launching its official public release in late 2026. By joining the early-bird list today, you secure priority access to our private beta starting next month, alongside a 50% lifetime markdown on our premium plan."
  },
  {
    question: "What does the 50% lifetime discount mean?",
    answer: "As an early supporter, you receive our Pro membership at 50% off for as long as you maintain your account. Even when we add advanced automated cancellation robots and virtual card integrations, your rate will remain locked at half-price forever."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. Security is central to SubAudit. We encrypt your subscription logs, use military-grade hashing, and never sell your data. We don't link directly to your main bank accounts unless you choose a bank-feed sync, and we never store raw credit card details."
  },
  {
    question: "Can I manage multiple subscriptions?",
    answer: "Yes, you can track an unlimited number of subscriptions, SaaS memberships, fitness clubs, magazines, local utility schedules, and customized recurring logs. You can even set manual billing dates for local independent service payments."
  }
];

export const FEATURES: FeatureItem[] = [
  {
    id: 'f1',
    title: 'Smart Renewal Alerts',
    description: 'Receive rich, helpful notifications via SMS, email, and mobile push 1, 3, or 5 days before any subscription auto-renews.',
    icon: 'BellRing',
    color: 'from-purple-500 to-indigo-500'
  },
  {
    id: 'f2',
    title: 'Subscription Tracking',
    description: 'Manage every streaming service, utility, and SaaS license inside a single, beautiful unified workspace.',
    icon: 'Layers',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'f3',
    title: 'Spending Insights',
    description: 'Understand exactly where your cash flows with responsive category pie charts, predictive burn rates, and recurring trends.',
    icon: 'BarChart3',
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 'f4',
    title: 'Renewal Calendar',
    description: 'Visualize your upcoming direct-debit milestones in an intuitive chronological list or interactive month-by-month grid layout.',
    icon: 'CalendarDays',
    color: 'from-teal-500 to-emerald-500'
  },
  {
    id: 'f5',
    title: 'Avoid Unwanted Charges',
    description: 'Receive smart predictions on services you are under-utilizing so you can cut waste and keep thousands in your pocket.',
    icon: 'ShieldAlert',
    color: 'from-amber-500 to-orange-500'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Marcus Vance",
    role: "Freelance Designer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    quote: "SubAudit notified me about a forgotten $120/yr design license renewal three days before it hit. I canceled in one click. Already saved back my lifetime commitment!",
    savedAmount: 340,
    verified: true
  },
  {
    name: "Elena Rostova",
    role: "Product Manager",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    quote: "Keeping track of 14 separate streaming and SaaS tools was a nightmare. This interface is incredibly smooth, and the proactive custom alerts give me complete peace of mind.",
    savedAmount: 480,
    verified: true
  },
  {
    name: "Devon Carter",
    role: "Software Engineer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
    quote: "I signed up for ChatGPT, Claude, Midjourney, and three hostings... half of which I forgot about. SubAudit's insights made it so simple to audit my digital subscriptions.",
    savedAmount: 220,
    verified: true
  }
];
