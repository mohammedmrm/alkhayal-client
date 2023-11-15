import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text } from "react-native";

import Routes from "../Routes";
import ChatModel from "../screens/ChatModel";
import OrderDetails from "../screens/OrderDetails";
import SearchResults from "../screens/SearchResults";

const Stack = createStackNavigator();
const DashboardNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={Routes.SEARCH_RESULTS}>
      <Stack.Screen
        name={Routes.SEARCH_RESULTS}
        component={SearchResults}
        options={{
          title: <Text style={{ fontFamily: "Tjw_reg" }}>بحث</Text>,
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
