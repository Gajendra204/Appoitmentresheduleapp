import type React from "react"
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image, Alert } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { router } from "expo-router"
import { MOCK_USER } from "../constants/mockData"
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from "../constants/theme"

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

export const ProfileScreen = () => {
  const handleMenuPress = (item: string) => {
    if (item === "My Appointments") {
      router.push("/(tabs)")
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
        {}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: MOCK_USER.avatar }} style={styles.avatar} />
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <MaterialIcons name="edit" size={16} color={COLORS.surface} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{MOCK_USER.name}</Text>
          <Text style={styles.userPhone}>{MOCK_USER.phone}</Text>
        </View>

        {}
        <View style={styles.completionCard}>
          <View style={styles.completionHeader}>
            <MaterialIcons name="person" size={20} color={COLORS.primary} />
            <Text style={styles.completionTitle}>Your Profile is {MOCK_USER.profileCompletion}% complete</Text>
            <MaterialIcons name="chevron-right" size={20} color={COLORS.text.disabled} />
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${MOCK_USER.profileCompletion}%` }]} />
          </View>
        </View>

        {}
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

        {}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.menuContainer}>
            <MenuItem icon="settings" title="Settings" onPress={() => handleMenuPress("Settings")} />
            <MenuItem icon="help" title="Help & Support" onPress={() => handleMenuPress("Help & Support")} />
            <MenuItem icon="info" title="About" onPress={() => handleMenuPress("About")} />
            <MenuItem icon="logout" title="Logout" onPress={() => handleMenuPress("Logout")} showArrow={false} />
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
  profileHeader: {
    alignItems: "center",
    paddingVertical: SPACING.xl,
    backgroundColor: COLORS.surface,
    marginBottom: SPACING.md,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: SPACING.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.surface,
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
    ...SHADOWS.small,
  },
  completionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  completionTitle: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text.primary,
    flex: 1,
    marginLeft: SPACING.sm,
  },
  progressBar: {
    height: 6,
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.sm,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.sm,
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
