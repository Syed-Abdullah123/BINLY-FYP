import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

import Splash from "./assets/screens/splash";
import Welcome from "./assets/screens/welcome";
import CommunitySignup from "./assets/screens/CommunityLogin/CommunitySignup";
import Login from "./assets/screens/UserLogin/login";
import Signup from "./assets/screens/UserLogin/signup";
import Loading from "./assets/screens/Loading";
import Home from "./assets/screens/home";
import Goals from "./assets/screens/Goals/goals";
import CamScan from "./assets/screens/camScan";
import Recycle from "./assets/screens/Items and Details/recycle";
import ProfileScreen from "./assets/screens/profile";
import ChatScreen from "./assets/screens/Chat/chatScreen";
import ArticleDetailsScreen from "./assets/screens/articleDetailsScreen";
import ItemDetails from "./assets/screens/Items and Details/itemDetails";
import GoalDetails from "./assets/screens/Goals/goalDetails";
import ChatUsers from "./assets/screens/Chat/chatUsers";
import LocationScreen from "./assets/screens/locationScreen";
import ConfirmationScreen from "./assets/screens/ConfirmationScreen";
import { UserProvider } from "./assets/screens/UserLogin/UserContext";
import { StatusBar } from "expo-status-bar";

const TabNavigator = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const Tab = createBottomTabNavigator();

  const [fontsLoaded] = useFonts({
    Montserrat_Regular: require("./assets/fonts/Montserrat-Regular.ttf"),
    Montserrat_Bold: require("./assets/fonts/Montserrat-Bold.ttf"),
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

export default function App() {
  const Stack = createStackNavigator();
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CommunitySignup"
            component={CommunitySignup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Loading"
            component={Loading}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeScreen"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChatUsers"
            component={ChatUsers}
            options={{
              title: "Chat",
              headerTitleStyle: {
                fontFamily: "Montserrat_Bold",
                fontSize: 24,
              },
              headerTitleAlign: "center",
              headerStyle: { backgroundColor: "#F7F7FE" },
            }}
          />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{
              title: "Chat",
              headerTitleStyle: {
                fontFamily: "Montserrat_Bold",
                fontSize: 24,
              },
              headerTitleAlign: "center",
              headerStyle: { backgroundColor: "#F7F7FE" },
            }}
          />
          <Stack.Screen
            name="Location"
            component={LocationScreen}
            options={{
              headerTitle: "Enter Location",
              headerStyle: { backgroundColor: "#F7F7FE" },
              headerTitleStyle: {
                fontFamily: "Montserrat_Bold",
                // fontSize: 24,
              },
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="ConfirmationScreen"
            component={ConfirmationScreen}
            options={{
              headerTitle: "",
              headerStyle: { backgroundColor: "#F7F7FE" },
              headerTitleStyle: {
                fontFamily: "Montserrat_Bold",
                // fontSize: 24,
              },
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="ArticleDetails"
            component={ArticleDetailsScreen}
            options={{
              headerTitle: "",
              headerStyle: { backgroundColor: "#F7F7FE" },
            }}
          />
          <Stack.Screen
            name="ItemDetails"
            component={ItemDetails}
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "#F7F7FE",
              },
            }}
          />
          <Stack.Screen
            name="GoalDetails"
            component={GoalDetails}
            options={{
              title: "",
              headerStyle: { backgroundColor: "lightblue" },
            }}
          />
        </Stack.Navigator>
        <StatusBar barStyle="light-content" backgroundColor="#F7F7FE" />
      </NavigationContainer>
    </UserProvider>
  );
}
