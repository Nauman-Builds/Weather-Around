import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/Redux-Toolkit/store';
import MainNavigation from './src/Navigation';

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
};

export default App;
