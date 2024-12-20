"use client";

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "./ui/label";
import { Harvest } from "@/types/harvest";

interface EditHarvestModalProps {
  isOpen: boolean
  onClose: () => void
  onEdit: (harvest: Harvest) => void
  harvest: Harvest | null
}

export default function EditHarvestModal({ isOpen, onClose, onEdit, harvest }: EditHarvestModalProps) {
  const [editedHarvest, setEditedHarvest] = useState<Harvest | null>(null)

  useEffect(() => {
    if (harvest) {
      setEditedHarvest({ ...harvest })
    }
  }, [harvest])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editedHarvest) {
      onEdit(editedHarvest)
    }
  }

  if (!editedHarvest) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Colheita</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
          <Label htmlFor="date">Data da Colheita</Label>
          <Input
            type="date"
            value={editedHarvest.date}
            onChange={(e) => setEditedHarvest({ ...editedHarvest, date: e.target.value })}
            required
          />
          </div>

          <div className="space-y-2">
          <Label htmlFor="location">Local</Label>
          <Input
            type="text"
            value={editedHarvest.location}
            onChange={(e) => setEditedHarvest({ ...editedHarvest, location: e.target.value })}
            placeholder="Local"
            required
          />
          </div>
          <div className="space-y-2">
            <Label htmlFor="geoLocation">Geo Location</Label>
            <div className="flex space-x-4">
              <Input
                type="number"
                value={editedHarvest.geoLocation.latitude}
                onChange={(e) => setEditedHarvest({ ...editedHarvest, geoLocation: { ...editedHarvest.geoLocation, latitude: Number(e.target.value) } })}
                placeholder="Latitude"
                required
              />
              <Input
                type="number"
                value={editedHarvest.geoLocation.longitude}
                onChange={(e) => setEditedHarvest({ ...editedHarvest, geoLocation: { ...editedHarvest.geoLocation, longitude: Number(e.target.value) } })}
                placeholder="Longitude"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
          <Label htmlFor="quantity">Quantidade (t)</Label>
          <Input
            type="number"
            value={editedHarvest.quantity}
            onChange={(e) => setEditedHarvest({ ...editedHarvest, quantity: Number(e.target.value) })}
            placeholder="Quantidade (t)"
            required
          />
          </div>
           <div className="space-y-2">
           <Label htmlFor="cropType">Tipo de Cultura</Label>
          <Input
            type="text"
            value={editedHarvest.cropType}
            onChange={(e) => setEditedHarvest({ ...editedHarvest, cropType: e.target.value })}
            placeholder="Tipo de Cultura"
            required
          />
          </div>
          <Button type="submit">Salvar Alterações</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
