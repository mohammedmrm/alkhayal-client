import { useRoute } from "@react-navigation/native";
import React from "react";
import WebView from "react-native-webview";
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
          "https://docs.google.com/gview?embedded=true&url=https://alzaimexpress.com/dash/invoice/" +
          route?.params.item.path,
      }}
    />
  );
};

export default PdfViewerScreen;
