import { LocationMap } from '@/features/map/types'

export const LOCATIONS: LocationMap = {
  DANANG: {
    name: 'Da Nang',
    center: [16.0544, 108.2022],
    markers: [
      // {
      //   position: [16.0544, 108.2022],
      //   radius: 1000,
      //   color: '#e63946',
      //   name: 'My Khe Beach',
      //   description: 'Beach treasures and seaside puzzles'
      // },
      // {
      //   position: [16.0344, 108.2222],
      //   radius: 1200,
      //   color: '#2a9d8f',
      //   name: 'Dragon Bridge',
      //   description: 'Urban treasures with weekend special events'
      // },
      {
        clueId: 2,
        position: [16.0365, 108.2191],
        radius: 1000,
        color: '#00b4d8',
        name: 'Water Music Square',
        description: 'Plaza of water choreography and silk legacy'
      },
      {
        clueId: 3,
        position: [16.0658, 108.2252],
        radius: 800,
        color: '#ffb703',
        name: 'Trendy Café Hub',
        description: 'Street 28 vibes with murals and fusion brews'
      },
      {
        clueId: 4,
        position: [16.0422, 108.21],
        radius: 900,
        color: '#6a4c93',
        name: 'Noodle Sanctuary',
        description: 'Broth-guarded noodle house with dragon lore'
      },
      {
        clueId: 5,
        position: [16.0678, 108.2112],
        radius: 1000,
        color: '#2a9d8f',
        name: 'Riverside Market',
        description: 'Early trade where phở and prices meet the river'
      },
      {
        clueId: 6,
        position: [16.043, 108.2185],
        radius: 850,
        color: '#e63946',
        name: 'Midnight Blooms',
        description: 'Night-time flower bazaar brimming with Tết spirit'
      }
    ]
  }
}
