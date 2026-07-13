import { BottomNavItem, MenuCardItem } from "../../types/home/homeTypes";

export const MENU_CARDS: MenuCardItem[] = [
  {
    id: "ai-assistant",
    label: "Yapay Zeka Asistanı",
    icon: "smart-toy",
    iconColor: "#ffffff",
    iconBgColor: "#065f46",
    borderColor: "#065f46",
    featured: true,
  },
  {
    id: "quran",
    label: "Kur'an",
    icon: "menu-book",
    iconColor: "#1e5fa8",
    iconBgColor: "#e8f2fc",
    borderColor: "#7eb8e8",
  },
  {
    id: "hadith",
    label: "Hadisler",
    icon: "auto-stories",
    iconColor: "#5c6b7a",
    iconBgColor: "#f0f2f5",
    borderColor: "#bec9c2",
  },
  {
    id: "prayers",
    label: "Dualar",
    icon: "volunteer-activism",
    iconColor: "#065f46",
    iconBgColor: "#e6f4ef",
    borderColor: "#8bd6b7",
  },
  {
    id: "prayer-times",
    label: "Namaz Vakitleri",
    icon: "schedule",
    iconColor: "#1e5fa8",
    iconBgColor: "#e8f2fc",
    borderColor: "#7eb8e8",
  },
  {
    id: "qibla",
    label: "Kıble Bulucu",
    icon: "explore",
    iconColor: "#5c6b7a",
    iconBgColor: "#f0f2f5",
    borderColor: "#bec9c2",
  },
  {
    id: "religious-calendar",
    label: "Dini Takvim",
    icon: "calendar-today",
    iconColor: "#5c6b7a",
    iconBgColor: "#f0f2f5",
    borderColor: "#bec9c2",
  },
  {
    id: "other",
    label: "Diğer",
    icon: "apps",
    iconColor: "#5c6b7a",
    iconBgColor: "#f0f2f5",
    borderColor: "#bec9c2",
  },
];

export const BOTTOM_NAV_ITEMS: BottomNavItem[] = [
  { id: "home", label: "Ana Sayfa", icon: "home" },
  { id: "chat", label: "Sohbet", icon: "chat-bubble-outline" },
  { id: "quran", label: "Kur'an", icon: "menu-book" },
  { id: "prayer", label: "Namaz", icon: "schedule" },
  { id: "profile", label: "Profil", icon: "person-outline" },
];

export const QUICK_CHIPS = [
  { id: "namaz", label: "Namaz nasıl kılınır?" },
  { id: "zekat", label: "Zekat hesaplama" },
];
