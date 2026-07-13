import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  StatusBar,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SureCard from "../component/quran/SureCard";
import {
  FAVORITE_SURE_SIRA,
  LAST_READ,
  RECENT_SURE_SIRA,
  SURE_LIST,
  SURE_TABS,
} from "../constants/quran/sureData";
import { Sure, SureTab } from "../types/quran/sureType";

const COLORS = {
  background: "#f3f4f5",
  primary: "#004532",
  primaryContainer: "#065f46",
  onSurfaceVariant: "#6f7973",
  surface: "#ffffff",
  border: "#e1e3e4",
  mint: "#d4f5e4",
  onPrimaryMuted: "rgba(255,255,255,0.7)",
};

const KuranSureListScreen = () => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<SureTab>("list");

  const filteredList = useMemo(() => {
    let list = SURE_LIST;

    if (activeTab === "recent") {
      list = RECENT_SURE_SIRA.map((sira) =>
        SURE_LIST.find((s) => s.sira === sira),
      ).filter((s): s is Sure => !!s);
    } else if (activeTab === "favorites") {
      list = SURE_LIST.filter((s) => FAVORITE_SURE_SIRA.includes(s.sira));
    }

    if (!searchQuery.trim()) return list;

    const q = searchQuery.trim().toLowerCase();
    return list.filter(
      (s) =>
        s.sureAdi.toLowerCase().includes(q) ||
        s.sureAdiArapca.includes(searchQuery.trim()) ||
        String(s.sira) === q,
    );
  }, [activeTab, searchQuery]);

  const renderHeader = () => (
    <>
      {/* Son Okunan */}
      <View style={styles.lastReadCard}>
        <MaterialIcons
          name="menu-book"
          size={80}
          color="rgba(255,255,255,0.08)"
          style={styles.watermark}
        />
        <View style={styles.lastReadContent}>
          <View style={styles.lastReadText}>
            <Text style={styles.lastReadLabel}>SON OKUNAN</Text>
            <Text style={styles.lastReadTitle}>
              {LAST_READ.sureAdi} Suresi
            </Text>
            <Text style={styles.lastReadMeta}>
              Ayet: {LAST_READ.ayet} • Sayfa: {LAST_READ.sayfa}
            </Text>
          </View>
          <Pressable style={styles.continueBtn}>
            <Text style={styles.continueBtnText}>Devam Et</Text>
          </Pressable>
        </View>
      </View>

      {/* Tablar */}
      <View style={styles.tabs}>
        {SURE_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <Pressable
              key={tab.id}
              style={[styles.tab, isActive && styles.tabActive]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </>
  );

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

        <View style={styles.searchWrapper}>
          <MaterialIcons name="search" size={22} color={COLORS.onSurfaceVariant} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Sure, ayet veya konu ara..."
            placeholderTextColor={COLORS.onSurfaceVariant}
            style={styles.searchInput}
          />
        </View>
      </View>

      <FlatList
        data={filteredList}
        keyExtractor={(item) => String(item.sira)}
        renderItem={({ item }) => (
          <SureCard
            sure={item}
            isFavorite={FAVORITE_SURE_SIRA.includes(item.sira)}
          />
        )}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: 24 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />
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
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
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
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.primary,
    padding: 0,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  lastReadCard: {
    backgroundColor: COLORS.primaryContainer,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    overflow: "hidden",
  },
  watermark: {
    position: "absolute",
    right: -10,
    bottom: -10,
  },
  lastReadContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  lastReadText: {
    flex: 1,
  },
  lastReadLabel: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1,
    color: COLORS.mint,
    marginBottom: 6,
  },
  lastReadTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.surface,
    marginBottom: 4,
  },
  lastReadMeta: {
    fontSize: 13,
    color: COLORS.onPrimaryMuted,
  },
  continueBtn: {
    borderWidth: 1.5,
    borderColor: COLORS.mint,
    borderStyle: "dashed",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  continueBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.surface,
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#e8e9ea",
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: COLORS.surface,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  tabText: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.onSurfaceVariant,
  },
  tabTextActive: {
    color: COLORS.primary,
    fontWeight: "600",
  },
});

export default KuranSureListScreen;
