import Constants from "expo-constants";
const settings = {
  dev: {
    apiUrl: "http://alkhayalexpress.com/client/api",
    logo: require("../assets/logo/logo.png"),
    companyName: "الخيال",
  },
  staging: {
    apiUrl: "http://alkhayalexpress.com/client/api",
    logo: require("../assets/logo/logo.png"),
    companyName: "الخيال",
  },
  prod: {
    apiUrl: "http://alkhayalexpress.com/client/api",
    logo: require("../assets/logo/logo.png"),
    companyName: "الخيال",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
