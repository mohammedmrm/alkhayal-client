import Constants from "expo-constants";
const settings = {
  dev: {
    apiUrl: "https://aquaexp.com/client/api",
    logo: require("../assets/logo/logo.png"),
    companyName: "الرياح",
  },
  staging: {
    apiUrl: "https://aquaexp.com/client/api",
    logo: require("../assets/logo/logo.png"),
    companyName: "الرياح",
  },
  prod: {
    apiUrl: "https://aquaexp.com/client/api",
    logo: require("../assets/logo/logo.png"),
    companyName: "الرياح",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
