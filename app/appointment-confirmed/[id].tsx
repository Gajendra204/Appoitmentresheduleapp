import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import type React from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Button } from "../../components/Button";
import { MOCK_APPOINTMENTS } from "../../constants/mockData";
import {
  BORDER_RADIUS,
  COLORS,
  SHADOWS,
  SPACING,
  TYPOGRAPHY,
} from "../../constants/theme";

interface ConfirmationRowProps {
  label: string;
  value: string;
}

const ConfirmationRow: React.FC<ConfirmationRowProps> = ({ label, value }) => (
  <View style={styles.confirmationRow}>
    <Text style={styles.confirmationLabel}>{label}</Text>
    <Text style={styles.confirmationValue}>{value}</Text>
  </View>
);

export default function AppointmentConfirmedScreen() {
  const { id, date, time } = useLocalSearchParams<{
    id: string;
    date: string;
    time: string;
  }>();
  const appointment = MOCK_APPOINTMENTS.find((apt) => apt.id === id);

  const handleGotIt = () => {
    router.dismissAll();
    router.replace("/(tabs)");
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
      <View style={styles.content}>
        {}
        <View style={styles.successContainer}>
          <View style={styles.successIcon}>
            <MaterialIcons name="check" size={60} color={COLORS.surface} />
          </View>
          <Image
            source={{ uri: appointment.doctor.avatar }}
            style={styles.doctorImage}
          />
        </View>

        {}
        <View style={styles.messageContainer}>
          <Text style={styles.successTitle}>Appointment Confirmed</Text>
          <Text style={styles.successSubtitle}>
            Thank you for choosing our Experts to help guide you
          </Text>
        </View>

        {}
        <View style={styles.detailsContainer}>
          <ConfirmationRow label="Expert" value={appointment.doctor.name} />
          <ConfirmationRow
            label="Appointment Date"
            value={date || appointment.date || "N/A"}
          />
          <ConfirmationRow
            label="Appointment Time"
            value={time || appointment.time || "N/A"}
          />
          <ConfirmationRow
            label="Consultation Type"
            value={
              appointment.type === "video"
                ? "Video Consultation"
                : "Phone Consultation"
            }
          />
          <ConfirmationRow label="Current Wallet Balance" value="₹ 660" />
          <ConfirmationRow label="Consultation Fee" value="₹ 50" />
        </View>

        {}
        <View style={styles.buttonContainer}>
          <Button
            title="Got it"
            onPress={handleGotIt}
            style={styles.gotItButton}
          />
        </View>
      </View>
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
    padding: SPACING.lg,
    justifyContent: "center",
  },
  successContainer: {
    alignItems: "center",
    marginBottom: SPACING.xl,
    position: "relative",
  },
  successIcon: {
    backgroundColor: COLORS.primary,
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.md,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: "absolute",
    bottom: -10,
    right: 20,
    borderWidth: 4,
    borderColor: COLORS.surface,
  },
  messageContainer: {
    alignItems: "center",
    marginBottom: SPACING.xl,
  },
  successTitle: {
    ...TYPOGRAPHY.h1,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
    textAlign: "center",
  },
  successSubtitle: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text.secondary,
    textAlign: "center",
    lineHeight: 24,
  },
  detailsContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    ...SHADOWS.medium,
  },
  confirmationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  confirmationLabel: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text.secondary,
    flex: 1,
  },
  confirmationValue: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text.primary,
    fontWeight: "500",
    textAlign: "right",
  },
  buttonContainer: {
    paddingBottom: SPACING.xl,
  },
  gotItButton: {
    width: "100%",
  },
  errorText: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text.primary,
    textAlign: "center",
    marginTop: SPACING.xl,
  },
});
