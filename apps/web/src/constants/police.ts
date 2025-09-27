// src/data.ts
// src/data.ts

export interface Officer {
  initials: string;
  name: string;
  badge: string;
  status: 'Active' | 'Inactive';
  district: string;
  shift: string;
}

export const officers: Officer[] = [
  {
    initials: 'RK',
    name: 'Officer Rajesh Kumar',
    badge: '12345',
    status: 'Active',
    district: 'Central',
    shift: 'Morning',
  },
  {
    initials: 'PS',
    name: 'Officer Priya Sharma',
    badge: '12346',
    status: 'Active',
    district: 'North',
    shift: 'Evening',
  },
  {
    initials: 'AV',
    name: 'Officer Anil Verma',
    badge: '12347',
    status: 'Active',
    district: 'South',
    shift: 'Night',
  },
  {
    initials: 'SN',
    name: 'Officer Sunita Nair',
    badge: '12348',
    status: 'Active',
    district: 'East',
    shift: 'Morning',
  },
  {
    initials: 'KS',
    name: 'Officer Karan Singh',
    badge: '12349',
    status: 'Active',
    district: 'West',
    shift: 'Evening',
  },
  {
    initials: 'DJ',
    name: 'Officer Deepa Joshi',
    badge: '12350',
    status: 'Active',
    district: 'Downtown',
    shift: 'Night',
  },
];

// src/data.ts

export interface EFIR {
  id: string;
  title: string;
  status: 'Active' | 'Pending' | 'Previous';
  description: string;
  filedBy: string;          // citizen/tourist who filed it
  dateFiled: string;        // ISO string or formatted date
  policeInCharge?: string;  // only for previous EFIR (solved)
}

// 6 default EFIRs about natural disasters: 2 Active, 2 Pending, 2 Previous
export const efirs: EFIR[] = [
  {
    id: 'EFIR-001',
    title: 'Flash Flood Warning',
    status: 'Active',
    description: 'Sudden flash flood reported near Central Market area.',
    filedBy: 'Ankit kumar saho',
    dateFiled: '2025-09-20',
  },
  {
    id: 'EFIR-002',
    title: 'Earthquake Tremors Report',
    status: 'Active',
    description: 'Mild earthquake tremors felt at railway station zone.',
    filedBy: 'shivam kumar',
    dateFiled: '2025-09-21',
  },
  {
    id: 'EFIR-003',
    title: 'Landslide Alert',
    status: 'Pending',
    description: 'Potential landslide detected near East District hillside.',
    filedBy: 'sourav',
    dateFiled: '2025-09-18',
  },
  {
    id: 'EFIR-004',
    title: 'Storm Damage Report',
    status: 'Pending',
    description: 'High winds and storm causing damage in South Park area.',
    filedBy: 'koushal ',
    dateFiled: '2025-09-19',
  },
  {
    id: 'EFIR-005',
    title: 'Wildfire Incident',
    status: 'Previous',
    description: 'Wildfire controlled in forest area near Downtown.',
    filedBy: 'pragati',
    dateFiled: '2025-08-30',
    policeInCharge: 'Officer Anjali Patel', // officer who coordinated response
  },
  {
    id: 'EFIR-006',
    title: 'Flood Relief Completed',
    status: 'Previous',
    description: 'Flood waters receded and relief operations finished in North District.',
    filedBy: 'Rajandanie rout',
    dateFiled: '2025-08-28',
    policeInCharge: 'Officer Jane Smith', // officer who coordinated response
  },
];


// src/touristDepartments.ts

export interface TouristDepartment {
  name: string;
  description: string;
  phone: string;
  hours: string;
}

export const touristDepartments: TouristDepartment[] = [
  {
    name: 'Central Tourist Office',
    description: 'Main City Center',
    phone: '+91 98765 43210',
    hours: '24/7',
  },
  {
    name: 'North District Office',
    description: 'North Zone',
    phone: '+91 98765 43211',
    hours: '9 AM - 8 PM',
  },
  {
    name: 'Emergency Helpline',
    description: '24/7 Tourist Support',
    phone: '1800-XXX-XXXX',
    hours: 'Immediate Response',
  },
];


// src/policeOfficers.ts

export const policeOfficers: string[] = [
  
  "Officer Rajesh Kumar",
  "Officer Priya Sharma",
  "Officer Anil Verma",
  "Officer Sunita Nair",
  "Officer Karan Singh",
  "Officer Deepa Joshi",
  "Officer Manoj Patel",
  "Officer Neha Reddy",
  "Officer Suresh Menon",
  "Officer Anjali Chauhan"
];



// src/newsHeadlines.ts

export const newsHeadlines: string[] = [
  "City Launches Smart Policing App for Tourists",
  "Flash Flood Warning Issued for Downtown Area",
  "New Tourist Information Centers Open in North District",
  "Police Officers Receive Training on Disaster Response",
  "Emergency Helpline Receives Record Calls During Festival Season",
  "Wildfire Under Control in Western Hills, Relief Teams Deployed",
  "High-Tech Surveillance Cameras Installed at Major Tourist Spots",
  "Local Authorities Announce 24/7 Support for Foreign Visitors",
  "Evacuation Drill Conducted in Coastal Zone",
  "Community Volunteers Join Police for Disaster Management"
];