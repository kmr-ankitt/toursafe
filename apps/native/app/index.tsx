import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Dimensions } from "react-native";
import colors from "../styles/colors";
import { Link } from "expo-router";
import RText from "../components/RText";
import Button from "../components/ui/Button";

const { width, height } = Dimensions.get("window");

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.gradient}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.iconContainer}>
            <RText style={styles.iconEmoji}>🧭</RText>
          </View>
          <RText style={styles.hero}>TourSafe</RText>
          <RText style={styles.tagline}>Your Trusted Travel Companion</RText>
          <RText style={styles.description}>
            Experience worry-free travel with our comprehensive safety platform.
            Get real-time location tracking, instant emergency support, and
            connect with verified travel companions worldwide.
          </RText>
        </View>

        {/* Action Section */}
        <View style={styles.actionSection}>
          <Link href={"/register"} asChild>
            <Button
              value="Get Started"
              width={width * 0.8}
              onSubmit={() => {}}
              variant="primary"
            />
          </Link>

          <View style={styles.loginContainer}>
            <RText style={styles.loginText}>Already have an account?</RText>
            <Link href={"/login"} asChild>
              <Button
                value="Sign In"
                width={width * 0.8}
                onSubmit={() => {}}
                variant="outline"
              />
            </Link>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <RText style={styles.footerText}>Safe travels start here 🌍</RText>
        </View>
      </View>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    backgroundColor: colors["zinc-950"],
    position: "relative",
  },
  headerSection: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors["blue-600"],
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
    shadowColor: colors["blue-500"],
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
    borderWidth: 3,
    borderColor: colors["blue-400"],
  },
  iconEmoji: {
    fontSize: 42,
    color: colors["zinc-100"],
  },
  hero: {
    color: colors["zinc-100"],
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: 1.5,
    textShadowColor: colors["zinc-900"],
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    color: colors["blue-400"],
    fontSize: 20,
    textAlign: "center",
    marginBottom: 24,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  description: {
    color: colors["zinc-400"],
    fontSize: 16,
    textAlign: "center",
    lineHeight: 26,
    paddingHorizontal: 20,
    maxWidth: width * 0.9,
    letterSpacing: 0.3,
  },
  actionSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    paddingVertical: 32,
  },
  loginContainer: {
    alignItems: "center",
    gap: 16,
    marginTop: 24,
  },
  loginText: {
    color: colors["zinc-400"],
    fontSize: 16,
    textAlign: "center",
    fontWeight: "400",
  },
  footer: {
    alignItems: "center",
    paddingBottom: 20,
    paddingTop: 20,
  },
  footerText: {
    color: colors["zinc-500"],
    fontSize: 14,
    textAlign: "center",
    fontStyle: "italic",
    letterSpacing: 0.5,
  },
});
