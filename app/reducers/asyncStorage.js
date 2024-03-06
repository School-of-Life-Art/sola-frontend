import AsyncStorage from '@react-native-async-storage/async-storage';


export const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log('Data stored successfully');
    } catch (error) {
      console.log('Error storing data:', error);
    }
};

export const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log('Retrieved data:', value);
        return value;
      } else {
        console.log('No data found for the key:', key);
        return 'light';
      }
    } catch (error) {
      console.log('Error retrieving data:', error);
    }
  };