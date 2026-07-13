import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ChatBubble from "../component/chat/ChatBubble";
import { CHAT_DATE_LABEL, INITIAL_MESSAGES } from "../constants/chat/chatData";
import { ChatMessage } from "../types/chat/chatTypes";

const COLORS = {
  background: "#f3f4f5",
  primary: "#004532",
  primaryContainer: "#065f46",
  onSurfaceVariant: "#6f7973",
  surface: "#ffffff",
  border: "#e7e8e9",
  mint: "#d4f5e4",
  inputBg: "#f0f1f2",
};

const ChatScreen = () => {
  const insets = useSafeAreaInsets();
  const [messages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <View style={styles.avatar}>
              <MaterialIcons name="smart-toy" size={24} color={COLORS.primaryContainer} />
            </View>
            <Text style={styles.appName}>E-Mümin</Text>
          </View>
          <Pressable style={styles.notificationBtn}>
            <MaterialIcons name="notifications-none" size={26} color={COLORS.primary} />
          </Pressable>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={0}
      >
        {/* Mesajlar */}
        <ScrollView
          style={styles.messages}
          contentContainerStyle={[
            styles.messagesContent,
            { paddingBottom: 16 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.dateLabel}>{CHAT_DATE_LABEL}</Text>

          {messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}
        </ScrollView>

        {/* Mesaj girişi */}
        <View style={[styles.inputBar, { paddingBottom: Math.max(insets.bottom, 8) }]}>
          <View style={styles.inputWrapper}>
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder="Bir mesaj yazın..."
              placeholderTextColor={COLORS.onSurfaceVariant}
              style={styles.input}
              multiline
            />
            <Pressable style={styles.sendBtn}>
              <MaterialIcons name="send" size={20} color="#ffffff" />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  flex: {
    flex: 1,
  },
  header: {
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingHorizontal: 20,
    paddingBottom: 12,
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
  messages: {
    flex: 1,
  },
  messagesContent: {
    paddingTop: 16,
  },
  dateLabel: {
    textAlign: "center",
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    marginBottom: 16,
  },
  inputBar: {
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: COLORS.inputBg,
    borderRadius: 24,
    paddingLeft: 16,
    paddingRight: 6,
    paddingVertical: 6,
    gap: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: COLORS.primary,
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryContainer,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ChatScreen;
