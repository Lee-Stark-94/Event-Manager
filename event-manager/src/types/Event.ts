export interface Location {
    lat: number;
    lng: number;
    address: string;
}
export interface Event {
    id: string;
    title: string;
    description: string;
    date: Date;
    location: Location;
}