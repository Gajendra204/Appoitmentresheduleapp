import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import type React from "react";
import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "../../components/Button";
import { OtherReasonModal } from "../../components/OtherReasonModal";
import {
  BORDER_RADIUS,
  COLORS,
  SHADOWS,
  SPACING,
  TYPOGRAPHY,
} from "../../constants/theme";
import { useApp } from "../../contexts/AppContext";
import { AppointmentService } from "../../services/appointmentService";
import { FormValidator } from "../../utils/validation";

const RESCHEDULE_REASONS = [
  {
    id: "1",
    title: "Emergency work",
    icon: "work" as const,
    description: "Urgent work commitment",
  },
  {
    id: "2",
    title: "Financial issues",
    icon: "attach-money" as const,
    description: "Payment related concerns",
  },
  {
    id: "3",
    title: "Scheduling conflict",
    icon: "schedule" as const,
    description: "Time slot conflict",
  },
  {
    id: "4",
    title: "Other",
    icon: "more-horiz" as const,
    description: "Other reasons",
  },
];

interface ReasonCardProps {
  reason: (typeof RESCHEDULE_REASONS)[0];
  isSelected: boolean;
  onSelect: () => void;
}

const ReasonCard: React.FC<ReasonCardProps> = ({
  reason,
  isSelected,
  onSelect,
}) => (
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
        <Text
          style={[styles.reasonTitle, isSelected && styles.selectedReasonTitle]}
        >
          {reason.title}
        </Text>
        {reason.description && (
          <Text
            style={[
              styles.reasonDescription,
              isSelected && styles.selectedReasonDescription,
            ]}
          >
            {reason.description}
          </Text>
        )}
      </View>
    </View>
    <View
      style={[styles.radioButton, isSelected && styles.selectedRadioButton]}
    >
      {isSelected && <View style={styles.radioButtonInner} />}
    </View>
  </TouchableOpacity>
);

export default function RescheduleReasonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { state, dispatch } = useApp();
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [customReason, setCustomReason] = useState<string>("");
  const [showOtherModal, setShowOtherModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const appointment = state.appointments.find((apt) => apt.id === id);

  const handleReasonSelect = (reasonId: string) => {
    if (reasonId === "4") {
      // "Other" option
      setShowOtherModal(true);
    } else {
      setSelectedReason(reasonId);
      setCustomReason("");
      setErrors({});
    }
  };

  const handleOtherReasonSave = (reason: string) => {
    const validation = FormValidator.validateCustomReason(reason);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setCustomReason(reason);
    setSelectedReason("4");
    setShowOtherModal(false);
    setErrors({});
  };

  const handleConfirm = async () => {
    // Validate reason selection
    const validation = FormValidator.validateRescheduleReason(
      selectedReason || ""
    );
    if (!validation.isValid) {
      setErrors(validation.errors);
      Alert.alert(
        "Please select a reason",
        "You must select a reason for rescheduling."
      );
      return;
    }

    if (!appointment) {
      Alert.alert("Error", "Appointment not found.");
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const reasonText =
        selectedReason === "4"
          ? customReason
          : RESCHEDULE_REASONS.find((r) => r.id === selectedReason)?.title ||
            "";

      // Call the service to reschedule
      await AppointmentService.rescheduleAppointment(
        appointment.id,
        appointment.date, // Will be updated in next screen
        appointment.time, // Will be updated in next screen
        reasonText
      );

      // Navigate to date selection
      router.push(`/choose-date/${id}`);
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error
          ? error.message
          : "Failed to process reschedule request."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (!appointment) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Appointment not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>
            Please select reason for rescheduling
          </Text>
          <Text style={styles.subtitle}>
            This will help us serve you better
          </Text>
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

        {/* Error Messages */}
        {Object.keys(errors).length > 0 && (
          <View style={styles.errorContainer}>
            {Object.values(errors).map((error, index) => (
              <Text key={index} style={styles.errorMessage}>
                {error}
              </Text>
            ))}
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button
            title="Confirm"
            onPress={handleConfirm}
            disabled={!selectedReason}
            loading={isLoading}
            style={styles.confirmButton}
          />
          <Button
            title="Cancel"
            variant="outline"
            onPress={handleCancel}
            style={styles.cancelButton}
          />
        </View>
      </View>

      {/* Other Reason Modal */}
      <OtherReasonModal
        visible={showOtherModal}
        onClose={() => setShowOtherModal(false)}
        onSave={handleOtherReasonSave}
      />
    </SafeAreaView>
  );
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
  errorContainer: {
    marginBottom: SPACING.md,
  },
  errorMessage: {
    ...TYPOGRAPHY.body2,
    color: COLORS.status.error,
    textAlign: "center",
    marginBottom: SPACING.xs,
  },
  errorText: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text.primary,
    textAlign: "center",
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
});
