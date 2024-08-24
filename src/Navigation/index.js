import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/Home';
import DetailScreen from '../Screens/Details';
import SearchScreen from '../Screens/Search';
import {NavigationContainer} from '@react-navigation/native';
import CustomTabBar from '../Components/CustomTabBar';

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
        component={SearchScreen}
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
      <Tabs />
    </NavigationContainer>
  );
};

export default MainNavigation;
