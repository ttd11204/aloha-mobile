import axios from './customizeAxios';

export const getPackageApi = async () => {
  try {
    const response = await axios.get('/Package');
    return response.data;
  } catch (error) {
    console.error('Error fetching package:', error);
    throw error; // Ensure errors are properly handled in the UI
  }
};
