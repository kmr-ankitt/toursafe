import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import colors from '../styles/colors';
import { Link } from 'expo-router';
import RText from '../components/RText';

export default function App() {
  return (
    <View style={styles.container}>
      <RText style={styles.hero}>Tourbuddy 👋</RText>
      <RText style={styles.text}>ur buddy our buddy tour buddy</RText>
      <Link href={'/register'} asChild>
        <TouchableOpacity style={styles.button}>
          <RText style={styles.buttonText}>Register</RText>
        </TouchableOpacity>
      </Link>
      <Link href={'/login'} asChild>
        <TouchableOpacity style={styles.button}>
          <RText style={styles.buttonText}>Login</RText>
        </TouchableOpacity>
      </Link>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  buttonText: {
    color: colors['zinc-100'],
  },
  button: {
    backgroundColor: colors['zinc-800'],
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: '60%',
    alignItems: 'center',
  }
});
