import { Tabs } from "expo-router"
import { MaterialIcons } from "@expo/vector-icons"
import { COLORS, TYPOGRAPHY } from "../../constants/theme"

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.surface,
        tabBarInactiveTintColor: "rgba(255, 255, 255, 0.6)",
        tabBarStyle: {
          backgroundColor: "#4A7C59", 
          borderTopWidth: 0,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        tabBarLabelStyle: {
          ...TYPOGRAPHY.caption,
          fontWeight: "500",
          fontSize: 11,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <MaterialIcons name="home" size={22} color={color} />,
        }}
      />
      
     
    </Tabs>
  )
}
