import { MaterialIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import { ResizeMode, Video } from 'expo-av'
import * as ImagePicker from 'expo-image-picker'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert
} from 'react-native'
import Animated, {
  Easing,
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated'
import { Challenge, TreasureHuntItem } from '../types'
import { useSubmitQuestMutation } from '../api/sideQuestApi'
import * as FileSystem from 'expo-file-system'
import { useResponsiveDesign } from '@/hooks/useResponsiveDesign'

interface SideQuestProps {
  challenges: TreasureHuntItem[]
  bonusChallenge?: Challenge
}

export function SideQuestLayout({
  challenges,
  bonusChallenge
}: SideQuestProps) {
  const [selectedChallenge, setSelectedChallenge] =
    useState<TreasureHuntItem | null>(null)
  const [media, setMedia] = useState<{ [key: string]: any }>({})
  const [showUploadSuccess, setShowUploadSuccess] = useState(false)
  const [userId, setUserId] = useState('')
  const { width, isSmallScreen } = useResponsiveDesign()
  const [selectedFile, setSelectedFile] = useState<any>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [submitQuest, { isLoading: submitLoading }] = useSubmitQuestMutation()

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken')
        if (token) {
          const decode = jwtDecode(token)
          setUserId(decode?.sub || '')
        }
      } catch (error) {
        console.error('Error decoding token:', error)
        setUserId('')
      }
    }

    loadToken()

    // Layout will be handled by useResponsiveDesign hook

    return () => {
      // Remove event listener on cleanup
      // Note: Modern RN versions don't need explicit removal
    }
  }, [])

  const pickImage = async () => {
    try {
      // Request permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

      if (status !== 'granted') {
        setError('Permission to access media library is required!')
        return
      }

      // Launch picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
        videoMaxDuration: 60
      })

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0]

        // Calculate file size (roughly)
        const response = await fetch(asset.uri)
        const blob = await response.blob()
        const fileSize = blob.size

        // Check size (50MB limit)
        const maxSize = 50 * 1024 * 1024
        if (fileSize > maxSize) {
          setError('File is too large, please choose a file under 50MB.')
          return
        }

        setSelectedFile(asset)
        setPreviewUrl(asset.uri)
        setError(null)
      }
    } catch (err) {
      console.error('Error picking image:', err)
      setError('An error occurred while choosing the file')
    }
  }

  // handleFileSubmit sẽ sử dụng selectedFile đã chọn từ pickImage và truyền params qua expo-router
  const handleFileSubmit = async (selectedQuestId: number) => {
    if (!selectedFile) {
      setError('Please select a file before submitting.')
      return
    }

    setIsLoading(true)
    try {
      const formData = new FormData()

      formData.append('File', {
        uri: selectedFile.uri,
        name:
          selectedFile.fileName ||
          `upload.${selectedFile.uri.split('.').pop() || 'jpg'}`,
        type: 'image/jpeg'
      } as any)

      // formData.append('UserId', '238ed9f0-7ce1-42c6-92bb-802495195f00')
      // formData.append('SideQuestId', selectedQuestId.toString())

      // console.log('FormData:', formData)
      const res = await submitQuest({
        userId,
        sideQuestId: selectedQuestId,
        formData
      }).unwrap()

      if (
        res.message ===
        "The evidence provided does not match the side quest's requirement."
      ) {
        router.push({
          pathname: '/FailQuest',
          params: { errorData: encodeURIComponent(JSON.stringify(res)) }
        } as any)
      } else {
        router.push({
          pathname: '/SuccessQuest',
          params: {
            points: res.data.pointsEarned,
            progress: res.data.currentProgress
          }
        } as any)
      }
    } catch (err: any) {
      if (err?.status === 409) {
        router.push({
          pathname: '/FailQuest',
          params: { errorData: encodeURIComponent(JSON.stringify(err.data)) }
        } as any)
      } else {
        Alert.alert('Error', err?.data?.message || 'Something went wrong')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const scale = useSharedValue(1)
  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    }
  })

  const handleCardPress = (challenge: TreasureHuntItem) => {
    scale.value = withSpring(1.05, {}, () => {
      scale.value = withSpring(1)
    })
    setSelectedChallenge(challenge)
  }

  const checkmarkPathLength = useSharedValue(0)

  useEffect(() => {
    if (showUploadSuccess) {
      checkmarkPathLength.value = withTiming(1, {
        duration: 800,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1)
      })
    } else {
      checkmarkPathLength.value = 0
    }
  }, [showUploadSuccess])

  return (
    <ScrollView className="p-4 pb-5">
      {/* Bonus Challenge */}
      {bonusChallenge && (
        <View className="mb-6 items-center">
          <Animated.View className="rounded-lg bg-amber-50 border border-amber-300 overflow-hidden w-full max-w-[500px]">
            <View className="p-4">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-lg font-bold text-amber-800">
                  Side Quest of the Day
                </Text>
                <View className="bg-amber-500 px-3 py-1 rounded-2xl">
                  <Text className="text-white font-semibold text-xs">
                    {bonusChallenge.points} pts
                  </Text>
                </View>
              </View>
              <Text className="text-gray-600 text-base">
                {bonusChallenge.text}
              </Text>
            </View>
          </Animated.View>
        </View>
      )}

      {/* Regular Challenges Grid */}
      <View className="flex-row flex-wrap justify-between">
        {challenges.map((challenge) => (
          <TouchableOpacity
            key={challenge.id}
            className="w-full mb-4 bg-white rounded-lg shadow-sm android:elevation-2"
            onPress={() => handleCardPress(challenge)}
            activeOpacity={0.7}
          >
            <View className="p-4 min-h-[160px] justify-between">
              <Text className="text-base font-semibold mb-2 text-gray-800">
                {challenge.title}
              </Text>
              <Text className="text-sm italic text-gray-600 flex-1 mb-3">
                {challenge.description}
              </Text>
              <View className="flex-row justify-between items-center mt-2">
                <Text className="text-xs text-gray-400">Click for details</Text>
                <View className="bg-amber-100 px-2 py-1 rounded">
                  <Text className="text-amber-800 font-semibold text-xs">
                    {challenge.points} pts
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Challenge Details Modal */}
      <Modal
        visible={selectedChallenge !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSelectedChallenge(null)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center p-4">
          <Animated.View
            entering={FadeIn.duration(300)}
            className="bg-white rounded-xl p-5 w-full max-w-[400px]"
          >
            {selectedChallenge && (
              <>
                <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-lg font-bold text-amber-800 flex-1">
                    {selectedChallenge.title}
                  </Text>
                  <View className="bg-amber-500 px-3 py-1 rounded-2xl">
                    <Text className="text-white font-semibold text-xs">
                      {selectedChallenge.points} pts
                    </Text>
                  </View>
                </View>

                <ScrollView className="max-h-[120px] mb-4">
                  {selectedChallenge.requirement
                    ?.slice(0, width < 380 ? 2 : 3)
                    .map((outcome, idx) => (
                      <View key={idx} className="flex-row items-start mb-1.5">
                        <Text className="text-emerald-600 mr-2 font-bold">
                          ✓
                        </Text>
                        <Text className="text-sm text-gray-800 flex-1">
                          {outcome}
                        </Text>
                      </View>
                    ))}
                  {selectedChallenge.requirement &&
                    selectedChallenge.requirement.length >
                      (width < 380 ? 2 : 3) && (
                      <Text className="text-violet-600 text-sm mt-1">
                        +{' '}
                        {selectedChallenge.requirement.length -
                          (width < 380 ? 2 : 3)}{' '}
                        more
                      </Text>
                    )}
                </ScrollView>

                {/* Media Upload Section */}
                <View className="mb-4">
                  <Text className="text-base font-semibold text-gray-600 mb-2">
                    Upload Image/Video:
                  </Text>

                  <TouchableOpacity
                    onPress={pickImage}
                    className="flex-row items-center justify-center bg-amber-100 p-3 rounded-lg mb-2"
                  >
                    <MaterialIcons
                      name="file-upload"
                      size={24}
                      color="#92400E"
                    />
                    <Text className="ml-2 text-amber-800 font-medium">
                      Select from gallery
                    </Text>
                  </TouchableOpacity>

                  {media[selectedChallenge.id] && (
                    <Text className="text-sm text-gray-600 mt-2">
                      Selected: {media[selectedChallenge.id]?.name || 'File'}
                    </Text>
                  )}

                  {error && (
                    <Text className="text-red-500 text-sm mt-2">{error}</Text>
                  )}

                  {previewUrl && (
                    <View className="mt-3">
                      <Text className="text-sm text-gray-600 mb-2">
                        Preview:
                      </Text>
                      {selectedFile?.type?.startsWith('image') ||
                      (!selectedFile?.type &&
                        selectedFile?.uri?.match(/\.(jpg|jpeg|png|gif)$/i)) ? (
                        <Image
                          source={{ uri: previewUrl }}
                          className="w-full h-[200px] rounded-lg bg-gray-100"
                          resizeMode="cover"
                        />
                      ) : (
                        <Video
                          source={{ uri: previewUrl }}
                          className="w-full h-[200px] rounded-lg bg-gray-100"
                          useNativeControls
                          resizeMode={ResizeMode.CONTAIN}
                        />
                      )}
                    </View>
                  )}
                </View>

                <TouchableOpacity
                  onPress={() => handleFileSubmit(selectedChallenge.id)}
                  className="bg-amber-500 py-3 rounded-lg items-center justify-center mb-3"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#ffffff" />
                  ) : (
                    <Text className="text-amber-800 font-semibold text-base">
                      Submit
                    </Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setSelectedChallenge(null)}
                  className="bg-amber-100 py-3 rounded-lg items-center"
                >
                  <Text className="text-amber-800 font-semibold text-base">
                    Close
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </Animated.View>
        </View>
      </Modal>

      {/* Upload Success Modal */}
      <Modal
        visible={showUploadSuccess}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowUploadSuccess(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center p-4">
          <Animated.View
            entering={FadeIn.duration(300)}
            className="bg-white rounded-2xl p-6 w-full max-w-[380px] items-center"
          >
            <View className="w-20 h-20 rounded-full bg-emerald-500 justify-center items-center mb-6 shadow-lg android:elevation-8">
              <MaterialIcons name="check" size={40} color="#ffffff" />
            </View>

            <View className="items-center mb-6">
              <Text className="text-2xl font-bold text-gray-800 mb-2">
                Upload Successful!
              </Text>
              <Text className="text-base text-gray-600 mb-3 text-center">
                Your submission has been received.
              </Text>
              <View className="flex-row items-center">
                <MaterialIcons name="access-time" size={16} color="#92400E" />
                <Text className="text-sm text-amber-800 font-medium ml-1.5">
                  Results will be reviewed within 10 minutes.
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => setShowUploadSuccess(false)}
              className="bg-amber-500 py-3 px-6 rounded-lg w-full items-center"
            >
              <Text className="text-amber-800 font-semibold text-base">
                Continue to other quests
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </ScrollView>
  )
}
