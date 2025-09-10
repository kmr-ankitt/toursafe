"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function Login() {
  const [activeTab, setActiveTab] = useState<"tourist" | "police">("tourist");

  return (
    <div className=" min-h-screen text-white flex flex-col">
      <Navbar />

      <div className="flex flex-col items-center justify-center flex-grow">
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
        <div className=" p-8 rounded shadow-md w-full max-w-md">
          {activeTab === "tourist" ? (
            <form className="flex flex-col space-y-4">

              <label className="flex flex-col">
                Name
                <input type="text" name="name" required className="p-2 rounded text-black border border-white opacity-25" />
              </label>

              <label className="flex flex-col">
                Region
                <input type="text" name="area" required className="p-2 rounded text-black border border-white opacity-25" />
              </label>

              <label className="flex flex-col">
                Phone No
                <input type="tel" name="phone" required className="p-2 rounded text-black border border-white opacity-25" />
              </label>

              <label className="flex flex-col">
                Password
                <input type="text" name="name" required className="p-2 rounded text-black border border-white opacity-25" />
              </label>

              <button type="submit" className="bg-white text-black px-6 py-2 rounded mt-4">
                Register as Tourist
              </button>
            </form>
          ) : (
            <form className="flex flex-col space-y-4">
              <label className="flex flex-col">
                Police ID
                <input type="text" name="policeId" required className="p-2 rounded text-black border border-white opacity-25" />
              </label>

              <label className="flex flex-col">
                Name
                <input type="text" name="name" required className="p-2 rounded text-black border border-white opacity-25" />
              </label>

              <label className="flex flex-col">
                Region
                <input type="text" name="area" required className="p-2 rounded text-black border border-white opacity-25" />
              </label>

              <label className="flex flex-col">
                Phone No
                <input type="tel" name="phone" required className="p-2 rounded text-black border border-white opacity-25" />
              </label>

              <label className="flex flex-col">
                Password
                <input type="text" name="region" required className="p-2 rounded text-black border border-white opacity-25" />
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
