import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import type React from "react";
import {
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

interface OverviewRowProps {
  label: string;
  value: string;
  showEdit?: boolean;
  onEdit?: () => void;
}

const OverviewRow: React.FC<OverviewRowProps> = ({
  label,
  value,
  showEdit,
  onEdit,
}) => (
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
);

interface SectionProps {
  title: string;
  showEdit?: boolean;
  onEdit?: () => void;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({
  title,
  showEdit,
  onEdit,
  children,
}) => (
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
);

export default function AppointmentOverviewScreen() {
  const { id, date, time } = useLocalSearchParams<{
    id: string;
    date: string;
    time: string;
  }>();
  const appointment = MOCK_APPOINTMENTS.find((apt) => apt.id === id);
  const { state } = useApp();
  const user = state.user;

  const handleEditDateTime = () => {
    router.back();
  };

  const handleEditConcern = () => {
    router.push(`/edit-concern/${id}` as any);
  };

  const handleEditBasicInfo = () => {
    router.push(`/edit-basic-info/${id}` as any);
  };

  const handleConfirmAppointment = () => {
    if (appointment) {
      router.push(
        `/appointment-confirmed/${appointment.id}?date=${date}&time=${time}`
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
          <Text style={styles.headerTitle}>Appointment Overview</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Date and Time Section */}
        <Section title="Date and time" showEdit onEdit={handleEditDateTime}>
          <OverviewRow
            label="Appointment Date"
            value={date || appointment.date || "N/A"}
          />
          <OverviewRow
            label="Appointment Time"
            value={time || appointment.time || "N/A"}
          />
          <OverviewRow
            label="Consultation Type"
            value={
              appointment.type === "video"
                ? "Video Consultation"
                : "Phone Consultation"
            }
          />
        </Section>

        {/* Concern Section */}
        <Section title="Concern" showEdit onEdit={handleEditConcern}>
          <OverviewRow
            label="Concern"
            value={appointment.concern?.type || "N/A"}
          />
          <OverviewRow
            label="Severity"
            value={appointment.concern?.severity || "N/A"}
          />
          <OverviewRow
            label="How long?"
            value={
              appointment.concern
                ? `${appointment.concern.duration} ${appointment.concern.durationUnit}`
                : "N/A"
            }
          />
        </Section>

        {/* Basic Information Section */}
        <Section
          title="Basic information"
          showEdit
          onEdit={handleEditBasicInfo}
        >
          <OverviewRow label="Gender" value={user?.gender || "N/A"} />
          <OverviewRow
            label="Age"
            value={user?.age ? `${user.age} years` : "N/A"}
          />
          <OverviewRow
            label="Weight"
            value={user?.weight ? `${user.weight} kg` : "N/A"}
          />
        </Section>

        {/* Confirm Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Confirm Appointment"
            onPress={handleConfirmAppointment}
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
});
