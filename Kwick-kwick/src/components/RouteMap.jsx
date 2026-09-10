import React, { useEffect, useMemo, useState } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, Polyline, TileLayer, useMap } from 'react-leaflet'
import { previewRoute } from '../services/routeApi'

const pickupIcon = L.divIcon({ className: 'kwick-route-pickup', html: '<span></span>', iconSize: [18, 18], iconAnchor: [9, 9] })
const deliveryIcon = L.divIcon({ className: 'kwick-route-delivery', html: '<span></span>', iconSize: [18, 18], iconAnchor: [9, 9] })
const riderIcon = L.divIcon({ className: 'kwick-route-rider', html: '<span></span>', iconSize: [18, 18], iconAnchor: [9, 9] })

function FitBounds({ points }) {
  const map = useMap()
  useEffect(() => {
    if (points.length > 1) map.fitBounds(L.latLngBounds(points), { padding: [24, 24] })
    else if (points.length === 1) map.setView(points[0], 14)
  }, [map, points])
  return null
}

export default function RouteMap({ pickups = [], delivery, riderLocation = null, token, geometry = null, height = 'h-64' }) {
  const [routeGeometry, setRouteGeometry] = useState(geometry)
  const [error, setError] = useState('')
  const validPickups = useMemo(() => pickups.filter((point) => Number.isFinite(Number(point?.latitude)) && Number.isFinite(Number(point?.longitude))), [pickups])
  const validDelivery = useMemo(() => Number.isFinite(Number(delivery?.latitude)) && Number.isFinite(Number(delivery?.longitude)) ? { latitude: Number(delivery.latitude), longitude: Number(delivery.longitude) } : null, [delivery?.latitude, delivery?.longitude])
  const validRider = useMemo(() => Number.isFinite(Number(riderLocation?.latitude)) && Number.isFinite(Number(riderLocation?.longitude)) ? { latitude: Number(riderLocation.latitude), longitude: Number(riderLocation.longitude) } : null, [riderLocation?.latitude, riderLocation?.longitude])
  const points = useMemo(() => [...validPickups.map((point) => [Number(point.latitude), Number(point.longitude)]), ...(validDelivery ? [[validDelivery.latitude, validDelivery.longitude]] : []), ...(validRider ? [[validRider.latitude, validRider.longitude]] : [])], [validDelivery, validPickups, validRider])

  useEffect(() => {
    setRouteGeometry(geometry)
  }, [geometry])

  useEffect(() => {
    if (routeGeometry || !token || !validDelivery || !validPickups.length) return undefined
    let active = true
    previewRoute({ pickups: validPickups, delivery: validDelivery }, token).then((route) => {
      if (active) setRouteGeometry(route.geometry)
    }).catch((requestError) => {
      if (active) setError(requestError.message || 'Road route unavailable')
    })
    return () => { active = false }
  }, [routeGeometry, token, validDelivery, validPickups])

  if (!validDelivery || !validPickups.length) return <div className={`${height} flex items-center justify-center rounded-xl bg-slate-100 text-sm font-semibold text-slate-500`}>Map coordinates are not available.</div>
  const line = routeGeometry?.coordinates?.map(([longitude, latitude]) => [latitude, longitude]) || []
  return (
    <div className={`relative overflow-hidden rounded-xl border border-slate-200 ${height}`}>
      <MapContainer center={points[0]} zoom={13} scrollWheelZoom className="h-full w-full">
        <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <FitBounds points={points} />
        {validPickups.map((point, index) => <Marker key={`${point.vendorId || index}`} position={[point.latitude, point.longitude]} icon={pickupIcon} />)}
        <Marker position={[validDelivery.latitude, validDelivery.longitude]} icon={deliveryIcon} />
        {validRider && <Marker position={[validRider.latitude, validRider.longitude]} icon={riderIcon} />}
        {line.length > 1 && <Polyline positions={line} pathOptions={{ color: '#ea580c', weight: 5, opacity: 0.82 }} />}
      </MapContainer>
      {error && <div className="absolute bottom-2 left-2 right-2 rounded-lg bg-white/90 px-2 py-1 text-xs font-semibold text-slate-600 shadow">{error}</div>}
    </div>
  )
}
