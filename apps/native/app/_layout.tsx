import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import colors from "../styles/colors";
import { EmergencyProvider } from "../contexts/EmergencyContext";

export default function RootScreenLayout() {
  return (
    <EmergencyProvider>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: colors["zinc-950"] },
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
    </EmergencyProvider>
  );
}
