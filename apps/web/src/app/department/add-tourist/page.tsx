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
      
      router.push("/department/dashboard")
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center">
      <Navbar />
      <h1 className="text-3xl font-bold text-white mt-10 mb-6">Add Tourist</h1>
      <form onSubmit={handleSubmit} className="bg-black p-8 rounded-lg shadow-lg w-[400px] flex flex-col gap-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="p-2 rounded bg-black text-white border border-gray-700" required />
        <input name="phn_no" value={form.phn_no} onChange={handleChange} placeholder="Phone Number" className="p-2 rounded bg-black text-white border border-gray-700" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="p-2 rounded bg-black text-white border border-gray-700" required />
        <input name="dob" value={form.dob} onChange={handleChange} placeholder="Date of Birth" type="date" className="p-2 rounded bg-black text-white border border-gray-700" />
        <input name="gender" value={form.gender} onChange={handleChange} placeholder="Gender" className="p-2 rounded bg-black text-white border border-gray-700" />
        <input name="public_key" value={form.public_key} onChange={handleChange} placeholder="Public Key" className="p-2 rounded bg-black text-white border border-gray-700" />
        <Button type="submit" className="bg-white text-black rounded-full font-bold hover:bg-black hover:text-white transition-colors"
          onClick={async (e) => {
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
          }}
        >Add Tourist</Button>
      </form>
    </div>
  );
}
