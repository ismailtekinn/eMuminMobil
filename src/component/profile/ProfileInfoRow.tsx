import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ProfileField } from "../../types/profile/profileType";

const COLORS = {
  onSurface: "#191c1d",
  onSurfaceVariant: "#6f7973",
  iconBg: "#f0f1f2",
  primaryContainer: "#065f46",
  border: "#e8eaeb",
};

interface ProfileInfoRowProps {
  field: ProfileField;
  isLast?: boolean;
}

const ProfileInfoRow = ({ field, isLast = false }: ProfileInfoRowProps) => {
  return (
    <View style={[styles.row, !isLast && styles.rowBorder]}>
      <View style={styles.iconBox}>
        <MaterialIcons
          name={field.icon}
          size={20}
          color={COLORS.primaryContainer}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>{field.label}</Text>
        <Text style={styles.value}>{field.value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    gap: 14,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.iconBg,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    marginBottom: 3,
  },
  value: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.onSurface,
  },
});

export default ProfileInfoRow;
