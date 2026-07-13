import React, { useCallback, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ExpoSplashScreen from "expo-splash-screen";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../types";

const MIN_SPLASH_MS = 2500;
const BG = "#1c2e26";

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.92)).current;
  const loadingAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<NavigationProp>();
  const startTime = useRef(Date.now());
  const nativeHidden = useRef(false);

  const hideNativeSplash = useCallback(async () => {
    if (nativeHidden.current) return;
    nativeHidden.current = true;
    try {
      await ExpoSplashScreen.hideAsync();
    } catch {
      // zaten gizlenmiş olabilir
    }
  }, []);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.timing(loadingAnim, {
        toValue: 1,
        duration: 1800,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ).start();
  }, [fadeAnim, scaleAnim, loadingAnim]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      const elapsed = Date.now() - startTime.current;
      const remaining = Math.max(0, MIN_SPLASH_MS - elapsed);
      if (remaining > 0) {
        await new Promise((resolve) => setTimeout(resolve, remaining));
      }
      navigation.replace("LoginScreen");
    }, 0);

    return () => clearTimeout(timer);
  }, [navigation]);

  const translateX = loadingAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-140, 140],
  });

  return (
    <LinearGradient
      colors={[BG, "#0f1f1a", "#1a2e26"]}
      style={styles.container}
      onLayout={hideNativeSplash}
    >
      <Animated.View
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        <View style={styles.logoWrapper}>
          <Image
            source={require("../assets/emuminIcon.jpeg")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>E-Mümin</Text>
        <Text style={styles.subtitle}>İLMİ • İMANİ • AMELİ</Text>

        <View style={styles.loader}>
          <Animated.View
            style={[styles.loaderBar, { transform: [{ translateX }] }]}
          />
        </View>
      </Animated.View>

      <Text style={styles.footer}>Dini Bilgi Asistanınız</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 32,
  },
  logoWrapper: {
    marginBottom: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
  logo: {
    width: 220,
    height: 220,
    borderRadius: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#e8d5a3",
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 12,
    letterSpacing: 3,
    marginTop: 8,
    color: "#c9a84c",
    fontWeight: "600",
  },
  loader: {
    marginTop: 48,
    width: 180,
    height: 4,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 2,
    overflow: "hidden",
  },
  loaderBar: {
    width: 70,
    height: "100%",
    backgroundColor: "#c9a84c",
    borderRadius: 2,
  },
  footer: {
    position: "absolute",
    bottom: 48,
    fontSize: 13,
    color: "rgba(255,255,255,0.45)",
    letterSpacing: 0.5,
  },
});
