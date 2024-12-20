export interface GeoLocation {
    latitude: number;
    longitude: number;
  }
  
  export interface Harvest {
    id: number;
    userId: number;
    date: string;
    location: string;
    geoLocation: GeoLocation;
    quantity: number;
    cropType: string;
  }