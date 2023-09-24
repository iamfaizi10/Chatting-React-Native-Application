import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState, useLayoutEffect, useEffect } from "react";
import { TextInput } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  onSnapshot,
  orderBy,
  getDoc,
  updateDoc,
  query,
  docs,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db, storage } from "../../../firebase/FirebaseConfig";
import { ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import ImageView from "react-native-image-view";
import { async } from "@firebase/util";
const ChatScreen = ({ navigation, route }) => {
  const [P_picture, setP_picture] = useState(route.params.picture);
  const [picture1, setPicture1] = useState(null);
  const [name, setName] = useState(route.params.name);
  const [del, setDelete] = useState(true);
  const [D_id, setD_id] = useState(null);
  // alert(route.params.id);
  const ForDel = (id) => {
    setDelete(false);
    alert(id);
    setD_id(id);
  };

  const Goback = () => {
    setDelete(true);
  };
  const DeleteMassage = async () => {
    const ref = doc(db, "chats", route.params.id);

    await deleteDoc(doc(ref, "messages", D_id));
    setDelete(true);
  };
  const DeleteForMe = async () => {
    const ref = doc(db, "chats", route.params.id);

    // await deleteDoc(doc(ref, "messages",D_id ))
    await updateDoc(doc(ref, "messages", D_id), {
      DeleteforMe:auth.currentUser.uid
    });
  };
  useEffect(() => {
    const readService = async () => {
      const ref = doc(db, "User", auth.currentUser.uid);

      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        setPicture1(docSnap.data().picture);
      }
    };
    readService();
  }, [picture1]);
  const [message, setMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [imgUrl, setImgUrl] = useState(null);
  const [picture, setPicture] = useState(null);
  const sendMessage = async () => {
    if (picture == null && message != null) {
      const ref = doc(db, "chats", route.params.id);
      const docRef = await addDoc(collection(ref, "messages"), {
        senderId: auth.currentUser.uid,
        chatId: route.params.id,
        message: message,
        timestamp: serverTimestamp(),
        DeleteforMe:null,

      });
      setMessage(null);
    }
    if (picture != null) {
      const ref = doc(db, "chats", route.params.id);
      const docRef = await addDoc(collection(ref, "messages"), {
        senderId: auth.currentUser.uid,
        chatId: route.params.id,
        message: null,
        picture: picture,
        timestamp: serverTimestamp(),
      });
      setPicture(null);
    }
  };
  useLayoutEffect(() => {
    const ref = doc(db, "chats", route.params.id);
    const ref1 = collection(ref, "messages");
    const q = query(ref1, orderBy("timestamp", "asc"));
    onSnapshot(q, (categories) =>
      setMessages(
        categories.docs.map((category) => ({
          id: category.id,
          data: category.data(),
        }))
      )
    );
  }, []);
  useLayoutEffect(() => {
    const uploadImage = async () => {
      // 1- set metadata
      const metadata = {
        contentType: "image/jpeg",
      };

      // convert image into blob
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", imgUrl, true);
        xhr.send(null);
      });

      // upload img on storage

      const storageRef = ref(storage, "Messages/" + Date.now());

      const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setPicture(downloadURL);

            setImgUrl(null);
          });
        }
      );
    };
    if (imgUrl != null) {
      uploadImage();
      setImgUrl(null);
    }
  }, [imgUrl, picture]);

  const PickImg = async () => {
    {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.cancelled) {
        setImgUrl(result.uri);
      }
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: name,
      headerTitleAlign: "center",
      headerTintColor: "#0ff",
      // headerRight: () => (
      //   <TouchableOpacity
      //     style={{
      //       margin: 10,
      //     }}

      //   >
      //     <View>
      //       <Image
      //         source={{
      //           uri:
      //         }}
      //         style={{
      //           width: 25,
      //           height: 25,
      //         }}
      //       />
      //     </View>
      //   </TouchableOpacity>
      // ),
      headerLeft: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {route.params.type === "Vendor" && (
            <TouchableOpacity
              style={{
                marginLeft: 10,
              }}
              onPress={() => navigation.navigate("VendorChatScreen")}
            >
              <Image
                source={{
                  uri: "https://icon2.cleanpng.com/20180425/fue/kisspng-computer-icons-button-5ae031e2bf0904.7825510515246422747825.jpg",
                }}
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 30,
                }}
              />
            </TouchableOpacity>
          )}
          {route.params.type === "Customer" && (
            <TouchableOpacity
              style={{
                marginLeft: 10,
              }}
              onPress={() => navigation.navigate("SingleVendor")}
            >
              <Image
                source={{
                  uri: "https://icon2.cleanpng.com/20180425/fue/kisspng-computer-icons-button-5ae031e2bf0904.7825510515246422747825.jpg",
                }}
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 30,
                }}
              />
            </TouchableOpacity>
          )}
          {route.params.type === "Cus1" && (
            <TouchableOpacity
              style={{
                marginLeft: 10,
              }}
              onPress={() => navigation.navigate("ChatsScreen")}
            >
              <Image
                source={{
                  uri: "https://icon2.cleanpng.com/20180425/fue/kisspng-computer-icons-button-5ae031e2bf0904.7825510515246422747825.jpg",
                }}
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 30,
                }}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{
              marginLeft: 10,
            }}
          >
            <View>
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Image
                  source={{
                    uri: P_picture,
                  }}
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 30,
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, picture, name]);
  return (
    <View
      style={{
        height: "100%",
        backgroundColor: "#075E54",
      }}
    >
      <View
        style={{
          height: "90%",
        }}
      >
        {del === false && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <TouchableOpacity
              onPress={Goback}
              style={{
                backgroundColor: "red",
                width: "30%",
                height: 45,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 15,
              }}
            >
              <Text>for Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "red",
                width: "30%",
                height: 45,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 15,
              }}
              onPress={() => DeleteMassage()}
            >
              <Text>for delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "red",
                width: "30%",
                height: 45,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 15,
              }}
              onPress={() => DeleteForMe()}
            >
              <Text>Delete for me</Text>
            </TouchableOpacity>
          </View>
        )}

        <ScrollView>
          {messages.map((item, key) => (
            <View
              key={key}
              style={{
                // backgroundColor:'white',
                // height:38,
                // width:'80%',
                justifyContent: "center",
                // alignSelf:'flex-end',
                // marginLeft:30,
                borderRadius: 10,
                // padding:10,
                // marginTop:5,
                //  flexDirection:"row"
              }}
            >
              {item.data.message !== null && (
                <View>
                  {item.data.senderId === auth.currentUser.uid && (
                    <View
                      style={{
                        alignSelf: "flex-end",
                        justifyContent: "center",
                        flexDirection: "row",
                        alignItems: "center",
                        marginLeft: 30,
                        marginRight: 5,
                      }}
                    >
                      <View
                        style={{
                          alignSelf: "flex-end",
                          justifyContent: "center",
                          marginLeft: 30,
                          marginRight: 5,
                          borderRadius: 10,
                          backgroundColor: "white",
                          padding: 10,
                          marginTop: 5,
                          // flexDirection:'row'
                        }}
                      >
                    
                        <TouchableOpacity onLongPress={() => ForDel(item.id)}>
                          <Text>{item.data.message}</Text>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          // backgroundColor:'none',
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          source={{
                            uri: picture1,
                          }}
                          style={{
                            height: 30,
                            width: 30,
                            borderRadius: 15,
                            resizeMode: "contain",
                          }}
                        />
                      </View>
                    </View>
                  )}
                  {item.data.senderId !== auth.currentUser.uid && (
                    <View
                      style={{
                        alignSelf: "flex-start",
                        justifyContent: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                        marginLeft: 5,
                        marginRight: 30,
                      }}
                    >
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          source={{
                            uri: P_picture,
                          }}
                          style={{
                            height: 30,
                            width: 30,
                            borderRadius: 15,
                            resizeMode: "contain",
                          }}
                        />
                      </View>
                      <View
                        style={{
                          alignSelf: "flex-start",
                          justifyContent: "center",
                          marginLeft: 5,
                          marginRight: 30,
                          borderRadius: 10,
                          backgroundColor: "white",
                          padding: 10,
                          marginTop: 5,
                        }}
                      >
                      
                        <TouchableOpacity>
                          <Text>{item.data.message}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              )}
              {item.data.message === null && (
                <View>
                  {item.data.senderId === auth.currentUser.uid && (
                    <View
                      style={{
                        marginLeft: 30,
                        marginRight: 5,
                        alignSelf: "flex-end",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{
                          alignSelf: "flex-end",
                          justifyContent: "center",
                          marginLeft: 30,
                          marginRight: 5,
                          borderRadius: 10,
                          backgroundColor: "white",
                          padding: 4,
                          marginTop: 5,
                        }}
                      >
                        <TouchableOpacity onLongPress={() => ForDel(item.id)}>
                          <Image
                            source={{
                              uri: item.data.picture,
                            }}
                            style={{
                              height: 200,
                              width: 200,
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          // backgroundColor:'none',
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          source={{
                            uri: picture1,
                          }}
                          style={{
                            height: 30,
                            width: 30,
                            borderRadius: 15,
                            resizeMode: "contain",
                          }}
                        />
                      </View>
                    </View>
                  )}
                  {item.data.senderId !== auth.currentUser.uid && (
                    <View
                      style={{
                        alignSelf: "flex-start",
                        justifyContent: "center",
                        marginLeft: 5,
                        marginRight: 30,
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          source={{
                            uri: P_picture,
                          }}
                          style={{
                            height: 30,
                            width: 30,
                            borderRadius: 15,
                            resizeMode: "contain",
                          }}
                        />
                      </View>
                      <View
                        style={{
                          alignSelf: "flex-start",
                          justifyContent: "center",
                          marginLeft: 5,
                          marginRight: 30,
                          borderRadius: 10,
                          backgroundColor: "white",
                          padding: 4,
                          marginTop: 5,
                        }}
                      >
                        <TouchableOpacity
                        // onPress={() =>
                        //   navigation.navigate("Picture", {
                        //     pic: item.data.picture,
                        //     routePrevious: "ChatScreen",
                        //     id: route.params.id,
                        //   })
                        // }
                        // onLongPress={()=>ForDel(item.id)}
                        >
                          <Image
                            source={{
                              uri: item.data.picture,
                            }}
                            style={{
                              height: 200,
                              width: 200,
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
                /* <Image 

                    source={{
                      uri:item.data.picture
                    }}
                    style={{
                      height:200,
                      width:200,
                    }}
                  /> */
              )}
            </View>
          ))}
        </ScrollView>
      </View>
      {/* typing area */}
      <View
        style={{
          height: "9%",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginHorizontal: 10,
        }}
      >
        <TextInput
          style={{
            width: "70%",
            height: 42,
          }}
          value={message}
          mode={"outlined"}
          onChangeText={(text) => setMessage(text)}
        />
        <TouchableOpacity onPress={() => sendMessage()}>
          <Image
            source={{
              uri: "https://banner2.cleanpng.com/20180404/lve/kisspng-computer-icons-button-send-email-button-5ac4bc894e39e9.6238548615228427613204.jpg",
            }}
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={PickImg}>
          <Image
            source={{
              uri: "https://www.kindpng.com/picc/m/244-2446073_icons8-flat-gallery-icon-logo-gallery-png-transparent.png",
            }}
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
