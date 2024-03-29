import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Image } from "react-native-animatable";
import { useNavigation, useRoute } from "@react-navigation/native";
import ActivityIndicator from "../components/ActivtyIndectors/ActivityIndecatorOrderDetails";
import ListItemOrderDetail from "../components/ListItemOrderDetail";
import colors from "../config/colors";
import TrackingBox from "../components/TrackingBox";
import getOrder from "../api/getOrder";
import useAuth from "../auth/useAuth";
import Routes from "../Routes";
import borderRadiuss from "../config/borderRadiuss";
import { I18nManager } from "react-native";
import Icon from "../components/Icon";

const OrderDetails = () => {
  const route = useRoute();
  let { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const navigation = useNavigation();
  const prefix = "DelayedOrders";

  const loadDetails = async (token, id, notificatin_id = "0") => {
    const results = await getOrder?.getOrder(token, id, notificatin_id);
    setOrder(results?.data?.data[0] || {});
    setIsLoading(false);
    console.log(results);
  };
  useEffect(() => {
    console.log(user);
    loadDetails(user?.token, route?.params?.id, route?.params?.notify_id);
  }, []);
  const handelColor = (id) => {
    switch (id) {
      case "4":
        return colors.success;
      case "5":
        return colors.secondery;
      case "6":
        return colors.primery;
      case "7":
        return colors.pause;
      case "8":
        return colors.returned;
      case "9":
        return colors.returned;
      case "13":
        return colors.gray;
      default:
        return colors.medium;
    }
  };
  const startChating = (id) => {
    navigation.navigate(Routes.CHAT_MODEL, { id: id });
  };
  return (
    <ScrollView>
      <View style={{ flex: 1, marginBottom: 10, paddingBottom: 5 }}>
        {order ? (
          <View style={{ flex: 1, marginBottom: 10, paddingBottom: 5 }}>
            <View style={styles.orderDetailsContainer}>
              <View style={{ width: "100%", height: "25%" }}>
                <View style={styles.headerDetails}>
                  <View
                    style={[
                      styles.titleOrderStatusView,
                      { backgroundColor: handelColor(order?.order_status_id) },
                    ]}
                  >
                    <Text style={styles.titleOrderStatus}>
                      {order?.order_status}
                    </Text>
                  </View>
                  <Text style={styles.titleOrderId}>{order?.order_no}</Text>
                </View>
              </View>
              <View style={styles.textContainer}>
                <ListItemOrderDetail
                  caption="أسم المحل"
                  details={order?.store_name}
                />
                {order?.customer_name !== "NA" && (
                  <ListItemOrderDetail
                    caption="أسم الزبون"
                    details={order?.customer_name}
                  />
                )}
                <ListItemOrderDetail
                  onPress={true}
                  caption="هاتف الزبون"
                  details={order?.customer_phone}
                />
                {order?.address ? (
                  <ListItemOrderDetail
                    caption="عنوان الزبون"
                    details={`${order?.city} - ${order?.town}`}
                  />
                ) : (
                  <ListItemOrderDetail
                    caption="عنوان الزبون"
                    details={`${order?.city} - ${order?.town}`}
                  />
                )}
                {order?.dev_price && (
                  <ListItemOrderDetail
                    caption="سعر التوصيل"
                    details={order?.dev_price}
                  />
                )}
                {order?.client_price && (
                  <ListItemOrderDetail
                    caption="السعر الصافي"
                    details={order?.client_price}
                  />
                )}
                {order?.price && (
                  <ListItemOrderDetail
                    caption="مبلغ الوصل"
                    details={order?.price}
                  />
                )}
                {order?.new_price && (
                  <ListItemOrderDetail
                    caption="المبلغ المستلم"
                    details={order?.new_price}
                  />
                )}
                {order?.driver_name && (
                  <ListItemOrderDetail
                    caption="أسم المندوب"
                    details={order?.driver_name}
                  />
                )}
                {order?.driver_phone && (
                  <ListItemOrderDetail
                    onPress={true}
                    caption="هاتف المندوب"
                    details={order?.driver_phone}
                  />
                )}
                {order?.driver_phone && (
                  <ListItemOrderDetail
                    caption="تم التحاسب؟"
                    details={order?.money_status === "1" ? "نعم" : "كلا"}
                  />
                )}
              </View>
            </View>
            <TouchableWithoutFeedback onPress={() => startChating(order?.id)}>
              <View style={styles.chatShadow}>
                <Icon
                  name={"message-bulleted"}
                  size={70}
                  iconColor={"#de3456"}
                  backgroundColor={colors.white}
                />
              </View>
            </TouchableWithoutFeedback>
            <ScrollView>
              {order?.tracking &&
                order?.tracking.map((item) => (
                  <TrackingBox
                    key={`${item.order_status_id}${
                      Date.now() + Math.random()
                    }`.toString()}
                    bgColor={handelColor(item.order_status_id)}
                    item={item}
                  />
                ))}
            </ScrollView>
          </View>
        ) : (
          <ActivityIndicator visable={isLoading} />
        )}
      </View>
    </ScrollView>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  headerDetails: {
    width: "90%",
    height: "100%",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
    flexDirection: I18nManager.isRTL ? "row" : "row",
    borderBottomColor: colors.primery,
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  container: {
    backgroundColor: colors.black,
    width: "100%",
    height: "100%",
  },
  orderDetailsContainer: {
    backgroundColor: colors.white,
    width: "100%",
    height: 310,
    marginBottom: 10,
    paddingBottom: 5,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textContainer: {
    width: "100%",
    height: "70%",
    marginRight: "5%",
    marginBottom: "5%",
    flexDirection: "column",
  },

  chatShadow: {
    width: 70,
    height: 70,
    position: "absolute",
    top: 150,
    left: 30,
    color: colors.danger,
    borderRadius: borderRadiuss.Radius_larg,
    shadowColor: colors.black,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 10,
    margin: 5,
  },
  chatIcon: {
    color: colors.danger,
  },
  titleStore: {
    fontSize: 20,
    paddingTop: 5,
    fontFamily: "Tjw_medum",
  },
  titleOrderId: {
    fontSize: 22,
    fontFamily: "Tjw_medum",
  },
  titleOrderStatus: {
    color: "white",
    fontFamily: "Tjw_xblod",
  },
  titleOrderStatusView: {
    backgroundColor: colors.primery,
    padding: 10,
    borderRadius: 5,
    margin: 5,
    fontFamily: "Tjw_blod",
  },
  contanerBox: {
    height: "100%",
    width: "100%",
    flexDirection: "row-reverse",
    justifyContent: "space-around",
    margin: 5,
  },
  trackingTitle: {
    color: "#39C555",
    fontFamily: "Tjw_blod",
    fontSize: 14,
    paddingBottom: 10,
  },
  trackingNote: {
    color: colors.medium,
    fontSize: 12,
  },
});
