import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  PREMIUM_FEATURES,
  SUBSCRIPTION_PLANS,
  SubscriptionPlanId,
} from "../../constants/profile/premiumData";

const COLORS = {
  primary: "#004532",
  primaryDark: "#124e34",
  primaryContainer: "#065f46",
  onSurface: "#191c1d",
  onSurfaceVariant: "#6f7973",
  surface: "#ffffff",
  mint: "#d4f5e4",
  mintSelected: "#c8e6c9",
  border: "#e1e3e4",
  planBorder: "#bec9c2",
  brown: "#8b4513",
  brownDark: "#6d3610",
  gold: "#d4a017",
};

interface PremiumModalProps {
  visible: boolean;
  onClose: () => void;
  onSubscribe?: (planId: SubscriptionPlanId) => void;
}

const PremiumModal = ({ visible, onClose, onSubscribe }: PremiumModalProps) => {
  const insets = useSafeAreaInsets();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlanId>("monthly");

  const handleSubscribe = () => {
    onSubscribe?.(selectedPlan);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
        <View style={styles.topBar}>
          <Pressable style={styles.closeBtn} onPress={onClose} hitSlop={8}>
            <MaterialIcons name="close" size={24} color={COLORS.onSurface} />
          </Pressable>
          <Text style={styles.topTitle}>E-Mümin Pro</Text>
          <View style={styles.closeBtn} />
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + 24 },
          ]}
          showsVerticalScrollIndicator
          bounces
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled
        >
          <View style={styles.heroIcon}>
            <MaterialIcons
              name="workspace-premium"
              size={36}
              color={COLORS.primaryContainer}
            />
          </View>

          <Text style={styles.headline}>
            E-Mümin Pro ile Sınırları Kaldırın
          </Text>
          <Text style={styles.subheadline}>
            Ruhsal yolculuğunuzda derinleşmek için ihtiyacınız olan her şey.
          </Text>

          <View style={styles.featuresCard}>
            {PREMIUM_FEATURES.map((feature, index) => (
              <View
                key={feature.id}
                style={[
                  styles.featureRow,
                  index < PREMIUM_FEATURES.length - 1 && styles.featureRowBorder,
                ]}
              >
                <View style={styles.checkCircle}>
                  <MaterialIcons name="check" size={16} color={COLORS.surface} />
                </View>
                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDesc}>{feature.description}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.plans}>
            {SUBSCRIPTION_PLANS.map((plan) => {
              const isSelected = selectedPlan === plan.id;
              return (
                <Pressable
                  key={plan.id}
                  style={[
                    styles.planCard,
                    isSelected ? styles.planCardSelected : styles.planCardDefault,
                  ]}
                  onPress={() => setSelectedPlan(plan.id)}
                >
                  {plan.badge && (
                    <View style={styles.savingsBadge}>
                      <Text style={styles.savingsBadgeText}>{plan.badge}</Text>
                    </View>
                  )}
                  <View style={styles.planContent}>
                    <View style={styles.planLeft}>
                      <Text
                        style={[
                          styles.planLabel,
                          isSelected && styles.planLabelSelected,
                        ]}
                      >
                        {plan.label}
                      </Text>
                      <Text style={styles.planSubtitle}>{plan.subtitle}</Text>
                    </View>
                    <Text
                      style={[
                        styles.planPrice,
                        isSelected && styles.planPriceSelected,
                      ]}
                    >
                      {plan.price}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>

          <LinearGradient
            colors={[COLORS.primaryDark, COLORS.primaryContainer]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.promoBanner}
          >
            <MaterialIcons
              name="auto-awesome"
              size={48}
              color="rgba(255,255,255,0.15)"
              style={styles.promoWatermark}
            />
            <Text style={styles.promoText}>
              10.000+ Müslüman E-Mümin Pro'yu tercih etti.
            </Text>
          </LinearGradient>

          <Pressable style={styles.subscribeBtn} onPress={handleSubscribe}>
            <Text style={styles.subscribeBtnText}>Şimdi Abone Ol</Text>
            <MaterialIcons name="arrow-forward" size={20} color={COLORS.surface} />
          </Pressable>

          <Text style={styles.footerNote}>
            7 GÜN ÜCRETSİZ DENE • GÜVENLİ ÖDEME
          </Text>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  closeBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  topTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.primary,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flexGrow: 0,
  },
  heroIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.mint,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 16,
  },
  headline: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.primary,
    textAlign: "center",
    lineHeight: 30,
    marginBottom: 8,
  },
  subheadline: {
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.onSurfaceVariant,
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  featuresCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    paddingVertical: 12,
  },
  featureRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primaryContainer,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.onSurface,
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.onSurfaceVariant,
  },
  plans: {
    gap: 12,
    marginBottom: 16,
    paddingTop: 4,
  },
  planCard: {
    borderRadius: 14,
    padding: 16,
    borderWidth: 2,
    marginTop: 4,
  },
  planCardSelected: {
    backgroundColor: COLORS.mintSelected,
    borderColor: COLORS.primaryContainer,
  },
  planCardDefault: {
    backgroundColor: "#f8f9fa",
    borderColor: COLORS.planBorder,
  },
  savingsBadge: {
    position: "absolute",
    top: -10,
    right: 16,
    backgroundColor: COLORS.brown,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    zIndex: 1,
  },
  savingsBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.surface,
    letterSpacing: 0.3,
  },
  planContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  planLeft: {
    flex: 1,
  },
  planLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.onSurface,
    marginBottom: 4,
  },
  planLabelSelected: {
    color: COLORS.primary,
  },
  planSubtitle: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
  },
  planPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.onSurface,
  },
  planPriceSelected: {
    color: COLORS.primary,
  },
  promoBanner: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    overflow: "hidden",
    minHeight: 80,
    justifyContent: "center",
  },
  promoWatermark: {
    position: "absolute",
    right: 12,
    top: 12,
  },
  promoText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.surface,
    lineHeight: 20,
    maxWidth: "80%",
  },
  subscribeBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: COLORS.brown,
    borderRadius: 15,
    paddingVertical: 16,
    marginBottom: 12,
    shadowColor: COLORS.brownDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  subscribeBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.surface,
  },
  footerNote: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.onSurfaceVariant,
    textAlign: "center",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
});

export default PremiumModal;
