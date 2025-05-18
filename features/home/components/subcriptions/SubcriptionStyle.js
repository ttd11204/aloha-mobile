import { StyleSheet } from 'react-native';

export const newsletterStyles = StyleSheet.create({
    newsletterSection: {
    backgroundColor: '#fff0f3',
    padding: 20,
    borderRadius: 12,
    marginBottom: 100,
  },
  newsletterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  newsletterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7f1d1d',
    marginLeft: 6,
  },
  newsletterDescription: {
    fontSize: 13,
    color: '#991b1b',
    textAlign: 'center',
    marginBottom: 12,
  },
  newsletterForm: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    marginBottom: 8,
  },
  newsletterInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  newsletterButton: {
    backgroundColor: '#e7505f',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  newsletterButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  newsletterFooter: {
    fontSize: 11,
    color: '#6b7280',
    textAlign: 'center',
  },
});
