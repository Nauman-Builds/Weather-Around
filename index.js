/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App/App';
import {name as appName} from './app.json';
import {
  setupFirebaseBackgroundHandler,
  setupNotifeeBackgroundHandler,
} from './src/Notification/BackgroundHandler';

setupFirebaseBackgroundHandler();
setupNotifeeBackgroundHandler();

AppRegistry.registerComponent(appName, () => App);
