"use client";

import { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../../components/ui/Sidebar";
import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
import { MdSpaceDashboard } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { SiOrganicmaps } from "react-icons/si";
import InfoCards from "@/components/InfoCards";
import HarvestBarChart from "@/components/HarvestBarChart";
import HarvestLineChart from "@/components/HarvestLineChart";
import HarvestFilter from "@/components/HarvestFilter";
import { Button } from "@/components/ui/button";
import HarvestTable from "@/components/HarvestTable";
import AddHarvestModal from "@/components/AddHarvestModal";
import EditHarvestModal from "@/components/EditHarvestModal";

const Logo = () => (
  <div className="text-left py-4 flex items-center">
    <h2 className="text-3xl font-second font-bold text-transparent bg-clip-text bg-gradient-to-t from-green-800 to-green-400">
      Agro m2
    </h2>
  </div>
);

const LogoIcon = () => (
  <div className="text-center py-4">
    <h2 className="text-3xl font-second font-bold text-transparent bg-clip-text bg-gradient-to-t from-green-800 to-green-400">
      A
    </h2>
  </div>
);

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

  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <MdSpaceDashboard size={25} color="black" />,
    },
    {
      label: "Historico",
      href: "/historico",
      icon: <FaHistory size={25} color="black" />,
    },
    {
      label: "Mapas ",
      href: "/Mapas ",
      icon: <SiOrganicmaps size={25} color="black" />,
    },
  ];

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
    <div className="lg:flex lg:flex-row flex flex-col h-screen">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between lg:gap-10 gap-2">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="lg:mt-8 mt-2 flex flex-col gap-2 font-semibold font-second">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 font-semibold text-gray-400">
            <SignedIn>
              <UserButton />
            </SignedIn>
            {open && user?.firstName && (
              <span className="text-black font-second">{user.firstName}</span>
            )}
          </div>
        </SidebarBody>
      </Sidebar>

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
