import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  BORDER_RADIUS,
  COLORS,
  SHADOWS,
  SPACING,
  TYPOGRAPHY,
} from "../../constants/theme";
import { useApp } from "../../contexts/AppContext";

export default function Home() {
  const { state } = useApp();
  const [refreshing, setRefreshing] = useState(false);

  const handleViewAppointmentDetails = (appointmentId: string) => {
    router.push(`/appointment/${appointmentId}`);
  };

  const handleJoinCall = (appointmentId: string) => {
    console.log("Joining call for appointment:", appointmentId);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const upcomingAppointments = state.appointments.filter(
    (apt) => apt.status === "upcoming"
  );

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.scrollContent}
      >
        {}
        <View style={styles.headerContainer}>
          <View style={styles.curvedHeader}>
            {}
            <SafeAreaView>
              <View style={styles.statusBarContent}>
                <View style={styles.statusIcons}>
                  <Text style={styles.timeText}>12:30</Text>
                </View>
              </View>
            </SafeAreaView>

            {}
            <View style={styles.headerIcons}>
              <TouchableOpacity style={styles.iconButton}>
                <MaterialIcons
                  name="shopping-bag"
                  size={24}
                  color={COLORS.surface}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <MaterialIcons
                  name="shopping-cart"
                  size={24}
                  color={COLORS.surface}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <MaterialIcons name="eco" size={24} color={COLORS.surface} />
              </TouchableOpacity>
            </View>

            {}
            <View style={styles.greetingContainer}>
              <Text style={styles.greeting}>
                Namaste {state.user?.name?.split(" ")[0] || "Mayank"}
              </Text>
              <Text style={styles.subGreeting}>Welcome to Amrutam</Text>
            </View>

            {}
            <View style={styles.natureIllustrations}>
              {}
              <View style={styles.tree1} />
              <View style={styles.tree2} />
              <View style={styles.mountain1} />
              <View style={styles.mountain2} />
            </View>
          </View>
        </View>

        {}
        <View style={styles.contentArea}>
          {}
          <TouchableOpacity style={styles.searchContainer}>
            <MaterialIcons
              name="search"
              size={20}
              color={COLORS.text.disabled}
            />
          </TouchableOpacity>

          <View style={styles.bannerContainer}>
            <Image
              source={require("../../assets/images/banner.png")}
              style={styles.bannerImage}
              resizeMode="cover"
            />
           
          </View>

          {}
          <View style={styles.appointmentSection}>
            <Text style={styles.sectionTitle}>Upcoming Appointment</Text>

            {upcomingAppointments.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  No upcoming appointments
                </Text>
              </View>
            ) : (
              upcomingAppointments.slice(0, 1).map((appointment) => (
                <View key={appointment.id} style={styles.appointmentCard}>
                  <View style={styles.appointmentHeader}>
                    <View style={styles.doctorInfo}>
                      <Text style={styles.doctorName}>
                        {appointment.doctor.name}
                      </Text>
                      <Text style={styles.specialization}>
                        {appointment.doctor.specialization}
                      </Text>
                      <View style={styles.statusContainer}>
                        <View style={styles.statusDot} />
                        <Text style={styles.statusText}>Upcoming</Text>
                      </View>
                    </View>
                    <Image
                      source={{ uri: appointment.doctor.avatar }}
                      style={styles.doctorAvatar}
                    />
                  </View>

                  <View style={styles.appointmentDetails}>
                    <View style={styles.detailRow}>
                      <MaterialIcons
                        name="calendar-today"
                        size={16}
                        color={COLORS.text.secondary}
                      />
                      <Text style={styles.detailText}>
                        {appointment.date
                          ? `Date: ${appointment.date}`
                          : "Date not set"}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <MaterialIcons
                        name="access-time"
                        size={16}
                        color={COLORS.text.secondary}
                      />
                      <Text style={styles.detailText}>
                        {appointment.time
                          ? `Time: ${appointment.time}`
                          : "Time not set"}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.appointmentActions}>
                    <TouchableOpacity
                      style={styles.viewDetailButton}
                      onPress={() =>
                        handleViewAppointmentDetails(appointment.id)
                      }
                    >
                      <Text style={styles.viewDetailText}>View Detail</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.joinCallButton}
                      onPress={() => handleJoinCall(appointment.id)}
                    >
                      <Text style={styles.joinCallText}>Join Call</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>

          {}
          <View style={styles.giftingSection}>
            <Text style={styles.giftingText}>
              Special Gifting options, for your special ones
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
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
  scrollContent: {
    paddingBottom: 100, // Space for bottom navigation
  },
  headerContainer: {
    position: "relative",
    height: 200,
  },
  curvedHeader: {
    height: 200,
    backgroundColor: "#7FB069", // Light green gradient start
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: "relative",
    overflow: "hidden",
  },
  statusBarContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingTop: 10,
  },
  statusIcons: {
    flex: 1,
    alignItems: "flex-end",
  },
  timeText: {
    color: COLORS.surface,
    fontSize: 14,
    fontWeight: "500",
  },
  headerIcons: {
    position: "absolute",
    top: 50,
    right: SPACING.md,
    flexDirection: "row",
    gap: SPACING.sm,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  greetingContainer: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
  },
  greeting: {
    ...TYPOGRAPHY.h1,
    color: COLORS.surface,
    fontSize: 24,
    fontWeight: "600",
  },
  subGreeting: {
    ...TYPOGRAPHY.body1,
    color: "rgba(255, 255, 255, 0.9)",
    marginTop: 4,
  },
  natureIllustrations: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  tree1: {
    position: "absolute",
    right: 20,
    bottom: 0,
    width: 60,
    height: 60,
    backgroundColor: "#5A8A3A",
    borderRadius: 30,
    opacity: 0.7,
  },
  tree2: {
    position: "absolute",
    right: 80,
    bottom: 10,
    width: 40,
    height: 50,
    backgroundColor: "#4A7C2A",
    borderRadius: 20,
    opacity: 0.6,
  },
  mountain1: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: 100,
    height: 40,
    backgroundColor: "#6B9B4F",
    borderTopRightRadius: 50,
    opacity: 0.5,
  },
  mountain2: {
    position: "absolute",
    left: 80,
    bottom: 0,
    width: 80,
    height: 30,
    backgroundColor: "#5A8A3F",
    borderTopRightRadius: 40,
    opacity: 0.4,
  },
  contentArea: {
    flex: 1,
    paddingHorizontal: SPACING.md,
    marginTop: -20, 
  },
  searchContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: 25,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    flexDirection: "row",
    alignItems: "center",
    ...SHADOWS.small,
  },
  bannerContainer: {
    height: 178,
    borderRadius: BORDER_RADIUS.lg,
    overflow: "hidden",
    marginBottom: SPACING.lg,
    position: "relative",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#8B4513", 
  },
  
  bannerDescription: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 14,
    lineHeight: 20,
  },
  appointmentSection: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
    fontSize: 18,
    fontWeight: "600",
  },
  emptyState: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl,
    alignItems: "center",
    ...SHADOWS.small,
  },
  emptyStateText: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text.secondary,
  },
  appointmentCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.medium,
  },
  appointmentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: SPACING.md,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text.primary,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  specialization: {
    ...TYPOGRAPHY.body2,
    color: COLORS.text.secondary,
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFA500", 
    marginRight: 6,
  },
  statusText: {
    ...TYPOGRAPHY.caption,
    color: "#FFA500",
    fontWeight: "500",
    textTransform: "uppercase",
  },
  doctorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: SPACING.md,
  },
  appointmentDetails: {
    marginBottom: SPACING.lg,
    gap: SPACING.xs,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
  detailText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.text.secondary,
  },
  appointmentActions: {
    flexDirection: "row",
    gap: SPACING.md,
  },
  viewDetailButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.text.disabled,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: 12,
    alignItems: "center",
  },
  viewDetailText: {
    ...TYPOGRAPHY.button,
    color: COLORS.text.primary,
    fontWeight: "500",
  },
  joinCallButton: {
    flex: 1,
    backgroundColor: "#4A7C59",
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: 12,
    alignItems: "center",
  },
  joinCallText: {
    ...TYPOGRAPHY.button,
    color: COLORS.surface,
    fontWeight: "500",
  },
  giftingSection: {
    alignItems: "center",
    paddingVertical: SPACING.lg,
  },
  giftingText: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text.secondary,
    textAlign: "center",
    fontStyle: "italic",
  },
});
