import * as React from 'react';
import { Text, View, Button } from 'react-native';
import * as Google from "expo-google-app-auth";
import firebase from "firebase";

export default class Login extends React.Component{
    
    signInWithGoogleAsync = async () => {
        try {
          const result = await Google.logInAsync({
            behaviour: "web",
            androidClientId:
              "671586185879-eikgl4snj446qkvck68k92hsfq1o3dab.apps.googleusercontent.com",
            iosClientId:
              "72696421845-osrvc36bjie4264j4c0812sp5a2egqhj.apps.googleusercontent.com",
            scopes: ["profile", "email"]
          });
    
          if (result.type === "success") {
            this.onSignIn(result);
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          console.log(e.message);
          return { error: true };
        }
      };

      isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
          var providerData = firebaseUser.providerData;
          for (var i = 0; i < providerData.length; i++) {
            if (
              providerData[i].providerId ===
                firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
              providerData[i].uid === googleUser.getBasicProfile().getId()
            ) {
              return true;
            }
          }
        }
        return false;
      };
    
      onSignIn = googleUser => {
        var unsubscribe = firebase.auth().onAuthStateChanged(firebaseUser => {
          unsubscribe();
          if (!this.isUserEqual(googleUser, firebaseUser)) {
            var credential = firebase.auth.GoogleAuthProvider.credential(
              googleUser.idToken,
              googleUser.accessToken
            );
    
            firebase
              .auth()
              .signInWithCredential(credential)
              .then(function(result) {
                if (result.additionalUserInfo.isNewUser) {
                  firebase
                    .database()
                    .ref("/users/" + result.user.uid)
                    .set({
                      gmail: result.user.email,
                      profile_picture: result.additionalUserInfo.profile.picture,
                      locale: result.additionalUserInfo.profile.locale,
                      first_name: result.additionalUserInfo.profile.given_name,
                      last_name: result.additionalUserInfo.profile.family_name,
                      current_theme: "dark"
                    })
                    .then(function(snapshot) {});
                }
              })
              .catch(error => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
              });
          } else {
            console.log("User already signed-in Firebase.");
          }
        });
      };
    
    
    render(){
        return(
            <View style={{flex:1,justifyContent:"center", alignItems:"center"}}>
                <Button
                  title="Sign in with Google"
                  onPress={() => this.signInWithGoogleAsync()}
                ></Button>
            </View>
        )
    }
}