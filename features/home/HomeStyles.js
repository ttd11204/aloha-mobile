// styles/sharedStyles.js
import { StyleSheet } from 'react-native';

const sharedStyles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3B2C04',
    textAlign: 'center',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fefefe',
    borderRadius: 8,
    marginBottom: 8,
  },
  cardText: {
    flex: 1,
    fontSize: 14,
    color: '#444',
  },
  ratingBadge: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
    fontSize: 12,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 12,
  },
  testimonialRating: {
    color: '#FFD700',
    fontSize: 14,
    lineHeight: 16,
  },
  reviewText: {
    fontStyle: 'italic',
    color: '#444',
  },
  infoText: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  progressBarContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 999,
    height: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FACC15',
    borderRadius: 999,
  },
  challengeStep: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FACC15',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  stepNumber: {
    color: '#7f1d1d',
    fontWeight: 'bold',
  },
  emailInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  subscribeButton: {
    backgroundColor: '#e7505f',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  subscribeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  challengeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fefefe',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  challengeIcon: {
    marginRight: 12,
  },
  challengeTextContainer: {
    flex: 1,
  },
  challengeTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  challengeDescription: {
    fontSize: 14,
    color: '#666',
  },
  challengeRatingContainer: {
    backgroundColor: '#d4edda',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  challengeRating: {
    color: '#155724',
    fontSize: 12,
  },
  testimonialCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#0444bf',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  testimonialAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  testimonialName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 12,
  },

  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fefefe',
    borderRadius: 8,
    marginBottom: 8,
  },

  cardText: {
    flex: 1,
    fontSize: 14,
    color: '#444',
  },

  ratingBadge: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
    fontSize: 12,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
  },

  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 12,
  },

  avatar: {
    width: '100%',
    height: '100%',
  },

  testimonialRating: {
    color: '#FFD700',
    fontSize: 14,
    lineHeight: 16,
  },

  testimonialComment: {
    fontStyle: 'italic',
    color: '#444',
    fontSize: 14,
    marginBottom: 8,
  },

  testimonialInfo: {
    fontSize: 12,
    color: '#777',
  },

  progressBarContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 999,
    height: 10,
    overflow: 'hidden',
    marginTop: 8,
    marginBottom: 12,
  },

  progressBar: {
    height: '100%',
    backgroundColor: '#FACC15',
    borderRadius: 999,
  },

  challengeStep: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },

  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FACC15',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },

  stepNumber: {
    color: '#7f1d1d',
    fontWeight: 'bold',
  },

  emailInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: '#fff',
  },

  subscribeButton: {
    backgroundColor: '#e7505f',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },

  subscribeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  ctaContainer: {
    backgroundColor: '#facc15',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },

  ctaText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7f1d1d',
    marginBottom: 12,
  },

  ctaButton: {
    backgroundColor: '#7f1d1d',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  ctaButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  testimonialFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },

  readMoreButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    backgroundColor: '#e0e0e0',
  },

  readMoreButtonText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
});

export default sharedStyles;
