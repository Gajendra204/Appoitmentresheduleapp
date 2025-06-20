import type React from "react"
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from "react-native"
import { useLocalSearchParams, router } from "expo-router"
import { MaterialIcons } from "@expo/vector-icons"
import { MOCK_APPOINTMENTS } from "../../constants/mockData"
import { Button } from "../../components/Button"
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from "../../constants/theme"

interface OverviewRowProps {
  label: string
  value: string
  showEdit?: boolean
  onEdit?: () => void
}

const OverviewRow: React.FC<OverviewRowProps> = ({ label, value, showEdit, onEdit }) => (
  <View style={styles.overviewRow}>
    <Text style={styles.rowLabel}>{label}</Text>
    <View style={styles.rowRight}>
      <Text style={styles.rowValue}>{value}</Text>
      {showEdit && (
        <TouchableOpacity onPress={onEdit} style={styles.editButton}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
)

interface SectionProps {
  title: string
  showEdit?: boolean
  onEdit?: () => void
  children: React.ReactNode
}

const Section: React.FC<SectionProps> = ({ title, showEdit, onEdit, children }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {showEdit && (
        <TouchableOpacity onPress={onEdit} style={styles.editButton}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      )}
    </View>
    <View style={styles.sectionContent}>{children}</View>
  </View>
)

export default function AppointmentOverviewScreen() {
  const { id, date, time } = useLocalSearchParams<{ id: string; date: string; time: string }>()
  const appointment = MOCK_APPOINTMENTS.find((apt) => apt.id === id)

  const handleEditDateTime = () => {
    router.back()
  }

  const handleEditConcern = () => {
    // Navigate to edit concern screen
    console.log("Edit concern")
  }

  const handleEditBasicInfo = () => {
    // Navigate to edit basic info screen
    console.log("Edit basic info")
  }

  const handleConfirmAppointment = () => {
    if (appointment) {
      router.push(`/appointment-confirmed/${appointment.id}?date=${date}&time=${time}` as any)
    }
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
          <Text style={styles.headerTitle}>Appointment Overview</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Date and Time Section */}
        <Section title="Date and time" showEdit onEdit={handleEditDateTime}>
          <OverviewRow label="Appointment Date" value="23 November 2023" />
          <OverviewRow label="Appointment Time" value="17:28 PM" />
          <OverviewRow label="Consultation Type" value="Video Consultation" />
        </Section>

        {/* Concern Section */}
        <Section title="Concern" showEdit onEdit={handleEditConcern}>
          <OverviewRow label="Concern" value="Diabetes" />
          <OverviewRow label="Severity" value="Moderate" />
          <OverviewRow label="How long?" value="28 days" />
        </Section>

        {/* Basic Information Section */}
        <Section title="Basic information" showEdit onEdit={handleEditBasicInfo}>
          <OverviewRow label="Gender" value="Female" />
          <OverviewRow label="Age" value="28 years" />
          <OverviewRow label="Weight" value="63 kg" />
        </Section>

        {/* Confirm Button */}
        <View style={styles.buttonContainer}>
          <Button title="Confirm Appointment" onPress={handleConfirmAppointment} style={styles.confirmButton} />
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
  section: {
    margin: SPACING.md,
    marginTop: 0,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text.primary,
  },
  sectionContent: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    ...SHADOWS.small,
  },
  overviewRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  rowLabel: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text.secondary,
    flex: 1,
  },
  rowRight: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  rowValue: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text.primary,
    fontWeight: "500",
    marginRight: SPACING.sm,
  },
  editButton: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  editText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.primary,
    fontWeight: "500",
  },
  buttonContainer: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  confirmButton: {
    width: "100%",
  },
  errorText: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text.primary,
    textAlign: "center",
    marginTop: SPACING.xl,
  },
})
