import { User } from "../../types/auth/authType";
import { ProfileDisplay, ProfileField } from "../../types/profile/profileType";

const DEFAULT_PHONE = "+90 532 000 00 00";
const DEFAULT_CITY = "İstanbul";
const DEFAULT_COUNTRY = "Türkiye";

const splitName = (fullName: string) => {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const firstName = parts[0] ?? "Misafir";
  const lastName = parts.slice(1).join(" ") || "-";
  return { firstName, lastName };
};

export const isPremiumUser = (user: User | null): boolean => {
  if (!user) return false;
  return user.membershipStatus > 0;
};

export const buildProfileDisplay = (user: User | null): ProfileDisplay => {
  const fullName = user?.fullName?.trim() || "Misafir Kullanıcı";
  const { firstName, lastName } = splitName(fullName);
  const isPremium = isPremiumUser(user);

  const fields: ProfileField[] = [
    { id: "firstName", label: "Ad", value: firstName, icon: "person-outline" },
    { id: "lastName", label: "Soyad", value: lastName, icon: "badge" },
    { id: "phone", label: "Telefon", value: DEFAULT_PHONE, icon: "phone" },
    {
      id: "email",
      label: "E-posta",
      value: user?.email ?? "ornek@email.com",
      icon: "email",
    },
    { id: "city", label: "Şehir", value: DEFAULT_CITY, icon: "location-city" },
    { id: "country", label: "Ülke", value: DEFAULT_COUNTRY, icon: "public" },
  ];

  return {
    firstName,
    lastName,
    fullName,
    email: user?.email ?? "ornek@email.com",
    phone: DEFAULT_PHONE,
    city: DEFAULT_CITY,
    country: DEFAULT_COUNTRY,
    isPremium,
    membershipLabel: isPremium ? "Premium Üye" : "Standart Üye",
    fields,
  };
};
