import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  StyleSheet,
  LogBox,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { FIREBASE_DB } from "../../../firebaseConfig";
import { UserContext } from "../UserLogin/UserContext";
import { useFonts } from "expo-font";

const ChatScreen = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const { user: currentUser } = useContext(UserContext);
  const otherUser = route.params?.user || {};

  const [fontsLoaded] = useFonts({
    Switzer_Regular: require("../../fonts/Switzer-Regular.otf"),
  });

  useEffect(() => {
    if (!currentUser || !otherUser) return;

    const chatId = getChatId(currentUser.uid, otherUser.uid);
    const messagesRef = collection(FIREBASE_DB, "chats", chatId, "messages");
    const q = query(messagesRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        isSender: doc.data().senderId === currentUser.uid,
      }));
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, [currentUser, otherUser]);

  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);

  const getChatId = (uid1, uid2) => {
    return uid1 < uid2 ? `${uid1}_${uid2}` : `${uid2}_${uid1}`;
  };

  const handleSend = async () => {
    if (text.trim() && currentUser && otherUser) {
      const chatId = getChatId(currentUser.uid, otherUser.uid);
      const messagesRef = collection(FIREBASE_DB, "chats", chatId, "messages");
      await addDoc(messagesRef, {
        text: text.trim(),
        createdAt: serverTimestamp(),
        senderId: currentUser.uid,
        receiverId: otherUser.uid,
      });
      setText("");
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.isSender ? styles.sender : styles.receiver,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  const ChattingScreenHeaderComponent = ({ user }) => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <Image source={{ uri: user.profileImage }} style={styles.image} />
          <View>
            <Text style={styles.headerText}>{user.name}</Text>
            <Text style={styles.headerText1}>Online</Text>
          </View>
        </View>
        <View style={styles.headerIcons}>
          <Ionicons name="call-outline" size={24} />
          <Ionicons name="videocam-outline" size={24} />
          <MaterialCommunityIcons name="dots-vertical" size={24} />
        </View>
      </View>
    );
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
    >
      <ChattingScreenHeaderComponent user={otherUser} />
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        inverted
      />
      <View style={styles.inputContainer}>
        {/* <TouchableOpacity style={styles.attachButton}>
          <Ionicons name="attach" size={22} color="#fff" />
        </TouchableOpacity> */}
        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={setText}
          placeholder="Type a message"
          placeholderTextColor="#999"
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Ionicons name="send" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7FE",
  },
  headerContainer: {
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  headerLeft: {
    flexDirection: "row",
    gap: 10,
    padding: 10,
    alignSelf: "center",
  },
  headerText: {
    fontWeight: "600",
    fontSize: 16,
    padding: 10,
    alignSelf: "center",
  },
  headerText1: {
    color: "green",
    fontSize: 12,
    paddingLeft: 10,
    bottom: 5,
  },
  headerIcons: {
    flexDirection: "row",
    gap: 10,
    padding: 10,
    alignSelf: "center",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 30,
    alignSelf: "center",
    left: 10,
  },
  messagesList: {
    padding: 10,
  },
  messageContainer: {
    maxWidth: "70%",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  sender: {
    alignSelf: "flex-end",
    backgroundColor: "#2c243d",
    borderRadius: 20,
    borderBottomRightRadius: 0,
    elevation: 5,
    padding: 15,
  },
  receiver: {
    alignSelf: "flex-start",
    backgroundColor: "#5B4978",
    borderRadius: 20,
    borderTopLeftRadius: 0,
    elevation: 5,
    padding: 15,
  },
  messageText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Switzer_Regular",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    bottom: 10,
    // borderWidth: 1,
    // margin: 5,
    // borderRadius: 10,
    // borderColor: "#ddd",
    // position: "absolute",
    // left: 0,
    // right: 0,
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    letterSpacing: 1,
    // backgroundColor: "#fff",
    // fontFamily: "Switzer_Regular",
  },
  attachButton: {
    marginRight: 10,
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: "#5B4978",
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#5B4978",
    padding: 10,
    borderRadius: 50,
  },
});

export default ChatScreen;
