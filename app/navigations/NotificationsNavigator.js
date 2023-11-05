import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text } from "react-native";

import Routes from "../Routes";
import ChatModel from "../screens/ChatModel";
import Notificaitons from "../screens/Notificaitons";
import OrderDetails from "../screens/OrderDetails";

const Stack = createStackNavigator();
const DashboardNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={Routes.Notificaitons}>
      <Stack.Screen
        name={Routes.NOTIFICATION}
        component={Notificaitons}
        options={{
          title: <Text style={{ fontFamily: "Tjw_reg" }}>الاشعارات</Text>,
        }}
      />

      <Stack.Screen
        name={Routes.ORDER_DETAILS}
        component={OrderDetails}
        options={{
          title: <Text style={{ fontFamily: "Tjw_reg" }}>طلبية</Text>,
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
