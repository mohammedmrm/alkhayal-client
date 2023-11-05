import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { FlatList, Linking, StyleSheet, View } from "react-native";
import { Paragraph, Title } from "react-native-paper";
import getCallCenter from "../api/getCallCenter";
import useAuth from "../auth/useAuth";
import Screen from "../components/Screen";
import { ListItem, ListItemSeparator } from "../components/lists";
import borderRadiuss from "../config/borderRadiuss";
import colors from "../config/colors";

function CallCenter() {
  const { user } = useAuth();
  const [callcenter, setCallCenter] = useState([]);
  const getCall = () => {
    getCallCenter
      .getCallCenter(user.token)
      .then((e) => {
        setCallCenter([...e.data.data]);
      })
      .catch((e) => {
        setCallCenter([]);
      });
  };
  useEffect(() => {
    getCall();
  }, []);
  return (
    <Screen style={styles.screen}>
      <View
        style={{
          width: "90%",
          height: 120,
          backgroundColor: "#D8D8D8",
          alignSelf: "center",
          margin: 10,
          borderRadius: borderRadiuss.Radius_light,
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row-reverse",
          }}
        >
          <Feather name="info" size={24} color={colors.black} />
          <Title
            style={{
              alignSelf: "center",
              padding: 8,
              color: colors.black,
              fontFamily: "Tjw_blod",
              fontSize: 16,
            }}
          >
            خدمة العملاء
          </Title>
        </View>
        <Paragraph
          style={{
            alignSelf: "center",
            textAlign: "center",
            color: colors.black,
            padding: 8,
            fontFamily: "Tjw_reg",
            fontSize: 14,
          }}
        >
          نحن هنا من اجل مساعدتك اضغط مباشرتا على القسم المطلوب وسوف تتصل بالشخص المسوؤل لحل طلبك
        </Paragraph>
      </View>

      <View style={styles.container}>
        <FlatList
          data={callcenter}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              subTitle={item.subTitle}
              image={item.img}
              onPress={() => Linking.openURL(`tel:${item.subTitle}`)}
            />
          )}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
});

export default CallCenter;
