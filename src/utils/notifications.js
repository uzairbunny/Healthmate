import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Register for push notifications
export const registerForPushNotificationsAsync = async () => {
  let token;
  
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }
  
  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log('Notification token:', token);
  
  return token;
};

// Schedule a daily health tip notification
export const scheduleDailyTipNotification = async (tip) => {
  const trigger = {
    hour: 9,
    minute: 0,
    repeats: true,
  };

  const identifier = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Daily Health Tip',
      body: tip.title,
      data: { tipId: tip.id },
    },
    trigger,
  });

  return identifier;
};

// Schedule a reminder notification
export const scheduleReminderNotification = async (title, body, hoursFromNow = 1) => {
  const trigger = new Date(Date.now() + hoursFromNow * 60 * 60 * 1000);
  
  const identifier = await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger,
  });

  return identifier;
};

// Cancel a scheduled notification
export const cancelNotification = async (identifier) => {
  await Notifications.cancelScheduledNotificationAsync(identifier);
};

// Cancel all scheduled notifications
export const cancelAllNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};

// Get all scheduled notifications
export const getScheduledNotifications = async () => {
  return await Notifications.getAllScheduledNotificationsAsync();
};