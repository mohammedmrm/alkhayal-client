import Constants from "expo-constants";
const settings = {
  dev: {
    apiUrl: "http://almalkexpress.com/client/api",
    logo: require("../assets/logo/logo.png"),
    companyName: "الملك",
  },
  staging: {
    apiUrl: "http://almalkexpress.com/client/api",
    logo: require("../assets/logo/logo.png"),
    companyName: "الملك",
  },
  prod: {
    apiUrl: "http://almalkexpress.com/client/api",
    logo: require("../assets/logo/logo.png"),
    companyName: "الملك",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
