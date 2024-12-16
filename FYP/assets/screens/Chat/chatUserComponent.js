import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useFonts } from "expo-font";

import { format, isToday, isYesterday } from "date-fns";

export default function ChatUserComponent({ user }) {
  const [fontsLoaded] = useFonts({
    Switzer_Regular: require("../../fonts/Switzer-Regular.otf"),
    Switzer_Bold: require("../../fonts/Switzer-Bold.otf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const formatTimestamp = (date) => {
    if (!date) return "";
    if (isToday(date)) {
      return format(date, "HH:mm");
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else {
      return format(date, "dd/MM/yyyy");
    }
  };

  return (
    <View style={styles.container}>
      {user.profileImage ? (
        <Image source={{ uri: user.profileImage }} style={styles.image} />
      ) : (
        <View style={styles.placeholderImage} />
      )}
      <View style={styles.midContainer}>
        <Text style={styles.username}>
          {user.name} <Text style={styles.userType}>({user.userType})</Text>
        </Text>
        <Text style={styles.message} numberOfLines={1} ellipsizeMode="tail">
          {user.lastMessage ? user.lastMessage.text : "No messages yet"}
        </Text>
      </View>
      <Text style={styles.timestamp}>
        {user.lastMessage ? formatTimestamp(user.lastMessage.createdAt) : ""}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    padding: 10,
    flexDirection: "row",
    width: "99.5%",
    alignSelf: "center",
    backgroundColor: "#F7F7FE",
    margin: 7,
    elevation: 5,
    shadowColor: "#58497B",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  placeholderImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ccc",
  },
  title: {
    fontFamily: "Switzer_Bold",
    fontSize: 16,
    marginLeft: 10,
  },
  midContainer: {
    flex: 1,
    marginLeft: 10,
    alignSelf: "center",
    gap: 5,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Switzer_Bold",
  },
  userType: {
    fontSize: 12,
    color: "grey",
    fontFamily: "Switzer_Regular",
  },
  message: {
    fontSize: 14,
    fontFamily: "Switzer_Regular",
  },
  timestamp: {
    fontSize: 12,
    color: "grey",
    marginTop: 5,
    fontFamily: "Switzer_Regular",
  },
});
