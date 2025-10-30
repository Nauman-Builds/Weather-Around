import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StripeProvider } from '@stripe/stripe-react-native';
import { Provider } from 'react-redux';
import { store } from '../Redux-Toolkit/store';
import MainNavigation from '../Navigation';
import NotificationConfig from '../Notification/NotificationConfig';

const App = () => {
  return (
    <SafeAreaProvider>
      <StripeProvider
        publishableKey={process.env.STRIPE_PUBLISH_API_KEY}
        merchantIdentifier="merchant.identifier"
      >
        <Provider store={store}>
          <NotificationConfig />
          <MainNavigation />
        </Provider>
      </StripeProvider>
    </SafeAreaProvider>
  );
};

export default App;
