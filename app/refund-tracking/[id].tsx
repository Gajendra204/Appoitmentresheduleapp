import React from "react"
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from "react-native"
import { useLocalSearchParams, router } from "expo-router"
import { MaterialIcons } from "@expo/vector-icons"
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from "../../constants/theme"

interface RefundStepProps {
  title: string
  subtitle: string
  isCompleted: boolean
  isActive: boolean
  isLast?: boolean
}

const RefundStep: React.FC<RefundStepProps> = ({ title, subtitle, isCompleted, isActive, isLast }) => (
  <View style={styles.stepContainer}>
    <View style={styles.stepIndicator}>
      <View style={[styles.stepCircle, isCompleted && styles.completedStep, isActive && styles.activeStep]}>
        {isCompleted && <MaterialIcons name="check" size={16} color={COLORS.surface} />}
      </View>
      {!isLast && <View style={[styles.stepLine, isCompleted && styles.completedLine]} />}
    </View>
    <View style={styles.stepContent}>
      <Text style={[styles.stepTitle, isCompleted && styles.completedStepTitle]}>{title}</Text>
      {subtitle && <Text style={styles.stepSubtitle}>{subtitle}</Text>}
    </View>
  </View>
)

export default function RefundTrackingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [refundCompleted, setRefundCompleted] = React.useState(false)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setRefundCompleted(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color={COLORS.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Refund</Text>
          <TouchableOpacity style={styles.menuButton}>
            <MaterialIcons name="more-vert" size={24} color={COLORS.text.primary} />
          </TouchableOpacity>
        </View>

        {}
        <View style={styles.refundCard}>
          <View style={styles.refundRow}>
            <Text style={styles.refundLabel}>Appointment ID</Text>
            <Text style={styles.refundValue}>APPL#10247816</Text>
          </View>
          <View style={styles.refundRow}>
            <Text style={styles.refundLabel}>Reason</Text>
            <Text style={styles.refundValue}>Timing Issue</Text>
          </View>
          <View style={styles.refundRow}>
            <Text style={styles.refundLabel}>Return amount</Text>
            <Text style={styles.refundValue}>500 INR</Text>
          </View>

          <View style={styles.cancelledNotice}>
            <Text style={styles.cancelledText}>This appointment has been cancelled by doctor.</Text>
          </View>
        </View>

        {}
        <View style={styles.progressSection}>
          <Text style={styles.progressTitle}>Track your refund process</Text>

          <View style={styles.stepsContainer}>
            <RefundStep
              title="Refund requested"
              subtitle="Fri, 10th Sep 25, 05:30 PM"
              isCompleted={true}
              isActive={false}
            />
            <RefundStep
              title="Refund processing"
              subtitle={refundCompleted ? "Sat, 11th Sep 25" : "Sat, 11th Sep 25"}
              isCompleted={refundCompleted}
              isActive={!refundCompleted}
            />
            <RefundStep
              title="Refunded"
              subtitle={refundCompleted ? "Mon, 13th Sep 25, 07:32 PM" : ""}
              isCompleted={refundCompleted}
              isActive={false}
              isLast={true}
            />
          </View>

          {refundCompleted && (
            <View style={styles.completedMessage}>
              <MaterialIcons name="check-circle" size={20} color={COLORS.status.success} />
              <Text style={styles.completedText}>Refund added to your wallet.</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
  },
  backButton: {
    padding: SPACING.xs,
  },
  headerTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text.primary,
  },
  menuButton: {
    padding: SPACING.xs,
  },
  refundCard: {
    backgroundColor: COLORS.surface,
    margin: SPACING.md,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.medium,
  },
  refundRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  refundLabel: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text.secondary,
  },
  refundValue: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text.primary,
    fontWeight: "500",
  },
  cancelledNotice: {
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
  },
  cancelledText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.status.error,
  },
  progressSection: {
    margin: SPACING.md,
  },
  progressTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text.primary,
    marginBottom: SPACING.lg,
  },
  stepsContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.small,
  },
  stepContainer: {
    flexDirection: "row",
    marginBottom: SPACING.md,
  },
  stepIndicator: {
    alignItems: "center",
    marginRight: SPACING.md,
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.text.disabled,
    alignItems: "center",
    justifyContent: "center",
  },
  completedStep: {
    backgroundColor: COLORS.status.success,
  },
  activeStep: {
    backgroundColor: COLORS.primary,
  },
  stepLine: {
    width: 2,
    height: 40,
    backgroundColor: COLORS.divider,
    marginTop: 4,
  },
  completedLine: {
    backgroundColor: COLORS.status.success,
  },
  stepContent: {
    flex: 1,
    paddingTop: 2,
  },
  stepTitle: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text.primary,
    fontWeight: "500",
    marginBottom: 2,
  },
  completedStepTitle: {
    color: COLORS.status.success,
  },
  stepSubtitle: {
    ...TYPOGRAPHY.body2,
    color: COLORS.text.secondary,
  },
  completedMessage: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E8",
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginTop: SPACING.md,
  },
  completedText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.status.success,
    marginLeft: SPACING.sm,
    fontWeight: "500",
  },
})
