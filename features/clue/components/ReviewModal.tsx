import React, { useState } from 'react'
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useAppSelector } from '@/store/hooks'
import { usePostReviewMutation } from '@/features/clue/api/reviewApi'

type ClueModalProps = {
  clueId: number
  visible: boolean
  onClose: () => void
  onSubmitFeedback: (feedback: string, rating: number) => void
}

const ClueModal: React.FC<ClueModalProps> = ({
  clueId,
  visible,
  onClose,
  onSubmitFeedback
}) => {
  const userId = useAppSelector((state) => state.auth.userId) as string | null
  const [feedback, setFeedback] = useState('')
  const [rating, setRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [postReview] = usePostReviewMutation()

  const handleSubmit = async () => {
    if (feedback.trim() === '' || rating === 0 || !userId) {
      alert('Please provide feedback, rating and ensure you are logged in.')
      return
    }

    try {
      setIsSubmitting(true)

      await postReview({
        userId: userId,
        review: {
          clueId: clueId,
          rating,
          comment: feedback
        }
      }).unwrap()

      onSubmitFeedback(feedback, rating)
      setFeedback('')
      setRating(0)
      onClose()
    } catch (error) {
      Alert.alert('Error', 'Failed to submit review. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStars = () => (
    <View className="flex-row justify-center mb-3">
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => setRating(star)}>
          <AntDesign
            name={star <= rating ? 'star' : 'staro'}
            size={30}
            color={star <= rating ? '#FFD700' : '#ccc'}
          />
        </TouchableOpacity>
      ))}
    </View>
  )

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View className="flex-1 bg-black bg-opacity-60 justify-center items-center">
        <View className="bg-white p-6 rounded-lg w-10/12">
          <View className="items-center mb-4">
            <AntDesign name="checkcircle" size={40} color="green" />
            <Text className="text-xl font-bold text-green-600 mt-2">
              Congratulations!
            </Text>
            <Text className="text-center text-gray-600 mt-1">
              You have successfully completed this clue!
            </Text>
          </View>

          {renderStars()}

          <TextInput
            className="border border-gray-300 rounded-md p-2 my-3"
            placeholder="Leave your feedback here..."
            multiline
            value={feedback}
            onChangeText={setFeedback}
          />

          <TouchableOpacity
            className="bg-blue-500 rounded-md p-2 items-center my-1"
            onPress={() => {
              handleSubmit()
            }}
          >
            <Text className="text-white font-semibold">
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} className="mt-2 items-center">
            <Text className="text-gray-500">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default ClueModal
