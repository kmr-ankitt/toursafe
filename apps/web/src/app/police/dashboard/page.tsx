import React from 'react'
import Image from 'next/image'
import { Search, MapPin, Phone, Users, FileText, AlertTriangle, CheckCircle, Clock, User, Calendar, Home, LogOut, BarChart3, TrendingUp, Activity } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { officers, Officer, efirs, EFIR, touristDepartments, TouristDepartment, policeOfficers, newsHeadlines } from '@/constants/police'


export default function PoliceDashboard() {
  return (
    <div className=' bg-white min-h-screen'>
        <div className='navbar flex gap-2 justify-between items-center p-10'>
        <Image src="/police1.png" alt="Police Logo" width={50} height={50} />
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
         <a href="" className="px-4 font-bold py-2 flex items-center gap-2 hover:text-orange-700 transition-colors duration-200">
           <Phone className='w-5 h-5' />
           Contact Us
         </a>
        <a href="" className="px-4 font-bold py-2 text-orange-700 hover:text-orange-800 transition-colors duration-200 flex items-center gap-2">
          <Home className='w-5 h-5' />
          Home
        </a>
        <button className="px-6 py-2 bg-orange-700 text-white font-bold rounded-lg hover:bg-orange-800 transition-colors duration-200 shadow-md hover:shadow-lg flex items-center gap-2">
          <LogOut className='w-5 h-5' />
          Sign Out
        </button>
       </div>
        </div>
        
        {/* Tourist Department Section */}
        <div className='tourist-department-section p-6'>
            <div className='bg-orange-50 border-2 border-orange-300 rounded-lg p-6'>
                <div className='flex items-center justify-center gap-3 mb-4'>
                    <Users className='w-8 h-8 text-amber-600' />
                    <h2 className='text-2xl font-bold text-amber-700 text-center'>Connect with the Nearest Tourist Department</h2>
                    <MapPin className='w-8 h-8 text-amber-600' />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {touristDepartments.map((department: TouristDepartment, index: number) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow duration-200 border-orange-200">
                            <CardHeader>
                                <div className='flex items-center gap-2'>
                                    <MapPin className='w-5 h-5 text-amber-600' />
                                    <div>
                                        <CardTitle className="text-amber-700">{department.name}</CardTitle>
                                        <CardDescription>{department.description}</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className='flex items-center gap-2'>
                                            <Phone className='w-4 h-4 text-green-600' />
                                            <span className="text-sm text-gray-600">Phone:</span>
                                        </div>
                                        <span className="text-sm font-medium">{department.phone}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className='flex items-center gap-2'>
                                            <Clock className='w-4 h-4 text-purple-600' />
                                            <span className="text-sm text-gray-600">Hours:</span>
                                        </div>
                                        <span className="text-sm font-medium">{department.hours}</span>
                                    </div>
                                    {index < 2 && (
                                        <div className="flex items-center justify-between">
                                            <div className='flex items-center gap-2'>
                                                <MapPin className='w-4 h-4 text-blue-600' />
                                                <span className="text-sm text-gray-600">Distance:</span>
                                            </div>
                                            <span className="text-sm font-medium">{index === 0 ? '2.5 km' : '4.2 km'}</span>
                                        </div>
                                    )}
                                    <button className={`w-full mt-2 px-4 py-2 text-white rounded-lg transition-colors duration-200 ${
                                        department.name === 'Emergency Helpline'
                                            ? 'bg-red-600 hover:bg-red-700'
                                            : 'bg-orange-600 hover:bg-orange-700'
                                    }`}>
                                        {department.name === 'Emergency Helpline' ? 'Emergency Call' : 'Connect Now'}
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
        
        {/* Police Officers Section with News */}
        <div className='police-section flex flex-row gap-6 p-6'>
            {/* Left side - List of Police Officers Section */}
            <section className='p-6 border-4 border-blue-700 rounded-lg flex-shrink-0 w-96'>
                <div className='flex flex-col items-center mb-6'>
                    <Image src="/police2.png" alt="Police Logo" width={50} height={50} />
                    <h2 className='text-2xl font-bold text-blue-700 mt-3'>List of Police Officers</h2>
                    <div className='relative mt-4'>
                        <input 
                            type="text" 
                            placeholder="Search police officers..." 
                            className="px-4 py-2 pr-10 w-60 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        />
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500" />
                    </div>
                </div>
                
                {/* Officers List */}
                <div className='space-y-3 max-h-96 overflow-y-auto'>
                    {policeOfficers.map((officer: string, index: number) => (
                        <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-3 hover:bg-blue-100 transition-colors duration-200">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                    {officer.split(' ')[1]?.[0] || 'P'}{officer.split(' ')[2]?.[0] || 'O'}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-blue-700">{officer}</p>
                                    <p className="text-xs text-gray-600">Badge #{12345 + index}</p>
                                </div>
                                <div className="w-2 h-2 bg-green-500 rounded-full" title="Active"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Middle - Police Officers Grid 2x4 */}
            <div className='flex-1 pr-4'>
                <h3 className='text-xl font-bold text-amber-700 mb-4'>Active Police Officers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {officers.map((officer: Officer) => (
                        <Card key={officer.badge} className="hover:shadow-lg transition-shadow duration-200 h-fit">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                        {officer.initials}
                                    </div>
                                    <div>
                                        <CardTitle className="text-amber-700 text-sm">{officer.name}</CardTitle>
                                        <CardDescription className="text-xs">Badge #{officer.badge}</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="space-y-1">
                                    <div className="flex justify-between">
                                        <span className="text-xs text-gray-600">Status:</span>
                                        <span className={`px-1 py-0.5 rounded-full text-xs font-semibold ${
                                            officer.status === 'Active' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {officer.status}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-xs text-gray-600">District:</span>
                                        <span className="text-xs font-medium">{officer.district}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-xs text-gray-600">Shift:</span>
                                        <span className="text-xs font-medium">{officer.shift}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Right side - 24x7 News Column */}
            <div className='news-section w-80 flex-shrink-0'>
                <div className='bg-emerald-50 border-2 border-emerald-300 rounded-lg p-4 min-h-[600px]'>
                    <h2 className='text-xl font-bold text-emerald-700 mb-4 text-center flex items-center gap-2'>
                        <div className='w-3 h-3 bg-red-500 rounded-full animate-pulse'></div>
                        24×7 News Updates
                    </h2>
                    
                    <div className='space-y-3 max-h-[520px] overflow-y-auto'>
                        {/* Breaking News Item */}
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <div className="flex items-start gap-2">
                                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">BREAKING</span>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-red-700 text-sm">{newsHeadlines[0]}</h4>
                                    <p className="text-xs text-gray-600 mt-1">Latest update from tourism safety department...</p>
                                    <span className="text-xs text-gray-500">2 mins ago</span>
                                </div>
                            </div>
                        </div>

                        {/* Dynamic News Items */}
                        {newsHeadlines.slice(1, 8).map((headline: string, index: number) => {
                            const colors = ['emerald', 'green', 'teal', 'lime', 'mint', 'forest', 'jade'];
                            const color = colors[index % colors.length];
                            const timeStamps = ['15 mins ago', '30 mins ago', '1 hour ago', '2 hours ago', '3 hours ago', '4 hours ago', '5 hours ago'];
                            
                            return (
                                <div key={index} className="bg-white border border-emerald-200 rounded-lg p-3 hover:bg-emerald-50 transition-colors duration-200">
                                    <div className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-emerald-800 text-sm">{headline}</h4>
                                            <p className="text-xs text-gray-600 mt-1">Stay informed with latest developments in tourism safety...</p>
                                            <span className="text-xs text-gray-500">{timeStamps[index]}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-4 text-center">
                        <button className="text-xs text-emerald-600 hover:text-emerald-800 font-medium">View All News →</button>
                    </div>
                </div>
            </div>
        </div>

        {/* E-FIR Section */}
        <div className='efir-section p-6'>
            <div className='flex items-center justify-center gap-3 mb-6'>
                <FileText className='w-8 h-8 text-amber-600' />
                <h2 className='text-2xl font-bold text-amber-700'>E-FIR Cases Management</h2>
                <AlertTriangle className='w-8 h-8 text-red-600' />
            </div>
            
            {/* All Cases in 3x2 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {efirs.map((efir: EFIR) => {
                    const getStatusIcon = () => {
                        if (efir.status === 'Active') return <AlertTriangle className='w-4 h-4 text-red-600' />;
                        if (efir.status === 'Pending') return <Clock className='w-4 h-4 text-yellow-600' />;
                        return <CheckCircle className='w-4 h-4 text-green-600' />;
                    };

                    return (
                        <Card key={efir.id} className={`hover:shadow-lg transition-shadow duration-200 border-l-4 ${
                            efir.status === 'Active' ? 'border-l-red-500' :
                            efir.status === 'Pending' ? 'border-l-yellow-500' :
                            'border-l-green-500'
                        } h-fit`}>
                            <CardHeader className="pb-2">
                                <div className='flex items-center gap-2'>
                                    <FileText className='w-4 h-4 text-amber-600' />
                                    <div className='flex-1'>
                                        <CardTitle className="text-amber-700 text-sm">{efir.title}</CardTitle>
                                        <CardDescription className="text-xs">ID: {efir.id}</CardDescription>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {getStatusIcon()}
                                    <span className={`text-xs font-semibold ${
                                        efir.status === 'Active' ? 'text-red-700' :
                                        efir.status === 'Pending' ? 'text-yellow-700' :
                                        'text-green-700'
                                    }`}>
                                        {efir.status}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-600 line-clamp-2">{efir.description}</p>
                                    <div className="flex justify-between items-center">
                                        <div className='flex items-center gap-1'>
                                            <User className='w-3 h-3 text-gray-500' />
                                            <span className="text-xs text-gray-600">Filed By:</span>
                                        </div>
                                        <span className="text-xs font-medium">{efir.filedBy}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className='flex items-center gap-1'>
                                            <Calendar className='w-3 h-3 text-gray-500' />
                                            <span className="text-xs text-gray-600">Date:</span>
                                        </div>
                                        <span className="text-xs font-medium">{efir.dateFiled}</span>
                                    </div>
                                    {efir.policeInCharge && (
                                        <div className="flex justify-between items-center">
                                            <div className='flex items-center gap-1'>
                                                <CheckCircle className='w-3 h-3 text-green-500' />
                                                <span className="text-xs text-gray-600">Solved By:</span>
                                            </div>
                                            <span className="text-xs font-medium">{efir.policeInCharge}</span>
                                        </div>
                                    )}
                                    {efir.status === 'Active' && (
                                        <div className="mt-2">
                                            <button className="w-full px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                                                <MapPin className='w-3 h-3' />
                                                Track Location
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>

        {/* Simple Footer */}
        <footer className="bg-orange-700 text-white py-4 text-center">
            <p className="text-sm">© 2025 TourSafe Police Department - Ensuring Tourist Safety 24/7</p>
        </footer>
    </div>
  )
}