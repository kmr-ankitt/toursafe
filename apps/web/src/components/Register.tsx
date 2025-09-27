"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { generateCode } from "@/lib/utils";

export default function Register() {
  const [activeTab, setActiveTab] = useState<"tourist" | "police">("tourist");
  const [formData, setFormData] = useState({
    name: "",
    region: "",
    phn_no: "",
    password: "",
    tourist_id: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/tourist-department/register-tourist-department", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to register");
      }

      const department = await res.json();
      console.log("Department registered:", department);

      router.push("/dashboard");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="min-h-screen text-white flex flex-col">
      <Navbar />

      <div className="flex flex-col items-center justify-center flex-1 py-10">
        <h1 className="text-4xl font-bold mb-8">Register to Portal.</h1>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab("tourist")}
            className={`px-6 py-2 rounded ${
              activeTab === "tourist" ? "bg-white text-black" : "bg-white-700"
            }`}
          >
            Tourist Department
          </button>
          <button
            onClick={() => setActiveTab("police")}
            className={`px-6 py-2 rounded ${
              activeTab === "police" ? "bg-white text-black" : "bg-white-700"
            }`}
          >
            Police Department
          </button>
        </div>

        {/* Form Container */}
        <div className="p-8 rounded shadow-md w-full max-w-md">
          {activeTab === "tourist" ? (
            <form className="flex flex-col space-y-4" onSubmit={onSubmit}>
              <label className="flex flex-col">
                Name
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="p-2 rounded text-white border border-white opacity-50"
                />
              </label>

              <label className="flex flex-col">
                Region
                <input
                  type="text"
                  name="region"
                  required
                  value={formData.region}
                  onChange={handleChange}
                  className="p-2 rounded text-white border border-white opacity-50"
                />
              </label>

              <label className="flex flex-col">
                Phone No
                <input
                  type="tel"
                  name="phn_no"
                  required
                  value={formData.phn_no}
                  onChange={handleChange}
                  className="p-2 rounded text-white border border-white opacity-50"
                />
              </label>

              <label className="flex flex-col">
                Tourist ID
                <input
                  type="text"
                  name="tourist_id"
                  value={formData.tourist_id}
                  onChange={handleChange}
                  className="p-2 rounded text-white border border-white opacity-50"
                />
              </label>

              <label className="flex flex-col">
                Password
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="p-2 rounded text-white border border-white opacity-50"
                />
              </label>

              <button type="submit" className="bg-white text-black px-6 py-2 rounded mt-4">
                Register as Tourist
              </button>
            </form>
          ) : (
            <form className="flex flex-col space-y-4">
              <label className="flex flex-col">
                Police ID
                <input
                  type="text"
                  name="policeId"
                  required
                  className="p-2 rounded text-black border border-white opacity-25"
                />
              </label>

              <label className="flex flex-col">
                Password
                <input
                  type="password"
                  name="password"
                  required
                  className="p-2 rounded text-black border border-white opacity-25"
                />
              </label>

              <button type="submit" className="bg-white text-black px-6 py-2 rounded mt-4">
                Register as Police
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
