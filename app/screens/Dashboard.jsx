import React, { useRef, useCallback, useEffect, useState } from "react";
import {
  ScrollView,
  RefreshControl,
  Pressable,
  View,
  Animated,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Headline, Title } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import SummaryBoxes from "../components/dashboard/SummaryBoxes";
import OptionsList from "../components/dashboard/OptionsList";
import Screen from "../components/Screen";
import getAdsAPI from "../api/getAds";
import useAuth from "../auth/useAuth";
import getStatistic from "../api/getSummayBoxed";
import colors from "../config/colors";
import settings from "../config/settings";
import Routes from "../Routes";
import borderRadiuss from "../config/borderRadiuss";
import cache from "../utility/cache";
import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();
const Dashboard = () => {
  var [adsText, setText] = useState({ c_ad1: " " });
  const [appIsReady, setAppIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const navigator = useNavigation();
  const startValue = useRef(new Animated.Value(0.2)).current;
  const endValue = 1;
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadStatic();
    adsView();
  }, []);
  const [calcData, setCalcData] = useState({
    oneDay: null,
    sevenDay: null,
    month: null,
  });
  let { user } = useAuth();
  const loadStatic_storage = async () => {
    const results = await cache.get("/static.php?token=" + user.token);
    setData(results?.static[0]);
    const o = results?.last1[0];
    const s = results?.last7[0];
    const m = results?.last30[0];
    setCalcData({ oneDay: o, sevenDay: s, month: m });
    setIsLoading(false);
    setRefreshing(false);
  };
  const loadStatic = async () => {
    const results = await getStatistic.get(user.token);
    setData(results.data?.static[0]);
    const o = results.data?.last1[0];
    const s = results.data?.last7[0];
    const m = results.data?.last30[0];
    setCalcData({ oneDay: o, sevenDay: s, month: m });
    setIsLoading(false);
    setRefreshing(false);
  };

  const adsView = async () => {
    const results = await getAdsAPI.get(user?.token);
    setText(results?.data?.config);
    setIsLoading(false);
    setRefreshing(false);
  };
  const adsView_local = async () => {
    const results = await cache.get("/config.php?token=" + user?.token);
    setText(results);
    setIsLoading(false);
    setRefreshing(false);
  };
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  useEffect(() => {
    setIsLoading(true);
    loadStatic_storage();
    adsView_local();
    loadStatic();
    adsView();
    setTimeout(() => {
      setAppIsReady(true);
      onLayoutRootView();
    }, 100);
    Animated.loop(
      Animated.timing(startValue, {
        toValue: endValue,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  return (
    <Screen>
      <View
        onLayout={onLayoutRootView}
        style={{
          paddingTop: Constants.statusBarHeight,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row-reverse",
          backgroundColor: colors.white,
        }}
      >
        <Headline
          style={{
            fontFamily: "Tjw_blod",
            alignSelf: "flex-end",
            paddingTop: 10,
            paddingHorizontal: 10,
            color: colors.black,
          }}
        >
          {settings.companyName}
        </Headline>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Pressable
            onPress={() => navigator.navigate(Routes.STATISTICS_PAGE2)}
          >
            <Feather
              name="pie-chart"
              size={24}
              color={colors.black}
              style={{
                paddingTop: 10,
                paddingHorizontal: 10,
              }}
            />
          </Pressable>
          <Pressable
            style={{ marginLeft: 10 }}
            onPress={() =>
              navigator.navigate(Routes.Ads, { title: adsText.c_ad1 })
            }
          >
            <Animated.View
              style={{
                opacity: startValue,
                width: 30,
                height: 30,
              }}
            >
              <Image
                style={{
                  width: "90%",
                  height: "90%",
                  alignSelf: "center",
                  top: 5,
                  borderRadius: borderRadiuss.Radius_light,
                }}
                source={require("../assets/dashboard/advertisement.png")}
              />
            </Animated.View>
          </Pressable>
        </View>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {<SummaryBoxes data={calcData} isLoading={isLoading} />}
        <Pressable onPress={() => navigator.navigate(Routes.CALLCENTER)}>
          <View
            style={{
              width: "90%",
              height: 45,
              backgroundColor: "#fac8e3",
              alignSelf: "center",
              margin: 10,
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              elevation: 5,
            }}
          >
            <Feather name="phone-call" size={20} color={"#a30057"} />
            <Title
              style={{
                alignSelf: "center",
                paddingHorizontal: 8,
                color: "#a30057",
                fontFamily: "Tjw_xblod",
                fontSize: 14,
              }}
            >
              خدمة العملاء
            </Title>
          </View>
        </Pressable>

        {<OptionsList data={data} />}
      </ScrollView>
    </Screen>
  );
};
export default Dashboard;
