import React from 'react'
import LottieView from 'lottie-react-native';
import Loading from '../../config/loadings'
import { Platform } from "react-native";
const ActivityIndecator = (visable = false, style) => {
    const t = Loading.moneyTotal;
     if (!visable || Platform.OS === "web") return null;
    return <LottieView
        style={{
            width: 80,
            alignSelf: "center"
        }}
        autoPlay
        loop
        source={t} />
}

export default ActivityIndecator
