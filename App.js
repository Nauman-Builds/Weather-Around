import { View, Text } from 'react-native'
import React from 'react'
import Weather from './screens/Home'
import { Provider } from 'react-redux'
import { store } from './Redux Toolkit/store'

const App = () => {
  return (
    <Provider store={store}>
      <View>
        <Weather />
      </View>
    </Provider>
  )
}

export default App
