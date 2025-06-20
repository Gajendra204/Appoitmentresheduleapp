import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { StyleSheet } from "react-native"
import { COLORS } from "../constants/theme"

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <StatusBar style="light" backgroundColor={COLORS.primary} />
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerTintColor: COLORS.text.inverse,
            headerTitleStyle: {
              fontWeight: "600",
            },
            contentStyle: {
              backgroundColor: COLORS.background,
            },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="appointment/[id]"
            options={{
              title: "Appointment Details",
              presentation: "card",
            }}
          />
          <Stack.Screen
            name="reschedule/[id]"
            options={{
              title: "Reschedule Reason",
              presentation: "modal",
            }}
          />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
