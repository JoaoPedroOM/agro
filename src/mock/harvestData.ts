interface Harvest {
  id: number;
  userId: number;
  date: string;
  location: string;
  geoLocation: {
    latitude: number;
    longitude: number;
  };
  quantity: number;
  cropType: string;
}

export const mockData: Harvest[] = [
  {
    id: 1,
    userId: 1,
    date: "2024-05-01",
    location: "Campo A",
    geoLocation: { latitude: -3.1190, longitude: -60.0217 },
    quantity: 100,
    cropType: "Soja",
  },
  {
    id: 2,
    userId: 1,
    date: "2024-05-15",
    location: "Campo B",
    geoLocation: { latitude: -12.9714, longitude: -38.5014 }, 
    quantity: 150,
    cropType: "Milho",
  },
  {
    id: 3,
    userId: 2,
    date: "2024-06-01",
    location: "Campo C",
    geoLocation: { latitude: -25.4284, longitude: -49.2733 }, 
    quantity: 120,
    cropType: "Arroz",
  },
  {
    id: 4,
    userId: 2,
    date: "2024-06-15",
    location: "Campo D",
    geoLocation: { latitude: -16.6869, longitude: -49.2648 }, 
    quantity: 110,
    cropType: "Soja",
  },
  {
    id: 5,
    userId: 3,
    date: "2024-07-01",
    location: "Campo E",
    geoLocation: { latitude: -2.5307, longitude: -44.3068 },
    quantity: 140,
    cropType: "Trigo",
  },
  {
    id: 6,
    userId: 3,
    date: "2024-07-15",
    location: "Campo F",
    geoLocation: { latitude: -8.0476, longitude: -34.8770 }, 
    quantity: 130,
    cropType: "Soja",
  },
  {
    id: 7,
    userId: 4,
    date: "2024-08-01",
    location: "Campo G",
    geoLocation: { latitude: -27.5954, longitude: -48.5480 }, 
    quantity: 105,
    cropType: "Cevada",
  },
  {
    id: 8,
    userId: 4,
    date: "2024-08-15",
    location: "Campo H",
    geoLocation: { latitude: -9.9740, longitude: -67.8076 }, 
    quantity: 160,
    cropType: "Soja",
  },
  {
    id: 9,
    userId: 5,
    date: "2024-09-01",
    location: "Campo I",
    geoLocation: { latitude: -20.4697, longitude: -54.6201 }, 
    quantity: 150,
    cropType: "Trigo",
  },
  {
    id: 10,
    userId: 5,
    date: "2024-09-15",
    location: "Campo J",
    geoLocation: { latitude: -2.5192, longitude: -44.2825 }, 
    quantity: 170,
    cropType: "Arroz",
  },
];
