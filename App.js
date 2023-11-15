import * as eva from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import { ApplicationProvider } from "@ui-kitten/components";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import OfflineNotice from "./app/components/OfflineNotice";
import AppNavigator from "./app/navigations/AppNavigation";
import AuthNavigator from "./app/navigations/AuthNavigator";
import navigationTheme from "./app/navigations/NavigationTheme";
import { navigationRef } from "./app/navigations/rootNavigation";

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const [loaded] = useFonts({
    Tjw_blod: require("./app/assets/fonts/Cairo-Bold.ttf"),
    Tjw_xblod: require("./app/assets/fonts/Cairo-Black.ttf"),
    Tjw_medum: require("./app/assets/fonts/Cairo-SemiBold.ttf"),
    Tjw_light: require("./app/assets/fonts/Cairo-Light.ttf"),
    Tjw_reg: require("./app/assets/fonts/Cairo-Regular.ttf"),
    Tjw_Ereg: require("./app/assets/fonts/Cairo-ExtraLight.ttf"),
  });
  const restoreUser = async () => {
    authStorage.getUser().then((user) => {
      if (user && user.code && user.code !== "300") {
        setUser(user);
      }
    });
  };
  useEffect(() => {
    const prepare = () => {
      restoreUser()
        .catch((e) => console.log(e))
        .finally(() => {
          setIsReady(true);
        });
    };
    prepare();
  }, []);

  const onLayoutRootView = async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  };
  useEffect(() => {
    onLayoutRootView();
  }, [isReady]);

  if (!isReady || !loaded) {
    return <Text>Loading ...</Text>;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthContext.Provider value={{ user, setUser }}>
        <OfflineNotice />
        <NavigationContainer ref={navigationRef} theme={navigationTheme}>
          {user ? (
            user.token ? (
              <ApplicationProvider {...eva} theme={eva.light}>
                <AppNavigator />
              </ApplicationProvider>
            ) : (
              <AuthNavigator />
            )
          ) : (
            <AuthNavigator />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </GestureHandlerRootView>
  );
}
