import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Routes from "../../Routes";

import OptionsTwo from "./OptionsTwo";

const options = [
  {
    options: [
      {
        path: require("./../../assets/dashboard/underReceive1.png"),
        name: "بالطريق مع المندوب",
        forwardTo: Routes.DASHBOARD_LIST,
        action: "onway",
      },
      {
        path: require("./../../assets/dashboard/delivery.png"),
        name: "تم التسليم",
        action: "recived",
        forwardTo: Routes.DASHBOARD_LIST,
      },
    ],

    key: `12327129233-${Date.now() + Math.random()}`,
  },
  {
    options: [
      {
        path: require("./../../assets/dashboard/puse.png"),
        name: "مؤجل",
        forwardTo: Routes.DASHBOARD_LIST,
        action: "posponded",
      },
      {
        path: require("./../../assets/dashboard/resend.png"),
        name: "اعادة ارسال",
        action: "resend",
        forwardTo: Routes.DASHBOARD_LIST,
      },
    ],
    key: `12318924233-${Date.now() + Math.random()}`,
  },
  {
    options: [
      {
        path: require("./../../assets/dashboard/partialy.png"),
        name: "راجع جزئي",
        action: "partialy",
        forwardTo: Routes.DASHBOARD_LIST,
      },
      {
        path: require("./../../assets/dashboard/underProcess.png"),
        name: "راجع ممكن معالجتة",
        forwardTo: Routes.DASHBOARD_LIST,
        action: "returned",
      },
    ],
    key: `1232713733-${Date.now() + Math.random()}`,
  },
  {
    options: [
      {
        path: require("./../../assets/dashboard/inWarehouse.png"),
        name: "راجع ممكن استلامه",
        action: "instorage",
        forwardTo: Routes.DASHBOARD_LIST,
      },
      {
        path: require("./../../assets/dashboard/change.png"),
        name: "تغير عنوان",
        action: "change",
        forwardTo: Routes.DASHBOARD_LIST,
      },
    ],
    key: `12323883043-${Date.now() + Math.random()}`,
  },
  {
    options: [
      {
        path: require("./../../assets/dashboard/replace.png"),
        name: "استبدال",
        action: "replace",
        forwardTo: Routes.DASHBOARD_LIST,
      },
      {
        path: require("./../../assets/dashboard/reports.png"),
        name: "الكشوفات والأرباح",
        forwardTo: Routes.DISCLOSURES,
        action: "disclosures",
      },
    ],
    key: `12323223003-${Date.now() + Math.random()}`,
  },
];
const OptionsList = ({ data }) => {
  return (
    <View>
      {options.map((item) => {
        return <OptionsTwo data={data} key={Math.random()} options={item} />;
      })}
    </View>
  );
};
export default OptionsList;
