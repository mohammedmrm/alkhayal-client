import React from 'react'
import LottieView from 'lottie-react-native';
import Loading from '../../config/loadings'
import { Platform } from "react-native";
const ActivityIndecator = (visable = false, style) => {
    // chatLoading
    const t = Loading.loadingList;
     if (!visable || Platform.OS === "web") return null;
    return <LottieView
        style={{
            flex: 1,
            alignSelf: "center"
        }}
        autoPlay
        loop
        source={t} />
}

export default ActivityIndecator
