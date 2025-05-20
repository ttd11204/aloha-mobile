import { PostClue } from '@/features/clue/api/postClue'
import { create } from 'zustand'

type VerificationStore = {
  error: string
  verify: (
    clueNumber: number,
    code: string,
    userId: string | null,
    refetch: () => void,
    onSuccess: () => void,
    setIsLoading: (loading: boolean) => void
  ) => Promise<void>
  setError: (message: string) => void
}

export const useVerification = create<VerificationStore>((set) => ({
  error: '',
  setError: (message) => set({ error: message }),

  verify: async (
    clueNumber,
    code,
    userId,
    refetch,
    onSuccess,
    setIsLoading
  ) => {
    if (!userId) {
      set({ error: 'User ID is missing. Please log in.' })
      return
    }

    console.log('Verifying clue:', clueNumber, code, userId)

    try {
      const res = await PostClue(clueNumber, code, userId)

      if (res.message.includes('Correct answer')) {
        set({ error: '' })
        setIsLoading(false)
        onSuccess()
        return
      }

      if (res.message.includes('already')) {
        set({ error: 'This clue has already been solved.' })
        return
      }

      if (res.message.includes('Incorrect')) {
        set({ error: 'Invalid verification code. Please try again.' })
        return
      }

      set({ error: '' })
      refetch()
    } catch (error) {
      if (error instanceof Error) {
        set({ error: error.message })
      } else {
        set({ error: 'An unknown error occurred.' })
      }
    } finally {
      setIsLoading(false) // Tắt loading trong mọi trường hợp
    }
  }
}))
