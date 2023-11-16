import { useNavigation } from "@react-navigation/native";
import { Button, Card, Modal, Select, SelectItem, Spinner, Text } from "@ui-kitten/components";
import React, { useEffect, useState, useRef } from "react";
import { Animated, Dimensions, FlatList, Linking, StyleSheet, TouchableOpacity, View } from "react-native";
import { Searchbar } from "react-native-paper";
import BottomSheet from "reanimated-bottom-sheet";
import cache from "../utility/cache";

import Routes from "../Routes";
import getCities from "../api/getCities";
import getOrders from "../api/getOrders";
import getStatues from "../api/getStatues";
import getStores from "../api/getStores";
import useAuth from "../auth/useAuth";
import { ListItemSeparator, OrderCard, OrderSheet, QuckViewDetails, QuckViewDetails2 } from "../components/lists";
import colors from "../config/colors";
import settings from "../config/settings";
import { handleCopy } from "../utility/helper";
import ActivityIndecatorLoadingList from "../components/ActivtyIndectors/ActivityIndecatorLoadingList";
import Screen from "../components/Screen";

//-------------------------------------------------------------------------
function SearchResult() {
  let { user } = useAuth();
  const navigator = useNavigation();
  const [order, setOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState(null);
  const [stores, setStores] = useState([]);
  const [store, setStore] = useState(null);
  const [statues, setStatues] = useState([]);
  const [status, setStatus] = useState(null);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [noOrders, setNoOrders] = useState("0");
  const [page, setPage] = useState("1");
  const [visible, setVisible] = React.useState(false);

  const prefix = "SearchResults";
  //==============================(Bottom Sheet)========================================
  const window = Dimensions.get("window");
  const bs = useRef(null);
  const [state, setState] = useState({
    opacity: new Animated.Value(0),
    isOpen: false,
  });
  const onClose = () => {
    Animated.timing(state.opacity, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true,
    }).start();
    bs.current.snapTo(0);
    setTimeout(() => {
      setState({ ...state, isOpen: false });
    }, 50);
  };

  const onOpen = () => {
    setState({ ...state, isOpen: true });
    bs.current.snapTo(2);
    Animated.timing(state.opacity, {
      toValue: 0.7,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const renderBackDrop = () => (
    <Animated.View
      style={{
        opacity: state.opacity,
        backgroundColor: "#000",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <TouchableOpacity
        style={{
          width: window.width,
          height: window.height,
          backgroundColor: "transparent",
        }}
        activeOpacity={1}
        onPress={onClose}
      />
    </Animated.View>
  );
  const openWindowFast = (order) => {
    setOrder(order);
    onOpen();
  };

  const LoadingIndicator = (props) => (
    <View style={[props.style]}>
      <Spinner size="small" />
    </View>
  );
  //=====================LOADING==================================

  const loadOrders = async (nextPage) => {
    try {
      const results = await getOrders.getOrders(
        user.token,
        status ? status.row : null,
        city ? city.row : null,
        store ? store.row.id : null,
        search ? search : null,
        nextPage
      );
      if (results.data.success === "0") {
        return setIsLoading(false);
      }
      setPage(results.data.nextPage);

      if (nextPage === "1") {
        setNoOrders(results.data.orders);
        setOrders(results.data.data);
        return setIsLoading(false);
      }
      setOrders([...orders, ...results.data.data]);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };
  const loadOrders_local = async (nextPage) => {
    try {
      const results = await cache.get(
        settings.apiUrl + "/search.php?token=" + user.token + "&limit=20&page=" + nextPage
      );
      if (results.data.success === "0") {
        return null;
      }
      setOrders(results.data);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    setIsLoading(true);
    loadOrders_local("1");
    loadOrders("1");
  }, [status, city, store]);
  useEffect(() => {
    setIsLoading(true);
    loadCities();
    loadStores();
    loadStatues();
  }, []);

  const loadCities = async () => {
    try {
      const results = await getCities.getCities(user.token);
      const array = [
        {
          name: "المحافظات",
          id: "",
        },
      ];
      setCities([...array, ...results.data.data]);
    } catch (e) {
      console.log(e);
    }
  };
  const loadStores = async () => {
    try {
      const results = await getStores.getStores(user.token);
      const array = [
        {
          name: "الكل",
          id: "",
        },
      ];
      setStores([...array, ...results.data.data]);
    } catch (e) {
      console.log(e);
    }
  };
  const loadStatues = async () => {
    try {
      const results = await getStatues.getStatues(user.token);
      const array = [
        {
          name: "جميع الحالات",
          id: "",
        },
      ];
      setStatues([...array, ...results.data.data]);
    } catch (e) {
      console.log(e);
    }
  };
  const onEndReachedMohamed = () => {
    setIsLoading(true);
    loadOrders(page);
  };
  const refreshingMethod = () => {
    setRefreshing(true);
    loadOrders("1");
    setRefreshing(false);
  };
  const footer = () => {
    return (
      <View
        style={{
          flex: 1,
          height: 300,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoading && <ActivityIndecatorLoadingList visable={isLoading} />}
      </View>
    );
  };
  //===============================(Main body)=========================================
  return (
    <Screen>
      <Searchbar
        placeholder="بحث رقم الوصل او رقم الهاتف..."
        onChangeText={(x) => setSearch(x)}
        value={search}
        onChange={(x) => setSearch(x)}
        iconColor={colors.secondery}
        style={{
          margin: 10,
          direction: "rtl",
        }}
      />
      <View
        style={{
          flexDirection: "row-reverse",
          width: "100%",
          justifyContent: "space-around",
          paddingHorizontal: 2,
          direction: "rtl",
        }}
      >
        <View style={{ width: "27%", marginHorizontal: 2 }}>
          <Select
            selectedIndex={city}
            status="primary"
            value={city ? cities[city.row].name : "المحافظة"}
            size="small"
            onSelect={(index) => setCity(index)}
            style={{ direction: "rtl" }}
          >
            {cities.map((item) => (
              <SelectItem
                key={Date.now() + Math.random()}
                title={item.name}
                style={{
                  direction: "rtl",
                }}
              />
            ))}
          </Select>
        </View>
        <View style={{ width: "30%", marginHorizontal: 2 }}>
          <Select
            selectedIndex={status}
            status="primary"
            value={status ? statues[status.row].name : "الحالة"}
            size="small"
            onSelect={(index) => setStatus(index)}
            style={{ direction: "rtl" }}
          >
            {statues.map((item) => (
              <SelectItem key={Date.now() + Math.random()} title={item.name} style={{ direction: "rtl" }} />
            ))}
          </Select>
        </View>
        <View style={{ width: "30%", marginHorizontal: 2 }}>
          <Select
            selectedIndex={store}
            status="primary"
            value={store ? stores[store.row].name : "الصفحة"}
            size="small"
            onSelect={(index) => setStore(index)}
            style={{ direction: "rtl" }}
          >
            {stores.map((item) => (
              <SelectItem key={Date.now() + Math.random()} title={item.name} style={{ direction: "rtl" }} />
            ))}
          </Select>
        </View>
      </View>
      <Button
        appearance="outline"
        size="small"
        status="primary"
        style={{ width: "95%", alignSelf: "center", margin: 5 }}
        accessoryRight={isLoading ? LoadingIndicator : <></>}
        onPress={() => {
          setIsLoading(true);
          loadOrders("1");
        }}
      >
        {(evaProps) => <Text {...evaProps}> أبحث في ({noOrders}) طلبية </Text>}
      </Button>
      <FlatList
        style={{ flex: 1, width: "100%" }}
        data={orders}
        keyExtractor={(item) => `${item.id}-${prefix}-${Date.now() + Math.random()}`.toString()}
        renderItem={({ item }) => (
          <OrderCard
            item={item}
            openWindowFast={openWindowFast}
            onPress={() => {
              navigator.navigate(Routes.ORDER_DETAILS, {
                id: item.id,
                notify_id: "",
              });
            }}
            renderRightActions={() => (
              <>
                <QuckViewDetails
                  icon="content-copy"
                  color={colors.secondery}
                  onPress={() => {
                    handleCopy(item);
                    setVisible(true);
                  }}
                />
              </>
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        onEndReachedThreshold={0.5}
        onEndReached={() => onEndReachedMohamed()}
        refreshing={refreshing}
        onRefresh={() => refreshingMethod()}
        ListFooterComponent={footer}
      />
      <Modal onBackdropPress={() => setVisible(false)} backdropStyle={styles.backdrop} visible={visible}>
        <Card disabled={true}>
          <Text> 😻 تم نسخ المعلومات</Text>
        </Card>
      </Modal>
      {state.isOpen && renderBackDrop()}
    </Screen>
  );
}
const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
export default SearchResult;
