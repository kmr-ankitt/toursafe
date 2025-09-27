"use client";

import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function Intro() {
  const router = useRouter();

  return (
    <div className="min-h-screen text-white ">
      <Navbar />

      <div className="flex flex-col items-center justify-start text-center px-4 pt-20 sm:pt-28">
        <h1 className="text-4xl sm:text-6xl md:text-6xl font-bold mb-10 leading-tight bg-gradient-to-b from-white via-gray-200 to-gray-400 text-transparent bg-clip-text">
          <span className="block mb-2">Where Tourism,</span>
          <span className="block">Meets Security.</span>
        </h1>

        <p className="text-xl sm:text-2xl mb-12 max-w-xs sm:max-w-sm mx-auto leading-relaxed bg-gradient-to-b from-white via-gray-200 to-gray-400 text-transparent bg-clip-text">
          <span className="block mb-1">Ensure safe and secure,</span>
          <span className="block">tourism for all.</span>
        </p>

        {/* Buttons side by side */}
       {/* Buttons side by side */}
<div className="flex gap-6">
  <button
    onClick={() => router.push("/login")}
    className="bg-white text-black px-6 py-3 rounded-lg font-semibold 
               hover:bg-gray-300 transition-colors duration-500 ease-in-out"
  >
    Login
  </button>

  <button
    onClick={() => router.push("/register")}
    className="bg-white text-black px-6 py-3 rounded-lg font-semibold 
               hover:bg-gray-300 transition-colors duration-500 ease-in-out"
  >
    Register
  </button>
</div>

      </div>
    </div>
  );
}
