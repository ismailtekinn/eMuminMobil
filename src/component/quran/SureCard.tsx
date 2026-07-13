import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Sure } from "../../types/quran/sureType";

const COLORS = {
  primary: "#004532",
  onSurface: "#191c1d",
  onSurfaceVariant: "#6f7973",
  surface: "#ffffff",
  border: "#e1e3e4",
  indexBg: "#f0f1f2",
  gold: "#c9a84c",
};

interface SureCardProps {
  sure: Sure;
  isFavorite?: boolean;
  onPress?: (sure: Sure) => void;
}

const SureCard = ({ sure, isFavorite = false, onPress }: SureCardProps) => {
  return (
    <Pressable
      style={styles.card}
      onPress={() => onPress?.(sure)}
    >
      <View style={styles.indexCircle}>
        <Text style={styles.indexText}>{sure.sira}</Text>
      </View>

      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text style={styles.sureAdi}>{sure.sureAdi} Suresi</Text>
          {isFavorite && (
            <MaterialIcons name="star" size={16} color={COLORS.gold} />
          )}
        </View>
        <Text style={styles.meta}>{sure.ayetSayisi} Ayet</Text>
      </View>

      <Text style={styles.arabic}>{sure.sureAdiArapca}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 10,
    gap: 12,
  },
  indexCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.indexBg,
    alignItems: "center",
    justifyContent: "center",
  },
  indexText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.onSurfaceVariant,
  },
  info: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 2,
  },
  sureAdi: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.onSurface,
  },
  meta: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
  },
  arabic: {
    fontSize: 20,
    fontWeight: "500",
    color: COLORS.primary,
    maxWidth: 80,
    textAlign: "right",
  },
});

export default SureCard;
