import type React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import {
  BORDER_RADIUS,
  COLORS,
  SHADOWS,
  SPACING,
  TYPOGRAPHY,
} from "../constants/theme";
import type { Appointment } from "../constants/types.ts";
import { Button } from "./Button";

interface AppointmentCardProps {
  appointment: Appointment;
  onViewDetails: () => void;
  onJoinCall?: () => void;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onViewDetails,
  onJoinCall,
}) => {
  const { doctor, date, time, canJoin, countdown } = appointment;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: doctor.avatar }} style={styles.avatar} />
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <Text style={styles.specialization}>{doctor.specialization}</Text>
          <Text style={styles.status}>Upcoming</Text>
        </View>
      </View>

      <View style={styles.appointmentInfo}>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.dateTime}>📅 Tuesday, {date}</Text>
          <Text style={styles.dateTime}>🕐 {time}</Text>
        </View>
      </View>

      {countdown && (
        <View style={styles.countdownContainer}>
          <Text style={styles.countdown}>{countdown}</Text>
        </View>
      )}

      <View style={styles.actions}>
        <Button
          title="View Detail"
          variant="outline"
          size="small"
          onPress={onViewDetails}
          style={styles.viewDetailButton}
        />
        <Button
          title="Join Call"
          variant="primary"
          size="small"
          onPress={onJoinCall ?? (() => {})}
          disabled={!canJoin}
          style={styles.joinCallButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginVertical: SPACING.sm,
    ...SHADOWS.medium,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
  specialization: {
    ...TYPOGRAPHY.body2,
    color: COLORS.text.secondary,
    marginBottom: 2,
  },
  status: {
    ...TYPOGRAPHY.caption,
    color: COLORS.status.warning,
    textTransform: "uppercase",
  },
  appointmentInfo: {
    marginBottom: SPACING.md,
  },
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateTime: {
    ...TYPOGRAPHY.body2,
    color: COLORS.text.secondary,
  },
  countdownContainer: {
    backgroundColor: COLORS.background,
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    marginBottom: SPACING.md,
  },
  countdown: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text.secondary,
    textAlign: "center",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: SPACING.sm,
  },
  viewDetailButton: {
    flex: 1,
  },
  joinCallButton: {
    flex: 1,
  },
});
