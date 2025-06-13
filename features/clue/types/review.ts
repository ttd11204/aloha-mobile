import { UserProfile } from '@/features/userProfile/types'

export type ReviewResult = {
  id: number
  userId: string
  clueId: number
  rating: number
  comment: string
  createdAt: string
}

export type PostReviewRequest = {
  userId: string
  review: {
    clueId: number
    rating: number
    comment: string
  }
}

export type ReviewListResponse = {
  userId: string
  packageId: number
  clueId: number
  rating: number
  comment: string
  createdAt: string
  clue: any
  userName: string
  package: any
  id: number
}
