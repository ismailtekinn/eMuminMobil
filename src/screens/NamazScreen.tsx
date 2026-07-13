import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PrayerTimeCard from "../component/namaz/PrayerTimeCard";
import {
  ACTIVE_PRAYER_ID,
  NEXT_PRAYER,
  PRAYER_DATE,
  PRAYER_TIMES,
} from "../constants/namaz/namazData";

const COLORS = {
  background: "#f3f4f5",
  primary: "#004532",
  primaryContainer: "#065f46",
  onSurfaceVariant: "#6f7973",
  surface: "#ffffff",
  border: "#e1e3e4",
  mint: "#d4f5e4",
  timer: "#8d6e63",
  locationBg: "#f0f1f2",
};

const NamazScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <View style={styles.avatar}>
              <MaterialIcons name="person" size={24} color={COLORS.primaryContainer} />
            </View>
            <Text style={styles.appName}>E-Mümin</Text>
          </View>
          <Pressable style={styles.notificationBtn}>
            <MaterialIcons name="notifications-none" size={26} color={COLORS.primary} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Sıradaki Ezan Kartı */}
        <View style={styles.countdownCard}>
          <Text style={styles.countdownLabel}>SIRADAKİ EZAN</Text>
          <Text style={styles.countdownPrayer}>{NEXT_PRAYER.name}</Text>
          <Text style={styles.countdownTimer}>{NEXT_PRAYER.countdown}</Text>
          <View style={styles.locationPill}>
            <MaterialIcons name="location-on" size={16} color={COLORS.onSurfaceVariant} />
            <Text style={styles.locationText}>{NEXT_PRAYER.location}</Text>
          </View>
        </View>

        {/* Tarih */}
        <View style={styles.dateRow}>
          <View>
            <Text style={styles.hijriDate}>{PRAYER_DATE.hijri}</Text>
            <Text style={styles.gregorianDate}>{PRAYER_DATE.gregorian}</Text>
          </View>
          <Pressable style={styles.calendarBtn}>
            <MaterialIcons name="calendar-today" size={22} color={COLORS.primaryContainer} />
          </Pressable>
        </View>

        {/* Namaz Vakitleri */}
        <View style={styles.prayerList}>
          {PRAYER_TIMES.map((prayer) => (
            <PrayerTimeCard
              key={prayer.id}
              prayer={prayer}
              isActive={prayer.id === ACTIVE_PRAYER_ID}
            />
          ))}
        </View>

        {/* Kıble Pusulası */}
        <Pressable style={styles.qiblaBtn}>
          <MaterialIcons name="explore" size={22} color={COLORS.surface} />
          <Text style={styles.qiblaBtnText}>Kıble Pusulası</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.mint,
    alignItems: "center",
    justifyContent: "center",
  },
  appName: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary,
  },
  notificationBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  countdownCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  countdownLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
    color: COLORS.primaryContainer,
    marginBottom: 8,
  },
  countdownPrayer: {
    fontSize: 32,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 8,
  },
  countdownTimer: {
    fontSize: 36,
    fontWeight: "700",
    color: COLORS.timer,
    letterSpacing: 2,
    marginBottom: 16,
  },
  locationPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: COLORS.locationBg,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  locationText: {
    fontSize: 13,
    color: COLORS.onSurfaceVariant,
    fontWeight: "500",
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  hijriDate: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 4,
  },
  gregorianDate: {
    fontSize: 13,
    color: COLORS.onSurfaceVariant,
  },
  calendarBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.locationBg,
    alignItems: "center",
    justifyContent: "center",
  },
  prayerList: {
    marginBottom: 20,
  },
  qiblaBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: COLORS.primaryContainer,
    borderRadius: 28,
    paddingVertical: 16,
    shadowColor: COLORS.primaryContainer,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  qiblaBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.surface,
  },
});

export default NamazScreen;
