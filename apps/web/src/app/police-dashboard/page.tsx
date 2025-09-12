"use client";
import Pnavbar from "@/components/Pnavbar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";



export default function PoliceDashboard() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      <Pnavbar/>
      {/* police logo */}
      <Image src="/police logo.png" alt="Police Logo" width={100} height={100} className="rounded-xl" />
      <h1 className="text-4xl font-bold  text-red-500  mt-10 mb-6">Police Department Dashboard</h1>
      <p className="text-xl text-white font-bold mb-10">Welcome to the police dashboard. Here you can manage and track tourist safety and incidents.</p>

      <Button
        className="bg-emerald-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-emerald-800 transition-colors mt-4"
        onClick={() => alert('Tracking tourist trips...')}
      >
        Tourist Tracker
      </Button>
      <h2 className="text-2xl font-bold text-white mt-10 mb-4">E-FIR Register</h2>
      <div className="w-full max-w-3xl overflow-x-auto">
        <table className="min-w-full bg-gray-900 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-2">E-FIR</th>
              <th className="px-4 py-2">Tourist Name</th>
              <th className="px-4 py-2">Registered At</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Location</th>
            </tr>
          </thead>
          <tbody>
            {/* Example data, replace with real data as needed */}
            <tr className="border-b border-gray-700">
              <td className="px-4 py-2">EFIR001</td>
              <td className="px-4 py-2">Amit Kumar</td>
              <td className="px-4 py-2">2025-09-10</td>
              <td className="px-4 py-2">Missing</td>
              <td className="px-4 py-2">Delhi</td>
            </tr>
            <tr className="border-b border-gray-700">
              <td className="px-4 py-2">EFIR002</td>
              <td className="px-4 py-2">Sara Lee</td>
              <td className="px-4 py-2">2025-09-11</td>
              <td className="px-4 py-2">Theft</td>
              <td className="px-4 py-2">Mumbai</td>
            </tr>
          </tbody>
        </table>
        <h2 className="text-2xl font-bold text-white mt-10 mb-4">Incident Reports</h2>
        <table className="min-w-full bg-gray-900 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-2">Report ID</th>
              <th className="px-4 py-2">Reported At</th>
              <th className="px-4 py-2">Location</th>
            </tr>
          </thead>
          <tbody>
            {/* Example data, replace with real data as needed */}
            <tr className="border-b border-gray-700">
              <td className="px-4 py-2">RPT001</td>
              <td className="px-4 py-2">2025-09-10</td>
              <td className="px-4 py-2">Delhi</td>
            </tr>
          </tbody>
        </table>

        {/* On Duty Police Officers Section */}
        <h2 className="text-2xl font-bold text-white mt-10 mb-4">On Duty Police Officers</h2>
        <div className="flex flex-row gap-6 justify-center mb-10">
          {/* Officer Card 1 */}
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 w-64 flex flex-col items-center">
            <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center text-white text-2xl font-bold mb-2">AK</div>
            <div className="text-lg font-semibold text-white">Amit Kumar</div>
            <div className="text-sm text-gray-300">Badge #1001</div>
            <div className="text-sm text-green-400 mt-2">On Duty</div>
          </div>
          {/* Officer Card 2 */}
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 w-64 flex flex-col items-center">
            <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center text-white text-2xl font-bold mb-2">SL</div>
            <div className="text-lg font-semibold text-white">Sara Lee</div>
            <div className="text-sm text-gray-300">Badge #1002</div>
            <div className="text-sm text-green-400 mt-2">On Duty</div>
          </div>
          {/* Officer Card 3 */}
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 w-64 flex flex-col items-center">
            <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center text-white text-2xl font-bold mb-2">RS</div>
            <div className="text-lg font-semibold text-white">Rahul Singh</div>
            <div className="text-sm text-gray-300">Badge #1003</div>
            <div className="text-sm text-green-400 mt-2">On Duty</div>
          </div>
        </div>
      </div>
      <footer className="w-full bg-gray-900 text-white text-center py-4 mt-12 rounded-t-xl">
        &copy; {new Date().getFullYear()} TourSafe Police Dashboard. All rights reserved.
      </footer>
    </div>
  );
}
