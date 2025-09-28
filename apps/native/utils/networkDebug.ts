import { Alert } from "react-native";

export async function testNetworkConnection() {
  const URL = process.env.EXPO_PUBLIC_BACKEND_URL;

  console.log("🔍 Testing network connection...");
  console.log("📍 Backend URL:", URL);

  if (!URL) {
    Alert.alert(
      "Configuration Error",
      "EXPO_PUBLIC_BACKEND_URL is not set in environment variables"
    );
    return false;
  }

  try {
    console.log("🌐 Testing connection to:", `${URL}/`);

    const response = await fetch(`${URL}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("📥 Test response status:", response.status);
    console.log(
      "📥 Test response headers:",
      Object.fromEntries(response.headers.entries())
    );

    if (response.ok) {
      const text = await response.text();
      console.log("✅ Server is reachable! Response:", text);
      Alert.alert(
        "Connection Test",
        `✅ Server is reachable!\nResponse: ${text}`
      );
      return true;
    } else {
      console.log("⚠️ Server responded with status:", response.status);
      Alert.alert(
        "Connection Test",
        `⚠️ Server responded with status: ${response.status}`
      );
      return false;
    }
  } catch (error) {
    console.error("💥 Network test failed:", error);

    if (
      error instanceof TypeError &&
      error.message.includes("Network request failed")
    ) {
      Alert.alert(
        "Network Test Failed",
        `❌ Cannot reach server at: ${URL}\n\nPossible issues:\n• Server is not running\n• Wrong tunnel URL\n• Network connectivity\n• Firewall blocking connection`
      );
    } else {
      Alert.alert("Network Test Failed", `❌ Error: ${error}`);
    }
    return false;
  }
}

export function getNetworkInfo() {
  const URL = process.env.EXPO_PUBLIC_BACKEND_URL;

  console.log("📋 Network Configuration:");
  console.log("  EXPO_PUBLIC_BACKEND_URL:", URL);
  console.log(
    "  Expected format: http://YOUR_LOCAL_IP:8000 or https://your-ngrok-url.ngrok.io"
  );
  console.log("  Current format valid:", URL?.includes("http") ? "✅" : "❌");
  console.log(
    "  Uses localhost:",
    URL?.includes("localhost") ? "❌ (Won't work on Android)" : "✅"
  );

  return {
    url: URL,
    isValid: Boolean(URL && URL.includes("http") && !URL.includes("localhost")),
  };
}
