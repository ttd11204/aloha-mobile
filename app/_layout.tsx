import TabLayout from '@/components/TabBar';
import { store } from '@/store';
import { Provider } from 'react-redux';
import './global.css';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <TabLayout />
    </Provider>
  );
}
