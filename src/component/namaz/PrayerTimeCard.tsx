import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { PrayerTime } from "../../types/namaz/namazType";

const COLORS = {
  primary: "#004532",
  primaryContainer: "#065f46",
  onSurface: "#191c1d",
  onSurfaceVariant: "#6f7973",
  surface: "#ffffff",
  iconBg: "#f0f1f2",
  active: "#fe932c",
};

interface PrayerTimeCardProps {
  prayer: PrayerTime;
  isActive?: boolean;
  onPress?: (prayer: PrayerTime) => void;
}

const PrayerTimeCard = ({ prayer, isActive = false, onPress }: PrayerTimeCardProps) => {
  return (
    <Pressable
      style={[styles.card, isActive && styles.cardActive]}
      onPress={() => onPress?.(prayer)}
    >
      <View style={[styles.iconBox, isActive && styles.iconBoxActive]}>
        <MaterialIcons
          name={prayer.icon}
          size={22}
          color={isActive ? COLORS.surface : COLORS.onSurfaceVariant}
        />
      </View>

      <View style={styles.info}>
        <Text style={[styles.name, isActive && styles.textActive]}>
          {prayer.name}
        </Text>
        <Text style={[styles.subtitle, isActive && styles.subtitleActive]}>
          {prayer.subtitle}
        </Text>
      </View>

      <View style={styles.timeBlock}>
        <Text style={[styles.time, isActive && styles.textActive]}>
          {prayer.time}
        </Text>
        {isActive && (
          <View style={styles.activeBadge}>
            <Text style={styles.activeBadgeText}>AKTİF</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardActive: {
    backgroundColor: COLORS.primaryContainer,
    shadowColor: COLORS.primaryContainer,
    shadowOpacity: 0.2,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.iconBg,
    alignItems: "center",
    justifyContent: "center",
  },
  iconBoxActive: {
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.onSurface,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
  },
  subtitleActive: {
    color: "rgba(255,255,255,0.75)",
  },
  textActive: {
    color: COLORS.surface,
  },
  timeBlock: {
    alignItems: "flex-end",
  },
  time: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.onSurface,
  },
  activeBadge: {
    marginTop: 4,
    backgroundColor: COLORS.active,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  activeBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.surface,
    letterSpacing: 0.5,
  },
});

export default PrayerTimeCard;
