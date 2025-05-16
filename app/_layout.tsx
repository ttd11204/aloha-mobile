import { store } from '@/store';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import './global.css';

export default function RootLayout() {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <Stack />
      {/* </PersistGate> */}
    </Provider>
  );
}
