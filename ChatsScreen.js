import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../../../firebase/FirebaseConfig";
import Chatting from "../../components/Chatting";

const ChatsScreen = () => {
  const [data, setData] = useState([]);
  useLayoutEffect(() => {
    const docRef = collection(db, "chats");
    const q = query(docRef, where("customerId", "==", auth.currentUser.uid));
    onSnapshot(q, (categories) =>
      setData(
        categories.docs.map((category) => ({
          id: category.id,
          data: category.data(),
        }))
      )
    );
  }, []);
  return (
    <ScrollView>
      {data.map((item, key) => (
        <View>
          <Chatting V_id={item.data.vendorId} ChatId={item.id} type={"Cus1"} />
        </View>
      ))}
    </ScrollView>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({});
