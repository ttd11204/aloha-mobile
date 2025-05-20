import { ClueData } from '@/features/clue/types'
import React from 'react'
import { ScrollView } from 'react-native'
import { Clue } from './clue'

interface CluesListProps {
  clues?: ClueData[]
  userClues: { clueId: number; isSolved: boolean }[]
}

export function CluesList({ clues = [], userClues }: CluesListProps) {
  return (
    <ScrollView className="space-y-2">
      {clues.map((clue, index) => {
        const previousClueSolved =
          index === 0 ||
          userClues.some(
            (uc) => uc.clueId === clues[index - 1].id && uc.isSolved
          )

        return (
          <Clue
            key={clue.id}
            data={clue}
            previousClueSolved={previousClueSolved}
          />
        )
      })}
    </ScrollView>
  )
}
