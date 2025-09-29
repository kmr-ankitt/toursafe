"use client";

import React, { useState } from "react";
import { MessageSquare, Star, User, X, Search as SearchIcon } from "lucide-react";
import { tourist } from "@/constants/tourist";
import { useRouter } from "next/navigation";
import Navbar from "@/components/department/Tnavabar";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

interface TripRow {
  id: string;
  name: string;
  destination: string;
  duration: string;
  publicKey: string;
  lastLocation: { lat: number; lng: number };
  efir?: string;
}

export default function THome() {
  const router = useRouter();
  const [selectedEFIR, setSelectedEFIR] = useState<TripRow | null>(null);
  const [approvalStatus, setApprovalStatus] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const handleAddTourist = () => {
    router.push("/department/add-tourist");
  };

  const handleApprove = () => setApprovalStatus("✅ EFIR Approved");
  const handleDisapprove = () => setApprovalStatus("❌ EFIR Disapproved");

  // Filter tourists based on search query
  const displayedTourists = query
    ? tourist.filter((t) =>
        t.name.toLowerCase().includes(query.toLowerCase())
      )
    : tourist;

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* Navbar */}
      <Navbar />

      {/* Dashboard Header + Add Tourist Button */}
      <div className="mt-20 flex justify-between items-center px-10">
        <h1 className="text-5xl font-bold text-orange-700">Tourist Dashboard</h1>
        <Button
          className="px-6 py-2 bg-orange-700 text-white font-bold rounded-lg hover:bg-orange-800 transition-colors duration-200 shadow-md hover:shadow-lg"
          onClick={handleAddTourist}
        >
          Add Tourist
        </Button>
      </div>

      {/* Search Bar */}
      <div className="mt-6 px-10 max-w-2xl">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Tourist by Name..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-amber-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
          />
          <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Table Section */}
      <div className="mt-6 flex flex-col items-center px-10 w-full flex-1">
        <div className="w-full max-w-7xl">
          <table className="w-full text-black rounded-lg shadow-xl border border-amber-700 overflow-hidden">
            <thead className="bg-amber-700 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Destination</th>
                <th className="py-3 px-4 text-left">Duration</th>
                <th className="py-3 px-4 text-left">Public Key</th>
                <th className="py-3 px-4 text-left"></th>
              </tr>
            </thead>
            <tbody className="bg-orange-50">
              {displayedTourists.length > 0 ? (
                displayedTourists.map((trip: TripRow) => (
                  <tr
                    key={trip.id}
                    className="border-b border-amber-300 hover:bg-orange-100 transition-colors"
                  >
                    <td className="py-3 px-4">{trip.name}</td>
                    <td className="py-3 px-4">{trip.destination}</td>
                    <td className="py-3 px-4">{trip.duration}</td>
                    <td className="py-3 px-4 break-all">{trip.publicKey}</td>
                    <td className="py-3 px-4 flex justify-end gap-2">
                      <Button
                        className="bg-red-600 text-white px-4 py-1 rounded-full shadow hover:bg-red-700 transition-colors"
                        onClick={() => alert(`Delete tourist with ID: ${trip.id}`)}
                      >
                        Delete
                      </Button>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${trip.lastLocation.lat},${trip.lastLocation.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-orange-700 text-white px-4 py-1 rounded-full shadow hover:bg-orange-800 transition-colors flex items-center justify-center"
                      >
                        Track
                      </a>
                      <Button
                        disabled={!trip.efir}
                        className={`px-4 py-1 rounded-full shadow transition-colors ${
                          trip.efir
                            ? "bg-amber-600 text-white hover:bg-amber-700"
                            : "bg-gray-400 text-gray-200 cursor-not-allowed"
                        }`}
                        onClick={() => {
                          if (trip.efir) {
                            setSelectedEFIR(trip);
                            setApprovalStatus(null);
                          }
                        }}
                      >
                        {trip.efir ? "EFIR" : "No EFIR"}
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="py-4 text-center text-red-600 font-semibold"
                  >
                    No tourist found with that name.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* EFIR Modal */}
      {selectedEFIR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-96 p-6 relative shadow-xl">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedEFIR(null)}
            >
              <X />
            </button>
            <h2 className="text-xl font-bold mb-4">EFIR Details</h2>
            <p className="mb-3 text-sm">{selectedEFIR.efir}</p>

            <div className="text-sm mb-4">
              <p>
                <strong>Name:</strong> {selectedEFIR.name}
              </p>
              <p>
                <strong>Tourist ID:</strong> {selectedEFIR.id}
              </p>
              <p>
                <strong>Last Location:</strong> {selectedEFIR.lastLocation.lat},{" "}
                {selectedEFIR.lastLocation.lng}
              </p>
            </div>

            {approvalStatus ? (
              <p className="font-semibold text-green-700 mb-4">{approvalStatus}</p>
            ) : (
              <div className="flex justify-end gap-4 mb-4">
                <Button
                  className="bg-green-600 text-white px-4 py-1 rounded-full hover:bg-green-700"
                  onClick={handleApprove}
                >
                  Approve
                </Button>
                <Button
                  className="bg-red-600 text-white px-4 py-1 rounded-full hover:bg-red-700"
                  onClick={handleDisapprove}
                >
                  Disapprove
                </Button>
              </div>
            )}
            <Button
              className="bg-gray-500 text-white px-4 py-1 rounded-full hover:bg-gray-600"
              onClick={() => setSelectedEFIR(null)}
            >
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Feedback Section */}
      <div className="mt-20 w-full flex flex-col items-center px-10">
        <h2 className="text-2xl font-bold text-amber-700 mb-6 flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-orange-600" /> User Feedback
        </h2>

        <div className="w-full flex flex-row flex-wrap justify-center gap-6">
          {[
            {
              id: 1,
              user: "Amit Kumar",
              feedback:
                "The Tourist Department Dashboard is very easy to navigate and manage tourist information.",
              rating: 5,
            },
            {
              id: 2,
              user: "Priya Sharma",
              feedback:
                "I like the clean design and the way trips are listed. It makes my work faster.",
              rating: 4,
            },
            {
              id: 3,
              user: "Rohan Verma",
              feedback:
                "The dashboard loads quickly and securely stores all my data. Great job!",
              rating: 5,
            },
          ].map((item) => (
            <Card
              key={item.id}
              className="w-[320px] mb-6 p-5 rounded-lg bg-orange-50 border-l-4 border-l-orange-600 shadow hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-orange-600" />
                  <span className="font-semibold text-lg text-black">{item.user}</span>
                </div>
                <span className="flex gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500" />
                  ))}
                  {[...Array(5 - item.rating)].map((_, i) => (
                    <Star key={i + item.rating} className="w-4 h-4 text-gray-400" />
                  ))}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MessageSquare className="w-4 h-4 text-orange-600 mt-1" />
                <p className="text-gray-700 text-sm">{item.feedback}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="w-full bg-amber-700 text-white text-center py-4 mt-12 rounded-t-xl">
        &copy; {new Date().getFullYear()} TourSafe Tourist Dashboard. All rights reserved.
      </footer>
    </div>
  );
}
