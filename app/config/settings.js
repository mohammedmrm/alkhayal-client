import Constants from "expo-constants";
const settings = {
  dev: {
    apiUrl: "https://alamenexpress.com/client/api",
    logo: require("../assets/logo/logo.png"),
    companyName: "جوهرة الشمال",
  },
  staging: {
    apiUrl: "https://alamenexpress.com/client/api",
    logo: require("../assets/logo/logo.png"),
    companyName: "جوهرة الشمال",
  },
  prod: {
    apiUrl: "https://alamenexpress.com/client/api",
    logo: require("../assets/logo/logo.png"),
    companyName: "جوهرة الشمال",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
