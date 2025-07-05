import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, TYPOGRAPHY } from "../../constants/theme";

export default function TabLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
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
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
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
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" size={22} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="explore"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="person" size={22} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
