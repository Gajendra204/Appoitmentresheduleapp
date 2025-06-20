"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image, Modal } from "react-native"
import { useLocalSearchParams, router } from "expo-router"
import { MaterialIcons } from "@expo/vector-icons"
import { MOCK_APPOINTMENTS } from "../../constants/mockData"
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from "../../constants/theme"

interface MenuItemProps {
  title: string
  onPress: () => void
  showArrow?: boolean
}

const MenuItem: React.FC<MenuItemProps> = ({ title, onPress, showArrow = true }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
    <Text style={styles.menuItemText}>{title}</Text>
    {showArrow && <MaterialIcons name="chevron-right" size={20} color={COLORS.text.disabled} />}
  </TouchableOpacity>
)

interface CancelDialogProps {
  visible: boolean
  onCancel: () => void
  onConfirm: () => void
}

const CancelDialog: React.FC<CancelDialogProps> = ({ visible, onCancel, onConfirm }) => (
  <Modal visible={visible} transparent animationType="fade">
    <View style={styles.modalOverlay}>
      <View style={styles.cancelDialog}>
        <Text style={styles.dialogTitle}>Cancel Appointment</Text>
        <Text style={styles.dialogMessage}>Are you sure you want to cancel your appointment?</Text>

        <View style={styles.dialogButtons}>
          <TouchableOpacity style={styles.cancelButton} onPress={onConfirm}>
            <Text style={styles.cancelButtonText}>Yes, Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.keepButton} onPress={onCancel}>
            <Text style={styles.keepButtonText}>No, keep</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
)

const AppointmentDetailsScreen: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const appointment = MOCK_APPOINTMENTS.find((apt) => apt.id === id)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)

  const handleReschedule = () => {
    router.push(`/reschedule/${appointment?.id}`)
  }

  const handleCancelPress = () => {
    setShowCancelDialog(true)
  }

  const handleCancelConfirm = () => {
    setShowCancelDialog(false)
    router.push(`/cancel-reason/${appointment?.id}` as any)
  }

  const handleCancelDialogClose = () => {
    setShowCancelDialog(false)
  }

  const handleTrackRefund = () => {
    router.push(`/refund-tracking/${appointment?.id}` as any)
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
          <Text style={styles.headerTitle}>Appointment Details</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Doctor Card */}
        <View style={styles.doctorCard}>
          <Image source={{ uri: appointment.doctor.avatar }} style={styles.doctorAvatar} />
          <View style={styles.doctorInfo}>
            <Text style={styles.doctorName}>Dr. Deepa Godara</Text>
            <Text style={styles.doctorSpecialization}>Orthodontist</Text>
            {isCancelled && (
              <View style={styles.cancelledInfo}>
                <Text style={styles.cancelledText}>This appointment has been cancelled by doctor.</Text>
                <TouchableOpacity onPress={handleTrackRefund}>
                  <Text style={styles.trackRefundText}>Track refund</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <MenuItem title="Appointment Details" onPress={() => {}} />
          <MenuItem title="Symptoms Details" onPress={() => {}} />
          <MenuItem title="Concern Details" onPress={() => {}} />
          <MenuItem title="Booking Details" onPress={() => {}} />
          <MenuItem title="medical Report" onPress={() => {}} />
        </View>

        {/* Action Buttons - Only show if not cancelled */}
        {!isCancelled && (
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.rescheduleButton} onPress={handleReschedule}>
              <Text style={styles.rescheduleText}>Reschedule Appointment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelAppointmentButton} onPress={handleCancelPress}>
              <Text style={styles.cancelAppointmentText}>Cancel Appointment</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Cancel Dialog */}
      <CancelDialog visible={showCancelDialog} onCancel={handleCancelDialogClose} onConfirm={handleCancelConfirm} />
    </SafeAreaView>
  )
}

export default function AppointmentDetails() {
  return <AppointmentDetailsScreen />
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
  placeholder: {
    width: 32,
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
    width: 60,
    height: 60,
    borderRadius: 30,
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
    marginBottom: 8,
  },
  cancelledInfo: {
    marginTop: 4,
  },
  cancelledText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.status.error,
    marginBottom: 4,
  },
  trackRefundText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.primary,
    fontWeight: "500",
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
  actionButtons: {
    padding: SPACING.md,
    paddingTop: SPACING.xl,
    gap: SPACING.md,
  },
  rescheduleButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    alignItems: "center",
  },
  rescheduleText: {
    ...TYPOGRAPHY.button,
    color: COLORS.surface,
    fontWeight: "600",
  },
  cancelAppointmentButton: {
    backgroundColor: COLORS.status.error,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    alignItems: "center",
  },
  cancelAppointmentText: {
    ...TYPOGRAPHY.button,
    color: COLORS.surface,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.md,
  },
  cancelDialog: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl,
    width: "100%",
    maxWidth: 320,
    ...SHADOWS.medium,
  },
  dialogTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text.primary,
    textAlign: "center",
    marginBottom: SPACING.md,
  },
  dialogMessage: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text.secondary,
    textAlign: "center",
    marginBottom: SPACING.xl,
    lineHeight: 24,
  },
  dialogButtons: {
    gap: SPACING.md,
  },
  cancelButton: {
    backgroundColor: COLORS.status.error,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    alignItems: "center",
  },
  cancelButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.surface,
    fontWeight: "600",
  },
  keepButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    alignItems: "center",
  },
  keepButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.surface,
    fontWeight: "600",
  },
})
