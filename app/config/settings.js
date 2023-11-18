import Constants from "expo-constants";
const settings = {
  dev: {
    apiUrl: "https://almalkexpress.com/client/api/",
    logo: require("../assets/logo/logo.png"),
    companyName: "شركة الملك",
  },
  staging: {
    apiUrl: "https://almalkexpress.com/client/api/",
    logo: require("../assets/logo/logo.png"),
    companyName: "شركة الملك",
  },
  prod: {
    apiUrl: "https://almalkexpress.com/client/api/",
    logo: require("../assets/logo/logo.png"),
    companyName: "شركة الملك",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
