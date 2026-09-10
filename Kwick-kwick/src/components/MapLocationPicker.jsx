import React, { useEffect, useMemo, useState } from 'react'
import L from 'leaflet'
import { CircleMarker, MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import { LocateFixed, MapPin, Search } from 'lucide-react'
import { reverseGeocode, searchAddresses } from '../services/locationApi'

const DEFAULT_CENTER = [20, 0]
const markerIcon = L.divIcon({
  className: 'kwick-map-marker',
  html: '<span></span>',
  iconSize: [24, 24],
  iconAnchor: [12, 24],
})

function MapController({ center, onMapClick }) {
  const map = useMap()
  useEffect(() => {
    if (center) map.flyTo(center, Math.max(map.getZoom(), 15), { duration: 0.35 })
  }, [center, map])
  useMapEvents({ click: ({ latlng }) => onMapClick(latlng.lat, latlng.lng) })
  return null
}

function formatLocation(result) {
  return {
    formattedAddress: result.formattedAddress || '',
    latitude: Number(result.latitude),
    longitude: Number(result.longitude),
    placeId: result.placeId || null,
    city: result.city || '',
    state: result.state || '',
    postalCode: result.postalCode || '',
    country: result.country || '',
  }
}

export default function MapLocationPicker({ value, onChange, title = 'Choose location', required = false }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [center, setCenter] = useState(value?.latitude && value?.longitude ? [value.latitude, value.longitude] : DEFAULT_CENTER)
  const selected = useMemo(() => value?.latitude != null && value?.longitude != null ? [value.latitude, value.longitude] : null, [value])

  useEffect(() => {
    if (value?.latitude != null && value?.longitude != null) setCenter([value.latitude, value.longitude])
  }, [value?.latitude, value?.longitude])

  const selectResult = (result) => {
    const location = formatLocation(result)
    setCenter([location.latitude, location.longitude])
    onChange(location)
    setQuery(location.formattedAddress)
    setResults([])
    setMessage('')
  }

  const updateCoordinates = async (latitude, longitude) => {
    setCenter([latitude, longitude])
    setLoading(true)
    setMessage('Finding the address for this point...')
    try {
      const address = await reverseGeocode(latitude, longitude)
      onChange(formatLocation({ ...address, latitude, longitude }))
      setQuery(address.formattedAddress)
      setMessage('')
    } catch (error) {
      setMessage(error.message || 'Unable to read this location.')
    } finally {
      setLoading(false)
    }
  }

  const search = async (event) => {
    event.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    setMessage('')
    try {
      const matches = await searchAddresses(query)
      setResults(matches)
      if (!matches.length) setMessage('No address found. Try a nearby landmark or street.')
    } catch (error) {
      setMessage(error.message || 'Unable to search for that address.')
    } finally {
      setLoading(false)
    }
  }

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      setMessage('Location is not supported by this browser.')
      return
    }
    setLoading(true)
    setMessage('Reading your current location...')
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => updateCoordinates(coords.latitude, coords.longitude),
      () => { setLoading(false); setMessage('Location permission was denied or unavailable. Search or tap the map instead.') },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 300000 },
    )
  }

  return (
    <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-black text-slate-900">{title}{required ? ' *' : ''}</h2>
        <button type="button" onClick={useCurrentLocation} disabled={loading} className="flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 disabled:opacity-60">
          <LocateFixed className="h-4 w-4" /> Use my location
        </button>
      </div>
      <form onSubmit={search} className="flex gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 px-3">
          <Search className="h-4 w-4 text-slate-400" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search an address or landmark" className="min-w-0 flex-1 py-3 text-sm outline-none" />
        </div>
        <button type="submit" disabled={loading} className="rounded-xl bg-orange-600 px-4 text-sm font-black text-white disabled:opacity-60">Search</button>
      </form>
      {results.length > 0 && (
        <div className="space-y-1 rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
          {results.map((result) => <button type="button" key={result.placeId || `${result.latitude}-${result.longitude}`} onClick={() => selectResult(result)} className="block w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-orange-50">{result.formattedAddress}</button>)}
        </div>
      )}
      <div className="relative h-64 overflow-hidden rounded-xl border border-slate-200">
        <MapContainer center={center} zoom={selected ? 15 : 2} scrollWheelZoom className="h-full w-full">
          <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapController center={center} onMapClick={updateCoordinates} />
          {selected && <><Marker position={selected} icon={markerIcon} draggable eventHandlers={{ dragend: (event) => { const point = event.target.getLatLng(); updateCoordinates(point.lat, point.lng) } }} /><CircleMarker center={selected} radius={5} pathOptions={{ color: '#ea580c', fillColor: '#fb923c', fillOpacity: 0.85 }} /></>}
        </MapContainer>
        <div className="pointer-events-none absolute bottom-2 left-2 rounded-lg bg-white/90 px-2 py-1 text-[11px] font-semibold text-slate-600 shadow">Tap the map or drag the pin to adjust</div>
      </div>
      <div className="flex items-start gap-2 text-sm text-slate-700"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" /><span>{value?.formattedAddress || 'Select a real address to continue.'}</span></div>
      {message && <p className="text-xs font-semibold text-slate-600">{message}</p>}
    </section>
  )
}
