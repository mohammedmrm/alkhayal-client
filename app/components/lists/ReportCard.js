import React, { PureComponent } from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

import Icon from "../Icon";
import Text from "../AppText";
import colors from "../../config/colors";

export default class ReportCard extends PureComponent {
  handelColor(id) {
    switch (id) {
      case "4":
        return colors.success;

      default:
        return colors.returned;
    }
  }
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  render() {
    return (
      <Swipeable
        renderLeftActions={this.props.renderRightActions}
        renderRightActions={this.props.renderRightActions}
      >
        <View
          style={{
            alignSelf: "center",
            width: "95%",
            height: 80,
            paddingTop: 10,
          }}
        >
          <View
            style={[
              styles.container,
              {
                backgroundColor:
                  this.props.item.orders_status === "4"
                    ? colors.lightGreen
                    : "#FFE7D7",
              },
            ]}
          >
            <TouchableHighlight
              style={{ width: "100%", height: "100%" }}
              underlayColor={colors.light}
              onPress={this.props.onPress}
            >
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  flexDirection: "row-reverse",
                }}
              >
                <View style={styles.detailsContainer}>
                  <Text style={styles.subTitle}>
                    {this.props.item.orders_status === "4"
                      ? "كشف الواصل"
                      : "كشف الراجع"}
                  </Text>
                  <Text style={styles.title} numberOfLines={1}>
                    {this.props.item.in_date}
                  </Text>
                  <Text style={styles.subTitle} numberOfLines={1}>
                    {this.props.item.store_name}
                  </Text>
                </View>
                <View style={styles.detailsContainer}>
                  <Text style={styles.title} numberOfLines={1}>
                    رقم الكشف {this.props.item.id}
                  </Text>
                  <Text style={styles.title} numberOfLines={1}>
                    {this.props.item.orders} طلبية
                  </Text>
                  {this.props.item.total != "0" && (
                    <Text style={styles.subTitle} numberOfLines={1}>
                      {this.numberWithCommas(
                        this.props.item.total - this.props.item.dev_price
                      )}
                    </Text>
                  )}
                </View>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              onPress={this.props.onPress}
              style={{ right: 60, borderRadius: 10 }}
            >
              <Icon
                iconColor={this.handelColor(this.props.item.orders_status)}
                name="file-chart"
                size={70}
              />
            </TouchableHighlight>
          </View>
        </View>
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    paddingRight: 20,
    paddingTop: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
  container: {
    alignItems: "center",
    flexDirection: "row-reverse",
    backgroundColor: colors.white,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

    marginBottom: 5,
    width: "100%",
    height: 70,
  },
  detailsContainer: {
    flex: 1,
    marginRight: 10,
    justifyContent: "center",
    flex: 1,
  },
  subTitle: {
    color: colors.medium,
    fontSize: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 12,
  },
});
