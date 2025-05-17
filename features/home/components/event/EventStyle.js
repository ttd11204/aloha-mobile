import { StyleSheet } from 'react-native';

export const nearbyEventsStyles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  eventImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 12,
  },
  eventTextContainer: {
    flex: 1,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  eventStatus: {
    fontSize: 11,
    color: '#2563eb',
    backgroundColor: '#dbeafe',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  eventDescription: {
    fontSize: 12,
    color: '#4b5563',
    marginTop: 4,
  },
  eventFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  eventLocation: {
    fontSize: 11,
    color: '#6b7280',
    marginLeft: 4,
  },
  eventDistance: {
    fontSize: 11,
    color: '#6b7280',
    marginLeft: 4,
  },
  viewAllButton: {
    borderColor: '#0aaff1',
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  viewAllButtonText: {
    color: '#0444bf',
    fontWeight: '500',
  },
});
