import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import {onCloudNotification} from './NotificationBar';

export const setupFirebaseBackgroundHandler = () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    onCloudNotification(remoteMessage?.notification);
  });
};

export const setupNotifeeBackgroundHandler = () => {
  notifee.onBackgroundEvent(async ({type, detail}) => {
    const {notification, pressAction} = detail;

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
