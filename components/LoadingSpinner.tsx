import type React from "react"
import { View, ActivityIndicator, Text, StyleSheet } from "react-native"
import { COLORS, TYPOGRAPHY, SPACING } from "../constants/theme"

interface LoadingSpinnerProps {
  message?: string
  size?: "small" | "large"
  color?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Loading...",
  size = "large",
  color = COLORS.primary,
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.xl,
  },
  message: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text.secondary,
    marginTop: SPACING.md,
    textAlign: "center",
  },
})
