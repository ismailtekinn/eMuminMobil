import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  StatusBar,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MenuGrid from "../component/home/MenuGrid";
import PremiumBanner from "../component/home/PremiumBanner";
import DailyInspiration from "../component/home/DailyInspiration";
import {
  MENU_CARDS,
  QUICK_CHIPS,
} from "../constants/home/homeData";
import { useNavigation } from "@react-navigation/native";
import { MainTabNavigationProp } from "../../types";
import { MenuCardItem } from "../types/home/homeTypes";
import { useUserStore } from "../store/userStore";

const COLORS = {
  background: "#f3f4f5",
  primary: "#004532",
  primaryContainer: "#065f46",
  onSurface: "#191c1d",
  onSurfaceVariant: "#6f7973",
  surface: "#ffffff",
  mint: "#d4f5e4",
  orange: "#fe932c",
  outline: "#bec9c2",
  searchBorder: "#b8d4e8",
};

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<MainTabNavigationProp>();
  const user = useUserStore((state) => state.user);
  const [searchQuery, setSearchQuery] = useState("");

  const firstName = user?.fullName?.split(" ")[0] ?? "Misafir";

  const handleMenuPress = (_item: MenuCardItem) => {
    // İleride ilgili ekrana yönlendirme eklenecek
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 140 },
        ]}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        bounces
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.headerLeft}>
              <View style={styles.avatar}>
                <MaterialIcons name="person" size={28} color={COLORS.primaryContainer} />
              </View>
              <Text style={styles.appName}>E-Mümin</Text>
            </View>
            <Pressable style={styles.notificationBtn}>
              <MaterialIcons name="notifications-none" size={26} color={COLORS.primary} />
            </Pressable>
          </View>

          <Text style={styles.greeting}>Selamun Aleyküm, {firstName}</Text>
          {/* <Text style={styles.subGreeting}>Bugün senin için ne yapabilirim?</Text> */}
        </View>

        {/* AI Arama Kartı */}
        <View style={styles.searchCard}>
          <View style={styles.searchCardHeader}>
            <Text style={styles.searchCardTitle}>
              Bugün ne öğrenmek istersiniz?
            </Text>
            <View style={styles.sparkleIcon}>
              <MaterialIcons name="auto-awesome" size={22} color="#ffffff" />
            </View>
          </View>

          <View style={styles.searchInputWrapper}>
            <MaterialIcons name="search" size={22} color={COLORS.onSurfaceVariant} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Bir soru sorun veya bir konu seçin..."
              placeholderTextColor={COLORS.onSurfaceVariant}
              style={styles.searchInput}
            />
          </View>
        </View>

        {/* Hızlı Sorular */}
        <View style={styles.chipsRow}>
          {QUICK_CHIPS.map((chip, index) => (
            <Pressable
              key={chip.id}
              style={[
                styles.chip,
                index === 1 && styles.chipMint,
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  index === 1 && styles.chipTextMint,
                ]}
                numberOfLines={2}
              >
                {chip.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Günün Ayeti & Hadisi — kompakt, yatay kaydırma */}
        <DailyInspiration />
        <View style={styles.sectionHeader}>
          <MaterialIcons name="apps" size={18} color={COLORS.primaryContainer} />
          <Text style={styles.sectionTitle}>Menüler</Text>
        </View>
        <MenuGrid items={MENU_CARDS} onItemPress={handleMenuPress} compact />

        {/* Premium Banner */}
        <PremiumBanner />
      </ScrollView>

      {/* FAB */}
      <Pressable
        style={[styles.fab, { bottom: 88 + insets.bottom }]}
        onPress={() => navigation.navigate("chat")}
      >
        <MaterialIcons name="chat" size={26} color="#ffffff" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 0,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.primary,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.mint,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  appName: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.primary,
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 15,
    color: COLORS.onSurfaceVariant,
  },
  searchCard: {
    marginHorizontal: 20,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.5,
    borderColor: COLORS.searchBorder,
    borderStyle: "dashed",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  searchCardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  searchCardTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.primary,
    lineHeight: 22,
    paddingRight: 12,
  },
  sparkleIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.primaryContainer,
    alignItems: "center",
    justifyContent: "center",
  },
  searchInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f1f2",
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.onSurface,
    padding: 0,
  },
  chipsRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 12,
  },
  chip: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.outline,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 40,
  },
  chipMint: {
    backgroundColor: COLORS.mint,
    borderColor: "#8bd6b7",
    borderStyle: "solid",
  },
  chipText: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.onSurfaceVariant,
    textAlign: "center",
    lineHeight: 16,
  },
  chipTextMint: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  fab: {
    position: "absolute",
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.orange,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.orange,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
});

export default HomeScreen;
