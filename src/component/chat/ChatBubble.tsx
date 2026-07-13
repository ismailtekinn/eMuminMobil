import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ChatMessage } from "../../types/chat/chatTypes";

const COLORS = {
  primary: "#004532",
  primaryContainer: "#065f46",
  onSurface: "#191c1d",
  surface: "#ffffff",
  border: "#e1e3e4",
  onSurfaceVariant: "#6f7973",
  sourceText: "#3f4944",
};

interface ChatBubbleProps {
  message: ChatMessage;
}

const ChatBubble = ({ message }: ChatBubbleProps) => {
  const isUser = message.role === "user";

  return (
    <View style={[styles.row, isUser ? styles.rowUser : styles.rowAssistant]}>
      <View
        style={[
          styles.bubble,
          isUser ? styles.bubbleUser : styles.bubbleAssistant,
        ]}
      >
        <Text style={[styles.text, isUser && styles.textUser]}>
          {message.text}
        </Text>

        {message.sources && message.sources.length > 0 && (
          <View style={styles.sourcesBlock}>
            <Text style={styles.sourcesTitle}>Kaynaklar:</Text>
            {message.sources.map((source) => (
              <Text key={source} style={styles.sourceItem}>
                • {source}
              </Text>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  rowUser: {
    alignItems: "flex-end",
  },
  rowAssistant: {
    alignItems: "flex-start",
  },
  bubble: {
    maxWidth: "85%",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  bubbleUser: {
    backgroundColor: COLORS.primaryContainer,
    borderBottomRightRadius: 4,
  },
  bubbleAssistant: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderBottomLeftRadius: 4,
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.onSurface,
  },
  textUser: {
    color: COLORS.surface,
  },
  sourcesBlock: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  sourcesTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.primary,
    marginBottom: 4,
  },
  sourceItem: {
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.sourceText,
  },
});

export default ChatBubble;
