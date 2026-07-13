import { MaterialIcons } from "@expo/vector-icons";

export type IconName = keyof typeof MaterialIcons.glyphMap;

export interface PrayerTime {
  id: string;
  name: string;
  subtitle: string;
  time: string;
  icon: IconName;
}

export interface NextPrayer {
  name: string;
  countdown: string;
  location: string;
}

export interface PrayerDate {
  hijri: string;
  gregorian: string;
}
