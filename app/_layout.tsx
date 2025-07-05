import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { COLORS } from "../constants/theme";
import { AppProvider } from "../contexts/AppContext";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <AppProvider>
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
            <Stack.Screen name="(tabs)" options={{ headerShown: true }} />
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
            <Stack.Screen
              name="choose-date/[id]"
              options={{
                title: "Choose Date",
                presentation: "card",
              }}
            />
            <Stack.Screen
              name="choose-time/[id]"
              options={{
                title: "Choose Time",
                presentation: "card",
              }}
            />
            <Stack.Screen
              name="appointment-overview/[id]"
              options={{
                title: "Appointment Overview",
                presentation: "card",
              }}
            />
            <Stack.Screen
              name="appointment-confirmed/[id]"
              options={{
                title: "Appointment Confirmed",
                presentation: "fullScreenModal",
              }}
            />
            <Stack.Screen
              name="edit-basic-info/[id]"
              options={{
                title: "Basic Info",
                presentation: "card",
              }}
            />
            <Stack.Screen
              name="edit-concern/[id]"
              options={{
                title: "Your Concern",
                presentation: "card",
              }}
            />
            <Stack.Screen
              name="cancel-reason/[id]"
              options={{
                title: "Cancel Reason",
                presentation: "modal",
              }}
            />
            <Stack.Screen
              name="appointment-cancelled/[id]"
              options={{
                title: "Appointment Cancelled",
                presentation: "fullScreenModal",
              }}
            />
            <Stack.Screen
              name="refund-tracking/[id]"
              options={{
                title: "Refund Tracking",
                presentation: "card",
              }}
            />
          </Stack>
        </AppProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
