import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import { TextInput } from "react-native-paper";
  // import * as ImagePicker from "expo-image-picker";
  import React, { useState, useLayoutEffect } from "react";
import Profile from "../../components/Profile";
//   import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
//   import {
//     addDoc,collection,serverTimestamp,getDoc,doc,updateDoc,setDoc,onSnapshot
//   } from "firebase/firestore";
//   import { auth, db, storage } from "../../../firebase/FirebaseConfig";
// import { async } from "@firebase/util";
  const VenderProfile = ({ navigation, route }) => {
    //Header
    // const [imgUrl, setImgUrl] = useState(null);
    // const [dbImage, setDbImage] = useState(null);
    // const [showPic, setShowPic] = useState(null);
    // const [name, setName] = useState(null);
    // const [type, setType] = useState(null);
    // const [email, setEmail] = useState(null);
    
    // useLayoutEffect(() => {
    //    const readData=async()=>{
    //     const docRef = doc(db, "User", auth.currentUser.uid);
    //     const docSnap = await getDoc(docRef);
        
    //     if (docSnap.exists()) {
    //         setType(docSnap.data().type);
    //         setName(docSnap.data().name);
    //         setEmail(docSnap.data().email);
    //         setShowPic(docSnap.data().picture);
            
    //     }
    //    }
    //    readData();
    //   }, []);
    
    
  
    // useLayoutEffect(() => {
    //   const uploadImage = async () => {
    //     // 1- set metadata
    //     const metadata = {
    //       contentType: "image/jpeg",
    //     };
  
    //     // convert image into blob
    //     const blob = await new Promise((resolve, reject) => {
    //       const xhr = new XMLHttpRequest();
    //       xhr.onload = function () {
    //         resolve(xhr.response);
    //       };
    //       xhr.onerror = function () {
    //         reject(new TypeError("Network request failed"));
    //       };
    //       xhr.responseType = "blob";
    //       xhr.open("GET", imgUrl, true);
    //       xhr.send(null);
    //     });
  
    //     // upload img on storage
  
    //     const storageRef = ref(storage, "Profiles/" + Date.now());
  
    //     const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
    //     uploadTask.on(
    //       "state_changed",
    //       (snapshot) => {
    //         // Observe state change events such as progress, pause, and resume
    //         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //         const progress =
    //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //         console.log("Upload is " + progress + "% done");
    //         switch (snapshot.state) {
    //           case "paused":
    //             console.log("Upload is paused");
    //             break;
    //           case "running":
    //             console.log("Upload is running");
    //             break;
    //         }
    //       },
    //       (error) => {
    //         // Handle unsuccessful uploads
    //       },
    //       () => {
    //         // Handle successful uploads on complete
    //         // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //           console.log("File available at", downloadURL);
    //           setDbImage(downloadURL);
    //           setShowPic(downloadURL);
    //           setImgUrl(null);
    //         });
    //       }
    //     );
    //   };
    //   if (imgUrl != null) {
    //     uploadImage();
    //     setImgUrl(null);
    //   }
      
    // }, [imgUrl, dbImage]);
  
    // const PickImg = async () => {
    //   {
    //     // No permissions request is necessary for launching the image library
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //       mediaTypes: ImagePicker.MediaTypeOptions.All,
    //       allowsEditing: true,
    //       aspect: [4, 3],
    //       quality: 1,
    //     });
  
    //     console.log(result);
  
    //     if (!result.cancelled) {
    //       setImgUrl(result.uri);
    //     }
    //   }
    // };
  
    // const saveData = async () => {
    //     const washingtonRef = doc(db, "User", auth.currentUser.uid);

    //     // Set the "capital" field of the city 'DC'
    //     await updateDoc(washingtonRef, {
    //       name:name,
    //       type:type,
    //       email:email,
    //       picture:showPic
    //     }).then(()=>{
    //         navigation.navigate("VendorHome")
    //     });
        
    // };
  
    return (
        
      <SafeAreaView
        style={{
          alignContent: "center",
        }}
      >
      <View>
        <Profile type={"Vendor"}/>
      </View>

        
{/* 
        <TouchableOpacity
          style={{
            alignItems: "center",
            margin: 5,
          }}
          onPress={() => PickImg()}
        >
          <Image
            source={{
              uri: showPic,
            }}
            style={{
              height: 250,
              width: 250,
              backgroundColor: "grey",
              borderRadius: 10,
            }}
          />
  
          <Text
            style={{
              position: "absolute",
              top: 100,
              fontSize: 30,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Add Photo
          </Text>
        </TouchableOpacity>
      
        <TextInput
          value={name}
          activeUnderlineColor="black"
          mode="outlined"
          label={"Enter name"}
          onChangeText={(text) => setName(text)}
        />

     
        <View
          style={{
            alignItems: "center",
          }}
        >
          
            <TouchableOpacity
              style={{
                backgroundColor: "#fb5b5a",
                height: 60,
                width: 150,
                margin: 10,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
              onPress={() => saveData()}
            >
              <Text
                style={{
                  justifyContent: "center",
                  fontSize: 15,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Save Data
              </Text>
            </TouchableOpacity>
        
      
        </View> */}
        
      </SafeAreaView>
       
    );
  };
  
  export default VenderProfile;
  const styles = StyleSheet.create({});
  