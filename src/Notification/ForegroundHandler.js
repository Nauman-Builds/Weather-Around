import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import {onCloudNotification} from './NotificationBar';

export const setupFirebaseForegroundHandler = () => {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log('FCM Message received in the foreground:', remoteMessage);
    onCloudNotification(remoteMessage?.notification);
  });

  return unsubscribe;
};

export const setupNotifeeForegroundHandler = () => {
  const unsubscribe = notifee.onForegroundEvent(({type, detail}) => {
    const {notification} = detail;

    switch (type) {
      case EventType.DISMISSED:
        console.log('User dismissed notification in foreground:', notification);
        break;
      case EventType.PRESS:
        console.log('User pressed notification in foreground:', notification);
        break;
      default:
        console.log('Other Notifee event in foreground:', type);
    }
  });

  return unsubscribe;
};
