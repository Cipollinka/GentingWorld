export interface User {
  profile: {userName: string; photo: string; about: string};
  activeNotes: {title: string; photo: string; description: string}[];
  archivedNotes: {title: string; photo: string; description: string}[];
  location: {
    title: string;
    photo: string;
    description: string;
    address: string;
  }[];
  flights: {
    departure: string;
    arrival: string;
    passengers: number;
    class: string;
    dateOfDeparture: string;
    timeOfDeparture: string;
    dateArrival?: string;
    timeArrival?: string;
    duration?: string;
    cost?: string;
    comment?: string;
  }[];
  hotels: {
    name: string;
    description: string;
    address: string;
    startDate: string;
    fishDate: string;
    cover: string;
    photos: any[];
  }[];
  events: {
    name: string;
    description: string;
    address: string;
    startDate: string;
    fishDate: string;
    cover: string;
    photos: any[];
  }[];
}
