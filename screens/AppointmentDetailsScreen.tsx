import type React from "react"
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image, Alert } from "react-native"
import { useLocalSearchParams, router } from "expo-router"
import { MaterialIcons } from "@expo/vector-icons"
import { MOCK_APPOINTMENTS } from "../constants/mockData"
import { Button } from "../components/Button"
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from "../constants/theme"

interface DetailRowProps {
  label: string
  value: string
  icon?: keyof typeof MaterialIcons.glyphMap
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value, icon }) => (
  <View style={styles.detailRow}>
    <View style={styles.detailLeft}>
      {icon && <MaterialIcons name={icon} size={20} color={COLORS.text.secondary} />}
      <Text style={styles.detailLabel}>{label}</Text>
    </View>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
)

interface SectionProps {
  title: string
  children: React.ReactNode
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionContent}>{children}</View>
  </View>
)

export const AppointmentDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const appointment = MOCK_APPOINTMENTS.find((apt) => apt.id === id)

  if (!appointment) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Appointment not found</Text>
          <Button title="Go Back" onPress={() => router.back()} />
        </View>
      </SafeAreaView>
    )
  }

  const handleReschedule = () => {
    router.push(`/reschedule/${appointment.id}`)
  }

  const handleJoinCall = () => {
    Alert.alert("Join Call", "Joining video consultation...")
  }

  const handleCancel = () => {
    Alert.alert("Cancel Appointment", "Are you sure you want to cancel this appointment?", [
      { text: "No", style: "cancel" },
      { text: "Yes", style: "destructive", onPress: () => console.log("Appointment cancelled") },
    ])
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Doctor Info */}
        <View style={styles.doctorCard}>
          <Image source={{ uri: appointment.doctor.avatar }} style={styles.doctorAvatar} />
          <View style={styles.doctorInfo}>
            <Text style={styles.doctorName}>{appointment.doctor.name}</Text>
            <Text style={styles.doctorSpecialization}>{appointment.doctor.specialization}</Text>
            <View style={styles.ratingContainer}>
              <MaterialIcons name="star" size={16} color={COLORS.secondary} />
              <Text style={styles.rating}>{appointment.doctor.rating}</Text>
              <Text style={styles.experience}>• {appointment.doctor.experience}</Text>
            </View>
          </View>
        </View>

        {/* Appointment Details */}
        <Section title="Appointment Details">
          <DetailRow label="Date" value={`Tuesday, ${appointment.date}`} icon="calendar-today" />
          <DetailRow label="Time" value={appointment.time} icon="access-time" />
          <DetailRow label="Duration" value={`${appointment.duration} minutes`} icon="timer" />
          <DetailRow label="Type" value="Video Consultation" icon="videocam" />
          <DetailRow label="Status" value="Upcoming" icon="schedule" />
        </Section>

        {/* Symptoms Details */}
        <Section title="Symptoms Details">
          <View style={styles.symptomItem}>
            <Text style={styles.symptomText}>• Headache and dizziness</Text>
          </View>
          <View style={styles.symptomItem}>
            <Text style={styles.symptomText}>• Nausea</Text>
          </View>
          <View style={styles.symptomItem}>
            <Text style={styles.symptomText}>• Fatigue</Text>
          </View>
        </Section>

        {/* Booking Details */}
        <Section title="Booking Details">
          <DetailRow label="Booking ID" value="#APT001" />
          <DetailRow label="Booked on" value="10/09/2023" />
          <DetailRow label="Payment" value="Completed" />
        </Section>

        {/* Medical Report */}
        <Section title="Medical Report">
          <TouchableOpacity style={styles.reportItem}>
            <MaterialIcons name="description" size={24} color={COLORS.primary} />
            <Text style={styles.reportText}>Previous consultation report</Text>
            <MaterialIcons name="download" size={20} color={COLORS.text.secondary} />
          </TouchableOpacity>
        </Section>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          {appointment.canJoin ? (
            <Button title="Join Call" onPress={handleJoinCall} style={styles.joinButton} />
          ) : (
            <View style={styles.countdownContainer}>
              <Text style={styles.countdownText}>{appointment.countdown}</Text>
            </View>
          )}

          <View style={styles.secondaryActions}>
            <Button title="Reschedule" variant="outline" onPress={handleReschedule} style={styles.rescheduleButton} />
            <Button title="Cancel" variant="outline" onPress={handleCancel} style={styles.cancelButton} />
          </View>
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
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.xl,
  },
  errorText: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text.primary,
    marginBottom: SPACING.lg,
  },
  doctorCard: {
    backgroundColor: COLORS.surface,
    margin: SPACING.md,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    flexDirection: "row",
    alignItems: "center",
    ...SHADOWS.medium,
  },
  doctorAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: SPACING.md,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  doctorSpecialization: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text.secondary,
    marginBottom: SPACING.sm,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    ...TYPOGRAPHY.body2,
    color: COLORS.text.primary,
    marginLeft: 4,
  },
  experience: {
    ...TYPOGRAPHY.body2,
    color: COLORS.text.secondary,
    marginLeft: 4,
  },
  section: {
    margin: SPACING.md,
    marginTop: 0,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  sectionContent: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    ...SHADOWS.small,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  detailLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  detailLabel: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text.secondary,
    marginLeft: SPACING.sm,
  },
  detailValue: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text.primary,
    fontWeight: "500",
  },
  symptomItem: {
    paddingVertical: SPACING.xs,
  },
  symptomText: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text.primary,
  },
  reportItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.sm,
  },
  reportText: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text.primary,
    flex: 1,
    marginLeft: SPACING.sm,
  },
  actionButtons: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  joinButton: {
    marginBottom: SPACING.md,
  },
  countdownContainer: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  countdownText: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text.secondary,
    textAlign: "center",
  },
  secondaryActions: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  rescheduleButton: {
    flex: 1,
  },
  cancelButton: {
    flex: 1,
    borderColor: COLORS.status.error,
  },
})
