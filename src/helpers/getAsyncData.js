import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAsyncData = async () => {
  let val;
  try {
    val = await AsyncStorage.getItem('userData');
  } catch (e) {
    return null;
  }
  return JSON.parse(val);
};
