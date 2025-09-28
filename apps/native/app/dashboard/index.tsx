import { Link, router } from "expo-router";
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  Alert,
  TouchableOpacity,
  Animated,
} from "react-native";
import colors from "../../styles/colors";
import RText from "../../components/RText";
import Button from "../../components/ui/Button";
import { removeData } from "../../utils/storage";
import { StatusBar } from "expo-status-bar";
import { useState, useRef, useEffect } from "react";

const { width, height } = Dimensions.get("window");

export default function Dashboard() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const sidebarAnimation = useRef(new Animated.Value(-width * 0.85)).current;
  const overlayAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(sidebarAnimation, {
        toValue: sidebarVisible ? 0 : -width * 0.85,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(overlayAnimation, {
        toValue: sidebarVisible ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [sidebarVisible]);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  const handleLogout = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: () => {
          removeData();
          router.replace("/");
        },
      },
    ]);
  };

  const handleEmergency = () => {
    Alert.alert(
      "Emergency Alert",
      "This will send your location to emergency contacts and authorities. Continue?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Send Alert",
          style: "destructive",
          onPress: () => {
            // TODO: Implement emergency alert functionality
            Alert.alert(
              "Emergency Alert Sent",
              "Your location and emergency alert have been sent to your contacts and local authorities."
            );
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Sidebar Overlay */}
      {sidebarVisible && (
        <Animated.View style={[styles.overlay, { opacity: overlayAnimation }]}>
          <TouchableOpacity
            style={styles.overlayTouchable}
            onPress={closeSidebar}
            activeOpacity={1}
          />
        </Animated.View>
      )}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section with Menu Button */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton} onPress={toggleSidebar}>
            <RText style={styles.menuIcon}>☰</RText>
          </TouchableOpacity>

          <View style={styles.welcomeSection}>
            <RText style={styles.welcomeText}>Welcome to</RText>
            <RText style={styles.appTitle}>TourSafe</RText>
            <RText style={styles.subtitle}>Your Travel Safety Dashboard</RText>
          </View>

          <View style={styles.statusCard}>
            <View style={styles.statusIndicator}>
              <View style={styles.statusDot} />
              <RText style={styles.statusText}>You're Safe & Connected</RText>
            </View>
          </View>
        </View>

        {/* Quick Actions Section */}
        <View style={styles.section}>
          <RText style={styles.sectionTitle}>Quick Actions</RText>
          <RText style={styles.sectionDescription}>
            Essential safety tools at your fingertips
          </RText>

          <View style={styles.quickActionsGrid}>
            <TouchableOpacity
              style={styles.emergencyButton}
              onPress={handleEmergency}
            >
              <View style={styles.actionIconContainer}>
                <RText style={styles.actionIcon}>🚨</RText>
              </View>
              <RText style={styles.actionTitle}>Emergency</RText>
              <RText style={styles.actionSubtitle}>Send instant alert</RText>
            </TouchableOpacity>

            <Link href={"/dashboard/map"} asChild>
              <TouchableOpacity style={styles.actionCard}>
                <View style={styles.actionIconContainer}>
                  <RText style={styles.actionIcon}>🗺️</RText>
                </View>
                <RText style={styles.actionTitle}>Live Map</RText>
                <RText style={styles.actionSubtitle}>Track your location</RText>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>

      {/* Sidebar */}
      <Animated.View
        style={[
          styles.sidebar,
          { transform: [{ translateX: sidebarAnimation }] },
        ]}
      >
        <View style={styles.sidebarHeader}>
          <RText style={styles.sidebarTitle}>Menu</RText>
          <TouchableOpacity
            style={styles.closeSidebarButton}
            onPress={closeSidebar}
          >
            <RText style={styles.closeSidebarText}>✕</RText>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.sidebarScrollView}
          contentContainerStyle={styles.sidebarScrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Account Section */}
          <View style={styles.sidebarSection}>
            <RText style={styles.sidebarSectionTitle}>Account</RText>

            <TouchableOpacity style={styles.sidebarMenuItem}>
              <View style={styles.sidebarMenuIcon}>
                <RText style={styles.sidebarMenuEmoji}>👤</RText>
              </View>
              <View style={styles.sidebarMenuContent}>
                <RText style={styles.sidebarMenuTitle}>Profile Settings</RText>
                <RText style={styles.sidebarMenuSubtitle}>
                  Manage your profile
                </RText>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sidebarMenuItem}>
              <View style={styles.sidebarMenuIcon}>
                <RText style={styles.sidebarMenuEmoji}>📞</RText>
              </View>
              <View style={styles.sidebarMenuContent}>
                <RText style={styles.sidebarMenuTitle}>
                  Emergency Contacts
                </RText>
                <RText style={styles.sidebarMenuSubtitle}>
                  Manage emergency contacts
                </RText>
              </View>
            </TouchableOpacity>
          </View>

          {/* Safety Features Section */}
          <View style={styles.sidebarSection}>
            <RText style={styles.sidebarSectionTitle}>Safety Features</RText>
            <RText style={styles.sidebarSectionDescription}>
              How TourSafe keeps you protected
            </RText>

            <View style={styles.featuresContainer}>
              <View style={styles.featureCard}>
                <View style={styles.featureIconContainer}>
                  <RText style={styles.featureIcon}>📍</RText>
                </View>
                <View style={styles.featureContent}>
                  <RText style={styles.featureTitle}>
                    Real-time Location Tracking
                  </RText>
                  <RText style={styles.featureDescription}>
                    Share your live location with trusted contacts and emergency
                    services.
                  </RText>
                </View>
              </View>

              <View style={styles.featureCard}>
                <View style={styles.featureIconContainer}>
                  <RText style={styles.featureIcon}>👥</RText>
                </View>
                <View style={styles.featureContent}>
                  <RText style={styles.featureTitle}>
                    Travel Companion Network
                  </RText>
                  <RText style={styles.featureDescription}>
                    Connect with verified travelers and local guides for safer
                    journeys.
                  </RText>
                </View>
              </View>

              <View style={styles.featureCard}>
                <View style={styles.featureIconContainer}>
                  <RText style={styles.featureIcon}>🚨</RText>
                </View>
                <View style={styles.featureContent}>
                  <RText style={styles.featureTitle}>Emergency Response</RText>
                  <RText style={styles.featureDescription}>
                    One-tap emergency alerts to authorities and your emergency
                    contacts.
                  </RText>
                </View>
              </View>

              <View style={styles.featureCard}>
                <View style={styles.featureIconContainer}>
                  <RText style={styles.featureIcon}>🛡️</RText>
                </View>
                <View style={styles.featureContent}>
                  <RText style={styles.featureTitle}>Safety Monitoring</RText>
                  <RText style={styles.featureDescription}>
                    24/7 monitoring of your travel status with automated
                    check-ins.
                  </RText>
                </View>
              </View>

              <View style={styles.featureCard}>
                <View style={styles.featureIconContainer}>
                  <RText style={styles.featureIcon}>🌍</RText>
                </View>
                <View style={styles.featureContent}>
                  <RText style={styles.featureTitle}>Global Coverage</RText>
                  <RText style={styles.featureDescription}>
                    Worldwide support and local emergency service integration.
                  </RText>
                </View>
              </View>

              <View style={styles.featureCard}>
                <View style={styles.featureIconContainer}>
                  <RText style={styles.featureIcon}>🔒</RText>
                </View>
                <View style={styles.featureContent}>
                  <RText style={styles.featureTitle}>Privacy Protection</RText>
                  <RText style={styles.featureDescription}>
                    Your location data is encrypted and only shared with
                    approved contacts.
                  </RText>
                </View>
              </View>
            </View>
          </View>

          {/* Sign Out Section */}
          <View style={styles.sidebarSection}>
            <Button
              value="Sign Out"
              width="100%"
              onSubmit={handleLogout}
              variant="outline"
            />
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors["zinc-950"],
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
  overlayTouchable: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 30,
    position: "relative",
  },
  menuButton: {
    position: "absolute",
    top: 70,
    left: 24,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors["zinc-800"],
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors["zinc-700"],
    zIndex: 1,
  },
  menuIcon: {
    color: colors["zinc-100"],
    fontSize: 20,
    fontWeight: "bold",
  },
  welcomeSection: {
    alignItems: "center",
    marginBottom: 24,
    marginTop: 20,
  },
  welcomeText: {
    color: colors["zinc-400"],
    fontSize: 16,
    textAlign: "center",
    marginBottom: 8,
  },
  appTitle: {
    color: colors["zinc-100"],
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: 1,
    textShadowColor: colors["zinc-900"],
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    color: colors["blue-400"],
    fontSize: 18,
    textAlign: "center",
    fontWeight: "500",
  },
  statusCard: {
    backgroundColor: colors["zinc-900"],
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors["zinc-800"],
  },
  statusIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors["green-500"],
    marginRight: 12,
    shadowColor: colors["green-500"],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  statusText: {
    color: colors["zinc-100"],
    fontSize: 16,
    fontWeight: "600",
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  sectionTitle: {
    color: colors["zinc-100"],
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  sectionDescription: {
    color: colors["zinc-400"],
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 22,
  },
  quickActionsGrid: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-between",
  },
  emergencyButton: {
    flex: 1,
    backgroundColor: colors["red-600"],
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors["red-500"],
    shadowColor: colors["red-600"],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  actionCard: {
    flex: 1,
    backgroundColor: colors["zinc-800"],
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors["zinc-700"],
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  actionIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors["zinc-700"],
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  actionIcon: {
    fontSize: 28,
  },
  actionTitle: {
    color: colors["zinc-100"],
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },
  actionSubtitle: {
    color: colors["zinc-400"],
    fontSize: 14,
    textAlign: "center",
  },
  // Sidebar Styles
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width * 0.85,
    height: height,
    backgroundColor: colors["zinc-900"],
    zIndex: 2,
    borderRightWidth: 1,
    borderRightColor: colors["zinc-700"],
  },
  sidebarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors["zinc-800"],
  },
  sidebarTitle: {
    color: colors["zinc-100"],
    fontSize: 24,
    fontWeight: "bold",
  },
  closeSidebarButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors["zinc-800"],
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors["zinc-700"],
  },
  closeSidebarText: {
    color: colors["zinc-400"],
    fontSize: 16,
    fontWeight: "bold",
  },
  sidebarScrollView: {
    flex: 1,
  },
  sidebarScrollContent: {
    paddingBottom: 40,
  },
  sidebarSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors["zinc-800"],
  },
  sidebarSectionTitle: {
    color: colors["zinc-100"],
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  sidebarSectionDescription: {
    color: colors["zinc-400"],
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  sidebarMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: colors["zinc-800"],
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors["zinc-700"],
  },
  sidebarMenuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors["blue-600"],
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  sidebarMenuEmoji: {
    fontSize: 20,
  },
  sidebarMenuContent: {
    flex: 1,
  },
  sidebarMenuTitle: {
    color: colors["zinc-100"],
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  sidebarMenuSubtitle: {
    color: colors["zinc-400"],
    fontSize: 12,
  },
  // Feature Cards (reused from previous implementation)
  featuresContainer: {
    gap: 12,
  },
  featureCard: {
    backgroundColor: colors["zinc-800"],
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: colors["zinc-700"],
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors["blue-600"],
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    flexShrink: 0,
  },
  featureIcon: {
    fontSize: 20,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    color: colors["zinc-100"],
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  featureDescription: {
    color: colors["zinc-400"],
    fontSize: 12,
    lineHeight: 16,
  },
});
