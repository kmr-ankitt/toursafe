"use client";
import React, { useEffect, useState } from 'react';
import Navbar from './Tnavabar';
import { Button } from './ui/button';

import { Card } from "./ui/card";
import { User, MessageSquare, Star, UserPlus } from "lucide-react";
import Link from "next/link";
import Image from 'next/image';


interface TripRow {
  touristName: string;
  tripStatus: string;
  location: string;
  startDate: string;
  endDate: string;
}

export default function THome() {

  // Default data for the table
  const defaultRows: TripRow[] = [
    {
      touristName: "Amit Kumar",
      tripStatus: "Active",
      location: "Delhi",
      startDate: "2025-09-10",
      endDate: "2025-09-15"
    },
    {
      touristName: "Sara Lee",
      tripStatus: "Completed",
      location: "Mumbai",
      startDate: "2025-09-01",
      endDate: "2025-09-07"
    }
  ];

  const [rows, setRows] = useState<TripRow[]>(defaultRows);

  useEffect(() => {
    fetch('/api/tourist-trips')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setRows(data);
        }
      });
  }, []);

  function handleTrackTrip(row: TripRow) {
    
    alert(`Tracking trip for ${row.touristName}`);
    
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
  <Image src="/download.jpg" alt="Tourist Logo" width={260} height={180} className="rounded-xl mx-auto mt-6" />
      <h1 className="text-3xl font-bold underline text-white text-center mt-20">
        Tourist Department Dashboard
      </h1>

      <div className="mt-20 text-xl font-bold flex flex-col items-center space-y-4">
        <span className="text-white text-center">
          Welcome to the Tourist Department Dashboard. Here you can manage tourist information securely and efficiently.
        </span>
        <Link href="/add-tourist" passHref>
          <Button className="bg-white text-black px-6 py-2 rounded-full shadow-lg font-semibold text-lg tracking-wide border-2 border-white hover:bg-black hover:text-white transition-colors duration-200 flex items-center gap-2">
            <UserPlus className="w-5 h-5" /> Add Tourist
          </Button>
        </Link>

        <div className="flex justify-center items-center mt-4 min-h-[500px]">
          <table className="w-[900px] h-[400px] bg-black text-white rounded-lg shadow-lg border border-gray-700 overflow-hidden mx-auto">
            <caption className="mb-2 text-lg font-semibold text-white">
              Tourist Trips
            </caption>

            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider border-b border-gray-700">Tourist Name</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider border-b border-gray-700">Trip Status</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider border-b border-gray-700">Location</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider border-b border-gray-700">Start Date</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider border-b border-gray-700">End Date</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider border-b border-gray-700">
                  <Button className="bg-emerald-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-emerald-800 transition-colors cursor-default" disabled>
                    Trip Tracker
                  </Button>
                </th>
              </tr>
            </thead>

            <tbody className="bg-black">
              {rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-900 transition-colors">
                  <td className="px-6 py-4 border-b border-gray-700">{row.touristName}</td>
                  <td className="px-6 py-4 border-b border-gray-700">{row.tripStatus}</td>
                  <td className="px-6 py-4 border-b border-gray-700">{row.location}</td>
                  <td className="px-6 py-4 border-b border-gray-700">{row.startDate}</td>
                  <td className="px-6 py-4 border-b border-gray-700">{row.endDate}</td>
                  <td className="px-6 py-4 border-b border-gray-700">
                    <Button className="bg-emerald-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-emerald-600 transition-colors"
                      onClick={() => handleTrackTrip(row)}>
                      Trip Tracker
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 w-full flex flex-col items-center">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-green-400" /> User Feedback
          </h2>
          <div className="w-full flex flex-row justify-center gap-6">
            {[
              {
                id: 1,
                user: "Amit Kumar",
                feedback: "The Tourist Department Dashboard is very easy to navigate and manage tourist information.",
                rating: 5
              },
              {
                id: 2,
                user: "Priya Sharma",
                feedback: "I like the clean design and the way trips are listed. It makes my work faster.",
                rating: 4
              },
              {
                id: 3,
                user: "John Doe",
                feedback: "The dashboard loads quickly and securely stores all my data. Great job!",
                rating: 5
              }
            ].map(item => (
              <Card key={item.id} className="w-[320px] mb-6 p-4 rounded-lg bg-gray-900 text-white shadow flex-shrink-0">
                <div className="flex items-center justify-between mb-2">
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
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-green-400" />
                  <p className="text-gray-300">{item.feedback}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <footer className="w-full bg-gray-900 text-white text-center py-4 mt-12 rounded-t-xl">
        &copy; {new Date().getFullYear()} TourSafe Tourist Dashboard. All rights reserved.
      </footer>
    </div>
  );
}
