import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from "react-native"
import { router } from "expo-router"
import { MOCK_APPOINTMENTS, MOCK_USER } from "../constants/mockData"
import { AppointmentCard } from "../components/AppointmentCard"
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS } from "../constants/theme"

export const HomeScreen = () => {
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
        {}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Namaste Mayank</Text>
            <Text style={styles.subGreeting}>Welcome to Affixam</Text>
          </View>
          <TouchableOpacity onPress={handleProfilePress}>
            <Image source={{ uri: MOCK_USER.avatar }} style={styles.profileAvatar} />
          </TouchableOpacity>
        </View>

        {}
        <TouchableOpacity style={styles.searchContainer}>
          <Text style={styles.searchPlaceholder}>🔍 Search</Text>
        </TouchableOpacity>

        {}
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Special Gifting options for your special ones</Text>
        </View>

        {}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Appointment</Text>
          {MOCK_APPOINTMENTS.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onViewDetails={() => handleViewAppointmentDetails(appointment.id)}
              onJoinCall={handleJoinCall}
            />
          ))}
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
})
