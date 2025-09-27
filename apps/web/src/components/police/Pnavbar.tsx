import React from 'react'
import Link from 'next/link';
import { LogOutIcon } from 'lucide-react';
import { Button } from '../ui/button';

 export default function Pnavbar ()  {
  return (
   <nav className="w-full bg-gradient-to-b from-black  opacity-90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <span className="text-2xl font-bold text-white bg-transparent px-3 py-1 rounded-md">
          TourSafe
        </span>
        <Link href="/" passHref>
          <Button
            variant="outline"
            className="bg-red-600 text-white border-red-600 hover:bg-red-700"
            onClick={() => {
              console.log("Sign out clicked");
            }}
          >
            <LogOutIcon className="mr-2 h-4 w-4 text-white" /> SignOut
          </Button>
        </Link>
      </div>
    </nav>
  )
}


