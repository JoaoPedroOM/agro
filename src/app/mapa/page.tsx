"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import SidebarMenu from "@/components/ui/SidebarMenu";
import HarvestFilter from "@/components/HarvestFilter";

const HarvestMap = dynamic(() => import("../../components/HarvestMap"), {
  ssr: false,
  loading: () => <p>Carregando mapa...</p>,
});

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

export default function Mapa() {
  const [harvests, setHarvests] = useState<Harvest[]>([]);
  const [filteredHarvests, setFilteredHarvests] = useState<Harvest[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchHarvest() {
      try {
        const response = await fetch("/api/harvest");
        if (!response.ok) {
          throw new Error("Erro ao buscar dados");
        }
        const data = await response.json();
        setHarvests(data);
        setFilteredHarvests(data); 
      } catch (error) {
        console.error("Erro:", error);
      }
    }
    fetchHarvest();
  }, []);

  const handleFilter = (startDate: string, location: string) => {
    const filtered = harvests.filter((harvest) => {
      const harvestDate = new Date(harvest.date);
      const start = startDate ? new Date(startDate) : new Date(0);
      return (
        harvestDate >= start && (!location || harvest.location === location)
      );
    });
    setFilteredHarvests(filtered);
  };

  return (
    <div className="lg:flex lg:flex-row flex flex-col h-screen ">
      <SidebarMenu open={open} setOpen={setOpen} />

      <div className="container mx-auto p-4 z-0">
        <h1 className="text-3xl font-bold mb-6 font-second">
          Mapa das suas colheitas 🌎
        </h1>
        <HarvestFilter
          fullFiltro={false}
          onFilter={handleFilter}
          locations={Array.from(new Set(harvests.map((h) => h.location)))}
        />
        {filteredHarvests.length > 0 ? (
          <HarvestMap harvests={filteredHarvests} />
        ) : (
          <p>Carregando dados das colheitas...</p>
        )}
      </div>
    </div>
  );
}
