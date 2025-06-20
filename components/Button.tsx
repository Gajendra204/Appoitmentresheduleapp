import type React from "react"
import { TouchableOpacity, Text, StyleSheet, type ViewStyle, type TextStyle, ActivityIndicator } from "react-native"
import { COLORS, TYPOGRAPHY, BORDER_RADIUS, SPACING } from "../constants/theme"

interface ButtonProps {
  title: string
  onPress: () => void
  variant?: "primary" | "secondary" | "outline"
  size?: "small" | "medium" | "large"
  disabled?: boolean
  loading?: boolean
  style?: ViewStyle
  textStyle?: TextStyle
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const buttonStyle = [styles.base, styles[variant], styles[size], disabled && styles.disabled, style]

  const buttonTextStyle = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ]

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress} disabled={disabled || loading} activeOpacity={0.8}>
      {loading ? (
        <ActivityIndicator color={variant === "primary" ? COLORS.surface : COLORS.primary} size="small" />
      ) : (
        <Text style={buttonTextStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  base: {
    borderRadius: BORDER_RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  small: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    minHeight: 32,
  },
  medium: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    minHeight: 44,
  },
  large: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
    minHeight: 52,
  },
  disabled: {
    backgroundColor: COLORS.text.disabled,
  },
  text: {
    textAlign: "center",
    ...TYPOGRAPHY.button,
  },
  primaryText: {
    color: COLORS.surface,
  },
  secondaryText: {
    color: COLORS.text.primary,
  },
  outlineText: {
    color: COLORS.primary,
  },
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 16,
  },
  disabledText: {
    color: COLORS.surface,
  },
})
