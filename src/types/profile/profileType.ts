import { MaterialIcons } from "@expo/vector-icons";
import { User } from "../auth/authType";

export type IconName = keyof typeof MaterialIcons.glyphMap;

export interface ProfileField {
  id: string;
  label: string;
  value: string;
  icon: IconName;
}

export interface ProfileDisplay {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  isPremium: boolean;
  membershipLabel: string;
  fields: ProfileField[];
}

export type ProfileUser = User | null;
