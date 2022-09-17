import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('useItAsMainUrl')
    console.log("get url", jsonValue)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
}
const settings = {
  dev: {
    apiUrl: getData() || "http://squretehad.com/client/api",
    logo: require("../assets/logo/logo.png"),
    companyName: "الصقور",
  },
  staging: {
    apiUrl: getData() || "http://squretehad.com/client/api",
    logo: require("../assets/logo/logo.png"),
    companyName: "الصقور",
  },
  prod: {
    apiUrl: getData() || "http://squretehad.com/client/api",
    logo: require("../assets/logo/logo.png"),
    companyName: "الصقور",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
