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
    initials: 'JD',
    name: 'Officer John Doe',
    badge: '12345',
    status: 'Active',
    district: 'Central',
    shift: 'Morning',
  },
  {
    initials: 'JS',
    name: 'Officer Jane Smith',
    badge: '12346',
    status: 'Active',
    district: 'North',
    shift: 'Evening',
  },
  {
    initials: 'MB',
    name: 'Officer Mike Brown',
    badge: '12347',
    status: 'Active',
    district: 'South',
    shift: 'Night',
  },
  {
    initials: 'SD',
    name: 'Officer Sarah Davis',
    badge: '12348',
    status: 'Active',
    district: 'East',
    shift: 'Morning',
  },
  {
    initials: 'RW',
    name: 'Officer Robert Wilson',
    badge: '12349',
    status: 'Active',
    district: 'West',
    shift: 'Evening',
  },
  {
    initials: 'LM',
    name: 'Officer Lisa Miller',
    badge: '12350',
    status: 'Active',
    district: 'Downtown',
    shift: 'Night',
  },
];

// src/data.ts

// Already have Officer & officers above…

export interface EFIR {
  id: string;
  title: string;
  status: 'Active' | 'Pending' | 'Previous';
  description: string;
  filedBy: string;          // citizen/tourist who filed it
  dateFiled: string;        // ISO string or formatted date
  policeInCharge?: string;  // only for previous EFIR (solved)
}

// 6 default EFIRs: 2 Active, 2 Pending, 2 Previous
export const efirs: EFIR[] = [
  {
    id: 'EFIR-001',
    title: 'Lost Passport Report',
    status: 'Active',
    description: 'Tourist lost passport near Central Market.',
    filedBy: 'John Carter',
    dateFiled: '2025-09-20',
  },
  {
    id: 'EFIR-002',
    title: 'Pickpocketing Incident',
    status: 'Active',
    description: 'Wallet stolen at railway station.',
    filedBy: 'Alice Smith',
    dateFiled: '2025-09-21',
  },
  {
    id: 'EFIR-003',
    title: 'Luggage Missing Complaint',
    status: 'Pending',
    description: 'Lost baggage while traveling to East District.',
    filedBy: 'Robert Brown',
    dateFiled: '2025-09-18',
  },
  {
    id: 'EFIR-004',
    title: 'Harassment at Tourist Spot',
    status: 'Pending',
    description: 'Tourist reported harassment at South Park.',
    filedBy: 'Sarah Miller',
    dateFiled: '2025-09-19',
  },
  {
    id: 'EFIR-005',
    title: 'Hotel Fraud Complaint',
    status: 'Previous',
    description: 'Fraudulent hotel booking scam.',
    filedBy: 'Linda Green',
    dateFiled: '2025-08-30',
    policeInCharge: 'Officer John Doe', // solved by this officer
  },
  {
    id: 'EFIR-006',
    title: 'Guided Tour Overcharge',
    status: 'Previous',
    description: 'Tour guide overcharged foreign tourist.',
    filedBy: 'Emily Johnson',
    dateFiled: '2025-08-28',
    policeInCharge: 'Officer Jane Smith', // solved by this officer
  },
];