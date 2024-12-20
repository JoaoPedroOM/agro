"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HarvestFilterProps {
  onFilter: (startDate: string, location: string) => void;
  locations: string[];
  fullFiltro: boolean;
}

export default function HarvestFilter({
  onFilter,
  locations,
  fullFiltro,
}: HarvestFilterProps) {
  const [startDate, setStartDate] = useState("");
  const [location, setLocation] = useState("");

  const handleFilter = () => {
    onFilter(startDate, location === "all" ? "" : location);
  };

  return (
    <div className="flex w-full flex-wrap justify-end gap-4 mb-4">
      {fullFiltro && (
        <Input
          className="lg:w-[180px] w-[130px] text-[12px]"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Data inicial"
        />
      )}
      <Select value={location} onValueChange={setLocation}>
        <SelectTrigger className="lg:w-[180px] w-[130px] text-[12px]">
          <SelectValue placeholder="Selecione o local" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os locais</SelectItem>
          {locations.map((loc) => (
            <SelectItem key={loc} value={loc}>
              {loc}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={handleFilter}>Filtrar</Button>
    </div>
  );
}
