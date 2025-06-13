import { useReviewListQuery } from '@/features/review/api/reviewApi'
import { JSX } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const ReviewList: React.FC = () => {
  const { data: rvList, isLoading, error } = useReviewListQuery()

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getAvatarLetter = (name: string): string => {
    return name.charAt(0).toUpperCase()
  }

  const generateRandomTags = (): string[] => {
    const allTags = ['Confusing', 'Wordplay', 'Easy', 'Tricky', 'Fun', 'Creative', 'Challenging', 'Clever', 'Difficult', 'Interesting']
    const numTags = Math.floor(Math.random() * 3) + 1 // 1-3 tags
    const shuffled = allTags.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, numTags)
  }

  const renderStars = (rating: number): JSX.Element[] => {
    return Array.from({ length: 5 }, (_, index) => (
      <Text
        key={index}
        style={[styles.star, { color: index < rating ? '#FFD700' : '#E0E0E0' }]}
      >
        ★
      </Text>
    ))
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Đang tải đánh giá...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Something wrong</Text>
        <Text style={styles.errorDetail}>Please try again</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Review list</Text>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {!rvList || rvList.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nothing here yet</Text>
          </View>
        ) : (
          rvList.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              {/* Header with Avatar, Name, Date, and Rating */}
              <View style={styles.reviewHeader}>
                <View style={styles.leftSection}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {getAvatarLetter(review.userName)}
                    </Text>
                  </View>
                  <View style={styles.userInfo}>
                    <Text style={styles.userName}>{review.userName}</Text>
                    <View style={styles.dateAndClue}>
                      <Ionicons name="calendar-outline" size={12} color="#999" />
                      <Text style={styles.createdAt}>
                        {formatDate(review.createdAt)}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.rightSection}>
                  <View style={styles.stars}>{renderStars(review.rating)}</View>
                  <Text style={styles.clueId}>Clue: {review.clueId}</Text>
                </View>
              </View>

              {/* Review Content */}
              <Text style={styles.comment}>{review.comment}</Text>

              {/* Tags */}
              <View style={styles.tagsContainer}>
                {generateRandomTags().map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>

              {/* Action Buttons */}
              <View style={styles.actionBar}>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="thumbs-up-outline" size={16} color="#666" />
                  <Text style={styles.actionText}>{Math.floor(Math.random() * 20) + 1}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="chatbubble-outline" size={16} color="#666" />
                  <Text style={styles.actionText}>{Math.floor(Math.random() * 15) + 1}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="share-outline" size={16} color="#666" />
                  <Text style={styles.actionText}>Share</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 50
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
    paddingHorizontal: 20
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 15
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5'
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666'
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 8
  },
  errorDetail: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center'
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  userInfo: {
    flex: 1
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4
  },
  dateAndClue: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  createdAt: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4
  },
  rightSection: {
    alignItems: 'flex-end'
  },
  stars: {
    flexDirection: 'row',
    marginBottom: 4
  },
  star: {
    fontSize: 16,
    marginHorizontal: 1
  },
  clueId: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007AFF',
    backgroundColor: '#E6F3FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8
  },
  comment: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
    marginBottom: 16,
    fontWeight: '400'
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16
  },
  tag: {
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 4
  },
  tagText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500'
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0'
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
    paddingVertical: 4
  },
  actionText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
    fontWeight: '500'
  }
})

export default ReviewList
