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

interface DateItemProps {
  date: number;
  day: string;
  month: string;
  isSelected: boolean;
  isDisabled?: boolean;
  onPress: () => void;
}

const DateItem: React.FC<DateItemProps> = ({
  date,
  day,
  month,
  isSelected,
  isDisabled,
  onPress,
}) => (
  <TouchableOpacity
    style={[
      styles.dateItem,
      isSelected && styles.selectedDateItem,
      isDisabled && styles.disabledDateItem,
    ]}
    onPress={onPress}
    disabled={isDisabled}
    activeOpacity={0.7}
  >
    <Text style={[styles.dateNumber, isSelected && styles.selectedDateText]}>
      {date.toString().padStart(2, "0")}
    </Text>
    <Text style={[styles.dayText, isSelected && styles.selectedDateText]}>
      {day}
    </Text>
    <Text style={[styles.monthText, isSelected && styles.selectedDateText]}>
      {month}
    </Text>
  </TouchableOpacity>
);

export default function ChooseDateScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const appointment = MOCK_APPOINTMENTS.find((apt) => apt.id === id);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const { dispatch } = useApp();

  // Generate calendar dates for February 2025
  const calendarDates = [
    { date: 6, day: "Friday", month: "Feb", key: "06-02-2025" },
    { date: 7, day: "Saturday", month: "Feb", key: "07-02-2025" },
    { date: 8, day: "Sunday", month: "Feb", key: "08-02-2025" },
    { date: 9, day: "Monday", month: "Feb", key: "09-02-2025" },
    { date: 10, day: "Tuesday", month: "Feb", key: "10-02-2025" },
    { date: 11, day: "Wednesday", month: "Feb", key: "11-02-2025" },
    { date: 12, day: "Thursday", month: "Feb", key: "12-02-2025" },
    { date: 13, day: "Friday", month: "Feb", key: "13-02-2025" },
    { date: 14, day: "Saturday", month: "Feb", key: "14-02-2025" },
    { date: 15, day: "Sunday", month: "Feb", key: "15-02-2025" },
    { date: 16, day: "Monday", month: "Feb", key: "16-02-2025" },
    { date: 17, day: "Tuesday", month: "Feb", key: "17-02-2025" },
  ];

  const handleDateSelect = (dateKey: string) => {
    setSelectedDate(dateKey);
  };

  const handleConfirmDate = () => {
    if (selectedDate && appointment) {
      dispatch({
        type: "UPDATE_APPOINTMENT",
        payload: {
          id: appointment.id,
          updates: {
            date: selectedDate,
          },
        },
      });
      router.push(`/choose-time/${appointment.id}?date=${selectedDate}` as any);
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
        {/* Header */}
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
          <Text style={styles.headerTitle}>Choose Date</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Doctor Info */}
        <View style={styles.doctorCard}>
          <Image
            source={{ uri: appointment.doctor.avatar }}
            style={styles.doctorAvatar}
          />
          <View style={styles.doctorInfo}>
            <Text style={styles.doctorName}>Dr. Prerna</Text>
            <Text style={styles.doctorSpecialization}>
              Male-Female Infertility
            </Text>
          </View>
        </View>

        {/* Date Selection */}
        <View style={styles.dateSection}>
          <Text style={styles.sectionTitle}>Pick Appointment Date</Text>
          <View style={styles.calendarGrid}>
            {calendarDates.map((dateItem) => (
              <DateItem
                key={dateItem.key}
                date={dateItem.date}
                day={dateItem.day}
                month={dateItem.month}
                isSelected={selectedDate === dateItem.key}
                onPress={() => handleDateSelect(dateItem.key)}
              />
            ))}
          </View>
        </View>

        {/* Month Indicator */}
        <View style={styles.monthIndicator}>
          <MaterialIcons
            name="calendar-today"
            size={16}
            color={COLORS.text.secondary}
          />
          <Text style={styles.monthText}>06 February 2025</Text>
        </View>

        {/* Confirm Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Confirm Date"
            onPress={handleConfirmDate}
            disabled={!selectedDate}
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
  },
  dateSection: {
    margin: SPACING.md,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: SPACING.sm,
  },
  dateItem: {
    backgroundColor: COLORS.surface,
    width: "30%",
    aspectRatio: 1,
    borderRadius: BORDER_RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.sm,
    ...SHADOWS.small,
  },
  selectedDateItem: {
    backgroundColor: COLORS.primary,
  },
  disabledDateItem: {
    backgroundColor: COLORS.background,
    opacity: 0.5,
  },
  dateNumber: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  dayText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text.secondary,
    marginBottom: 1,
  },
  monthText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text.secondary,
  },
  selectedDateText: {
    color: COLORS.surface,
  },
  monthIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: SPACING.md,
    gap: SPACING.xs,
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
