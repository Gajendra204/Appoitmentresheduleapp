import { View, Text, StyleSheet, SafeAreaView } from "react-native"
import { useLocalSearchParams, router } from "expo-router"
import { MaterialIcons } from "@expo/vector-icons"
import { Button } from "../../components/Button"
import { COLORS, TYPOGRAPHY, SPACING } from "../../constants/theme"

export default function AppointmentCancelledScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()

  const handleGotIt = () => {
    router.dismissAll()
    router.replace("/(tabs)")
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.walletIcon}>
            <MaterialIcons name="account-balance-wallet" size={60} color={COLORS.primary} />
          </View>
        </View>

        {/* Success Message */}
        <View style={styles.messageContainer}>
          <Text style={styles.title}>Appointment cancelled</Text>
          <Text style={styles.subtitle}>A refund will be initiated to your wallet within 5 few days.</Text>
          <Text style={styles.thankYou}>Thank you for your patience!</Text>
        </View>

        {/* Got It Button */}
        <View style={styles.buttonContainer}>
          <Button title="Got it" onPress={handleGotIt} style={styles.gotItButton} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: SPACING.xl,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: SPACING.xl,
  },
  walletIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  messageContainer: {
    alignItems: "center",
    marginBottom: SPACING.xl,
  },
  title: {
    ...TYPOGRAPHY.h1,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
    textAlign: "center",
  },
  subtitle: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text.secondary,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: SPACING.sm,
  },
  thankYou: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text.secondary,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
  },
  gotItButton: {
    width: "100%",
  },
})
