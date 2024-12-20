import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Harvest } from "@/types/harvest";
interface HarvestTableProps {
  harvests: Harvest[];
  onEdit: (harvest: Harvest) => void;
  onDelete: (id: number) => void;
}

export default function HarvestTable({
  harvests,
  onEdit,
  onDelete,
}: HarvestTableProps) {
  const sortedHarvests = [...harvests];

  return (
    <div className="flex justify-center w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">ID</TableHead>
            <TableHead className="text-center">Data</TableHead>
            <TableHead className="text-center">Local</TableHead>
            <TableHead className="text-center">Quantidade (t)</TableHead>
            <TableHead className="text-center">Tipo de Cultura</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedHarvests.map((harvest) => (
            <TableRow key={harvest.id} className="text-center">
              <TableCell className="w-[100px]">{harvest.id}</TableCell>
              <TableCell>{harvest.date}</TableCell>
              <TableCell>{harvest.location}</TableCell>
              <TableCell>{harvest.quantity}</TableCell>
              <TableCell>{harvest.cropType}</TableCell>
              <TableCell>
                <div className="flex justify-center">
                  <Button onClick={() => onEdit(harvest)} variant="outline" className="mr-2">
                    Editar
                  </Button>
                  <Button
                    onClick={() => onDelete(harvest.id)}
                    variant="destructive"
                  >
                    Deletar
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
  );
}
