import { getApp } from '@react-native-firebase/app';
import {
  getMessaging,
  setBackgroundMessageHandler,
} from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';
import { onCloudNotification } from './NotificationBar';

export const setupFirebaseBackgroundHandler = () => {
  const app = getApp();
  const messaging = getMessaging(app);

  setBackgroundMessageHandler(messaging, async remoteMessage => {
    onCloudNotification(remoteMessage?.notification);
  });
};

export const setupNotifeeBackgroundHandler = () => {
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;

    switch (type) {
      case EventType.DISMISSED:
        console.log('User dismissed notification:', notification);
        break;

      case EventType.PRESS:
        console.log('User pressed notification:', notification);
        break;

      default:
        console.log('Other Notifee event:', type);
    }
  });
};
