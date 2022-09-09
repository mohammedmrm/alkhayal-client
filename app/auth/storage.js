import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const key = "authToken";

const storeToken = async (authToken) => {
  try {
    if (Platform.OS !== "web") {
      await SecureStore.setItemAsync(key, JSON.stringify(authToken));
    } else {
      await AsyncStorage.setItem(key, JSON.stringify(authToken));
    }
  } catch (error) {
    console.log("Error storing the auth token", error);
  }
};
const getToken = async () => {
  try {
    let user;
    if (Platform.OS !== "web") {
      user = JSON.parse(await SecureStore.getItemAsync(key));
    } else {
      user = JSON.parse(await AsyncStorage.getItem(key));
    }
    return user;
  } catch (error) {
    console.log("Error getting the auth token", error);
  }
};

const getUser = async () => {
  const token = await getToken();
  return token ? token : null;
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error removing the auth token", error);
  }
};

export default { getToken, getUser, removeToken, storeToken };
