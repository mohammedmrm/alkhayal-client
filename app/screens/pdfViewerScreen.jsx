import { useRoute } from "@react-navigation/native";
import React from "react";
import WebView from "react-native-webview";
import settings from "../config/settings";
import { Platform } from "react-native";
const PdfViewerScreen = () => {
  const route = useRoute();
  return (
    <WebView
      bounces={true}
      useWebKit={true}
      scrollEnabled={true}
      javaScriptEnabled={true}
      style={{ flex: 1 }}
      source={{
        uri:
          Platform.OS == "ios"
            ? `${settings.apiUrl}/../../dash/invoice/${route?.params.item.path}`
            : `https://docs.google.com/gview?embedded=true&url=${settings.apiUrl}/../../dash/invoice/${route?.params.item.path}`,
      }}
    />
  );
};

export default PdfViewerScreen;
