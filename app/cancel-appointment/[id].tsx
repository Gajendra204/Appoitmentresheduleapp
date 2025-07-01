import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert, ScrollView, Image } from "react-native"
import { useLocalSearchParams, router } from "expo-router"
import { MaterialIcons } from "@expo/vector-icons"
import { MOCK_APPOINTMENTS } from "../../constants/mockData"
import { Button } from "../../components/Button"
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from "../../constants/theme"

interface CancelReasonProps {
  reason: string
  isSelected: boolean
  onSelect: () => void
}

const CancelReason: React.FC<CancelReasonProps> = ({ reason, isSelected, onSelect }) => (
  <TouchableOpacity
    style={[styles.reasonCard, isSelected && styles.selectedReasonCard]}
    onPress={onSelect}
    activeOpacity={0.7}
  >
    <Text style={[styles.reasonText, isSelected && styles.selectedReasonText]}>{reason}</Text>
    <View style={[styles.radioButton, isSelected && styles.selectedRadioButton]}>
      {isSelected && <View style={styles.radioButtonInner} />}
    </View>
  </TouchableOpacity>
)

export default function CancelAppointmentScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const appointment = MOCK_APPOINTMENTS.find((apt) => apt.id === id)
  const [selectedReason, setSelectedReason] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const cancelReasons = [
    "I'm not feeling well",
    "Schedule conflict",
    "Emergency came up",
    "Doctor not available",
    "Financial constraints",
    "Found another doctor",
    "Other reasons",
  ]

  const handleReasonSelect = (reason: string) => {
    setSelectedReason(reason)
  }

  const handleConfirmCancel = async () => {
    if (!selectedReason) {
      Alert.alert("Please select a reason", "You must select a reason for cancellation.")
      return
    }

    Alert.alert(
      "Confirm Cancellation",
      "Are you sure you want to cancel this appointment? This action cannot be undone.",
      [
        {
          text: "No, Keep Appointment",
          style: "cancel",
        },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: async () => {
            setIsLoading(true)
            try {
              // Simulate API call
              await new Promise((resolve) => setTimeout(resolve, 2000))

              Alert.alert(
                "Appointment Cancelled",
                "Your appointment has been successfully cancelled. Any applicable refund will be processed within 3-5 business days.",
                [
                  {
                    text: "OK",
                    onPress: () => {
                      router.dismissAll()
                      router.replace("/(tabs)")
                    },
                  },
                ],
              )
            } catch (error) {
              Alert.alert("Error", "Failed to cancel appointment. Please try again.")
            } finally {
              setIsLoading(false)
            }
          },
        },
      ],
    )
  }

  const handleGoBack = () => {
    router.back()
  }

  if (!appointment) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Appointment not found</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color={COLORS.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cancel Appointment</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Doctor Info */}
        <View style={styles.doctorCard}>
          <Image source={{ uri: appointment.doctor.avatar }} style={styles.doctorAvatar} />
          <View style={styles.doctorInfo}>
            <Text style={styles.doctorName}>Dr. Deepa Godara</Text>
            <Text style={styles.doctorSpecialization}>Orthodontist</Text>
            <Text style={styles.appointmentDate}>Tuesday, 13/09/2023 • 10:30 AM</Text>
          </View>
        </View>

        {/* Cancellation Notice */}
        <View style={styles.noticeCard}>
          <MaterialIcons name="info" size={24} color={COLORS.status.warning} />
          <View style={styles.noticeContent}>
            <Text style={styles.noticeTitle}>Cancellation Policy</Text>
            <Text style={styles.noticeText}>
              Appointments cancelled at least 24 hours in advance are eligible for a full refund. Cancellations within
              24 hours may incur a cancellation fee.
            </Text>
          </View>
        </View>

        {/* Reason Selection */}
        <View style={styles.reasonSection}>
          <Text style={styles.sectionTitle}>Please select reason for cancellation</Text>
          <Text style={styles.sectionSubtitle}>This will help us improve our services</Text>

          <View style={styles.reasonsList}>
            {cancelReasons.map((reason) => (
              <CancelReason
                key={reason}
                reason={reason}
                isSelected={selectedReason === reason}
                onSelect={() => handleReasonSelect(reason)}
              />
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button
            title="Cancel Appointment"
            onPress={handleConfirmCancel}
            disabled={!selectedReason}
            loading={isLoading}
            style={{ ...styles.cancelButton, backgroundColor: COLORS.status.error }}
          />
          <Button title="Keep Appointment" variant="outline" onPress={handleGoBack} style={styles.keepButton} />
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
  placeholder: {
    width: 32,
  },
  doctorCard: {
    backgroundColor: COLORS.surface,
    margin: SPACING.md,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    flexDirection: "row",
    alignItems: "center",
    ...SHADOWS.small,
  },
  doctorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: SPACING.md,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  doctorSpecialization: {
    ...TYPOGRAPHY.body2,
    color: COLORS.text.secondary,
    marginBottom: 4,
  },
  appointmentDate: {
    ...TYPOGRAPHY.body2,
    color: COLORS.primary,
    fontWeight: "500",
  },
  noticeCard: {
    backgroundColor: "#FFF3CD",
    margin: SPACING.md,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    flexDirection: "row",
    borderLeftWidth: 4,
    borderLeftColor: COLORS.status.warning,
  },
  noticeContent: {
    flex: 1,
    marginLeft: SPACING.sm,
  },
  noticeTitle: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text.primary,
    fontWeight: "600",
    marginBottom: 4,
  },
  noticeText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.text.secondary,
    lineHeight: 20,
  },
  reasonSection: {
    margin: SPACING.md,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  sectionSubtitle: {
    ...TYPOGRAPHY.body2,
    color: COLORS.text.secondary,
    marginBottom: SPACING.lg,
  },
  reasonsList: {
    gap: SPACING.sm,
  },
  reasonCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "transparent",
    ...SHADOWS.small,
  },
  selectedReasonCard: {
    borderColor: COLORS.status.error,
    backgroundColor: "#FFEBEE",
  },
  reasonText: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text.primary,
    flex: 1,
  },
  selectedReasonText: {
    color: COLORS.status.error,
    fontWeight: "500",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.text.disabled,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRadioButton: {
    borderColor: COLORS.status.error,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.status.error,
  },
  actionButtons: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
    gap: SPACING.md,
  },
  cancelButton: {
    marginBottom: SPACING.sm,
  },
  keepButton: {
    borderColor: COLORS.primary,
  },
  errorText: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text.primary,
    textAlign: "center",
    marginTop: SPACING.xl,
  },
})
