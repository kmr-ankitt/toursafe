import { useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import RText from "../RText";
import colors from "../../styles/colors";
import { router } from "expo-router";
import { loginTourist } from "../../api/tourist";
import { getData } from "../../utils/storage";

const schema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type FormData = z.infer<typeof schema>;


export default function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const checkLogin = async () => {
      const data = await getData();
      if (data) {
        router.replace("/dashboard");
      }
    };
    checkLogin();
  }, []);

  const onSubmit = async (data: FormData) => {
    console.log("✅ Form Submitted:", data);
    await loginTourist(data);
  };

  return (
    <View style={styles.container}>
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
        <RText style={styles.buttonText}>Login</RText>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    width: "80%",
    color: colors["zinc-200"],
    borderRadius: 5,
  },
  error: {
    color: colors["red-400"],
    textAlign: "left",
    marginBottom: 10,
  },
  buttonText: {
    color: colors["zinc-100"],
  },
  button: {
    backgroundColor: colors["zinc-800"],
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },
});
