


export interface Marker {
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

export type LocationKey = 'HCMC' | 'HANOI' | 'DANANG' | 'DALAT' | 'NINHBINH'

export type LocationMap = Record<LocationKey, Location>
