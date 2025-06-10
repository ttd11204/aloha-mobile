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
