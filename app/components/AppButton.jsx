import React from "react";
import colors from "../config/colors";
import { Button, Text } from "react-native-paper";

const AppButton = ({
  title,
  onPress,
  color = "primery",
  isLoading = false,
}) => {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      loading={isLoading}
      color={colors.vueColorButtom}
      style={{
        margin: 5,
        height: 54,
        width: "90%",
        alignSelf: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          margin: 5,
          fontFamily: "Tjw_blod",
          height: 54,
          color: colors.white,
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        {title}
      </Text>
    </Button>
  );
};

export default AppButton;
