import { router } from "expo-router";
import { FormData } from "../components/ui/RegisterForm";
import { storeData } from "../utils/storage";
import { Alert } from "react-native";

const URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export async function registerTourists(data: FormData) {
  console.log("🚀 Starting registration process...");
  console.log("📍 Backend URL:", URL);

  try {
    // Format date properly for backend
    const formattedData = {
      name: data.name,
      phn_no: data.phn_no,
      email: data.email,
      dob: data.dob.toISOString(), // Convert Date to ISO string
      gender: data.gender,
      aadhar_no: data.aadhar_no,
      password: data.password,
    };

    console.log("📤 Sending registration data:", {
      ...formattedData,
      password: "[REDACTED]",
    });

    const requestUrl = `${URL}/api/tourist/register`;
    console.log("🌐 Making request to:", requestUrl);

    const res = await fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedData),
    });

    console.log("📥 Response status:", res.status);
    console.log(
      "📥 Response headers:",
      Object.fromEntries(res.headers.entries())
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ Error response text:", errorText);

      let error;
      try {
        error = JSON.parse(errorText);
      } catch {
        error = {
          message: errorText || `HTTP ${res.status}: ${res.statusText}`,
        };
      }

      Alert.alert(
        "Registration Failed",
        error.message || "Failed to register tourist"
      );
      throw new Error(error.message || "Failed to register tourist");
    }

    const tourist = await res.json();
    console.log("✅ Registration successful:", tourist);

    await storeData(tourist.public_key);
    Alert.alert("Success!", "Registration completed successfully");
    router.replace("/dashboard");
  } catch (err) {
    console.error("💥 Registration error:", err);

    if (
      err instanceof TypeError &&
      err.message.includes("Network request failed")
    ) {
      Alert.alert(
        "Network Error",
        "Unable to connect to server. Please check:\n• Internet connection\n• Server is running\n• Correct tunnel URL"
      );
    } else if (err instanceof Error) {
      Alert.alert("Error", err.message);
    } else {
      Alert.alert("Unknown Error", "Something went wrong during registration");
    }
  }
}

export async function loginTourist(data: { email: string; password: string }) {
  console.log("🔐 Starting login process...");
  console.log("📍 Backend URL:", URL);
  console.log("📤 Login attempt for email:", data.email);

  try {
    const requestUrl = `${URL}/api/tourist/login`;
    console.log("🌐 Making request to:", requestUrl);

    const res = await fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    console.log("📥 Response status:", res.status);
    console.log(
      "📥 Response headers:",
      Object.fromEntries(res.headers.entries())
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ Error response text:", errorText);

      let error;
      try {
        error = JSON.parse(errorText);
      } catch {
        error = {
          message: errorText || `HTTP ${res.status}: ${res.statusText}`,
        };
      }

      Alert.alert("Login Failed", error.message || "Failed to login");
      throw new Error(error.message || "Failed to login tourist");
    }

    const tourist = await res.json();
    console.log("✅ Login successful:", tourist);

    await storeData(tourist.public_key);
    Alert.alert("Success!", "Login successful");
    router.replace("/dashboard");
  } catch (err) {
    console.error("💥 Login error:", err);

    if (
      err instanceof TypeError &&
      err.message.includes("Network request failed")
    ) {
      Alert.alert(
        "Network Error",
        "Unable to connect to server. Please check:\n• Internet connection\n• Server is running\n• Correct tunnel URL"
      );
    } else if (err instanceof Error) {
      Alert.alert("Error", err.message);
    } else {
      Alert.alert("Unknown Error", "Something went wrong during login");
    }
  }
}
