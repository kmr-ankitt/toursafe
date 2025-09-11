import { Stack } from 'expo-router'
import React from 'react'
import colors from '../../styles/colors'

export default function DashboardLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: colors["zinc-950"]
        },
        headerShown: false,
      }}
    />
  )
}
