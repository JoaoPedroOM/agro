'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Harvest } from '@/types/harvest'
  interface HarvestMapProps {
    harvests: Harvest[];
  }

export default function HarvestMap({ harvests }: HarvestMapProps) {
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    })
  }, [])

  const center = { lat: -15.7941, lng: -47.8825 } 

  return (
    <MapContainer center={center} zoom={5} style={{ height: '600px', width: '100%' }}>
      <TileLayer
        url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
        maxZoom={80}
        subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
      />
      {harvests.map((harvest) => (
        <Marker
          key={harvest.id}
          position={[harvest.geoLocation.latitude, harvest.geoLocation.longitude]}
        >
          <Popup>
            <div>
              <h3>{harvest.location}</h3>
              <p>Data: {new Date(harvest.date).toLocaleDateString('pt-BR')}</p>
              <p>Quantidade: {harvest.quantity} t</p>
              <p>Tipo de Cultura: {harvest.cropType}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

