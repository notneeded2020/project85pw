import * as React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import firebase from "firebase";

export default class Loading extends React.Component{

    componentDidMount(){
       this.checkIfLoggedIn()
    }

    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate('DashboardScreen')
            } else {
                this.props.navigation.navigate('LoginScren')
            }
        })
    }

    render(){
        return(
            <View style={{flex:1,justifyContent:"center", alignItems:"center"}}>
                <ActivityIndicator size="large"/>
            </View>
        )
    }
}