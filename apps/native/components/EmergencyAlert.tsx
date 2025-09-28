import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Animated,
  Dimensions,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import RText from "./RText";
import colors from "../styles/colors";
import { useEmergency } from "../contexts/EmergencyContext";

interface EmergencyAlertProps {
  position?: "bottom-right" | "bottom-center" | "top-right" | "custom";
  style?: any;
  size?: "small" | "medium" | "large";
  showLabel?: boolean;
}

const { width, height } = Dimensions.get("window");

export default function EmergencyAlert({
  position = "bottom-right",
  style,
  size = "medium",
  showLabel = true,
}: EmergencyAlertProps) {
  const { isEmergencyActive, triggerEmergency, cancelEmergency } =
    useEmergency();
  const pulseAnimation = useRef(new Animated.Value(1)).current;
  const scaleAnimation = useRef(new Animated.Value(1)).current;

  // Pulse animation when emergency is active
  useEffect(() => {
    if (isEmergencyActive) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnimation, {
            toValue: 1.3,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnimation, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();

      return () => pulse.stop();
    } else {
      pulseAnimation.setValue(1);
    }
  }, [isEmergencyActive, pulseAnimation]);

  const handlePress = () => {
    // Scale animation on press
    Animated.sequence([
      Animated.timing(scaleAnimation, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    if (isEmergencyActive) {
      // Cancel emergency
      Alert.alert(
        "Cancel Emergency Alert",
        "Are you sure you want to cancel the emergency alert?",
        [
          { text: "No", style: "cancel" },
          {
            text: "Yes, Cancel",
            style: "destructive",
            onPress: cancelEmergency,
          },
        ]
      );
    } else {
      // Trigger emergency
      Alert.alert(
        "🚨 Emergency Alert",
        "This will immediately send your location to emergency contacts and authorities. Continue?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Send Alert",
            style: "destructive",
            onPress: () => {
              triggerEmergency();
              Alert.alert(
                "Emergency Alert Sent!",
                "Your location and emergency alert have been sent to your contacts and local authorities. Help is on the way.",
                [{ text: "OK" }]
              );
            },
          },
        ]
      );
    }
  };

  const getButtonSize = () => {
    switch (size) {
      case "small":
        return { width: 50, height: 50 };
      case "medium":
        return { width: 70, height: 70 };
      case "large":
        return { width: 90, height: 90 };
      default:
        return { width: 70, height: 70 };
    }
  };

  const getIconSize = () => {
    switch (size) {
      case "small":
        return 20;
      case "medium":
        return 28;
      case "large":
        return 36;
      default:
        return 28;
    }
  };

  const getPositionStyle = () => {
    const buttonSize = getButtonSize();
    const margin = 20;

    switch (position) {
      case "bottom-right":
        return {
          position: "absolute" as const,
          bottom: margin,
          right: margin,
        };
      case "bottom-center":
        return {
          position: "absolute" as const,
          bottom: margin,
          left: (width - buttonSize.width) / 2,
        };
      case "top-right":
        return {
          position: "absolute" as const,
          top: 60,
          right: margin,
        };
      case "custom":
        return {};
    }
  };

  const buttonSize = getButtonSize();
  const iconSize = getIconSize();
  const positionStyle = getPositionStyle();

  return (
    <View style={[positionStyle, style]}>
      {/* Emergency Status Overlay */}
      {isEmergencyActive && (
        <View style={styles.emergencyStatusOverlay}>
          <View style={styles.blurView}>
            <View style={styles.statusContainer}>
              <FontAwesome6
                name="shield-heart"
                size={16}
                color={colors["red-400"]}
              />
              <RText style={styles.statusText}>Emergency Active</RText>
            </View>
          </View>
        </View>
      )}

      {/* Main Emergency Button */}
      <Animated.View
        style={[
          {
            transform: [{ scale: scaleAnimation }, { scale: pulseAnimation }],
          },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.emergencyButton,
            buttonSize,
            isEmergencyActive ? styles.emergencyButtonActive : {},
          ]}
          onPress={handlePress}
          activeOpacity={0.8}
        >
          <FontAwesome6
            name={isEmergencyActive ? "shield-heart" : "triangle-exclamation"}
            size={iconSize}
            color="white"
          />

          {/* Emergency Ring Animation */}
          {isEmergencyActive && (
            <Animated.View
              style={[
                styles.emergencyRing,
                buttonSize,
                {
                  transform: [{ scale: pulseAnimation }],
                  opacity: pulseAnimation.interpolate({
                    inputRange: [1, 1.3],
                    outputRange: [0.6, 0],
                  }),
                },
              ]}
            />
          )}
        </TouchableOpacity>
      </Animated.View>

      {/* Label */}
      {showLabel && (
        <View style={styles.labelContainer}>
          <RText style={styles.label}>
            {isEmergencyActive ? "Emergency Active" : "Emergency"}
          </RText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  emergencyButton: {
    backgroundColor: colors["red-600"],
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: colors["red-500"],
    shadowColor: colors["red-600"],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  emergencyButtonActive: {
    backgroundColor: colors["red-700"],
    borderColor: colors["red-400"],
    shadowColor: colors["red-400"],
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 12,
  },
  emergencyRing: {
    position: "absolute",
    borderRadius: 35,
    borderWidth: 2,
    borderColor: colors["red-400"],
    backgroundColor: "transparent",
  },
  emergencyStatusOverlay: {
    position: "absolute",
    top: -45,
    left: -20,
    right: -20,
    zIndex: 1,
  },
  blurView: {
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 6,
  },
  statusText: {
    color: colors["red-400"],
    fontSize: 12,
    fontWeight: "600",
  },
  labelContainer: {
    marginTop: 8,
    alignItems: "center",
  },
  label: {
    color: colors["zinc-400"],
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
});
