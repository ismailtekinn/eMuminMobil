import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { DAILY_CONTENT } from "../../constants/home/dailyContentData";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const H_PADDING = 20;
const CARD_GAP = 12;
const CARD_WIDTH = SCREEN_WIDTH - H_PADDING * 2;

const COLORS = {
  primary: "#004532",
  primaryContainer: "#065f46",
  primaryDark: "#124e34",
  onSurface: "#191c1d",
  onSurfaceVariant: "#6f7973",
  surface: "#ffffff",
  mint: "#d4f5e4",
  gold: "#d4a017",
  border: "#e1e3e4",
};

const DailyInspiration = () => {
  const { verse, hadith } = DAILY_CONTENT;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / (CARD_WIDTH + CARD_GAP));
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <MaterialIcons name="auto-awesome" size={16} color={COLORS.gold} />
        <Text style={styles.sectionTitle}>Günün İlhamı</Text>
        <View style={styles.dots}>
          {[0, 1].map((i) => (
            <View
              key={i}
              style={[styles.dot, activeIndex === i && styles.dotActive]}
            />
          ))}
        </View>
      </View>

      <ScrollView
        horizontal
        pagingEnabled={false}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + CARD_GAP}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.carousel}
      >
        <LinearGradient
          colors={[COLORS.primaryDark, COLORS.primaryContainer]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.card, styles.verseCard]}
        >
          <View style={styles.cardTop}>
            <View style={styles.badgeLight}>
              <MaterialIcons name="star" size={11} color={COLORS.gold} />
              <Text style={styles.badgeLightText}>Günün Ayeti</Text>
            </View>
            <MaterialIcons
              name="menu-book"
              size={36}
              color="rgba(255,255,255,0.12)"
            />
          </View>

          {verse.arabic && (
            <Text style={styles.arabicText} numberOfLines={1}>
              {verse.arabic}
            </Text>
          )}
          <Text style={styles.verseText} numberOfLines={2}>
            {verse.text}
          </Text>
          <Text style={styles.verseSource}>{verse.source}</Text>
        </LinearGradient>

        <View style={[styles.card, styles.hadithCard]}>
          <View style={styles.hadithAccent} />
          <View style={styles.hadithInner}>
            <View style={styles.cardTop}>
              <View style={styles.badgeMint}>
                <MaterialIcons
                  name="auto-stories"
                  size={11}
                  color={COLORS.primaryContainer}
                />
                <Text style={styles.badgeMintText}>Günün Hadisi</Text>
              </View>
            </View>
            <Text style={styles.hadithText} numberOfLines={3}>
              {hadith.text}
            </Text>
            <Text style={styles.hadithSource}>{hadith.source}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: H_PADDING,
    marginBottom: 10,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.primary,
  },
  dots: {
    flexDirection: "row",
    gap: 5,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.border,
  },
  dotActive: {
    backgroundColor: COLORS.primaryContainer,
    width: 16,
  },
  carousel: {
    paddingHorizontal: H_PADDING,
    gap: CARD_GAP,
  },
  card: {
    width: CARD_WIDTH,
    height: 148,
    borderRadius: 16,
    overflow: "hidden",
  },
  verseCard: {
    padding: 14,
    shadowColor: COLORS.primaryContainer,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  badgeLight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeLightText: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.surface,
    letterSpacing: 0.3,
  },
  badgeMint: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: COLORS.mint,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeMintText: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.primaryContainer,
    letterSpacing: 0.3,
  },
  arabicText: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.surface,
    textAlign: "right",
    marginBottom: 4,
  },
  verseText: {
    fontSize: 12,
    lineHeight: 18,
    color: "rgba(255,255,255,0.92)",
    fontStyle: "italic",
    marginBottom: 6,
  },
  verseSource: {
    fontSize: 10,
    fontWeight: "600",
    color: COLORS.mint,
  },
  hadithCard: {
    flexDirection: "row",
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  hadithAccent: {
    width: 4,
    backgroundColor: COLORS.primaryContainer,
  },
  hadithInner: {
    flex: 1,
    padding: 14,
  },
  hadithText: {
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.onSurface,
    marginBottom: 6,
  },
  hadithSource: {
    fontSize: 10,
    fontWeight: "600",
    color: COLORS.primaryContainer,
  },
});

export default DailyInspiration;
