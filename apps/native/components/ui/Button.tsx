import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../styles/colors";

type ButtonProps = {
  value: string;
  width?: any;
  onSubmit?: any;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "outline";
};

export default function Button({
  value,
  width,
  onSubmit,
  disabled,
  variant = "primary",
}: ButtonProps) {
  const getButtonStyle = () => {
    switch (variant) {
      case "secondary":
        return {
          backgroundColor: colors["zinc-700"],
          borderWidth: 1,
          borderColor: colors["zinc-600"],
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: colors["blue-500"],
        };
      default: // primary
        return {
          backgroundColor: colors["blue-500"],
          borderWidth: 0,
        };
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case "outline":
        return {
          color: colors["blue-400"],
        };
      default:
        return {
          color: colors["zinc-100"],
        };
    }
  };

  return (
    <TouchableOpacity
      onPress={() => onSubmit()}
      disabled={disabled}
      style={[
        styles.button,
        getButtonStyle(),
        {
          width: width || "60%",
          opacity: disabled ? 0.6 : 1,
        },
      ]}
      activeOpacity={0.8}
    >
      <Text style={[styles.buttonTextLabel, getTextStyle()]}>{value}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
    marginVertical: 6,
  },
  buttonTextLabel: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: 0.5,
  },
});
