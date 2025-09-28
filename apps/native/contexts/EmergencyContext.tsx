import React, { createContext, useContext, useState, useCallback } from "react";
import { Alert } from "react-native";
import * as Location from "expo-location";

interface EmergencyState {
  isEmergencyActive: boolean;
  emergencyLocation: Location.LocationObject | null;
  emergencyTimestamp: Date | null;
  emergencyId: string | null;
}

interface EmergencyContextType {
  emergencyState: EmergencyState;
  triggerEmergency: () => Promise<void>;
  cancelEmergency: () => void;
  isEmergencyActive: boolean;
}

const EmergencyContext = createContext<EmergencyContextType | undefined>(
  undefined
);

export const useEmergency = (): EmergencyContextType => {
  const context = useContext(EmergencyContext);
  if (!context) {
    throw new Error("useEmergency must be used within an EmergencyProvider");
  }
  return context;
};

export const EmergencyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [emergencyState, setEmergencyState] = useState<EmergencyState>({
    isEmergencyActive: false,
    emergencyLocation: null,
    emergencyTimestamp: null,
    emergencyId: null,
  });

  const triggerEmergency = useCallback(async () => {
    try {
      // Get current location
      let location: Location.LocationObject | null = null;
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          location = await Location.getCurrentPositionAsync({});
        }
      } catch (error) {
        console.warn("Could not get location for emergency:", error);
      }

      const emergencyId = `emergency_${Date.now()}`;
      const timestamp = new Date();

      setEmergencyState({
        isEmergencyActive: true,
        emergencyLocation: location,
        emergencyTimestamp: timestamp,
        emergencyId,
      });

      // Here you would typically send the emergency alert to:
      // - Emergency contacts
      // - Local authorities
      // - Your backend server
      console.log("🚨 EMERGENCY TRIGGERED:", {
        id: emergencyId,
        timestamp: timestamp.toISOString(),
        location: location
          ? {
              lat: location.coords.latitude,
              lng: location.coords.longitude,
            }
          : "Location unavailable",
      });

      // Simulate sending to backend/contacts
      await sendEmergencyAlert(emergencyId, location, timestamp);
    } catch (error) {
      console.error("Error triggering emergency:", error);
      Alert.alert("Error", "Failed to send emergency alert. Please try again.");
    }
  }, []);

  const cancelEmergency = useCallback(() => {
    if (emergencyState.emergencyId) {
      // Cancel the emergency alert
      console.log("❌ EMERGENCY CANCELLED:", emergencyState.emergencyId);
      // Here you would cancel the alert on backend/notify contacts
    }

    setEmergencyState({
      isEmergencyActive: false,
      emergencyLocation: null,
      emergencyTimestamp: null,
      emergencyId: null,
    });
  }, [emergencyState.emergencyId]);

  const contextValue: EmergencyContextType = {
    emergencyState,
    triggerEmergency,
    cancelEmergency,
    isEmergencyActive: emergencyState.isEmergencyActive,
  };

  return (
    <EmergencyContext.Provider value={contextValue}>
      {children}
    </EmergencyContext.Provider>
  );
};

// Simulate sending emergency alert to backend/contacts
async function sendEmergencyAlert(
  emergencyId: string,
  location: Location.LocationObject | null,
  timestamp: Date
): Promise<void> {
  // This would be your actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("✅ Emergency alert sent successfully");
      resolve();
    }, 1000);
  });
}
