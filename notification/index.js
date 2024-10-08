import {useEffect} from 'react';
import notifee, {EventType, AndroidImportance} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import ThemeColors from '../Utils/Colors';

function App() {
  useEffect(() => {
    const unsubscribe = notifee.onForegroundEvent(async ({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
      }
    });

    notifee.onBackgroundEvent(async ({type, detail}) => {
      const {notification, pressAction} = detail;

      // Check if the user pressed the "Mark as read" action
      if (
        type === EventType.ACTION_PRESS &&
        pressAction.id === 'mark-as-read'
      ) {
        // Update external API
        await fetch(
          `https://my-api.com/chat/${notification.data.chatId}/read`,
          {
            method: 'POST',
          },
        );

        // Remove the notification
        await notifee.cancelNotification(notification.id);
      }
    });

    return unsubscribe;
  }, []);

  //.....................................................................

  useEffect(() => {
    getDeviceToken();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log(remoteMessage);
      onDisplayNotification(remoteMessage?.notification);
    });

    return unsubscribe;
  }, [messaging]);

  const onMessageReceived = async message => {
    // console.log(" check massage is", message)
    notifee.displayNotification(message?.notification);
  };

  messaging().onMessage(onMessageReceived);
  messaging().setBackgroundMessageHandler(onMessageReceived);

  const getDeviceToken = () => {
    messaging()
      .getToken()
      .then(token => {
        console.log(token);
      });
  };

  const onDisplayNotification = async weatherData => {
    if (!weatherData) return; // Ensure weather data exists

    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: 'important',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });
    const {title, body} = weatherData;

    await notifee.displayNotification({
      title: title,
      body: body,
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
        smallIcon: 'app_logo',
        color: ThemeColors.Purple,
        pressAction: {
          id: 'default',
        },
      },
    });
  };
}
