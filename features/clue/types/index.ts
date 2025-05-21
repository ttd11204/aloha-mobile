export interface PostClue {
  clueId: number
  answer: string
  userId: string
}

export interface CluebyCityId {
  cityId: number
  question: string
  answerCode: string
  hint: string
  points: number
  timeBonus: any
  order: number
  title: any
  destination: string
  difficulty: string
  userProgresses: any[]
  id: number
}

export interface ClueData {
  cityId: number
  question: string
  answerCode: string
  hint: string
  points: number
  timeBonus: number | null
  order: number
  title: string | null
  destination: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  userProgresses: any[]
  id: number
}

export interface UserCityClues {
  clueId: number
  order: number
  isSolved: boolean
}

export interface PostClueResponse {
  pointsEarned: number
  currentProgress: string
  nextClue: number | null
}
