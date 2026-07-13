import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomNavItem } from "../../types/home/homeTypes";

const COLORS = {
  primary: "#004532",
  primaryContainer: "#065f46",
  onSurfaceVariant: "#6f7973",
  surface: "#ffffff",
  border: "#e7e8e9",
};

interface BottomNavProps {
  items: BottomNavItem[];
  activeId: string;
  onTabPress: (id: string) => void;
}

const BottomNav = ({ items, activeId, onTabPress }: BottomNavProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {items.map((item) => {
        const isActive = item.id === activeId;

        return (
          <Pressable
            key={item.id}
            style={[styles.tab, isActive && styles.tabActive]}
            onPress={() => onTabPress(item.id)}
          >
            <MaterialIcons
              name={item.icon}
              size={22}
              color={isActive ? COLORS.surface : COLORS.onSurfaceVariant}
            />
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 10,
    paddingHorizontal: 8,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 20,
    gap: 4,
  },
  tabActive: {
    backgroundColor: COLORS.primaryContainer,
  },
  label: {
    fontSize: 11,
    fontWeight: "500",
    color: COLORS.onSurfaceVariant,
  },
  labelActive: {
    color: COLORS.surface,
    fontWeight: "600",
  },
});

export default BottomNav;
