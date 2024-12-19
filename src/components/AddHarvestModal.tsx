import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";
import { mockData } from "@/mock/harvestData";

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

interface AddHarvestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (harvest: Omit<Harvest, "id">) => void;
}

export default function AddHarvestModal({
  isOpen,
  onClose,
  onAdd,
}: AddHarvestModalProps) {
  const [newHarvest, setNewHarvest] = useState<Omit<Harvest, "id">>({
    userId: 0,
    date: "",
    location: "",
    geoLocation: {
      latitude: 0,
      longitude: 0,
    },
    quantity: 0,
    cropType: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/harvest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newHarvest),
      });
  
      if (!response.ok) {
        throw new Error("Erro ao adicionar colheita");
      }
  
      const addedHarvest = await response.json();
      onAdd(addedHarvest); 
  
      setNewHarvest({
        userId: 0,
        date: "",
        location: "",
        geoLocation: { latitude: 0, longitude: 0 },
        quantity: 0,
        cropType: "",
      });
  
    } catch (error) {
      console.error("Erro ao adicionar colheita:", error);
    }
  };

  const handleGeoLocationChange = (
    field: "latitude" | "longitude",
    value: number
  ) => {
    setNewHarvest({
      ...newHarvest,
      geoLocation: {
        ...newHarvest.geoLocation,
        [field]: value,
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar nova colheita</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Data da Colheita</Label>
            <Input
              type="date"
              value={newHarvest.date}
              onChange={(e) =>
                setNewHarvest({ ...newHarvest, date: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Local</Label>
            <Input
              type="text"
              value={newHarvest.location}
              onChange={(e) =>
                setNewHarvest({ ...newHarvest, location: e.target.value })
              }
              placeholder="Local"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cropType">Geo Location</Label>
            <div className="flex space-x-4">
              <Input
                type="number"
                value={newHarvest.geoLocation.latitude || ""}
                onChange={(e) =>
                  handleGeoLocationChange("latitude", Number(e.target.value))
                }
                placeholder="Latitude"
                required
              />
              <Input
                type="number"
                value={newHarvest.geoLocation.longitude || ""}
                onChange={(e) =>
                  handleGeoLocationChange("longitude", Number(e.target.value))
                }
                placeholder="Longitude"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantidade (t)</Label>
            <Input
              type="number"
              value={newHarvest.quantity}
              onChange={(e) =>
                setNewHarvest({
                  ...newHarvest,
                  quantity: Number(e.target.value),
                })
              }
              placeholder="Quantidade (t)"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cropType">Tipo de Cultura</Label>
            <Input
              type="text"
              value={newHarvest.cropType}
              onChange={(e) =>
                setNewHarvest({ ...newHarvest, cropType: e.target.value })
              }
              placeholder="Tipo de Cultura"
              required
            />
          </div>
          <Button type="submit">Adicionar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
