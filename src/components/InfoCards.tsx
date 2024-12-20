import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Harvest } from "@/types/harvest"
  interface InfoCardsProps {
    harvests: Harvest[]; 
  }

export default function InfoCards({ harvests }: InfoCardsProps) {
  const totalHarvests = harvests.length
  const totalQuantity = harvests.reduce((sum, harvest) => sum + harvest.quantity, 0)
  const averageQuantity = totalHarvests > 0 ? totalQuantity / totalHarvests : 0
  const uniqueLocations = new Set(harvests.map(h => h.location)).size

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Colheitas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalHarvests}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Quantidade Total (t)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalQuantity.toFixed(2)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Média por Colheita (t)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageQuantity.toFixed(2)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Locais Únicos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{uniqueLocations}</div>
        </CardContent>
      </Card>
    </div>
  )
}

