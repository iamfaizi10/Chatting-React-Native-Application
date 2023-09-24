import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useState, useLayoutEffect } from "react";
import { auth, db } from "./firebase/FirebaseConfig";
import { signOut } from "firebase/auth";
import Services from "./src/components/Services";
import BottomBar from "./src/components/BottomBar";
import {
  collection,
  query,
  onSnapshot,
  docs,
  where,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";

const Home = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("null");
  const [picture, setPicture] = useState("null");
  useLayoutEffect(() => {
    const readData = async () => {
      const docRef = doc(db, "User", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setName(docSnap.data().name);

        setPicture(docSnap.data().picture);
      }
    };
    readData();
  }, [navigation, name, picture]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "fiver",
      headerTintColor: "#0ff",
      headerTitleAlign: "center",

      headerRight: () => (
        <TouchableOpacity
          style={{
            margin: 10,
          }}
          onPress={() => logout()}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXjz4OvxiE6w9Bdg82-p7Jn6MxZd236jndbw&usqp=CAU",
              }}
              style={{
                width: 25,
                height: 25,
              }}
            />
            <Text>Log out</Text>
          </View>
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{
            margin: 10,
            marginRight: 50,
          }}
          onPress={() => navigation.navigate("CustomerProfile")}
        >
          <View>
            {picture === "null" && (
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Image
                  source={{
                    uri: "https://www.pngmart.com/files/21/Admin-Profile-PNG-Isolated-Pic.png",
                  }}
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 30,
                  }}
                />
                <Text>{name}</Text>
              </View>
            )}
            {picture !== "null" && (
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Image
                  source={{
                    uri: picture,
                  }}
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 30,
                  }}
                />
                <Text>{name}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const logout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("LoginScreen");
        alert("Logout Successfully");
      })
      .catch((error) => {
        alert(error.Message);
      });
  };
  useLayoutEffect(() => {
    const citiesRef = collection(db, "User");

    // Create a query against the collection.
    const q = query(citiesRef, where("type", "==", "Vendor"));
    onSnapshot(q, (categories) =>
      setData(
        categories.docs.map((category) => ({
          id: category.id,
          data: category.data(),
        }))
      )
    );
  }, [navigation]);
  return (
    <SafeAreaView
      style={{
        height: "100%",
        flex: 1,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          height: "91%",
        }}
      >
        {/* <View
      style={{
        alignItems:'center',
        margin:10,
      }}
      >
      <TouchableOpacity style={{
        backgroundColor:'red',
        height:45,
        width:'70%',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:15,
      }}
      
      onPress={()=>navigation.navigate("Orders")}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 15,
          }}
        >
          My Orders
        </Text>
      </TouchableOpacity>
      </View> */}

        <Services type="customer" />

        <Text
          style={{
            marginHorizontal: 20,
            fontSize: 20,
            fontWeight: "bold",
            marginTop: 5,
          }}
        >
          All Vendor
        </Text>

        {data.map((item, key) => (
          <View
            style={{
              backgroundColor: "white",
              padding: 10,
              borderRadius: 30,
              margin: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Image
              source={{
                uri: item.data.picture,
              }}
              style={{
                height: 100,
                width: 100,
                borderRadius: 50,

                resizeMode: "contain",
              }}
            />

            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
              }}
            >
              {item.data.name}
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ViewVenderCategory", {
                  id: item.id,
                })
              }
            >
              <Text
                style={{
                  backgroundColor: "green",
                  height: 35,
                  width: 70,
                  textAlign: "center",
                  borderRadius: 15,
                  color: "white",
                  fontSize: 15,
                  textAlignVertical: "center",
                }}
              >
                View
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <View
        style={{
          height: "9%",
          position: "relative",
          bottom: 0,
        }}
      >
        <BottomBar type="customer" />
      </View>
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({});
