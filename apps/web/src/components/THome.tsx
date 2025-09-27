"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./Tnavabar";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { User, MessageSquare, Star, X } from "lucide-react";

interface TripRow {
  id: string;
  name: string;
  destination: string;
  duration: string;
  publicKey: string;
}

export default function THome() {
  const [rows, setRows] = useState<TripRow[]>([]);
  const [touristData, setTouristData] = useState<TripRow[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [publicKeyInput, setPublicKeyInput] = useState("");

  // Fetch tourist.json from public folder
  useEffect(() => {
    fetch("/tourist.json")
      .then((res) => res.json())
      .then((data) => setTouristData(data))
      .catch((err) => console.error("Error fetching tourist data:", err));
  }, []);

  const handleAddTourist = () => setModalOpen(true);

  const handleSubmit = () => {
    const matched = touristData.find((t) => t.publicKey === publicKeyInput);
    if (matched) {
      setRows((prev) => [...prev, matched]);
      setModalOpen(false);
      setPublicKeyInput("");
    } else {
      alert("Public key not found!");
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* ===== Header ===== */}
      <div className="pt-24 flex flex-col items-center text-center px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-wide">
          Tourist Department Dashboard
        </h1>
        <p className="mt-4 text-gray-400 text-lg max-w-xl">
          Manage and monitor all tourist trip details in one secure place.
        </p>
      </div>

      {/* ===== Table Section ===== */}
      <div className="mt-20 flex flex-col items-center px-4 w-full">
        <div className="w-full max-w-5xl flex flex-col items-center relative">
          {/* Add Tourist button – top-right corner */}
          <div className="w-full flex justify-end mb-4">
            <Button
              className="bg-white text-black px-6 py-2 rounded-full shadow-lg font-semibold text-lg tracking-wide border-2 border-white hover:bg-black hover:text-white transition-colors duration-200"
              onClick={handleAddTourist}
            >
              Add Tourist
            </Button>
          </div>

          {/* Tourist Table */}
          <table className="w-full bg-gray-900 text-white rounded-lg shadow-xl border border-gray-700 overflow-hidden">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-xs md:text-sm font-bold uppercase tracking-wider border-b border-gray-700">
                  Tourist ID
                </th>
                <th className="px-6 py-4 text-left text-xs md:text-sm font-bold uppercase tracking-wider border-b border-gray-700">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs md:text-sm font-bold uppercase tracking-wider border-b border-gray-700">
                  Destination
                </th>
                <th className="px-6 py-4 text-left text-xs md:text-sm font-bold uppercase tracking-wider border-b border-gray-700">
                  Duration
                </th>
              </tr>
            </thead>

            <tbody className="bg-black">
              {rows.length > 0 ? (
                rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-800 transition-colors">
                    <td className="px-6 py-4 border-b border-gray-700">{row.id}</td>
                    <td className="px-6 py-4 border-b border-gray-700">{row.name}</td>
                    <td className="px-6 py-4 border-b border-gray-700">{row.destination}</td>
                    <td className="px-6 py-4 border-b border-gray-700">{row.duration}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center text-gray-500 text-lg">
                    No tourist added yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== Modal ===== */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-[400px] relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
              onClick={() => setModalOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-white mb-4">Enter Public Key</h2>
            <input
              type="text"
              value={publicKeyInput}
              onChange={(e) => setPublicKeyInput(e.target.value)}
              className="w-full p-2 rounded border border-gray-700 bg-gray-800 text-white mb-4"
              placeholder="Enter tourist public key"
            />
            <Button
              className="w-full bg-white text-black hover:bg-black hover:text-white transition-colors"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      )}

      {/* ===== Feedback Section ===== */}
      <div className="mt-20 w-full flex flex-col items-center">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-green-400" /> User Feedback
        </h2>

        <div className="w-full flex flex-row flex-wrap justify-center gap-6 px-4">
          {[
            {
              id: 1,
              user: "Amit Kumar",
              feedback: "The Tourist Department Dashboard is very easy to navigate and manage tourist information.",
              rating: 5,
            },
            {
              id: 2,
              user: "Priya Sharma",
              feedback: "I like the clean design and the way trips are listed. It makes my work faster.",
              rating: 4,
            },
            {
              id: 3,
              user: "John Doe",
              feedback: "The dashboard loads quickly and securely stores all my data. Great job!",
              rating: 5,
            },
          ].map((item) => (
            <Card
              key={item.id}
              className="w-[320px] mb-6 p-5 rounded-lg bg-gray-900 text-white shadow hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-400" />
                  <span className="font-semibold text-lg">{item.user}</span>
                </div>
                <span className="flex gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400" />
                  ))}
                  {[...Array(5 - item.rating)].map((_, i) => (
                    <Star key={i + item.rating} className="w-4 h-4 text-gray-600" />
                  ))}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MessageSquare className="w-4 h-4 text-green-400 mt-1" />
                <p className="text-gray-300 text-sm">{item.feedback}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
