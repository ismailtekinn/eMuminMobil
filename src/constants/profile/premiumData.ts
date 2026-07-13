export type SubscriptionPlanId = "monthly" | "yearly";

export interface PremiumFeature {
  id: string;
  title: string;
  description: string;
}

export interface SubscriptionPlan {
  id: SubscriptionPlanId;
  label: string;
  subtitle: string;
  price: string;
  badge?: string;
}

export const PREMIUM_FEATURES: PremiumFeature[] = [
  {
    id: "unlimited",
    title: "Sınırsız soru",
    description: "Günlük limitlere takılmadan dilediğiniz kadar sorun.",
  },
  {
    id: "voice",
    title: "Sesli cevaplar",
    description: "Metinleri dinleyerek öğrenin, sesli asistan desteği alın.",
  },
  {
    id: "analysis",
    title: "Gelişmiş analizler",
    description: "Derinlemesine fıkhi ve tarihi kaynak araştırmaları.",
  },
  {
    id: "adfree",
    title: "Reklamsız",
    description: "Dikkat dağıtıcı unsurlar olmadan odaklanın.",
  },
];

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "monthly",
    label: "Aylık",
    subtitle: "İstediğin zaman iptal et",
    price: "₺99 / ay",
  },
  {
    id: "yearly",
    label: "Yıllık",
    subtitle: "En popüler seçenek",
    price: "₺699 / yıl",
    badge: "%40 TASARRUF",
  },
];
