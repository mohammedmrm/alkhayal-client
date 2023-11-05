import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text } from "react-native";

import Routes from "../Routes";
import Chat from "../screens/Chat";
import ChatModel from "../screens/ChatModel";

const Stack = createStackNavigator();
const DashboardNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={Routes.CHAT}>
      <Stack.Screen
        name={Routes.CHAT}
        component={Chat}
        options={{
          title: <Text style={{ fontFamily: "Tjw_reg" }}>صفحة المحادثات</Text>,
        }}
      />

      <Stack.Screen
        name={Routes.CHAT_MODEL}
        component={ChatModel}
        options={{
          title: <Text style={{ fontFamily: "Tjw_reg" }}>محادثة مع الشركة</Text>,
        }}
      />
    </Stack.Navigator>
  );
};

export default DashboardNavigator;
