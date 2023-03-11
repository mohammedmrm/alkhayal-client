import Constants from "expo-constants";
const settings = {
  dev: {
    apiUrl: "https://aldhabiexp.com/client/api/",
    logo: require("../assets/logo/logo.png"),
    companyName: "الضبي",
  },
  staging: {
    apiUrl: "https://aldhabiexp.com/client/api/",
    logo: require("../assets/logo/logo.png"),
    companyName: "الضبي",
  },
  prod: {
    apiUrl: "https://aldhabiexp.com/client/api/",
    logo: require("../assets/logo/logo.png"),
    companyName: "الضبي",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
