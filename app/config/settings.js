import Constants from "expo-constants";
const settings = {
  dev: {
    apiUrl: "http://alzaimexpress.com/client/api",
    logo: require("../assets/logo/logo.png"),
    companyName: "السريع",
  },
  staging: {
    apiUrl: "http://alzaimexpress.com/client/api",
    logo: require("../assets/logo/logo.png"),
    companyName: "السريع",
  },
  prod: {
    apiUrl: "http://alzaimexpress.com/client/api",
    logo: require("../assets/logo/logo.png"),
    companyName: "السريع",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
