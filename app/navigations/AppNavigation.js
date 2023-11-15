import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import React, { useEffect } from "react";
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

const Tab = createBottomTabNavigator();
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
      console.log("Noti ORDER ID", lastNotificationResponse.notification.request.content.data.id);
      id &&
        navitation.navigate(Routes.ORDER_DETAILS, {
          id: id,
          notify_id: "",
        });
    }
  }, [lastNotificationResponse]);

  const regesterForPushNotificaition = async () => {
    try {
      let experienceId = undefined;
      if (!Constants.expoConfig) {
        // Absence of the manifest means we're in bare workflow
        experienceId = "@username/clientExpo";
      }
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      const token = await Notifications.getExpoPushTokenAsync({
        experienceId,
        projectId: "c7d93515-fc17-43e1-bf1c-a1666bb24d6d",
      });
      await expoPushTokenApi.register(user.token, JSON.stringify(token.data));
      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync(`alnahr_user_id_${user.data.id}`, {
          name: `alnahr_user_id_${user.data.id}`,
          sound: true,
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
    } catch (error) {
      console.log("Error getting a push token", error);
    }
  };
  useEffect(() => {
    regesterForPushNotificaition();
  }, []);

  return (
    <Tab.Navigator
      activeColor={colors.vueColorButtom}
      backBehaviour="initialRoute"
      style={{ backgroundColor: colors.vueColorButtom, fontFamily: "Tjw_blod" }}
      initialRouteName={Routes.DASHBOARD_LIST}
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
        name={Routes.DASHBOARD_LIST}
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
