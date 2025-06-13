export interface Marker {
  clueId: number
  position: [number, number]
  radius: number
  color: string
  name: string
  description: string
}

export interface Location {
  name: string
  center: [number, number]
  markers: Marker[]
}

export type LocationKey = 'DANANG'

export type LocationMap = Record<LocationKey, Location>
