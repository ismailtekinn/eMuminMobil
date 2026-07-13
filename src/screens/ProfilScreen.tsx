import React, { useMemo, useState } from "react";
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
import ProfileInfoRow from "../component/profile/ProfileInfoRow";
import PremiumModal from "../component/profile/PremiumModal";
import { buildProfileDisplay } from "../constants/profile/profileData";
import { useUserStore } from "../store/userStore";

const COLORS = {
  background: "#f3f4f5",
  primary: "#004532",
  primaryContainer: "#065f46",
  onSurface: "#191c1d",
  onSurfaceVariant: "#6f7973",
  surface: "#ffffff",
  border: "#e1e3e4",
  mint: "#d4f5e4",
  gold: "#d4a017",
  goldBg: "#fff8e6",
  standardBg: "#f0f1f2",
  standardText: "#5c6560",
};

const ProfilScreen = () => {
  const insets = useSafeAreaInsets();
  const user = useUserStore((state) => state.user);
  const profile = useMemo(() => buildProfileDisplay(user), [user]);
  const [premiumModalVisible, setPremiumModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />

      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <View style={styles.avatarSmall}>
              <MaterialIcons
                name="person"
                size={24}
                color={COLORS.primaryContainer}
              />
            </View>
            <Text style={styles.appName}>E-Mümin</Text>
          </View>
          <Pressable style={styles.settingsBtn}>
            <MaterialIcons name="settings" size={24} color={COLORS.primary} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 24 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarInitial}>
              {profile.firstName.charAt(0).toUpperCase()}
            </Text>
          </View>

          <Text style={styles.fullName}>{profile.fullName}</Text>
          <Text style={styles.emailSubtitle}>{profile.email}</Text>

          <View
            style={[
              styles.membershipBadge,
              profile.isPremium
                ? styles.membershipPremium
                : styles.membershipStandard,
            ]}
          >
            <MaterialIcons
              name={profile.isPremium ? "workspace-premium" : "person"}
              size={16}
              color={profile.isPremium ? COLORS.gold : COLORS.standardText}
            />
            <Text
              style={[
                styles.membershipText,
                profile.isPremium
                  ? styles.membershipTextPremium
                  : styles.membershipTextStandard,
              ]}
            >
              {profile.membershipLabel}
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Kişisel Bilgiler</Text>
        </View>

        <View style={styles.infoCard}>
          {profile.fields.map((field, index) => (
            <ProfileInfoRow
              key={field.id}
              field={field}
              isLast={index === profile.fields.length - 1}
            />
          ))}
        </View>

        {!profile.isPremium && (
          <Pressable
            style={styles.upgradeCard}
            onPress={() => setPremiumModalVisible(true)}
          >
            <View style={styles.upgradeIcon}>
              <MaterialIcons
                name="workspace-premium"
                size={28}
                color={COLORS.primaryContainer}
              />
            </View>
            <View style={styles.upgradeText}>
              <Text style={styles.upgradeTitle}>Premium'a Yükselt</Text>
              <Text style={styles.upgradeDesc}>
                Sınırsız soru ve gelişmiş özellikler için üyeliğinizi yükseltin.
              </Text>
            </View>
            <MaterialIcons
              name="chevron-right"
              size={24}
              color={COLORS.onSurfaceVariant}
            />
          </Pressable>
        )}

        {profile.isPremium && user?.membershipEndDate && (
          <View style={styles.premiumInfoCard}>
            <MaterialIcons name="verified" size={22} color={COLORS.gold} />
            <View style={styles.premiumInfoText}>
              <Text style={styles.premiumInfoTitle}>Premium Aktif</Text>
              <Text style={styles.premiumInfoDesc}>
                Üyelik bitiş:{" "}
                {new Date(user.membershipEndDate).toLocaleDateString("tr-TR")}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      <PremiumModal
        visible={premiumModalVisible}
        onClose={() => setPremiumModalVisible(false)}
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
  avatarSmall: {
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
  settingsBtn: {
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
    paddingTop: 20,
  },
  heroCard: {
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
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.mint,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  avatarInitial: {
    fontSize: 32,
    fontWeight: "700",
    color: COLORS.primaryContainer,
  },
  fullName: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 4,
    textAlign: "center",
  },
  emailSubtitle: {
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
    marginBottom: 14,
  },
  membershipBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  membershipPremium: {
    backgroundColor: COLORS.goldBg,
  },
  membershipStandard: {
    backgroundColor: COLORS.standardBg,
  },
  membershipText: {
    fontSize: 13,
    fontWeight: "700",
  },
  membershipTextPremium: {
    color: COLORS.gold,
  },
  membershipTextStandard: {
    color: COLORS.standardText,
  },
  sectionHeader: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.primary,
  },
  infoCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  upgradeCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  upgradeIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: COLORS.mint,
    alignItems: "center",
    justifyContent: "center",
  },
  upgradeText: {
    flex: 1,
  },
  upgradeTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 4,
  },
  upgradeDesc: {
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.onSurfaceVariant,
  },
  premiumInfoCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: COLORS.goldBg,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#f0e0b0",
  },
  premiumInfoText: {
    flex: 1,
  },
  premiumInfoTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 2,
  },
  premiumInfoDesc: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
  },
});

export default ProfilScreen;
