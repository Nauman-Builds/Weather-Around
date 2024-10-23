/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {
  setupFirebaseBackgroundHandler,
  setupNotifeeBackgroundHandler,
} from './src/Notification/BackgroundHandler';

setupFirebaseBackgroundHandler();
setupNotifeeBackgroundHandler();

AppRegistry.registerComponent(appName, () => App);
