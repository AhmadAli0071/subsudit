export interface Subscription {
  id: string;
  name: string;
  cost: number;
  billingCycle: 'monthly' | 'yearly';
  renewalDate: string; // ISO format string or simple day offset
  category: 'Streaming' | 'Utility' | 'Productivity' | 'AI & Tech' | 'Design' | 'Others';
  icon: string; // Lucide icon name
  bgColor: string; // for icon styling
}

export interface WaitlistData {
  fullName: string;
  email: string;
  subscriptions: string[];
  forgottenChargeHistory: 'Yes, multiple times' | 'Yes, once or twice' | 'No';
  joinedAt: string;
  queueNumber: number;
  coupon?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  quote: string;
  savedAmount: number;
  verified: boolean;
}
