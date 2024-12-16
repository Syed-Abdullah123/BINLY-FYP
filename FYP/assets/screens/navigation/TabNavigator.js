import React, { useState } from "react";
import { useFonts } from "expo-font";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Home from "../home";
import Goals from "../Goals/goals";
import CamScan from "../camScan";
import Recycle from "../Items and Details/recycle";
import ProfileScreen from "../profile";

const TabNavigator = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const Tab = createBottomTabNavigator();

  const [fontsLoaded] = useFonts({
    Montserrat_Regular: require("../../fonts/Montserrat-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          position: "absolute",
          bottom: 10,
          left: 10,
          right: 0,
          height: 65,
          backgroundColor: "#241742",
          borderRadius: 50,
          padding: 8,
          width: "94%",
          elevation: 5,
          paddingHorizontal: 5,
          paddingBottom: 5,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home";
          } else if (route.name === "Recycle") {
            iconName = focused ? "recycle" : "recycle";
          } else if (route.name === "Profile") {
            iconName = focused ? "account" : "account";
          } else if (route.name === "CamScan") {
            iconName = focused ? "scan-helper" : "scan-helper";
          } else if (route.name === "Goals") {
            iconName = focused ? "cards" : "cards";
          }

          return (
            <MaterialCommunityIcons name={iconName} size={22} color={color} />
          );
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontFamily: "Montserrat_Regular",
          bottom: 10,
        },
        tabBarActiveTintColor: "#e32f45",
        tabBarInactiveTintColor: "#748c94",
        headerStyle: { backgroundColor: "#F7F7FE" },
      })}
    >
      <Tab.Screen
        name="Home"
        options={({ navigation }) => ({
          headerTitleStyle: {
            fontFamily: "Montserrat_Bold",
            fontSize: 24,
          },
          headerTitleAlign: "center",
        })}
      >
        {(props) => <Home {...props} setModalVisible={setModalVisible} />}
      </Tab.Screen>
      <Tab.Screen
        name="Goals"
        component={Goals}
        options={{
          headerTitleStyle: {
            fontFamily: "Montserrat_Bold",
            fontSize: 24,
          },
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="CamScan"
        component={CamScan}
        options={{
          headerShown: false,
          tabBarItemStyle: {
            bottom: 40,
            height: 60,
            width: 60,
            padding: 5,
            backgroundColor: "#58497B",
            elevation: 5,
          },
          tabBarLabelStyle: {
            fontFamily: "Montserrat_Regular",
            fontSize: 13,
          },
        }}
      />
      <Tab.Screen
        name="Recycle"
        component={Recycle}
        options={{
          // title: "Recycling Map",
          headerTitleStyle: {
            fontFamily: "Montserrat_Bold",
            fontSize: 24,
          },
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitleStyle: {
            fontFamily: "Montserrat_Bold",
            fontSize: 24,
          },
          headerTitleAlign: "center",
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
