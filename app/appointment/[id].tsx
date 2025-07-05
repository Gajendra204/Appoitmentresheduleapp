import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import type React from "react";
import { useEffect, useState } from "react";
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MOCK_APPOINTMENTS } from "../../constants/mockData";
import {
  BORDER_RADIUS,
  COLORS,
  SHADOWS,
  SPACING,
  TYPOGRAPHY,
} from "../../constants/theme";

interface MenuItemProps {
  title: string;
  onPress: () => void;
  showArrow?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  title,
  onPress,
  showArrow = true,
}) => (
  <TouchableOpacity
    style={styles.menuItem}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={styles.menuItemText}>{title}</Text>
    {showArrow && (
      <MaterialIcons
        name="chevron-right"
        size={20}
        color={COLORS.text.disabled}
      />
    )}
  </TouchableOpacity>
);

interface CancelDialogProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const CancelDialog: React.FC<CancelDialogProps> = ({
  visible,
  onCancel,
  onConfirm,
}) => (
  <Modal visible={visible} transparent animationType="fade">
    <View style={styles.modalOverlay}>
      <View style={styles.cancelDialog}>
        <Text style={styles.dialogTitle}>Cancel Appointment</Text>
        <Text style={styles.dialogMessage}>
          Are you sure you want to cancel your appointment?
        </Text>

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
);

interface DetailRowProps {
  label: string;
  value: string;
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

interface ExpandableSectionProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const ExpandableSection: React.FC<ExpandableSectionProps> = ({
  title,
  isExpanded,
  onToggle,
  children,
}) => (
  <View style={styles.expandableSection}>
    <TouchableOpacity style={styles.sectionHeader} onPress={onToggle}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <MaterialIcons
        name={isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
        size={24}
        color={COLORS.text.secondary}
      />
    </TouchableOpacity>
    {isExpanded && children}
  </View>
);


const AppointmentDetailsScreen: React.FC = () => {
  const { id, cancelled } = useLocalSearchParams<{
    id: string;
    cancelled?: string;
  }>();
  const appointment = MOCK_APPOINTMENTS.find((apt) => apt.id === id);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
    const [areDetailsExpanded, setAreDetailsExpanded] = useState(false);

  useEffect(() => {
    if (cancelled === "true") {
      setIsCancelled(true);
    }
  }, [cancelled]);

  const toggleDetails = () => {
    setAreDetailsExpanded(!areDetailsExpanded);
  };

  const handleReschedule = () => {
    router.push(`/reschedule/${appointment?.id}`);
  };

  const handleCancelPress = () => {
    setShowCancelDialog(true);
  };

  const handleCancelConfirm = () => {
    setShowCancelDialog(false);
    router.push(`/cancel-reason/${appointment?.id}`);
  };

  const handleCancelDialogClose = () => {
    setShowCancelDialog(false);
  };

  const handleTrackRefund = () => {
    router.push(`/refund-tracking/${appointment?.id}`);
  };

  const handleMenuPress = (item: string) => {
    if (item === "Appointment Details") {
      router.push(`/appointment-detail-view/${appointment?.id}` as any);
    } else {
      console.log(`${item} pressed`);
    }
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
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Appointment Details</Text>
          <View style={styles.placeholder} />
        </View>

        {}
        <View style={styles.doctorCard}>
          <Text style={{ color: 'black' }}>I am rendering</Text>
          <Image
            source={require("../../assets/images/doctor.png")}
            style={styles.doctorAvatar}
          />
          <View style={styles.doctorInfo}>
            <View style={styles.doctorNameRow}>
              <Text style={styles.doctorLabel}>Doctor name</Text>
              <Text style={styles.doctorName}>{appointment.doctor.name}</Text>
            </View>
            {isCancelled && (
              <View style={styles.cancelledInfo}>
                <Text style={styles.cancelledText}>
                  This appointment has been cancelled.
                </Text>
                <TouchableOpacity onPress={handleTrackRefund}>
                  <Text style={styles.trackRefundText}>Track refund</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>


        <ExpandableSection
          title="Appointment Details"
          isExpanded={areDetailsExpanded}
          onToggle={toggleDetails}
        >
          <View style={styles.detailsContainer}>
            <DetailRow label="Appointment ID" value="APPL#10247816" />
            <DetailRow label="Appointment Type" value="Freemedia" />
            <DetailRow label="Appointment fee" value="0 INR" />
            <DetailRow label="Duration" value="1 min" />
            <DetailRow
              label="Appointment date"
              value={appointment.date || "N/A"}
            />
            <DetailRow
              label="Appointment time"
              value={appointment.time || "N/A"}
            />
            <DetailRow label="Booking Status" value="Completed" />
            <DetailRow label="Routine Status" value="Not assigned" />
            <DetailRow label="Expert" value={appointment.doctor.name} />
          </View>
        </ExpandableSection>

        <View style={styles.menuContainer}>
          <MenuItem
            title="Symptoms Details"
            onPress={() => console.log("Symptoms Details pressed")}
          />
          <MenuItem
            title="Coupons Details"
            onPress={() => console.log("Coupons Details pressed")}
          />
          <MenuItem
            title="Booking Details"
            onPress={() => console.log("Booking Details pressed")}
          />
          <MenuItem
            title="Medical Report"
            onPress={() => console.log("Medical Report pressed")}
          />
        </View>

        {!isCancelled && (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.rescheduleButton}
              onPress={handleReschedule}
            >
              <Text style={styles.rescheduleText}>Reschedule Appointment</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelAppointmentButton}
              onPress={handleCancelPress}
            >
              <Text style={styles.cancelAppointmentText}>
                Cancel Appointment
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <CancelDialog
        visible={showCancelDialog}
        onCancel={handleCancelDialogClose}
        onConfirm={handleCancelConfirm}
      />
    </SafeAreaView>
  );
};


export default function AppointmentDetails() {
  return <AppointmentDetailsScreen />;
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
    flexDirection: "column",
    alignItems: "center",
    ...SHADOWS.medium,
  },
  doctorAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginRight: SPACING.md,
  },
  doctorInfo: {
    alignSelf: "stretch",
    alignItems: "flex-start",
  },
  doctorNameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SPACING.md,
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
    borderWidth:1,
    borderColor: COLORS.divider,
    ...SHADOWS.small,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
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

   expandableSection: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.md,
    // marginBottom: SPACING.xs,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth:1,
     borderColor: COLORS.divider,
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
  comingSoonText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.text.secondary,
    textAlign: "center",
    paddingVertical: SPACING.md,
  },
});
