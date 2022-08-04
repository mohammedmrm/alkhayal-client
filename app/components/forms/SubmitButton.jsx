import React from "react";
import { useFormikContext } from "formik";
import { StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import colors from "../../config/colors";
const SubmitButton = ({ title, style }) => {
  const { handleSubmit } = useFormikContext();
  return (
    <Button
      style={{ ...styles.button, style }}
      icon="login"
      mode="contained"
      onPress={handleSubmit}
    >
      <Text style={{ fontFamily: "Tjw_blod" }}>{title}</Text>
    </Button>
  );
};

export default SubmitButton;
const styles = StyleSheet.create({
  button: {
    fontFamily: "Tjw_blod",
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 5,
    height: 54,
    width: "90%",
    borderRadius: 0,
    backgroundColor: colors.vueColorButtom,
  },
});
