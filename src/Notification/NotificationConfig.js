import {useEffect, useCallback} from 'react';
import messaging from '@react-native-firebase/messaging';
import {LogLevel, OneSignal} from 'react-native-onesignal';
import {
  setupFirebaseForegroundHandler,
  setupNotifeeForegroundHandler,
} from './ForegroundHandler';

const NotificationConfig = () => {
  useEffect(() => {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    OneSignal.initialize('a452d0c9-7d26-4a8a-b8c0-486777c81083');
    OneSignal.Notifications.requestPermission(true);
    const onNotificationClick = event => {
      console.log('OneSignal: notification clicked:', event);
    };
    OneSignal.Notifications.addEventListener('click', onNotificationClick);
    return () => {
      OneSignal.Notifications.removeEventListener('click', onNotificationClick);
    };
  }, []);

  const getDeviceToken = useCallback(async () => {
    try {
      const token = await messaging().getToken();
      console.log('FCM Device Token:', token);
    } catch (error) {
      console.error('Failed to get FCM device token:', error);
    }
  }, []);

  useEffect(() => {
    getDeviceToken();
    const unsubscribeFirebase = setupFirebaseForegroundHandler();
    const unsubscribeNotifee = setupNotifeeForegroundHandler();

    return () => {
      unsubscribeFirebase();
      unsubscribeNotifee();
    };
  }, []);
  return null;
};

export default NotificationConfig;
