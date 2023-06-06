import Constants from "expo-constants";
const settings = {
  dev: {
    apiUrl: "https://afaqbaghdad.com/client/api",
    logo: require("../assets/logo/logo.png"),
    companyName: "افاق لغداد",
  },
  staging: {
    apiUrl: "https://afaqbaghdad.com/client/api",
    logo: require("../assets/logo/logo.png"),
    companyName: "افاق لغداد",
  },
  prod: {
    apiUrl: "https://afaqbaghdad.com/client/api",
    logo: require("../assets/logo/logo.png"),
    companyName: "افاق لغداد",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
