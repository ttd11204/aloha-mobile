import { store } from '@/store';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import './global.css';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack />
    </Provider>
  );
}
