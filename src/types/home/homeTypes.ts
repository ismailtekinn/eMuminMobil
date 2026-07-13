import { MaterialIcons } from "@expo/vector-icons";

export type IconName = keyof typeof MaterialIcons.glyphMap;

export interface MenuCardItem {
  id: string;
  label: string;
  icon: IconName;
  iconColor: string;
  iconBgColor: string;
  borderColor: string;
  featured?: boolean;
}

export interface BottomNavItem {
  id: string;
  label: string;
  icon: IconName;
}
