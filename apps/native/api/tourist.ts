import { router } from "expo-router";
import { FormData } from "../components/ui/RegisterForm";
import { storeData } from "../utils/storage";

const URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export async function registerTourists(data: FormData) {
  try {
    const res = await fetch(`${URL}/api/tourist/register`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
      name: data.name,
      phn_no: data.phn_no,
      email: data.email,
      dob: data.dob,
      gender: data.gender,
      aadhar_no: data.aadhar_no,
      password: data.password,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to register tourist");
    }

    const tourist = await res.json();
    storeData(tourist.public_key);
    router.replace("/dashboard");
    console.log("Tourist created:", tourist);
  } catch (err) {
    console.error("Error creating tourist:", err);
  }
}

export async function loginTourist(data: { email: string; password: string }) {
  try {
    const res = await fetch(`${URL}/api/tourist/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to login tourist");
    }

    const tourist = await res.json();
    storeData(tourist.public_key);
    router.replace("/dashboard");
    console.log("Tourist logged in:", tourist);
  } catch (err) {
    console.error("Error logging in tourist:", err);
  }
}