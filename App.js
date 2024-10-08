import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/Redux-Toolkit/store';
import MainNavigation from './src/Navigation';
import {StripeProvider} from '@stripe/stripe-react-native';

const App = () => {
  return (
    <StripeProvider
      publishableKey={process.env.STRIPE_PUBLISH_API_KEY}
      merchantIdentifier="merchant.identifier">
      <Provider store={store}>
        <MainNavigation />
      </Provider>
    </StripeProvider>
  );
};

export default App;
