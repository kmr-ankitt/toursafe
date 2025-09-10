import { StyleSheet, Text, TextStyle } from "react-native";
import colors from "../styles/colors";

type RTextProps = {
  children: string;
  style?: TextStyle | TextStyle[];
};

export default function RText({ children, style }: RTextProps) {
  return (
    <Text style={[styles.text, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colors['zinc-100'],
    fontSize: 16,
  },
});
