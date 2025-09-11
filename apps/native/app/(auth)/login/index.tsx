import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../../styles/colors";
import LoginForm from "../../../components/ui/LoginForm";

export default function login() {
  return (
    <View style={styles.container}>
      <LoginForm />
      <Link href={'/auth/register'}>
        <Text style={styles.textStyle}>
          Don't have an account? Sign up
        </Text>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    gap: 10,
  },

  textStyle: {
    textAlign: "center",
    marginTop: 10,
    color: colors["zinc-500"]
  }
})
