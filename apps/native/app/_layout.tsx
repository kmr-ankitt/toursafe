import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import colors from "../styles/colors";

export default function RootScreenLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: colors["zinc-950"] },
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
    </>
  )
}
