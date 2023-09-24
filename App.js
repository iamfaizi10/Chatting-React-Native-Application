import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./Home";
import AddCategory from "./src/screens/Admin/AddCategory";
import AdminDashboard from "./src/screens/Admin/AdminDashboard";
import ChatScreen from "./src/screens/Customer/ChatScreen";
import ChatsScreen from "./src/screens/Customer/ChatsScreen";
import CustomerProfile from "./src/screens/Customer/CustomerProfile";
import CustomerSingleOrder from "./src/screens/Customer/CustomerSingleOrder";
import Orders from "./src/screens/Customer/Orders";
import Picture from "./src/screens/Customer/Picture";
import SingleVendor from "./src/screens/Customer/SingleVendor";
import ViewVenderCategory from "./src/screens/Customer/ViewVenderCategory";
import ViewVenderServices from "./src/screens/Customer/ViewVenderServices";
import LoginScreen from "./src/screens/LoginScreen";
import Call from "./src/screens/Vednor/Call";
import CallScreen from "./src/screens/Vednor/CallScreen";
import EditService from "./src/screens/Vednor/EditService";
import ForMultipleFiles from "./src/screens/Vednor/ForMultipleFiles";
import MyOrders from "./src/screens/Vednor/MyOrders";
import NofiScreen from "./src/screens/Vednor/NofiScreen";
import SingleOrder from "./src/screens/Vednor/SingleOrder";
import VenderProfile from "./src/screens/Vednor/VenderProfile";
import VendorChatScreen from "./src/screens/Vednor/VendorChatScreen";
import VendorHome from "./src/screens/Vednor/VendorHome";
import VideoPicker from "./src/screens/Vednor/VideoPicker";

import VideosPlayerScreen from "./src/screens/Vednor/VideosPlayerScreen";

import VideoWatay from "./src/screens/Vednor/VideoWatay";
import ViewServices from "./src/screens/Vednor/ViewServices";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ header: () => null }}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Orders" component={Orders} />
        <Stack.Screen
          name="CustomerSingleOrder"
          component={CustomerSingleOrder}
        />
        <Stack.Screen
          name="ViewVenderCategory"
          component={ViewVenderCategory}
        />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="CustomerProfile" component={CustomerProfile} />
        <Stack.Screen name="ChatsScreen" component={ChatsScreen} />
        <Stack.Screen name="Picture" component={Picture} />

        {/* Admin Side */}
        <Stack.Screen name="Admindashboard" component={AdminDashboard} />
        <Stack.Screen name="AddCategory" component={AddCategory} />
        {/* Vendor Side */}
        <Stack.Screen name="VendorHome" component={VendorHome} />
        <Stack.Screen name="ViewServices" component={ViewServices} />
        <Stack.Screen name="EditService" component={EditService} />
        <Stack.Screen
          name="ViewVenderServices"
          component={ViewVenderServices}
        />
        <Stack.Screen name="SingleVendor" component={SingleVendor} />
        <Stack.Screen name="VenderProfile" component={VenderProfile} />
        <Stack.Screen name="MyOrders" component={MyOrders} />
        <Stack.Screen name="SingleOrder" component={SingleOrder} />
        <Stack.Screen name="VendorChatScreen" component={VendorChatScreen} />
        <Stack.Screen
          name="NofiScreen"
          component={NofiScreen}
          options={{ header: () => null }}
        />
        <Stack.Screen name="VideoWatay" component={VideoWatay} />
        <Stack.Screen name="VideoPicker" component={VideoPicker} />
        <Stack.Screen name="CallScreen" component={CallScreen} />
        <Stack.Screen name="Call" component={Call} />
        <Stack.Screen
          name="VideosPlayerScreen"
          component={VideosPlayerScreen}
        />

        {/* <Stack.Screen name="ForMultipleFiles" component={ForMultipleFiles} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
