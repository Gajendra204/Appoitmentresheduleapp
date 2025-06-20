import { View, Text, StyleSheet } from "react-native"
import { Link, Stack } from "expo-router"
import { COLORS, TYPOGRAPHY, SPACING } from "../constants/theme"

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <Text style={styles.title}>This screen doesn't exist.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.lg,
    backgroundColor: COLORS.background,
  },
  title: {
    ...TYPOGRAPHY.h1,
    color: COLORS.text.primary,
    marginBottom: SPACING.lg,
  },
  link: {
    marginTop: SPACING.md,
    paddingVertical: SPACING.md,
  },
  linkText: {
    ...TYPOGRAPHY.body1,
    color: COLORS.primary,
    fontWeight: "600",
  },
})
