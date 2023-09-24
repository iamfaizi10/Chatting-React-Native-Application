import { StyleSheet, Text, Image, View, ScrollView } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../../../firebase/FirebaseConfig";
import Chatting from "../../components/Chatting";
import ImageViewer from "react-native-image-zoom-viewer";
import PhotoView from "react-native-photo-view";
const VendorChatScreen = () => {
  const [data, setData] = useState([]);
  useLayoutEffect(() => {
    const docRef = collection(db, "chats");
    const q = query(docRef, where("vendorId", "==", auth.currentUser.uid));
    onSnapshot(q, (categories) =>
      setData(
        categories.docs.map((category) => ({
          id: category.id,
          data: category.data(),
        }))
      )
    );
  }, []);
  // const images = [
  //   {
  //     url: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/sample_img.png",
  //   },
  //   {
  //     url: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png",
  //   },
  // ];
  return (
    <ScrollView>
      {data.map((item, key) => (
        <View>
          <Chatting
            C_id={item.data.customerId}
            ChatId={item.id}
            type={"Vendor"}
          />
          {/* <Text>
          {item.id}

          </Text> */}
        </View>
      ))}
      <View>
      <Text >
        {/* {console.log(item.id)} */}
      </Text>
        {/* <ImageViewer
       
          imageUrls = { [  

            {
      url: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/sample_img.png",
    }
           
            ] }
          // refs={"https://facebook.github.io/react/img/logo_og.png"}
          // imageUrl={'https://facebook.github.io/react/img/logo_og.png'
            
          // }
          // imageUrls={}
          renderIndicator={() => null}
          style={{
            height: 250,
            width: 250,
          }}
        /> */}
        
      </View>
    </ScrollView>
  );
};

export default VendorChatScreen;

const styles = StyleSheet.create({});
