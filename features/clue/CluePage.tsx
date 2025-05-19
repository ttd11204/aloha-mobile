import { useGetCluesQuery } from '@/features/clue/api/clueApi'
import { Text, View } from 'react-native'

export default function CluePage() {
  const { data: clues, isLoading } = useGetCluesQuery()

  console.log('clues', clues)

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  if (!clues) {
    return <Text>No data</Text>
  }
  return (
    <View>
      {clues.map((clue) => (
        <View key={clue.id}>
          <Text>{clue.difficulty}</Text>
          <Text>{clue.question}</Text>
        </View>
      ))}

      <Text></Text>
    </View>
  )
}
