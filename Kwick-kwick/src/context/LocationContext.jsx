import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { geocodeAddress, reverseGeocode } from '../services/locationApi'

const STORAGE_KEY = 'kwick-selected-location'
const LocationContext = createContext(null)

function readStoredLocation() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
    return stored && Number.isFinite(stored.latitude) && Number.isFinite(stored.longitude) ? stored : null
  } catch {
    return null
  }
}

function getPermissionError(error) {
  if (error?.code === 1) return 'Location permission was denied. Enable it in your browser settings and retry.'
  if (error?.code === 2) return 'Your device could not determine a location. Check GPS or network access and retry.'
  if (error?.code === 3) return 'Location detection timed out. Please retry.'
  return error?.message || 'Unable to retrieve your device location.'
}

function createLocation(coords, address, source) {
  return {
    latitude: coords.latitude,
    longitude: coords.longitude,
    accuracy: Number.isFinite(coords.accuracy) ? coords.accuracy : null,
    formattedAddress: address.formattedAddress || '',
    city: address.city || '',
    state: address.state || '',
    postalCode: address.postalCode || '',
    country: address.country || '',
    source,
    updatedAt: new Date().toISOString(),
  }
}

export function LocationProvider({ children }) {
  const [currentLocation, setCurrentLocation] = useState(readStoredLocation)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [permission, setPermission] = useState('unknown')

  useEffect(() => {
    if (!navigator.permissions?.query) return undefined
    let permissionStatus
    const updatePermission = () => setPermission(permissionStatus?.state || 'unknown')
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      permissionStatus = result
      updatePermission()
      result.addEventListener?.('change', updatePermission)
    }).catch(() => {})
    return () => permissionStatus?.removeEventListener?.('change', updatePermission)
  }, [])

  const saveLocation = useCallback((location) => {
    setCurrentLocation(location)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(location))
    } catch {
      // Location remains available for the current session when storage is unavailable.
    }
  }, [])

  const getCurrentLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setPermission('unsupported')
      setError('Location is not supported by this browser.')
      return null
    }

    setLoading(true)
    setError('')
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(async ({ coords }) => {
        setPermission('granted')
        try {
          const address = await reverseGeocode(coords.latitude, coords.longitude)
          const location = createLocation(coords, address, 'device')
          saveLocation(location)
          resolve(location)
        } catch (geocodeError) {
          setError(geocodeError.message || 'Your location was found, but its address could not be loaded.')
          const location = createLocation(coords, {}, 'device')
          saveLocation(location)
          resolve(location)
        } finally {
          setLoading(false)
        }
      }, (geolocationError) => {
        if (geolocationError.code === 1) setPermission('denied')
        setError(getPermissionError(geolocationError))
        setLoading(false)
        resolve(null)
      }, { enableHighAccuracy: true, timeout: 12000, maximumAge: 300000 })
    })
  }, [saveLocation])

  const selectAddress = useCallback(async (query) => {
    setLoading(true)
    setError('')
    try {
      const result = await geocodeAddress(query)
      const location = createLocation(result, result, 'manual')
      saveLocation(location)
      return location
    } catch (lookupError) {
      setError(lookupError.message || 'Unable to find that address.')
      return null
    } finally {
      setLoading(false)
    }
  }, [saveLocation])

  const clearLocation = useCallback(() => {
    setCurrentLocation(null)
    setError('')
    try { localStorage.removeItem(STORAGE_KEY) } catch (storageError) { void storageError }
  }, [])

  const value = useMemo(() => ({
    currentLocation,
    latitude: currentLocation?.latitude ?? null,
    longitude: currentLocation?.longitude ?? null,
    formattedAddress: currentLocation?.formattedAddress || '',
    accuracy: currentLocation?.accuracy ?? null,
    loading,
    error,
    permission,
    getCurrentLocation,
    refreshLocation: getCurrentLocation,
    selectAddress,
    clearLocation,
  }), [currentLocation, loading, error, permission, getCurrentLocation, selectAddress, clearLocation])

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>
}

export function useLocationContext() {
  const context = useContext(LocationContext)
  if (!context) throw new Error('useLocationContext must be used inside LocationProvider')
  return context
}
