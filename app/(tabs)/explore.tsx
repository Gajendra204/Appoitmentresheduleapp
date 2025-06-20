import type React from "react"
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image, Alert } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { router } from "expo-router"
import { MOCK_USER, MOCK_APPOINTMENTS } from "../../constants/mockData"
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from "../../constants/theme"

interface MenuItemProps {
  icon: keyof typeof MaterialIcons.glyphMap
  title: string
  onPress: () => void
  showArrow?: boolean
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, title, onPress, showArrow = true }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.menuItemLeft}>
      <MaterialIcons name={icon} size={24} color={COLORS.text.secondary} />
      <Text style={styles.menuItemText}>{title}</Text>
    </View>
    {showArrow && <MaterialIcons name="chevron-right" size={24} color={COLORS.text.disabled} />}
  </TouchableOpacity>
)

export default function ProfileScreen() {
  const handleMenuPress = (item: string) => {
    if (item === "My Appointments") {
      // Navigate to the first appointment details
      router.push(`/appointment/${MOCK_APPOINTMENTS[0].id}`)
    } else {
      Alert.alert("Coming Soon", `${item} feature will be available soon!`)
    }
  }

  const handleEditProfile = () => {
    Alert.alert("Edit Profile", "Profile editing feature coming soon!")
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: MOCK_USER.avatar }} style={styles.avatar} />
          </View>
          <Text style={styles.userName}>Mayank Singh</Text>
          <Text style={styles.userPhone}>+91782-49347</Text>
        </View>

        {/* Profile Completion */}
        <TouchableOpacity style={styles.completionCard}>
          <View style={styles.completionContent}>
            <MaterialIcons name="person" size={20} color={COLORS.primary} />
            <Text style={styles.completionText}>Your Profile is 60% complete</Text>
          </View>
          <MaterialIcons name="chevron-right" size={20} color={COLORS.text.disabled} />
        </TouchableOpacity>

        {/* Menu Section */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Ordering</Text>
          <View style={styles.menuContainer}>
            <MenuItem icon="store" title="Store" onPress={() => handleMenuPress("Store")} />
            <MenuItem icon="shopping-cart" title="Cart" onPress={() => handleMenuPress("Cart")} />
            <MenuItem icon="history" title="Order History" onPress={() => handleMenuPress("Order History")} />
            <MenuItem
              icon="calendar-today"
              title="My Appointments"
              onPress={() => handleMenuPress("My Appointments")}
            />
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
  },
  header: {
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.lg,
    alignItems: "center",
  },
  headerTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text.primary,
  },
  profileSection: {
    backgroundColor: COLORS.surface,
    alignItems: "center",
    paddingVertical: SPACING.xl,
    marginBottom: SPACING.md,
  },
  avatarContainer: {
    marginBottom: SPACING.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userName: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  userPhone: {
    ...TYPOGRAPHY.body2,
    color: COLORS.text.secondary,
  },
  completionCard: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...SHADOWS.small,
  },
  completionContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  completionText: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text.primary,
    marginLeft: SPACING.sm,
  },
  menuSection: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text.primary,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },
  menuContainer: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
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
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuItemText: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text.primary,
    marginLeft: SPACING.md,
  },
})
