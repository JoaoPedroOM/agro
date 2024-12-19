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
    geoLocation: { latitude: -15.7941, longitude: -47.8825 },
    quantity: 100,
    cropType: "Soja",
  },
  {
    id: 2,
    userId: 1,
    date: "2024-05-15",
    location: "Campo B",
    geoLocation: { latitude: -15.7962, longitude: -47.8848 },
    quantity: 150,
    cropType: "Milho",
  },
  {
    id: 3,
    userId: 2,
    date: "2024-06-01",
    location: "Campo C",
    geoLocation: { latitude: -15.8, longitude: -47.89 },
    quantity: 120,
    cropType: "Arroz",
  },
  {
    id: 4,
    userId: 2,
    date: "2024-06-15",
    location: "Campo D",
    geoLocation: { latitude: -15.802, longitude: -47.892 },
    quantity: 110,
    cropType: "Soja",
  },
  {
    id: 5,
    userId: 3,
    date: "2024-07-01",
    location: "Campo E",
    geoLocation: { latitude: -15.804, longitude: -47.895 },
    quantity: 140,
    cropType: "Trigo",
  },
  {
    id: 6,
    userId: 3,
    date: "2024-07-15",
    location: "Campo F",
    geoLocation: { latitude: -15.806, longitude: -47.898 },
    quantity: 130,
    cropType: "Soja",
  },
  {
    id: 7,
    userId: 4,
    date: "2024-08-01",
    location: "Campo G",
    geoLocation: { latitude: -15.81, longitude: -47.9 },
    quantity: 105,
    cropType: "Cevada",
  },
  {
    id: 8,
    userId: 4,
    date: "2024-08-15",
    location: "Campo H",
    geoLocation: { latitude: -15.812, longitude: -47.903 },
    quantity: 160,
    cropType: "Soja",
  },
  {
    id: 9,
    userId: 5,
    date: "2024-09-01",
    location: "Campo I",
    geoLocation: { latitude: -15.814, longitude: -47.905 },
    quantity: 150,
    cropType: "Trigo",
  },
  {
    id: 10,
    userId: 5,
    date: "2024-09-15",
    location: "Campo J",
    geoLocation: { latitude: -15.816, longitude: -47.908 },
    quantity: 170,
    cropType: "Arroz",
  },
];
