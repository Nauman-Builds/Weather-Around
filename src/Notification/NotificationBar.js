import notifee, {AndroidImportance} from '@notifee/react-native';
import ThemeColors from '../Utils/Colors';

let cachedChannelId = null;

const requestPermissionsAndCreateChannel = async () => {
  try {
    await notifee.requestPermission();
    if (!cachedChannelId) {
      cachedChannelId = await notifee.createChannel({
        id: 'important',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });
    }
    return cachedChannelId;
  } catch (error) {
    console.error('Failed to request permissions or create channel:', error);
    return null;
  }
};

export const onWeatherNotification = async (weatherData, cityName) => {
  if (!weatherData || !cityName) return;
  try {
    const channelId = await requestPermissionsAndCreateChannel();
    if (!channelId) return;

    const {temp, conditions} = weatherData?.currentConditions || {};
    await notifee.displayNotification({
      title: cityName,
      body: `${temp?.toFixed(0)}°C - ${conditions}`,
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
        smallIcon: 'app_logo',
        color: ThemeColors.LightPurple,
        pressAction: {
          id: 'default',
        },
      },
    });
  } catch (error) {
    console.error('Failed to display weather notification:', error);
  }
};

export const onCloudNotification = async notificationData => {
  if (!notificationData) return;

  try {
    const channelId = await requestPermissionsAndCreateChannel();
    if (!channelId) return;

    const {title, body} = notificationData;
    await notifee.displayNotification({
      title: title || 'Notification Title',
      body: body || 'Notification Body',
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
  } catch (error) {
    console.error('Failed to display notification:', error);
  }
};
