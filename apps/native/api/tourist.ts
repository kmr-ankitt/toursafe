import { FormData } from "../components/ui/RegisterForm";
import { storeData } from "../utils/storage";

const URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export async function registerTourists(data: FormData) {
  const pubId = "ankit";
  try {
    const res = await fetch(`${URL}/api/tourists/register-tourist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        public_key: pubId, // Replace with actual public key if available
        name: data.name,
        phn_no: data.phn_no,
        email: data.email,
        dob: data.dob.toISOString(),
        gender: data.gender,
        aadhar_no: data.aadhar_no,
      }),
    });
    storeData(pubId);

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to register tourist");
    }

    const tourist = await res.json();
    console.log("Tourist created:", tourist);
  } catch (err) {
    console.error("Error creating tourist:", err);
  }
}

