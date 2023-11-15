import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import React, { useEffect, useRef } from "react";
import { Platform } from "react-native";
import Routes from "../Routes";
import expoPushTokenApi from "../api/expoPushTokens";
import useAuth from "../auth/useAuth";
import colors from "../config/colors";
import SearchNavigator from "./../navigations/SearchNavigator";
import Profile from "./../screens/Profile";
import ChatNavigator from "./ChatNavigator";
import DashboardNavigator from "./DashboardNavigator";
import NotificationsNavigator from "./NotificationsNavigator";
import { isDevice } from "expo-device";

const Tab = createBottomTabNavigator();
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const AppNavigator = (ref) => {
  const { user } = useAuth();
  const navitation = useNavigation();
  const notificationListener = useRef();
  const responseListener = useRef();
  async function registerForPushNotificationsAsync() {
    let token;
    try {
      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: `alnahr_user_id_${user.data.id}`,
          sound: true,
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }

      if (isDevice) {
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
        token = await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig.extra.eas.projectId,
        });
        await expoPushTokenApi.register(user.token, JSON.stringify(token.data));
      } else {
        alert("Must use physical device for Push Notifications");
      }
    } catch (error) {
      console.log("Error getting a push token", error);
    }
  }
  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      navitation.navigate(Routes.ORDER_DETAILS, {
        id: notification.notification.request.content.data.id,
        notify_id: "",
      });
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      navitation.navigate(Routes.ORDER_DETAILS, {
        id: response.notification.request.content.data.id,
        notify_id: "",
      });
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <Tab.Navigator
      activeColor={colors.vueColorButtom}
      backBehaviour="initialRoute"
      style={{ backgroundColor: colors.vueColorButtom, fontFamily: "Tjw_blod" }}
      initialRouteName={Routes.DASHBOARD_NAV}
    >
      <Tab.Screen
        name={Routes.SEARCH_NAV}
        component={SearchNavigator}
        options={{
          headerShown: false,
          tabBarLabel: () => null,
          //tabBarLabel: "بحث",
          tabBarIcon: ({ color, size }) => <Feather name="search" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name={Routes.NOTIFICATION_NAV}
        component={NotificationsNavigator}
        options={{
          headerShown: false,
          tabBarLabel: () => null,
          //tabBarLabel: "اشعاراتي",
          tabBarIcon: ({ color, size }) => <Feather name="bell" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name={Routes.DASHBOARD_NAV}
        component={DashboardNavigator}
        options={({ navigation }) => ({
          headerShown: false,
          tabBarLabel: () => null,
          //tabBarLabel: "لوحة التحكم",
          tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
        })}
      />

      <Tab.Screen
        name={Routes.CHAT_NAV}
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
          headerShown: false,
          tabBarLabel: () => null,
          //tabBarLabel: "الصفحة الشخصية",
          tabBarIcon: ({ color, size }) => <Feather name="user" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};
export default AppNavigator;
