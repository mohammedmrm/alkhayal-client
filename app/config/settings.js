import Constants from "expo-constants";
const settings = {
  dev: {
    apiUrl: "http://ec2-3-137-158-198.us-east-2.compute.amazonaws.com/client/api",
    logo: require("../assets/logo/logo.png"),
    companyName: "شركة السرعه",
  },
  staging: {
    apiUrl: "http://ec2-3-137-158-198.us-east-2.compute.amazonaws.com/client/api",
    logo: require("../assets/logo/logo.png"),
    companyName: "شركة السرعه",
  },
  prod: {
    apiUrl: "http://ec2-3-137-158-198.us-east-2.compute.amazonaws.com/client/api",
    logo: require("../assets/logo/logo.png"),
    companyName: "شركة السرعه",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
