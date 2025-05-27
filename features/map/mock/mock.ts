import { LocationMap } from '@/features/map/types'

export const LOCATIONS: LocationMap = {
  HCMC: {
    name: 'Ho Chi Minh City',
    center: [10.8231, 106.6297],
    markers: [
      {
        position: [10.8231, 106.6297],
        radius: 1000,
        color: '#e63946',
        name: 'District 1',
        description: 'Central treasure hunting area with 5 hidden items'
      },
      {
        position: [10.8031, 106.6597],
        radius: 800,
        color: '#2a9d8f',
        name: 'Saigon River',
        description: 'Riverside treasures with water challenges'
      },
      {
        position: [10.7831, 106.6997],
        radius: 1200,
        color: '#e9c46a',
        name: 'Thao Dien',
        description: 'Expat area with international themed puzzles'
      }
    ]
  },
  HANOI: {
    name: 'Hanoi',
    center: [21.0278, 105.8342],
    markers: [
      {
        position: [21.0278, 105.8342],
        radius: 1000,
        color: '#e63946',
        name: 'Old Quarter',
        description: 'Historic treasure hunting with cultural puzzles'
      },
      {
        position: [21.0378, 105.8442],
        radius: 800,
        color: '#2a9d8f',
        name: 'Hoan Kiem Lake',
        description: 'Lake area treasures with legends'
      }
    ]
  },
  DANANG: {
    name: 'Da Nang',
    center: [16.0544, 108.2022],
    markers: [
      {
        position: [16.0544, 108.2022],
        radius: 1000,
        color: '#e63946',
        name: 'My Khe Beach',
        description: 'Beach treasures and seaside puzzles'
      },
      {
        position: [16.0344, 108.2222],
        radius: 1200,
        color: '#2a9d8f',
        name: 'Dragon Bridge',
        description: 'Urban treasures with weekend special events'
      }
    ]
  },
  DALAT: {
    name: 'Da Lat',
    center: [11.9404, 108.4583],
    markers: [
      {
        position: [11.9404, 108.4583],
        radius: 900,
        color: '#e63946',
        name: 'Xuan Huong Lake',
        description: 'Mountain treasures with nature themes'
      }
    ]
  },
  NINHBINH: {
    name: 'Ninh Binh',
    center: [20.2144, 105.9399],
    markers: [
      {
        position: [20.2144, 105.9399],
        radius: 800,
        color: '#e63946',
        name: 'Trang An',
        description: 'Cave and boat-based treasure hunts'
      }
    ]
  }
}
