"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full bg-gradient-to-b from-black  opacity-90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <span className="text-2xl font-bold text-white bg-transparent px-3 py-1 rounded-md">
          TourSafe
        </span>
        <Link href="/" passHref>
          <Button
            variant="outline"
            className="text-black border-white"
            onClick={() => {
              console.log("Sign out clicked");
            }}
          >
            <LogOut className="mr-2 h-4 w-4 text-black" /> SignOut
          </Button>
        </Link>
      </div>
    </nav>
  );
}




