import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../styles/colors";
import RText from "../../components/RText";

export default function Dashboard() {
  return (
    <View>
      <Text>Dashboard Screen</Text>
      <Link href={'/dashboard/map/index'} asChild>
        <TouchableOpacity style={styles.button}>
          <RText style={styles.buttonText}>Goto Map</RText>
        </TouchableOpacity>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors['zinc-950'],
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  hero: {
    color: colors['zinc-100'],
    fontSize: 35,
    fontWeight: 'bold',
  },
  text: {
    color: colors['zinc-500'],
    fontSize: 15,
  },
  buttonText :{
    color: colors['zinc-100'],
  },
  button: {
    backgroundColor: colors['zinc-800'],
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  }
});
