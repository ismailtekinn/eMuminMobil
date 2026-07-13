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
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path, Circle, Rect } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../types";
import { register as registerApi } from "../api/auth/register";

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
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 800,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [delay, opacity, translateY]);

  return { opacity, translateY };
};

const RegisterScreen = () => {
  const insets = useSafeAreaInsets();
  const top = useEntryAnimation(100);
  const center = useEntryAnimation(250);
  const bottom = useEntryAnimation(400);
  const navigation = useNavigation<NavigationProp>();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Uyarı", "Ad soyad, e-posta ve şifre alanları zorunludur.");
      return;
    }

    if (password !== password2) {
      Alert.alert("Uyarı", "Şifreler eşleşmiyor.");
      return;
    }

    setLoading(true);

    try {
      await registerApi({
        fullName: fullName.trim(),
        email: email.trim(),
        password: password,
      });

      navigation.replace("LoginScreen");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Kayıt sırasında bir hata oluştu.";

      Alert.alert("Kayıt Başarısız", message);
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

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={[
            styles.main,
            {
              paddingTop: insets.top + 48,
              paddingBottom: insets.bottom + 48,
            },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[
              styles.topSection,
              { opacity: top.opacity, transform: [{ translateY: top.translateY }] },
            ]}
          >
            <View style={styles.logoBox}>
              <MaterialIcons
                name="person-add"
                size={36}
                color={COLORS.onPrimaryContainer}
              />
            </View>

            <Text style={styles.title}>E-Mümin</Text>
            <Text style={styles.subtitle}>İlme adım at, E-Müminle yol al.</Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.centerSection,
              {
                opacity: center.opacity,
                transform: [{ translateY: center.translateY }],
              },
            ]}
          >
            <Text style={styles.welcome}>Kayıt Ol</Text>

            <TextInput
              placeholder="Ad Soyad"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
              style={styles.input}
              placeholderTextColor={COLORS.onSurfaceVariant}
              editable={!loading}
            />

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

            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Şifre Tekrar"
                value={password2}
                onChangeText={setPassword2}
                secureTextEntry={!showPassword2}
                style={styles.passwordInput}
                placeholderTextColor={COLORS.onSurfaceVariant}
                editable={!loading}
              />
              <Pressable
                onPress={() => setShowPassword2((prev) => !prev)}
                style={styles.eyeButton}
                disabled={loading}
              >
                <MaterialIcons
                  name={showPassword2 ? "visibility" : "visibility-off"}
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
                opacity: bottom.opacity,
                transform: [{ translateY: bottom.translateY }],
              },
            ]}
          >
            <Pressable
              style={({ pressed }) => [
                styles.loginButton,
                pressed && !loading && styles.buttonPressed,
                loading && styles.buttonDisabled,
              ]}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.onPrimary} />
              ) : (
                <Text style={styles.loginButtonText}>Hesap Oluştur</Text>
              )}
            </Pressable>

            <Pressable
              style={styles.guestButton}
              onPress={() => navigation.navigate("LoginScreen")}
              disabled={loading}
            >
              <Text style={styles.guestButtonText}>
                Zaten hesabın var mı? Giriş Yap
              </Text>
            </Pressable>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  keyboardView: {
    flex: 1,
  },
  geometricOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.03,
  },
  main: {
    flexGrow: 1,
    maxWidth: 448,
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    gap: 24,
  },
  topSection: {
    alignItems: "center",
  },
  logoBox: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.primaryContainer,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.onSurfaceVariant,
    textAlign: "center",
  },
  centerSection: {
    gap: 12,
  },
  welcome: {
    fontSize: 32,
    fontWeight: "700",
    color: COLORS.primaryContainer,
    textAlign: "center",
    marginBottom: 8,
  },
  input: {
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
    backgroundColor: COLORS.primaryContainer,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  loginButtonText: {
    color: COLORS.onPrimary,
    fontSize: 18,
    fontWeight: "600",
  },
  buttonPressed: {
    transform: [{ scale: 0.95 }],
    opacity: 0.9,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  guestButton: {
    alignItems: "center",
  },
  guestButtonText: {
    fontSize: 14,
    color: COLORS.primaryContainer,
    fontWeight: "600",
  },
});

export default RegisterScreen;
