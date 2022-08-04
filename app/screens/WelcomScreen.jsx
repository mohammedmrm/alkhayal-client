import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground, StyleSheet, Text, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import AppButton from "../components/AppButton";
import Routes from "./../Routes";
import settings from "../config/settings";
import colors from "../config/colors";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <ImageBackground
      blurRadius={4}
      style={styles.background}
      source={require("../assets/background/welcomePage.jpg")}
    >
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
        <AppButton
          title="أبداء رحلتك معنا"
          onPress={() => navigation.navigate(Routes.LOGIN)}
        />
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
    color: colors.black,
  },

  logo: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
});
