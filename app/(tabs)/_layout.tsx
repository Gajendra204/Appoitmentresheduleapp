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
      <Tabs.Screen
        name="store"
        options={{
          title: "Store",
          tabBarIcon: ({ color, size }) => <MaterialIcons name="store" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="consult"
        options={{
          title: "Consult",
          tabBarIcon: ({ color, size }) => <MaterialIcons name="video-call" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="forum"
        options={{
          title: "Forum",
          tabBarIcon: ({ color, size }) => <MaterialIcons name="forum" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="bulletin"
        options={{
          title: "Bulletin",
          tabBarIcon: ({ color, size }) => <MaterialIcons name="article" size={22} color={color} />,
        }}
      />
    </Tabs>
  )
}
