import { useReviewListQuery } from '@/features/review/api/reviewApi'
import { JSX } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator
} from 'react-native'

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
        <Text style={styles.errorText}>Có lỗi xảy ra khi tải dữ liệu</Text>
        <Text style={styles.errorDetail}>Vui lòng thử lại sau</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh sách đánh giá</Text>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {!rvList || rvList.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Chưa có đánh giá nào</Text>
          </View>
        ) : (
          rvList.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={styles.reviewInfo}>
                  <Text style={styles.clueId}>Clue: {review.clueId}</Text>
                  <Text style={styles.userId}>
                    User: {review.userId.substring(0, 8)}...
                  </Text>
                </View>
                <View style={styles.ratingContainer}>
                  <View style={styles.stars}>{renderStars(review.rating)}</View>
                  <Text style={styles.ratingText}>{review.rating}/5</Text>
                </View>
              </View>

              <Text style={styles.comment}>{review.comment}</Text>

              <Text style={styles.createdAt}>
                {formatDate(review.createdAt)}
              </Text>
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
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12
  },
  reviewInfo: {
    flex: 1
  },
  clueId: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 4
  },
  userId: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start'
  },
  ratingContainer: {
    alignItems: 'flex-end'
  },
  stars: {
    flexDirection: 'row',
    marginBottom: 2
  },
  star: {
    fontSize: 16,
    marginHorizontal: 1
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500'
  },
  comment: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
    marginBottom: 12
  },
  createdAt: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    fontStyle: 'italic'
  }
})

export default ReviewList
