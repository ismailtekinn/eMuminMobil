import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import {
  LoginResponse,
  StoredAuthData,
  User,
} from "../types/auth/authType";

const STORAGE_KEY = "@emumin_auth";

interface UserState {
  token: string | null;
  expiresAt: string | null;
  user: User | null;
  isHydrated: boolean;

  // Giriş yap: state'i güncelle ve telefona kaydet
  login: (response: LoginResponse) => Promise<void>;

  // Çıkış yap: state'i temizle ve telefondan sil
  logout: () => Promise<void>;

  // Uygulama açılınca kayıtlı oturumu telefondan oku
  loadFromStorage: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  token: null,
  expiresAt: null,
  user: null,
  isHydrated: false,

  login: async (response: LoginResponse) => {
    const dataToSave: StoredAuthData = {
      token: response.token,
      expiresAt: response.expiresAt,
      user: response.user,
    };

    // 1) Telefona kaydet
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));

    // 2) Uygulama içi state'i güncelle
    set({
      token: response.token,
      expiresAt: response.expiresAt,
      user: response.user,
    });
  },

  logout: async () => {
    // 1) Telefondan sil
    await AsyncStorage.removeItem(STORAGE_KEY);

    // 2) State'i sıfırla
    set({
      token: null,
      expiresAt: null,
      user: null,
    });
  },

  loadFromStorage: async () => {
    try {
      const savedData = await AsyncStorage.getItem(STORAGE_KEY);

      if (!savedData) {
        set({ isHydrated: true });
        return;
      }

      const parsed: StoredAuthData = JSON.parse(savedData);

      set({
        token: parsed.token,
        expiresAt: parsed.expiresAt,
        user: parsed.user,
        isHydrated: true,
      });
    } catch {
      // Bozuk veri varsa temizle
      await AsyncStorage.removeItem(STORAGE_KEY);
      set({
        token: null,
        expiresAt: null,
        user: null,
        isHydrated: true,
      });
    }
  },
}));
