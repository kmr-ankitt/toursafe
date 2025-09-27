import React from 'react'
import Image from 'next/image'
import { Search } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { EFIR, Officer, efirs, officers } from '@/constants/police'


export default function PoliceDashboard() {
  return (
    <div className=' bg-white min-h-screen'>
      <div className='navbar flex gap-2 justify-between items-center p-10'>
        <Image src="/policeicon.png" alt="Police Logo" width={50} height={50} />
        <div className='flex  items-center gap-3'>
          <h1 className='text-5xl text-orange-700 font-bold'>Police Dashboard</h1>
          <div className='relative'>
            <input
              type="text"
              placeholder="Search tourists, cases, reports..."
              className="px-4 py-2 pr-10 w-80 border-3 border-black rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500" />
          </div>
        </div>
        <div className='flex gap-2'>
          <a href="" className="px-4 font-bold py-2">Contact Us</a>
          <a href="" className="px-4  font-bold py-2 text-orange-700 hover:text-orange-800  transition-colors duration-200">Home</a>
          <button className="px-6 py-2 bg-orange-700 text-white font-bold rounded-lg hover:bg-orange-800 transition-colors duration-200 shadow-md hover:shadow-lg">
            Sign Out
          </button>
        </div>
      </div>

      {/* Police Officers Section */}
      <div className='police-section flex flex-row gap-6 p-6'>
        {/* Left side - List of Police Officers Section */}
        <section className='p-6 border-4 border-amber-700 rounded-lg flex-shrink-0 w-96'>
          <div className='flex justify-between items-center mb-6 flex-col'>
            <Image src="/p2.png" alt="Police Logo" width={50} height={50} />
            <h2 className='text-2xl font-bold text-amber-700'>List of Police Officers</h2>
            <div className='relative'>
              <input
                type="text"
                placeholder="Search police officers..."
                className="px-4 py-2 pr-10 w-60 border-2 border-orange-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500" />
            </div>
          </div>
        </section>

        {/* Right side - Police Officers Grid */}
        <div className='flex-1'>
          <h3 className='text-xl font-bold text-amber-700 mb-4'>Active Police Officers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {officers.map((officer: Officer) => (
              <Card key={officer.badge} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                      {officer.initials}
                    </div>
                    <div>
                      <CardTitle className="text-amber-700">{officer.name}</CardTitle>
                      <CardDescription>Badge #{officer.badge}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${officer.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                        }`}>
                        {officer.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">District:</span>
                      <span className="text-sm font-medium">{officer.district}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Shift:</span>
                      <span className="text-sm font-medium">{officer.shift}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* E-FIR Section - Below Police Section */}
      <div className='efir-section p-6 space-y-8'>
        {/* Active Cases Section */}
        <div>
          <h3 className='text-xl font-bold text-amber-700 mb-4'>Active E-FIR Cases</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {efirs.filter((efir: EFIR) => efir.status === 'Active').map((efir: EFIR) => (
              <Card key={efir.id} className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="text-amber-700">{efir.title}</CardTitle>
                  <CardDescription>ID: {efir.id}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">{efir.description}</p>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Filed By:</span>
                      <span className="text-sm font-medium">{efir.filedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Date Filed:</span>
                      <span className="text-sm font-medium">{efir.dateFiled}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Status:</span>
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">
                        {efir.status}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pending Cases Section */}
        <div>
          <h3 className='text-xl font-bold text-amber-700 mb-4'>Pending E-FIR Cases</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {efirs.filter((efir: EFIR) => efir.status === 'Pending').map((efir: EFIR) => (
              <Card key={efir.id} className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-yellow-500">
                <CardHeader>
                  <CardTitle className="text-amber-700">{efir.title}</CardTitle>
                  <CardDescription>ID: {efir.id}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">{efir.description}</p>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Filed By:</span>
                      <span className="text-sm font-medium">{efir.filedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Date Filed:</span>
                      <span className="text-sm font-medium">{efir.dateFiled}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Status:</span>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                        {efir.status}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Previous Cases Section */}
        <div>
          <h3 className='text-xl font-bold text-amber-700 mb-4'>Previous E-FIR Cases</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {efirs.filter((efir: EFIR) => efir.status === 'Previous').map((efir: EFIR) => (
              <Card key={efir.id} className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="text-amber-700">{efir.title}</CardTitle>
                  <CardDescription>ID: {efir.id}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">{efir.description}</p>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Filed By:</span>
                      <span className="text-sm font-medium">{efir.filedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Date Filed:</span>
                      <span className="text-sm font-medium">{efir.dateFiled}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Status:</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                        {efir.status}
                      </span>
                    </div>
                    {efir.policeInCharge && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Solved By:</span>
                        <span className="text-sm font-medium">{efir.policeInCharge}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}