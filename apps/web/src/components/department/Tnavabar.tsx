"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md border-b border-amber-700">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Left side – Logo + Name */}
        <div className="flex items-center gap-3">
          <Image src="\travel-agent-svgrepo-com.svg" alt="Logo" width={40} height={40} />
          <span className="text-2xl font-bold text-orange-700">Toursafe</span>
        </div>

        {/* Right side – Links + SignOut */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-orange-700 font-semibold hover:text-orange-800 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="/contact"
            className="text-black font-semibold hover:text-orange-700 transition-colors duration-200"
          >
            Contact Us
          </Link>
          <Link href="/" passHref>
            <Button
              className="px-6 py-2 bg-orange-700 text-white font-bold rounded-lg hover:bg-orange-800 transition-colors duration-200 shadow-md hover:shadow-lg"
              onClick={() => console.log("Sign out clicked")}
            >
              <LogOut className="mr-2 h-4 w-4 text-white" /> Sign Out
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
