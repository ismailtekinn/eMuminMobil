import React from "react";
import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MenuCardItem } from "../../types/home/homeTypes";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const HORIZONTAL_PADDING = 20;
const GAP = 12;
const CARD_WIDTH = (SCREEN_WIDTH - HORIZONTAL_PADDING * 2 - GAP) / 2;

const COLORS = {
  primary: "#004532",
  surface: "#ffffff",
  border: "#e7e8e9",
};

interface MenuGridProps {
  items: MenuCardItem[];
  onItemPress?: (item: MenuCardItem) => void;
  compact?: boolean;
}

const MenuGrid = ({ items, onItemPress, compact = false }: MenuGridProps) => {
  return (
    <View style={styles.grid}>
      {items.map((item) => (
        <Pressable
          key={item.id}
          style={[
            styles.card,
            compact && styles.cardCompact,
            item.featured && styles.cardFeatured,
          ]}
          onPress={() => onItemPress?.(item)}
        >
          <View
            style={[
              styles.iconRing,
              compact && styles.iconRingCompact,
              {
                borderColor: item.borderColor,
                backgroundColor: item.featured ? item.iconBgColor : "#ffffff",
              },
            ]}
          >
            <View
              style={[
                styles.iconCircle,
                compact && styles.iconCircleCompact,
                { backgroundColor: item.iconBgColor },
              ]}
            >
              <MaterialIcons
                name={item.icon}
                size={compact ? 22 : 28}
                color={item.iconColor}
              />
            </View>
          </View>
          <Text style={[styles.cardLabel, compact && styles.cardLabelCompact]}>
            {item.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: GAP,
    paddingHorizontal: HORIZONTAL_PADDING,
    marginBottom: 8,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardCompact: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 14,
  },
  cardFeatured: {
    backgroundColor: "#e6f4ef",
    borderColor: "#b8e6d0",
  },
  iconRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  iconRingCompact: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginBottom: 8,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircleCompact: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary,
    textAlign: "center",
  },
  cardLabelCompact: {
    fontSize: 12,
    lineHeight: 16,
  },
});

export default MenuGrid;
