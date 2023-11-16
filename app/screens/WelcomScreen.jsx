import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import settings from "../config/settings";
import Routes from "./../Routes";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <ImageBackground blurRadius={10} style={styles.background} source={require("../assets/background/welcomePage.jpg")}>
      <StatusBar style="light" />
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={settings.logo} />
        <Text style={styles.text}>انت مهم جدا لنا </Text>
        <Text style={styles.text}>و لذالك أخترنا لك الافضل </Text>
      </View>
      <View
        style={{
          width: "100%",
          bottom: "5%",
        }}
      >
        <AppButton title="أبداء رحلتك معنا" onPress={() => navigation.navigate(Routes.LOGIN)} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    fontFamily: "Tjw_blod",
    paddingVertical: 5,
    color: colors.brandDark,
  },

  logo: {
    width: 180,
    height: 180,
    borderRadius: 10,
  },
});
