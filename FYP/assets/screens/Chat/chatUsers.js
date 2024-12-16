import React, { useState, useEffect, useContext } from "react";
import { View, FlatList, StyleSheet, Text, Pressable } from "react-native";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";
import { FIREBASE_DB } from "../../../firebaseConfig";
import ChatUserComponent from "./chatUserComponent";
import { UserContext } from "../UserLogin/UserContext";

export default function ChatUsers({ navigation }) {
  const [users, setUsers] = useState([]);
  const { user: currentUser } = useContext(UserContext);

  useEffect(() => {
    if (!currentUser) return;

    const usersRef = collection(FIREBASE_DB, "users");
    const q = query(usersRef);

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const usersData = querySnapshot.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
      }));

      // Fetch last message for each user
      const usersWithLastMessage = await Promise.all(
        usersData.map(async (user) => {
          const chatId = getChatId(currentUser.uid, user.uid);
          const messagesRef = collection(
            FIREBASE_DB,
            "chats",
            chatId,
            "messages"
          );
          const lastMessageQuery = query(
            messagesRef,
            orderBy("createdAt", "desc"),
            limit(1)
          );

          const lastMessageSnapshot = await new Promise((resolve) => {
            onSnapshot(lastMessageQuery, (snapshot) => resolve(snapshot));
          });

          let lastMessage = null;
          if (!lastMessageSnapshot.empty) {
            const lastMessageDoc = lastMessageSnapshot.docs[0];
            lastMessage = {
              text: lastMessageDoc.data().text,
              createdAt: lastMessageDoc.data().createdAt?.toDate(),
            };
          }

          return { ...user, lastMessage };
        })
      );

      setUsers(usersWithLastMessage);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const getChatId = (uid1, uid2) => {
    return uid1 < uid2 ? `${uid1}_${uid2}` : `${uid2}_${uid1}`;
  };

  const handleUserPress = (otherUser) => {
    navigation.navigate("ChatScreen", { user: otherUser });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chatting Room</Text>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleUserPress(item)}>
            <ChatUserComponent user={item} />
          </Pressable>
        )}
        keyExtractor={(item) => item.uid}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7FE",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
  },
});
