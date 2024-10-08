import React from 'react';
import {StatusBar} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import CustomTabBar from '../Components/CustomTabBar';
import HomeScreen from '../Screens/Home';
import DetailScreen from '../Screens/Details';
import SearchWeatherScreen from '../Screens/Search';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Search"
        component={SearchWeatherScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Details"
        component={DetailScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <StatusBar translucent backgroundColor="transparent" />
      <Tabs />
    </NavigationContainer>
  );
};

export default MainNavigation;
