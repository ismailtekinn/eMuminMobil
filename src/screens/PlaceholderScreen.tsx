import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { MainTabParamList } from "../../types";

type PlaceholderRouteProp = RouteProp<
  MainTabParamList,
  "quran" | "prayer" | "profile"
>;

const PlaceholderScreen = () => {
  const route = useRoute<PlaceholderRouteProp>();
  const title = route.params?.title ?? "Yakında";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>Bu bölüm yakında eklenecek.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f4f5",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#004532",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#6f7973",
    textAlign: "center",
  },
});

export default PlaceholderScreen;
