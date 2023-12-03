import Constants from "expo-constants";
const settings = {
  dev: {
    apiUrl: "https://thiqar.alkhayalexpress.com/client/api/",
    logo: require("../assets/logo/logo.png"),
    companyName: "شركة الخيال",
  },
  staging: {
    apiUrl: "https://thiqar.alkhayalexpress.com/client/api/",
    logo: require("../assets/logo/logo.png"),
    companyName: "شركة الخيال",
  },
  prod: {
    apiUrl: "https://thiqar.alkhayalexpress.com/client/api/",
    logo: require("../assets/logo/logo.png"),
    companyName: "شركة الخيال ",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
