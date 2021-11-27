import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import Loading from "./screens/loading"
import Login from "./screens/login"
import Dashboard from "./screens/dashboard"

import * as firebase from "firebase"
import {firebaseConfig} from "./config"

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app()
}

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen:Loading,
  LoginScreen:Login,
  DashboardScreen:Dashboard
})

const AppNavigator = createAppContainer(AppSwitchNavigator)

export default class App extends React.Component {
  render(){
  return (
    <AppNavigator/>
  );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
