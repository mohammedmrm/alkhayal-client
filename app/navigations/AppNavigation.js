import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import React, { useEffect } from "react";
import { Platform, Text } from "react-native";
import Routes from "../Routes";
import expoPushTokenApi from "../api/expoPushTokens";
import useAuth from "../auth/useAuth";
import colors from "../config/colors";
import SearchResults from "./../navigations/SearchNavigator";
import Profile from "./../screens/Profile";
import ChatNavigator from "./ChatNavigator";
import DashboardNavigator from "./DashboardNavigator";
import NotificationsNavigator from "./NotificationsNavigator";

const Tab = createBottomTabNavigator();
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
const AppNavigator = (ref) => {
  const { user } = useAuth();
  const navitation = useNavigation();
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
  const lastNotificationResponse = Notifications.useLastNotificationResponse();
  useEffect(() => {
    if (lastNotificationResponse) {
      var id = lastNotificationResponse.notification.request.content.data.id;
      console.log("Noti ORDER ID", lastNotificationResponse.notification.request.content.data);
      id &&
        navitation.navigate(Routes.ORDER_DETAILS, {
          id: id,
          notify_id: "",
        });
    }
  }, [lastNotificationResponse]);
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => expoPushTokenApi.register(user.token, token));
  }, []);
  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("token", token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }
  return (
    <Tab.Navigator
      activeColor={colors.vueColorButtom}
      backBehaviour="initialRoute"
      style={{ backgroundColor: colors.vueColorButtom, fontFamily: "Tjw_blod" }}
      initialRouteName={Routes.DASHBOARD}
    >
      <Tab.Screen
        name={Routes.SEARCH_RESULTS}
        component={SearchResults}
        options={{
          headerShown: false,
          // tabBarLabel: "بحث",
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => <Feather name="search" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name={Routes.NOTIFICATION}
        component={NotificationsNavigator}
        options={{
          headerShown: false,
          // tabBarLabel: "اشعاراتي",
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => <Feather name="bell" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name={Routes.DASHBOARD}
        component={DashboardNavigator}
        options={({ navigation }) => ({
          tabBarLabel: () => null,
          headerShown: false,
          // tabBarLabel: "لوحة التحكم",
          tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
          // tabBarButton: () => (
          //   <DashboardButton
          //     onPress={() => navigation.navigate(Routes.DASHBOARD)}
          //   />
          // ),
        })}
      />

      <Tab.Screen
        name={Routes.CHAT}
        component={ChatNavigator}
        options={{
          headerShown: false,
          tabBarLabel: () => null,
          //tabBarLabel: "محادثتي",
          tabBarIcon: ({ color, size }) => <Feather name="message-circle" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name={Routes.PROFILE}
        component={Profile}
        options={{
          // headerShown: false,
          tabBarLabel: () => null,
          title: <Text style={{ fontFamily: "Tjw_reg" }}>الصفحة الشخصية</Text>,
          tabBarIcon: ({ color, size }) => <Feather name="user" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};
export default AppNavigator;
