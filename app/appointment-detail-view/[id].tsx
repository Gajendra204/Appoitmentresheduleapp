"use client"

import type React from "react"
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from "react-native"
import { useLocalSearchParams, router } from "expo-router"
import { MaterialIcons } from "@expo/vector-icons"
import { MOCK_APPOINTMENTS } from "../../constants/mockData"
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from "../../constants/theme"

interface DetailRowProps {
  label: string
  value: string
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
)

interface ActionButtonProps {
  title: string
  icon: keyof typeof MaterialIcons.glyphMap
  onPress: () => void
  variant?: "primary" | "danger"
}

const ActionButton: React.FC<ActionButtonProps> = ({ title, icon, onPress, variant = "primary" }) => (
  <TouchableOpacity
    style={[styles.actionButton, variant === "danger" && styles.dangerButton]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <MaterialIcons name={icon} size={16} color={variant === "danger" ? COLORS.status.error : COLORS.primary} />
    <Text style={[styles.actionButtonText, variant === "danger" && styles.dangerButtonText]}>{title}</Text>
  </TouchableOpacity>
)

interface MenuItemProps {
  title: string
  onPress: () => void
}

const MenuItem: React.FC<MenuItemProps> = ({ title, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
    <Text style={styles.menuItemText}>{title}</Text>
    <MaterialIcons name="chevron-right" size={20} color={COLORS.text.disabled} />
  </TouchableOpacity>
)

export default function AppointmentDetailViewScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const appointment = MOCK_APPOINTMENTS.find((apt) => apt.id === id)

  const handleReschedule = () => {
    router.push(`/reschedule/${appointment?.id}`)
  }

  const handleCancel = () => {
    router.push(`/cancel-reason/${appointment?.id}`)
  }

  const handleMenuPress = (item: string) => {
    console.log(`${item} pressed`)
  }

  if (!appointment) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Appointment not found</Text>
        </View>
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
          <Text style={styles.headerTitle}>Appointment</Text>
          <TouchableOpacity style={styles.menuButton}>
            <MaterialIcons name="more-vert" size={24} color={COLORS.text.primary} />
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <ActionButton title="Reschedule Appointment" icon="schedule" onPress={handleReschedule} />
          <ActionButton title="Cancel Appointment" icon="close" onPress={handleCancel} variant="danger" />
        </View>

        {/* Doctor Card */}
        <View style={styles.doctorCard}>
          <Image source={{ uri: appointment.doctor.avatar }} style={styles.doctorAvatar} />
          <View style={styles.doctorInfo}>
            <View style={styles.doctorNameRow}>
              <Text style={styles.doctorLabel}>Doctor name</Text>
              <Text style={styles.doctorName}>Dr. Deepa Godara</Text>
            </View>
          </View>
        </View>

        {/* Appointment Details */}
        <View style={styles.detailsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Appointment Details</Text>
            <MaterialIcons name="keyboard-arrow-down" size={24} color={COLORS.text.secondary} />
          </View>

          <View style={styles.detailsContainer}>
            <DetailRow label="Appointment ID" value="APPL#10247816" />
            <DetailRow label="Appointment Type" value="Freemedia" />
            <DetailRow label="Appointment fee" value="0 INR" />
            <DetailRow label="Duration" value="1 min" />
            <DetailRow label="Appointment date" value="19 Nov, 2024" />
            <DetailRow label="Appointment time" value="01:51 PM" />
            <DetailRow label="Booking Status" value="Completed" />
            <DetailRow label="Routine Status" value="Not assigned" />
          </View>
        </View>

        {/* Additional Menu Items */}
        <View style={styles.menuContainer}>
          <MenuItem title="Symptoms Details" onPress={() => handleMenuPress("Symptoms Details")} />
          <MenuItem title="Coupons Details" onPress={() => handleMenuPress("Coupons Details")} />
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
  actionButtonsContainer: {
    flexDirection: "row",
    padding: SPACING.md,
    gap: SPACING.sm,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.primary,
    gap: SPACING.xs,
    ...SHADOWS.small,
  },
  dangerButton: {
    borderColor: COLORS.status.error,
  },
  actionButtonText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.primary,
    fontWeight: "500",
  },
  dangerButtonText: {
    color: COLORS.status.error,
  },
  doctorCard: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    padding: SPACING.lg,
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
  doctorNameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  doctorLabel: {
    ...TYPOGRAPHY.body2,
    color: COLORS.text.secondary,
    marginRight: SPACING.md,
    minWidth: 80,
  },
  doctorName: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text.primary,
    fontWeight: "500",
  },
  detailsSection: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.small,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  sectionTitle: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text.primary,
    fontWeight: "500",
  },
  detailsContainer: {
    padding: SPACING.md,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  detailLabel: {
    ...TYPOGRAPHY.body2,
    color: COLORS.text.secondary,
    flex: 1,
  },
  detailValue: {
    ...TYPOGRAPHY.body2,
    color: COLORS.text.primary,
    fontWeight: "500",
    textAlign: "right",
    flex: 1,
  },
  menuContainer: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.small,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  menuItemText: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text.primary,
  },
})
