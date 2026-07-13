import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Svg, { Path, Circle, Rect } from "react-native-svg";

const COLORS = {
  primaryContainer: "#065f46",
  onPrimary: "#ffffff",
  onPrimaryMuted: "rgba(255,255,255,0.75)",
};

const GeometricPattern = () => (
  <View style={styles.pattern} pointerEvents="none">
    <Svg width={180} height={180} viewBox="0 0 100 100" opacity={0.12}>
      <Path
        d="M50 0 L61.2 38.8 L100 50 L61.2 61.2 L50 100 L38.8 61.2 L0 50 L38.8 38.8 Z"
        fill="none"
        stroke="#ffffff"
        strokeWidth={0.5}
      />
      <Circle cx="50" cy="50" r="40" fill="none" stroke="#ffffff" strokeWidth={0.5} />
      <Rect
        x="25"
        y="25"
        width="50"
        height="50"
        fill="none"
        stroke="#ffffff"
        strokeWidth={0.5}
        transform="rotate(45 50 50)"
      />
    </Svg>
  </View>
);

interface PremiumBannerProps {
  onPress?: () => void;
}

const PremiumBanner = ({ onPress }: PremiumBannerProps) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <GeometricPattern />

      <View style={styles.content}>
        <View style={styles.textBlock}>
          <Text style={styles.title}>E-Mümin Premium</Text>
          <Text style={styles.description}>
            Sınırsız soru ve derinlemesine analiz için yükseltin.
          </Text>
        </View>

        <View style={styles.arrowCircle}>
          <MaterialIcons name="arrow-forward" size={22} color={COLORS.primaryContainer} />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
    backgroundColor: COLORS.primaryContainer,
    borderRadius: 20,
    overflow: "hidden",
    minHeight: 110,
    justifyContent: "center",
    shadowColor: COLORS.primaryContainer,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  pattern: {
    position: "absolute",
    right: -20,
    top: -20,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
  textBlock: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.onPrimary,
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.onPrimaryMuted,
  },
  arrowCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.onPrimary,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PremiumBanner;
