import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  USER_PROFILE: 'userProfile',
  FAVORITE_TIPS: 'favoriteTips',
  CHAT_HISTORY: 'chatHistory',
  DAILY_TIP: 'dailyTip',
};

export const saveUserProfile = async (profile) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    return true;
  } catch (error) {
    console.error('Error saving user profile:', error);
    return false;
  }
};

export const getUserProfile = async () => {
  try {
    const profile = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return profile ? JSON.parse(profile) : null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

export const saveFavoriteTip = async (tip) => {
  try {
    const favorites = await getFavoriteTips();
    const updatedFavorites = [...favorites, tip];
    await AsyncStorage.setItem(STORAGE_KEYS.FAVORITE_TIPS, JSON.stringify(updatedFavorites));
    return true;
  } catch (error) {
    console.error('Error saving favorite tip:', error);
    return false;
  }
};

export const getFavoriteTips = async () => {
  try {
    const favorites = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITE_TIPS);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error getting favorite tips:', error);
    return [];
  }
};

export const removeFavoriteTip = async (tipId) => {
  try {
    const favorites = await getFavoriteTips();
    const updatedFavorites = favorites.filter(tip => tip.id !== tipId);
    await AsyncStorage.setItem(STORAGE_KEYS.FAVORITE_TIPS, JSON.stringify(updatedFavorites));
    return true;
  } catch (error) {
    console.error('Error removing favorite tip:', error);
    return false;
  }
};

export const saveChatMessage = async (message) => {
  try {
    const history = await getChatHistory();
    const updatedHistory = [...history, message];
    await AsyncStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(updatedHistory));
    return true;
  } catch (error) {
    console.error('Error saving chat message:', error);
    return false;
  }
};

export const getChatHistory = async () => {
  try {
    const history = await AsyncStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error getting chat history:', error);
    return [];
  }
};

export const clearChatHistory = async () => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify([]));
    return true;
  } catch (error) {
    console.error('Error clearing chat history:', error);
    return false;
  }
};

export const saveDailyTip = async (tip) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.DAILY_TIP, JSON.stringify(tip));
    return true;
  } catch (error) {
    console.error('Error saving daily tip:', error);
    return false;
  }
};

export const getDailyTip = async () => {
  try {
    const tip = await AsyncStorage.getItem(STORAGE_KEYS.DAILY_TIP);
    return tip ? JSON.parse(tip) : null;
  } catch (error) {
    console.error('Error getting daily tip:', error);
    return null;
  }
};