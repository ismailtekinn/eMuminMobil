
import { useEffect } from "react";
import * as ExpoSplashScreen from "expo-splash-screen";
import AppRoute from "./AppRoute";

// Native splash JS hazır olana kadar kalsın (sadece düz renk)
ExpoSplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  useEffect(() => {
    import("./src/store/userStore").then(({ useUserStore }) => {
      useUserStore.getState().loadFromStorage();
    });
  }, []);

  return <AppRoute />;
}
