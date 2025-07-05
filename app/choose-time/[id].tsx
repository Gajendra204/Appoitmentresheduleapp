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
import { Button } from "../../components/Button";
import { MOCK_APPOINTMENTS } from "../../constants/mockData";
import {
  BORDER_RADIUS,
  COLORS,
  SHADOWS,
  SPACING,
  TYPOGRAPHY,
} from "../../constants/theme";
import { useApp } from "../../contexts/AppContext";

interface TimeSlotProps {
  time: string;
  isSelected: boolean;
  isDisabled?: boolean;
  onPress: () => void;
}

const TimeSlot: React.FC<TimeSlotProps> = ({
  time,
  isSelected,
  isDisabled,
  onPress,
}) => (
  <TouchableOpacity
    style={[
      styles.timeSlot,
      isSelected && styles.selectedTimeSlot,
      isDisabled && styles.disabledTimeSlot,
    ]}
    onPress={onPress}
    disabled={isDisabled}
    activeOpacity={0.7}
  >
    <Text style={[styles.timeText, isSelected && styles.selectedTimeText]}>
      {time}
    </Text>
  </TouchableOpacity>
);

interface TimeSlotSectionProps {
  title: string;
  slots: string[];
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
}

const TimeSlotSection: React.FC<TimeSlotSectionProps> = ({
  title,
  slots,
  selectedTime,
  onTimeSelect,
}) => (
  <View style={styles.timeSection}>
    <Text style={styles.timeSectionTitle}>{title}</Text>
    <View style={styles.timeSlotsContainer}>
      {slots.map((time) => (
        <TimeSlot
          key={time}
          time={time}
          isSelected={selectedTime === time}
          onPress={() => onTimeSelect(time)}
        />
      ))}
    </View>
  </View>
);

export default function ChooseTimeScreen() {
  const { id, date } = useLocalSearchParams<{ id: string; date: string }>();
  const appointment = MOCK_APPOINTMENTS.find((apt) => apt.id === id);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const { dispatch } = useApp();

  const morningSlots = ["09:00 AM", "09:35 AM", "10:05 AM"];
  const afternoonSlots = ["12:00 PM", "12:35 AM", "01:05 PM"];
  const eveningSlots = ["06:00 AM", "7:00 AM", "8:05 AM"];

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirmAppointment = () => {
    if (selectedTime && appointment && date) {
      dispatch({
        type: "UPDATE_APPOINTMENT",
        payload: {
          id: appointment.id,
          updates: {
            time: selectedTime,
          },
        },
      });
      router.push(
        `/appointment-overview/${appointment.id}?date=${date}&time=${selectedTime}` as any
      );
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
          <Text style={styles.headerTitle}>Choose Time Slot</Text>
          <View style={styles.placeholder} />
        </View>

        {}
        <View style={styles.doctorCard}>
          <Image
           source={require("../../assets/images/doctor.png")}
            style={styles.doctorAvatar}
          />
          <View style={styles.doctorInfo}>
            <Text style={styles.doctorName}>{appointment.doctor.name}</Text>
            <Text style={styles.doctorSpecialization}>
              {appointment.doctor.specialization}
            </Text>
            <Text style={styles.consultationType}>
              Chat Consultation - Free
            </Text>
          </View>
        </View>

        {}
        <View style={styles.timeSelectionSection}>
          <Text style={styles.sectionTitle}>Pick a time slot</Text>

          <TimeSlotSection
            title="Morning"
            slots={morningSlots}
            selectedTime={selectedTime}
            onTimeSelect={handleTimeSelect}
          />

          <TimeSlotSection
            title="Afternoon"
            slots={afternoonSlots}
            selectedTime={selectedTime}
            onTimeSelect={handleTimeSelect}
          />

          <TimeSlotSection
            title="Evening"
            slots={eveningSlots}
            selectedTime={selectedTime}
            onTimeSelect={handleTimeSelect}
          />
        </View>

        {}
        <View style={styles.buttonContainer}>
          <Button
            title="Confirm Appointment"
            onPress={handleConfirmAppointment}
            disabled={!selectedTime}
            style={styles.confirmButton}
          />
        </View>
      </ScrollView>
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
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    flexDirection: "row",
    alignItems: "center",
    ...SHADOWS.small,
  },
  doctorAvatar: {
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
  doctorSpecialization: {
    ...TYPOGRAPHY.body2,
    color: COLORS.text.secondary,
    marginBottom: 2,
  },
  consultationType: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primary,
  },
  timeSelectionSection: {
    margin: SPACING.md,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text.primary,
    marginBottom: SPACING.lg,
  },
  timeSection: {
    marginBottom: SPACING.lg,
  },
  timeSectionTitle: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text.primary,
    fontWeight: "600",
    marginBottom: SPACING.md,
  },
  timeSlotsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
  },
  timeSlot: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    minWidth: 80,
    alignItems: "center",
  },
  selectedTimeSlot: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  disabledTimeSlot: {
    backgroundColor: COLORS.background,
    opacity: 0.5,
  },
  timeText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.text.primary,
    fontWeight: "500",
  },
  selectedTimeText: {
    color: COLORS.surface,
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
});
