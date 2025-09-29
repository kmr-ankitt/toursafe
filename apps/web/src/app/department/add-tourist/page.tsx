"use client";
import React, { useState } from "react";
import Navbar from "@/components/department/Tnavabar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AddTouristPage() {
  const [form, setForm] = useState({
    name: "",
    phn_no: "",
    email: "",
    dob: "",
    gender: "",
    public_key: ""
  });
  const router = useRouter();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/add-tourist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      setForm({ name: "", phn_no: "", email: "", dob: "", gender: "", public_key: "" });
      router.push("/department/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      {/* Navbar */}
      <Navbar />

      {/* Page Header */}
      <h1 className="text-3xl font-bold text-orange-700 mt-10 mb-6">Add Tourist</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-[400px] flex flex-col gap-4 border border-amber-700">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="p-2 rounded border border-amber-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
          required
        />
        <input
          name="phn_no"
          value={form.phn_no}
          onChange={handleChange}
          placeholder="Phone Number"
          className="p-2 rounded border border-amber-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
          required
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="p-2 rounded border border-amber-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
          required
        />
        <input
          name="dob"
          value={form.dob}
          onChange={handleChange}
          placeholder="Date of Birth"
          type="date"
          className="p-2 rounded border border-amber-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
        />
        <input
          name="gender"
          value={form.gender}
          onChange={handleChange}
          placeholder="Gender"
          className="p-2 rounded border border-amber-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
        />
        <input
          name="public_key"
          value={form.public_key}
          onChange={handleChange}
          placeholder="Public Key"
          className="p-2 rounded border border-amber-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
        />

        <Button
          type="submit"
          className="bg-orange-700 text-white rounded-full font-bold hover:bg-orange-800 hover:shadow-lg transition-all"
        >
          Add Tourist
        </Button>
      </form>
    </div>
  );
}
