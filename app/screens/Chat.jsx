import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { ListItem, ListItemSeparator } from "../components/lists";
import cache from "../utility/cache";

import getChatListAPI from "../api/getChatList";
import ActivityIndecator from "../components/ActivtyIndectors/ActivityIndecatorSimpleLine";
// import AppText from "../components/AppText";
import Routes from "../Routes";
import useAuth from "../auth/useAuth";
import Screen from "../components/Screen";
import colors from "../config/colors";

function ChatScreen(props) {
  const [messages, setMessages] = useState([]);
  const [totalNotificaiton, setTotalNotificaiton] = useState(0);
  const navigator = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  let { user } = useAuth();
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  const loadNotification = async () => {
    setIsLoading(true);
    const results = await getChatListAPI.get(user.token);
    setMessages([...results.data.data]);
    setTotalNotificaiton(results.data.count);
    setIsLoading(false);
  };
  const loadNotification_local = async () => {
    setIsLoading(true);
    const results = await cache.get("/chat.php?token=" + user.token);
    setMessages([...results.data]);
    // setTotalNotificaiton(results.data.count);
    setIsLoading(false);
  };
  useEffect(() => {
    loadNotification_local();

    loadNotification();
  }, []);
  return (
    <Screen>
      <View style={{ paddingTop: 5 }}>
        {isLoading && <ActivityIndecator visable={isLoading} />}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ListItem
              title={item.order_no}
              subTitle={item.message}
              date={item.date}
              seen={item.client_seen === "1" ? colors.white : colors.unseen}
              image={
                item.client_seen === "1"
                  ? require("../assets/notifications/chatBlue.png")
                  : require("../assets/notifications/chatRed.png")
              }
              onPress={() => navigator.navigate(Routes.CHAT_MODEL, { id: item.id })}
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
        />
      </View>
    </Screen>
  );
}
export default ChatScreen;
