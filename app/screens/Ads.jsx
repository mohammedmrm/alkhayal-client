import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../config/colors";
const Ads = (props) => {
  const result = props.route.params.title;
  return (
    <View style={styles.adsContainer}>
      <View onTouchEndCapture={() => setModalVisible(!modalVisible)}>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "Tjw_blod",
            paddingHorizontal: 10,
            fontSize: 12,
            color: colors.black,
          }}
        >
          اعلان
        </Text>
        <Text
          style={{
            textAlign: "right",
            fontFamily: "Tjw_medum",
            paddingHorizontal: 10,
            fontSize: 14,
            marginVertical: 20,
            color: colors.black,
          }}
        >
          {result}
        </Text>
      </View>
    </View>
  );
};
export default Ads;
const styles = StyleSheet.create({
  adsContainer: {
    width: "95%",
    alignSelf: "center",
    borderRadius: 5,
    flexDirection: "row-reverse",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: colors.white,
    margin: 5,
    padding: 5,
    shadowColor: "black",
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,

    elevation: 5,
  },
  centeredView: {
    flex: 1,
    backgroundColor: "#00000099",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    marginTop: 22,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 20,
      height: 50,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  button: {
    borderRadius: 5,
    width: "90%",
    padding: 5,
    backgroundColor: colors.vueColorButtom,
  },
  textStyle: {
    color: "white",
    fontFamily: "Tjw_blod",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "Tjw_medum",
    borderBottomColor: "#999999",
    borderBottomWidth: 1,
    paddingTop: 10,
  },
});
