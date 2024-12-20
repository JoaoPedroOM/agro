"use client";

import { useEffect, useState } from "react";
import SidebarMenu from "../../components/ui/SidebarMenu";
import InfoCards from "@/components/InfoCards";
import HarvestBarChart from "@/components/HarvestBarChart";
import HarvestLineChart from "@/components/HarvestLineChart";
import HarvestFilter from "@/components/HarvestFilter";
import { Button } from "@/components/ui/button";
import HarvestTable from "@/components/HarvestTable";
import AddHarvestModal from "@/components/AddHarvestModal";
import EditHarvestModal from "@/components/EditHarvestModal";
import { useUser } from "@clerk/clerk-react";
import { Harvest } from "@/types/harvest";

export default function Dashboard() {
  const [harvestData, setHarvestData] = useState<Harvest[]>([]);
  const [filteredHarvestData, setFilteredHarvestData] = useState<Harvest[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedHarvest, setSelectedHarvest] = useState<Harvest | null>(null);
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchHarvest() {
      try {
        const response = await fetch("/api/harvest");
        if (!response.ok) {
          throw new Error("Erro ao buscar dados");
        }
        const data = await response.json();
        setHarvestData(data);
        setFilteredHarvestData(data);
      } catch (error) {
        console.error("Erro:", error);
      }
    }
    fetchHarvest();
  }, []);

  const handleFilter = (startDate: string, location: string) => {
    const filtered = harvestData.filter((harvest) => {
      const harvestDate = new Date(harvest.date);
      const start = startDate ? new Date(startDate) : new Date(0);
      return (
        harvestDate >= start && (!location || harvest.location === location)
      );
    });
    setFilteredHarvestData(filtered);
  };

  const handleAdd = (newHarvest: Omit<Harvest, "id">) => {
    const id = Math.max(...harvestData.map((h) => h.id)) + 1;
    const harvestWithId = { ...newHarvest, id };
    setHarvestData([...harvestData, harvestWithId]);
    setFilteredHarvestData([...filteredHarvestData, harvestWithId]);
    setIsAddModalOpen(false);
  };

  const handleEdit = (editedHarvest: Harvest) => {
    const updatedHarvests = harvestData.map((h) =>
      h.id === editedHarvest.id ? editedHarvest : h
    );
    setHarvestData(updatedHarvests);
    setFilteredHarvestData(updatedHarvests);
    setIsEditModalOpen(false);
  };

  const handleDelete = (id: number) => {
    const updatedHarvests = harvestData.filter((h) => h.id !== id);
    setHarvestData(updatedHarvests);
    setFilteredHarvestData(updatedHarvests);
  };

  return (
    <div className="lg:flex lg:flex-row flex flex-col h-screen bg-gradient-to-b from-[#eefed1]/20 to-white">
      <SidebarMenu open={open} setOpen={setOpen} />

      <main className="flex-1 p-4 text-white">
        <div className="mb-5">
          <h1 className="font-second font-semibold text-black text-[22px]">
            Bem vindo, {user?.firstName} 👋
          </h1>
          <p className="text-gray-700 font-main text-[14px]">
            Aqui está a análise completa das suas colheitas!
          </p>
        </div>

        <InfoCards harvests={filteredHarvestData} />

        <HarvestFilter
          onFilter={handleFilter}
          fullFiltro={true}
          locations={Array.from(new Set(harvestData.map((h) => h.location)))}
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <HarvestBarChart harvests={filteredHarvestData} />
          <HarvestLineChart harvests={filteredHarvestData} />
        </div>

        <div className="container mx-auto p-4">
          <Button onClick={() => setIsAddModalOpen(true)} className="mb-4">
            Adicionar Colheita
          </Button>
          <HarvestTable
            harvests={filteredHarvestData}
            onEdit={(harvest) => {
              setSelectedHarvest(harvest);
              setIsEditModalOpen(true);
            }}
            onDelete={handleDelete}
          />
          <AddHarvestModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onAdd={handleAdd}
          />
          <EditHarvestModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onEdit={handleEdit}
            harvest={selectedHarvest}
          />
        </div>
      </main>
    </div>
  );
}
