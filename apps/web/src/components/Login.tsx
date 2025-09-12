"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function Register() {
  const [activeTab, setActiveTab] = useState<"tourist" | "police">("tourist");
  const router = useRouter();

  return (
    <div className=" min-h-screen text-white flex flex-col">
      <Navbar />

      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-4xl font-bold mb-8">Login to Portal.</h1>

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
            <form
              className="flex flex-col space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                // Add your login logic here
                router.push("/tourist-Dashboard");
              }}
            >
              <label className="flex flex-col">
                Phone No
                <input
                  type="tel"
                  name="phone"
                  required
                  className="p-2 rounded text-white border border-white opacity-50"
                />
              </label>

              <label className="flex flex-col">
                Password
                <input
                  type="text"
                  name="name"
                  required
                  className="p-2 rounded text-white border border-white opacity-50"
                />
              </label>

              <button
                type="submit"
                className="bg-white text-black px-6 py-2 rounded mt-4"
              >
                Login as Tourist
              </button>
            </form>
          ) : (
            <form
              className="flex flex-col space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                // Add your police login logic here
                router.push("/police-dashboard");
              }}
            >
              <label className="flex flex-col">
                Police ID
                <input
                  type="text"
                  name="policeId"
                  required
                  className="p-2 rounded text-white  border border-white opacity-60"
                />
              </label>

              <label className="flex flex-col">
                Password
                <input
                  type="text"
                  name="region"
                  required
                  className="p-2 rounded text-white border border-white opacity-60"
                />
              </label>

              <button
                type="submit"
                className="bg-white text-black px-6 py-2 rounded mt-4"
              >
                Login as Police
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
