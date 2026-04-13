export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  defaultCurrency: string;
}

export interface Destination {
  name: string;
  coordinates?: { lat: number; lng: number };
  country?: string;
  city?: string;
}

export interface Trip {
  _id: string;
  title: string;
  destination: Destination;
  coverImage?: string;
  startDate: string;
  endDate: string;
  tripType: "solo" | "couple" | "group" | "family";
  status: "planning" | "upcoming" | "ongoing" | "completed" | "archived";
  owner: User;
  members: { user: User; role: string; status: string }[];
  budget: { total: number; currency: string };
  createdAt: string;
}

export interface Activity {
  _id: string;
  name: string;
  description?: string;
  location?: { name: string; address: string; placeId?: string };
  startTime: string;
  endTime?: string;
  duration?: number;
  category: string;
  estimatedCost?: number;
  actualCost?: number;
  currerncy: string;
  status: string;
  aiGenerated: boolean;
  conflicts: { type: string; message: string; severity: string }[];
  order: number;
  dayId: string;
  tripId: string;
}

export interface Day {
  _id: string;
  date: string;
  dayNumber: number;
  title?: string;
  notes?: string;
  weather?: {
    icon: string;
    tempMin: number;
    tempMax: number;
    description: string;
  };
  activities: Activity[];
}
