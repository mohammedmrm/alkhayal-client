import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import * as Yup from "yup";

import {
  ErrorMessage,
  AppFormField,
  AppForm,
  SubmitButton,
} from "../components/forms";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import { StatusBar } from "expo-status-bar";
import colors from "../config/colors";
import ActivityIndecator from "../components/ActivtyIndectors/ActivityIndecatorLoading";
import settings from "../config/settings";

const validationSchema = Yup.object().shape({
  phone: Yup.string().required().min(11).max(11).label("رقم الهاتف"),
  password: Yup.string().required().min(4).label("كلمةالمرور"),
});
export default function LoginPage() {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const handleSubmit = async ({ phone, password }) => {
    setIsLoading(true);
    const results = await authApi.login(phone, password);
    if (!results.ok) {
      setIsLoading(false);
      return setLoginFailed(true);
    }
    if (!results.data.token) {
      setIsLoading(false);
      return setLoginFailed(true);
    }
    setLoginFailed(false);
    setIsLoading(false);
    auth.logIn(results.data);
  };
  return (
    <ImageBackground
      blurRadius={6}
      style={styles.background}
      source={require("../assets/background/welcomePage.jpg")}
    >
      <StatusBar style="light" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {isLoading && <ActivityIndecator visible={isLoading} />}
        <AppForm
          initialValues={{ phone: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={settings.logo} />
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.text}>تسجيل دخول </Text>
            <ErrorMessage
              error="رقم الهاتف او كلمة المرور خطاْ"
              visible={loginFailed}
            />
            <AppFormField
              rightIcon="cellphone"
              name="phone"
              caption="رقم الموبايل"
              autoCapitalize="none"
              keyboardType="phone-pad"
              autoCorrect={false}
            />
            <AppFormField
              rightIcon="lock"
              leftIcon="eye"
              caption="كلمة المرور"
              name="password"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="password"
            />
            <SubmitButton title="تسجيل دخول" />
          </View>
        </AppForm>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    top: "5%",
    padding: 5,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 5,
  },
  background: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    paddingVertical: 5,
    fontFamily: "Tjw_blod",
  },
  textClient: {
    fontSize: 12,
    paddingVertical: 5,
    color: colors.medium,
  },

  clinetDriverContaiar: {
    margin: 5,
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    padding: 10,
    width: 200,
    height: 200,
    borderRadius: 10,
  },

  formContainer: {
    backgroundColor: colors.white,
    alignItems: "center",
    alignSelf: "center",
    width: "95%",
    height: 350,
    top: "5%",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 5,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});
