import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { date, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "./Button";
import RText from "../RText";
import colors from "../../styles/colors";
import { router } from "expo-router";
import { storeData } from "../../utils/storage";
import { generateCode } from "../../utils/code";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useState } from "react";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  phn_no: z.string().min(10, "Phone number must be at least 10 digits"),
  dob: z.date(),
  gender: z.enum(["male", "female", "other"]),
  aadhar_no: z.string().min(12, "Aadhar number must be at least 12 digits").max(12, "Aadhar number must be of 12 digits"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type FormData = z.infer<typeof schema>;

export default function RegisterForm() {
  const [dob, setDob] = useState<Date | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const pubId = "ankit";
    const code = generateCode();

    console.log(process.env.EXPO_PUBLIC_BACKEND_URL)
    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/tourists/register-tourist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          public_key: pubId, // Replace with actual public key if available
          code: code,
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


    router.push("/dashboard");
  };

  return (
    <View style={styles.container}>
      {/* Name */}
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Enter your name"
            placeholderTextColor={colors["zinc-200"]}
          />
        )}
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

      {/* Email */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Enter your email"
            placeholderTextColor={colors["zinc-200"]}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      {/* Phone Number */}
      <Controller
        control={control}
        name="phn_no"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Enter your phone number"
            placeholderTextColor={colors["zinc-200"]}
            keyboardType="phone-pad"
          />
        )}
      />
      {errors.phn_no && <Text style={styles.error}>{errors.phn_no.message}</Text>}

      {/* Date of Birth */}
      <Controller
        control={control}
        name="dob"
        render={({ field: { onChange, value } }) => {
          const showDatepicker = () => {
            DateTimePickerAndroid.open({
              value: value || new Date(),
              onChange: (_, selectedDate) => {
                if (selectedDate) {
                  setDob(selectedDate);
                  onChange(selectedDate);
                }
              },
              mode: "date",
              is24Hour: true,
              maximumDate: new Date(),
            });
          };

          return (
            <View style={{ width: "80%", marginBottom: 10 }}>
              <TouchableOpacity
                style={styles.input}
                onPress={showDatepicker}
              >
                <Text style={{ color: colors["zinc-200"], paddingTop: 10 }}>
                  {value ? value.toDateString() : "Select Date of Birth"}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
      {errors.dob && <Text style={styles.error}>{errors.dob.message}</Text>}

      {/* Gender */}
      <Controller
        control={control}
        name="gender"
        render={({ field: { onChange, value } }) => (
          <View style={{ flexDirection: "row", marginBottom: 10, width: "80%", justifyContent: "space-between" }}>
            {["male", "female", "other"].map(option => (
              <TouchableOpacity
                key={option}
                style={{
                  backgroundColor: value === option ? colors["zinc-800"] : "transparent",
                  padding: 8,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: colors["zinc-200"],
                  flex: 1,
                  alignItems: "center",
                  marginHorizontal: 2,
                }}
                onPress={() => onChange(option)}
              >
                <Text style={{ color: colors["zinc-200"] }}>{option.charAt(0).toUpperCase() + option.slice(1)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
      {errors.gender && <Text style={styles.error}>{errors.gender.message}</Text>}

      {/* Aadhar Number */}
      <Controller
        control={control}
        name="aadhar_no"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Enter your Aadhar number"
            placeholderTextColor={colors["zinc-200"]}
            keyboardType="numeric"
          />
        )}
      />
      {errors.aadhar_no && <Text style={styles.error}>{errors.aadhar_no.message}</Text>}

      {/* Password */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Enter your password"
            placeholderTextColor={colors["zinc-200"]}
            secureTextEntry
          />
        )}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <RText style={styles.buttonText}>Register</RText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  input: {
    width: "80%",
    height: 40,
    borderColor: colors["zinc-200"],
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: colors["zinc-200"],
    backgroundColor: colors["zinc-900"], // subtle background
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors["zinc-800"],
    padding: 10,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: colors["zinc-200"],
    fontWeight: "bold",
  },
}); 