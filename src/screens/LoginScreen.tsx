import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StatusBar,
  Animated,
  Easing,
  Dimensions,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path, Circle, Rect } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../types";
import { login as loginApi } from "../api/auth/login";
import { useUserStore } from "../store/userStore";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const COLORS = {
  surface: "#f8f9fa",
  onSurface: "#191c1d",
  primary: "#004532",
  primaryContainer: "#065f46",
  onPrimary: "#ffffff",
  onPrimaryContainer: "#8bd6b7",
  onSurfaceVariant: "#3f4944",
  outlineVariant: "#bec9c2",
  surfaceContainerLowest: "#ffffff",
};

const GoogleIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24">
    <Path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <Path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <Path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      fill="#FBBC05"
    />
    <Path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </Svg>
);

const GeometricOverlay = () => (
  <View style={styles.geometricOverlay} pointerEvents="none">
    <Svg
      width={SCREEN_WIDTH * 1.2}
      height={SCREEN_WIDTH * 1.2}
      viewBox="0 0 100 100"
      fill="none"
      stroke={COLORS.primary}
      strokeWidth={0.5}
    >
      <Path d="M50 0 L61.2 38.8 L100 50 L61.2 61.2 L50 100 L38.8 61.2 L0 50 L38.8 38.8 Z" />
      <Circle cx="50" cy="50" r="40" />
      <Rect x="25" y="25" width="50" height="50" transform="rotate(45 50 50)" />
    </Svg>
  </View>
);

const useEntryAnimation = (delay: number) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 800,
      delay,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();

    Animated.timing(translateY, {
      toValue: 0,
      duration: 800,
      delay,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [delay, opacity, translateY]);

  return { opacity, translateY };
};

const LoginScreen = () => {
  const insets = useSafeAreaInsets();
  const topSection = useEntryAnimation(100);
  const centerSection = useEntryAnimation(300);
  const bottomSection = useEntryAnimation(500);
  const navigation = useNavigation<NavigationProp>();

  const [email, setEmail] = useState("ismailtekin.ismtkn@gmail.com");
  const [password, setPassword] = useState("12345");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const loginToStore = useUserStore((state) => state.login);

  const handleLogin = async () => {
    // Boş alan kontrolü
    if (!email.trim() || !password.trim()) {
      Alert.alert("Uyarı", "E-posta ve şifre alanları zorunludur.");
      return;
    }

    setLoading(true);

    try {
      // 1) API'ye giriş isteği gönder
      const response = await loginApi({
        email: email.trim(),
        password: password,
      });

      // 2) Başarılıysa Zustand store'a kaydet (AsyncStorage dahil)
      await loginToStore(response);
      navigation.replace("MainTabs");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Giriş sırasında bir hata oluştu.";

      Alert.alert("Giriş Başarısız", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />

      <LinearGradient
        colors={["rgba(255,255,255,0)", "rgba(6,95,70,0.05)"]}
        style={StyleSheet.absoluteFill}
      />

      <GeometricOverlay />

      <View
        style={[
          styles.main,
          {
            paddingTop: insets.top + 48,
            paddingBottom: insets.bottom + 48,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.topSection,
            {
              opacity: topSection.opacity,
              transform: [{ translateY: topSection.translateY }],
            },
          ]}
        >
          <View style={styles.logoWrapper}>
            <View style={styles.logoBox}>
              <MaterialIcons
                name="auto-awesome"
                size={36}
                color={COLORS.onPrimaryContainer}
              />
            </View>
          </View>

          <Text style={styles.title}>E-Mümin</Text>
          <Text style={styles.subtitle}>
            İlim ve E-Mümin yolculuğunuzda yapay zeka rehberiniz.
          </Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.centerSection,
            {
              opacity: centerSection.opacity,
              transform: [{ translateY: centerSection.translateY }],
            },
          ]}
        >
          <Text style={styles.welcome}>Hoş Geldiniz</Text>

          <TextInput
            placeholder="E-posta"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            placeholderTextColor={COLORS.onSurfaceVariant}
            editable={!loading}
          />

          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Şifre"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={styles.passwordInput}
              placeholderTextColor={COLORS.onSurfaceVariant}
              editable={!loading}
            />
            <Pressable
              onPress={() => setShowPassword((prev) => !prev)}
              style={styles.eyeButton}
              disabled={loading}
            >
              <MaterialIcons
                name={showPassword ? "visibility" : "visibility-off"}
                size={22}
                color={COLORS.onSurfaceVariant}
              />
            </Pressable>
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.bottomSection,
            {
              opacity: bottomSection.opacity,
              transform: [{ translateY: bottomSection.translateY }],
            },
          ]}
        >
          <Pressable
            style={({ pressed }) => [
              styles.loginButton,
              pressed && !loading && styles.buttonPressed,
              loading && styles.buttonDisabled,
            ]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.onPrimary} />
            ) : (
              <Text style={styles.loginButtonText}>Giriş Yap</Text>
            )}
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.registerButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => {
              navigation.navigate("RegisterScreen");
            }}
          >
            <Text style={styles.registerButtonText}>Kayıt Ol</Text>
          </Pressable>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>veya</Text>
            <View style={styles.divider} />
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.googleButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <GoogleIcon />
            <Text style={styles.googleButtonText}>Google ile Giriş</Text>
          </Pressable>

          <Pressable style={styles.guestButton}>
            <Text style={styles.guestButtonText}>Misafir olarak devam et</Text>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
    overflow: "hidden",
  },
  geometricOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.03,
  },
  main: {
    flex: 1,
    maxWidth: 448,
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  topSection: {
    alignItems: "center",
  },
  logoWrapper: {
    marginBottom: 16,
  },
  logoBox: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.primaryContainer,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "12deg" }],
    shadowColor: COLORS.primaryContainer,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "600",
    color: COLORS.primary,
    marginBottom: 4,
    letterSpacing: -0.28,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.onSurfaceVariant,
    opacity: 0.8,
    textAlign: "center",
    maxWidth: 280,
  },
  centerSection: {
    alignItems: "center",
    gap: 12,
    width: "100%",
  },
  welcome: {
    fontSize: 40,
    lineHeight: 48,
    fontWeight: "700",
    color: COLORS.primaryContainer,
    letterSpacing: -0.8,
    marginBottom: 4,
  },
  input: {
    width: "100%",
    backgroundColor: COLORS.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: COLORS.onSurface,
  },
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    borderRadius: 12,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    paddingLeft: 16,
    paddingRight: 8,
    fontSize: 16,
    color: COLORS.onSurface,
  },
  eyeButton: {
    padding: 12,
  },
  bottomSection: {
    gap: 16,
  },
  loginButton: {
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: COLORS.primaryContainer,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.primaryContainer,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  loginButtonText: {
    color: COLORS.onPrimary,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "600",
  },
  registerButton: {
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: COLORS.primaryContainer,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  registerButtonText: {
    color: COLORS.primaryContainer,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "600",
  },
  buttonPressed: {
    transform: [{ scale: 0.95 }],
    opacity: 0.9,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.outlineVariant,
  },
  dividerText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    letterSpacing: 0.6,
    color: COLORS.onSurfaceVariant,
    paddingHorizontal: 8,
    textTransform: "lowercase",
  },
  googleButton: {
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  googleButtonText: {
    color: COLORS.onSurface,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
  },
  guestButton: {
    alignItems: "center",
    marginTop: 12,
  },
  guestButtonText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    letterSpacing: 0.6,
    color: COLORS.primaryContainer,
  },
});

export default LoginScreen;
