import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from "react-native"
import { router } from "expo-router"
import { MOCK_APPOINTMENTS, MOCK_USER } from "../../constants/mockData"
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS, BORDER_RADIUS } from "../../constants/theme"

export default function Home() {
  const handleViewAppointmentDetails = (appointmentId: string) => {
    router.push(`/appointment/${appointmentId}`)
  }

  const handleJoinCall = () => {
    console.log("Joining call...")
  }

  const handleProfilePress = () => {
    router.push("/(tabs)/explore")
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Namaste Mayank</Text>
            <Text style={styles.subGreeting}>Welcome to Affixam</Text>
          </View>
          <TouchableOpacity onPress={handleProfilePress}>
            <Image source={{ uri: MOCK_USER.avatar }} style={styles.profileAvatar} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <TouchableOpacity style={styles.searchContainer}>
          <Text style={styles.searchPlaceholder}>🔍 Search</Text>
        </TouchableOpacity>

        {/* Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Special Gifting options for your special ones</Text>
        </View>

        {/* Upcoming Appointments Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Appointment</Text>

          {/* First Appointment Card */}
          <View style={styles.appointmentCard}>
            <View style={styles.cardHeader}>
              <Image source={{ uri: MOCK_APPOINTMENTS[0].doctor.avatar }} style={styles.doctorAvatar} />
              <View style={styles.doctorInfo}>
                <Text style={styles.doctorName}>Dr. Deepa Godara</Text>
                <Text style={styles.specialization}>Orthodontist</Text>
                <Text style={styles.status}>Upcoming</Text>
              </View>
            </View>

            <View style={styles.appointmentInfo}>
              <Text style={styles.dateTime}>📅 Tuesday, 13/09/2023</Text>
              <Text style={styles.dateTime}>🕐 10:30 AM</Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.viewDetailButton}
                onPress={() => handleViewAppointmentDetails(MOCK_APPOINTMENTS[0].id)}
              >
                <Text style={styles.viewDetailText}>View Detail</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.joinCallButton} onPress={handleJoinCall}>
                <Text style={styles.joinCallText}>Join Call</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Second Appointment Card with Countdown */}
          <View style={styles.appointmentCard}>
            <View style={styles.cardHeader}>
              <Image source={{ uri: MOCK_APPOINTMENTS[1].doctor.avatar }} style={styles.doctorAvatar} />
              <View style={styles.doctorInfo}>
                <Text style={styles.doctorName}>Dr. Deepa Godara</Text>
                <Text style={styles.specialization}>Orthodontist</Text>
                <Text style={styles.status}>Upcoming</Text>
              </View>
            </View>

            <View style={styles.appointmentInfo}>
              <Text style={styles.dateTime}>📅 Tuesday, 13/09/2023</Text>
              <Text style={styles.dateTime}>🕐 10:30 AM</Text>
            </View>

            <View style={styles.countdownContainer}>
              <Text style={styles.countdown}>Your video consultation starts in 3:52 hour</Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.viewDetailButton}
                onPress={() => handleViewAppointmentDetails(MOCK_APPOINTMENTS[1].id)}
              >
                <Text style={styles.viewDetailText}>View Detail</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.joinCallButton, styles.disabledButton]} disabled>
                <Text style={[styles.joinCallText, styles.disabledText]}>Join Call</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: SPACING.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.lg,
  },
  greeting: {
    ...TYPOGRAPHY.h1,
    color: COLORS.text.primary,
  },
  subGreeting: {
    ...TYPOGRAPHY.body2,
    color: COLORS.text.secondary,
    marginTop: 2,
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchContainer: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: 25,
    marginBottom: SPACING.lg,
    ...SHADOWS.small,
  },
  searchPlaceholder: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text.disabled,
  },
  banner: {
    backgroundColor: COLORS.primary,
    padding: SPACING.lg,
    borderRadius: 12,
    marginBottom: SPACING.lg,
    ...SHADOWS.medium,
  },
  bannerText: {
    ...TYPOGRAPHY.body1,
    color: COLORS.surface,
    textAlign: "center",
    fontWeight: "500",
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
  appointmentCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginVertical: SPACING.sm,
    ...SHADOWS.medium,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.md,
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SPACING.md,
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
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.sm,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  viewDetailText: {
    ...TYPOGRAPHY.button,
    color: COLORS.primary,
  },
  joinCallButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.sm,
    alignItems: "center",
  },
  joinCallText: {
    ...TYPOGRAPHY.button,
    color: COLORS.surface,
  },
  disabledButton: {
    backgroundColor: COLORS.text.disabled,
  },
  disabledText: {
    color: COLORS.surface,
  },
})
