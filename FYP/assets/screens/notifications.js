// Notifications.js
import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const notifications = [
  {
    id: "1",
    title: "New Message",
    description: "You have received a new message.",
  },
  {
    id: "2",
    title: "Update Available",
    description: "A new update is available for download.",
  },
];

const Notifications = () => (
  <View style={styles.container}>
    <FlatList
      data={notifications}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.notification}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7FE",
    paddingTop: 40,
  },
  notification: {
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
});

export default Notifications;
