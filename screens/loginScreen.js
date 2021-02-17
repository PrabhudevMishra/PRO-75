import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
  Keyboard,
  Platform,
  Alert
} from "react-native";
import db from "../config";
import firebase from "firebase";

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: "",
      password: "",
    };
  }

  login = async (email, password) => {
    if(email && password){
        try{
            const response = await firebase.auth().signInWithEmailAndPassword(email, password);
            if(response){
                this.props.navigation.navigate('Transaction');
            }
        }
        catch(error){
            switch(error.code){
                case 'auth/user-not-found' : 
                Alert.alert("User doesn't exist.");
                break;
                case 'auth/invalid-email' : 
                Alert.alert("Incorrect Email or password");
                break;
                default : console.log(error);
                break;
            }
        }
    }   
    else{
        Alert.alert("Enter emailID and password.")
    }  
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ marginTop: 20, alignItems: "center" }}
            enabled
          >
            <View>
              <Image
                source={require("../assets/booklogo.jpg")}
                style={{ width: 200, height: 200 }}
              />
              <Text style={{ textAlign: "center", fontSize: 30 }}>Wily</Text>
            </View>
            <View>
              <TextInput
                style={styles.loginBox}
                placeholder="abc@example.com"
                keyboardType="email-address"
                onChangeText={(text) => {
                  this.setState({ emailId: text });
                }}
              />
              <TextInput
                style={styles.loginBox}
                placeholder="enter password"
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({ password: text });
                }}
              />
            </View>
            <View>
              <TouchableOpacity
                style={{
                  height: 30,
                  width: 90,
                  borderWidth: 1,
                  marginTop: 20,
                  paddingTop: 5,
                  borderRadius: 7,
                }}
                onPress={() => {
                  this.login(this.state.emailId, this.state.password);
                }}
              >
                <Text style={{ textAlign: "center" }}>Login</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginBox: {
    width: 300,
    height: 40,
    borderWidth: 1.5,
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
  },
});
