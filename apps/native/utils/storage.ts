import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (value : string) => {
  try {
    await AsyncStorage.setItem('pubId', value);
  } catch (e) {
    console.error("Error storing data", e);
  }
};

export const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('pubId');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.error("Error retrieving data", e);
  }
};

export const removeData = async () => {
  try {
    await AsyncStorage.removeItem('pubId');
  } catch (e) {
    console.error("Error removing data", e);
  }
};