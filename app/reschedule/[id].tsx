"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from "react-native"
import { useLocalSearchParams, router } from "expo-router"
import { MaterialIcons } from "@expo/vector-icons"
import { RESCHEDULE_REASONS } from "../../constants/mockData"
import { Button } from "../../components/Button"
import { OtherReasonModal } from "../../components/OtherReasonModal"
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from "../../constants/theme"

interface ReasonCardProps {
  reason: (typeof RESCHEDULE_REASONS)[0]
  isSelected: boolean
  onSelect: () => void
}

const ReasonCard: React.FC<ReasonCardProps> = ({ reason, isSelected, onSelect }) => (
  <TouchableOpacity
    style={[styles.reasonCard, isSelected && styles.selectedReasonCard]}
    onPress={onSelect}
    activeOpacity={0.7}
  >
    <View style={styles.reasonContent}>
      <MaterialIcons
        name={reason.icon}
        size={24}
        color={isSelected ? COLORS.primary : COLORS.text.secondary}
        style={styles.reasonIcon}
      />
      <View style={styles.reasonText}>
        <Text style={[styles.reasonTitle, isSelected && styles.selectedReasonTitle]}>{reason.title}</Text>
        {reason.description && (
          <Text style={[styles.reasonDescription, isSelected && styles.selectedReasonDescription]}>
            {reason.description}
          </Text>
        )}
      </View>
    </View>
    <View style={[styles.radioButton, isSelected && styles.selectedRadioButton]}>
      {isSelected && <View style={styles.radioButtonInner} />}
    </View>
  </TouchableOpacity>
)

export default function RescheduleReasonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [selectedReason, setSelectedReason] = useState<string | null>(null)
  const [customReason, setCustomReason] = useState<string>("")
  const [showOtherModal, setShowOtherModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleReasonSelect = (reasonId: string) => {
    if (reasonId === "4") {
      // "Other" option
      setShowOtherModal(true)
    } else {
      setSelectedReason(reasonId)
      setCustomReason("")
    }
  }

  const handleOtherReasonSave = (reason: string) => {
    setCustomReason(reason)
    setSelectedReason("4")
    setShowOtherModal(false)
  }

  const handleConfirm = async () => {
    if (!selectedReason) {
      Alert.alert("Please select a reason", "You must select a reason for rescheduling.")
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Navigate to date selection
      router.push(`/choose-date/${id}` as any)
    } catch (error) {
      Alert.alert("Error", "Failed to process reschedule request. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Please select reason for rescheduling</Text>
          <Text style={styles.subtitle}>This will help us serve you better</Text>
        </View>

        {/* Reasons List */}
        <View style={styles.reasonsList}>
          {RESCHEDULE_REASONS.map((reason) => (
            <ReasonCard
              key={reason.id}
              reason={reason}
              isSelected={selectedReason === reason.id}
              onSelect={() => handleReasonSelect(reason.id)}
            />
          ))}
          {selectedReason === "4" && customReason && (
            <View style={styles.customReasonContainer}>
              <Text style={styles.customReasonLabel}>Your reason:</Text>
              <Text style={styles.customReasonText}>{customReason}</Text>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button
            title="Confirm"
            onPress={handleConfirm}
            disabled={!selectedReason}
            loading={isLoading}
            style={styles.confirmButton}
          />
          <Button title="Cancel" variant="outline" onPress={handleCancel} style={styles.cancelButton} />
        </View>
      </View>

      {/* Other Reason Modal */}
      <OtherReasonModal
        visible={showOtherModal}
        onClose={() => setShowOtherModal(false)}
        onSave={handleOtherReasonSave}
      />
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
    padding: SPACING.md,
  },
  header: {
    marginBottom: SPACING.xl,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
    textAlign: "center",
  },
  subtitle: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text.secondary,
    textAlign: "center",
  },
  reasonsList: {
    flex: 1,
    marginBottom: SPACING.xl,
  },
  reasonCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "transparent",
    ...SHADOWS.small,
  },
  selectedReasonCard: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  reasonContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  reasonIcon: {
    marginRight: SPACING.md,
  },
  reasonText: {
    flex: 1,
  },
  reasonTitle: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text.primary,
    fontWeight: "500",
    marginBottom: 2,
  },
  selectedReasonTitle: {
    color: COLORS.primary,
  },
  reasonDescription: {
    ...TYPOGRAPHY.body2,
    color: COLORS.text.secondary,
  },
  selectedReasonDescription: {
    color: COLORS.primaryDark,
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
    borderColor: COLORS.primary,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  customReasonContainer: {
    backgroundColor: COLORS.primaryLight,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginTop: SPACING.sm,
  },
  customReasonLabel: {
    ...TYPOGRAPHY.body2,
    color: COLORS.primaryDark,
    fontWeight: "500",
    marginBottom: SPACING.xs,
  },
  customReasonText: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text.primary,
  },
  actionButtons: {
    gap: SPACING.md,
  },
  confirmButton: {
    marginBottom: SPACING.sm,
  },
  cancelButton: {
    borderColor: COLORS.text.disabled,
  },
})
