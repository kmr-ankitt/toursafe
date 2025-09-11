import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../styles/colors";

export default function Button({ value, width, onSubmit, disabled}: { value: string, width?: any, onSubmit?: any, disabled?: boolean }) {
  return (
    <TouchableOpacity
      onPress={() => onSubmit()}
      disabled={disabled}
      style={{
        backgroundColor: colors["zinc-200"],
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 15,
        width: width || '60%',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
      }}
    >
      <Text
        style={styles.buttonTextLabel}
      >{value}</Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  buttonTextLabel: {
    color: colors["zinc-900"],
    fontSize: 16,
    fontWeight: '600',
    fontVariant: ['small-caps'],
  },
  buttonTextLabelPressed: {
    color: colors["zinc-500"], // Change to a visible color on press
    fontSize: 16,
    fontWeight: '600',
  },
});