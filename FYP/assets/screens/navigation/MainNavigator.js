import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Splash from "../splash";
import Welcome from "../welcome";
import CommunitySignup from "../CommunityLogin/CommunitySignup";
import Signup from "../UserLogin/signup";
import Login from "../UserLogin/login";
import Loading from "../Loading";
import TabNavigator from "./TabNavigator";
import ChatScreen from "../Chat/chatScreen";
import ArticleDetailsScreen from "../articleDetailsScreen";
import ItemDetails from "../Items and Details/itemDetails";
import GoalDetails from "../Goals/goalDetails";
import ChatUsers from "../Chat/chatUsers";
import LocationScreen from "../locationScreen";

const MainNavigator = ({ navigation }) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
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
      <Stack.Screen name="Map" component={LocationScreen} />
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
  );
};

export default MainNavigator;
