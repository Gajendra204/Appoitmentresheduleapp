import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import type React from "react";
import { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { OtherReasonModal } from "../../components/OtherReasonModal";
import { MOCK_APPOINTMENTS } from "../../constants/mockData";
import {
  BORDER_RADIUS,
  COLORS,
  SHADOWS,
  SPACING,
  TYPOGRAPHY,
} from "../../constants/theme";

interface ReasonOptionProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  isSelected: boolean;
  onSelect: () => void;
}

const ReasonOption: React.FC<ReasonOptionProps> = ({
  icon,
  title,
  isSelected,
  onSelect,
}) => (
  <TouchableOpacity
    style={styles.reasonOption}
    onPress={onSelect}
    activeOpacity={0.7}
  >
    <View style={styles.reasonContent}>
      <MaterialIcons
        name={icon}
        size={20}
        color={COLORS.text.secondary}
        style={styles.reasonIcon}
      />
      <Text style={styles.reasonText}>{title}</Text>
    </View>
    <View
      style={[styles.radioButton, isSelected && styles.selectedRadioButton]}
    >
      {isSelected && <View style={styles.radioButtonInner} />}
    </View>
  </TouchableOpacity>
);

export default function CancelReasonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const appointment = MOCK_APPOINTMENTS.find((apt) => apt.id === id);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [customReason, setCustomReason] = useState<string>("");
  const [showOtherModal, setShowOtherModal] = useState(false);

  const reasons = [
    { id: "emergency", title: "Emergency work", icon: "work" as const },
    { id: "internet", title: "Internet issues", icon: "wifi-off" as const },
    {
      id: "scheduling",
      title: "Scheduling conflict",
      icon: "schedule" as const,
    },
    { id: "other", title: "Other", icon: "more-horiz" as const },
  ];

  const handleReasonSelect = (reasonId: string) => {
    if (reasonId === "other") {
      setShowOtherModal(true);
    } else {
      setSelectedReason(reasonId);
      setCustomReason("");
    }
  };

  const handleOtherReasonSave = (reason: string) => {
    setCustomReason(reason);
    setSelectedReason("other");
    setShowOtherModal(false);
  };

  const handleSkip = () => {
    if (selectedReason) {
      router.push(`/appointment-cancelled/${appointment?.id}` as any);
    }
  };

  if (!appointment) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Appointment not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={COLORS.text.primary}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Appointment Details</Text>
          <View style={styles.placeholder} />
        </View>

        {}
        <View style={styles.doctorCard}>
          <Image
            source={{ uri: appointment.doctor.avatar }}
            style={styles.doctorAvatar}
          />
          <View style={styles.doctorInfo}>
            <Text style={styles.doctorName}>{appointment.doctor.name}</Text>
            <Text style={styles.doctorSpecialization}>
              {appointment.doctor.specialization}
            </Text>
          </View>
        </View>

        {}
        <View style={styles.reasonSection}>
          <Text style={styles.sectionTitle}>
            Please select reason for cancellation
          </Text>

          <View style={styles.reasonsList}>
            {reasons.map((reason) => (
              <ReasonOption
                key={reason.id}
                icon={reason.icon}
                title={reason.title}
                isSelected={selectedReason === reason.id}
                onSelect={() => handleReasonSelect(reason.id)}
              />
            ))}
          </View>

          {selectedReason === "other" && customReason && (
            <View style={styles.customReasonContainer}>
              <Text style={styles.customReasonLabel}>Your reason:</Text>
              <Text style={styles.customReasonText}>{customReason}</Text>
            </View>
          )}
        </View>

        {}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.skipButton,
              !selectedReason && styles.disabledButton,
            ]}
            onPress={handleSkip}
            disabled={!selectedReason}
          >
            <Text
              style={[
                styles.skipButtonText,
                !selectedReason && styles.disabledButtonText,
              ]}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {}
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
  },
  reasonSection: {
    margin: SPACING.md,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text.primary,
    marginBottom: SPACING.lg,
  },
  reasonsList: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.small,
  },
  reasonOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
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
    ...TYPOGRAPHY.body1,
    color: COLORS.text.primary,
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
    marginTop: SPACING.md,
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
  buttonContainer: {
    padding: SPACING.md,
    paddingTop: SPACING.xl,
  },
  skipButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    alignItems: "center",
  },
  skipButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.surface,
    fontWeight: "600",
  },
  disabledButton: {
    backgroundColor: COLORS.text.disabled,
  },
  disabledButtonText: {
    color: COLORS.surface,
  },
  errorText: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text.primary,
    textAlign: "center",
    marginTop: SPACING.xl,
  },
});
