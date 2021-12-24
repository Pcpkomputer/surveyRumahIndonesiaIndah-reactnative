import { StatusBar } from 'expo-status-bar';
import React,{useState, useRef} from 'react';
import { StyleSheet, Text, View,Dimensions, Pressable } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { StatusBarHeight } from '../utils/heightUtils';

import LandingSVG from '../svg/LandingSVG';

let shadow = {
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
}

export default function LandingScreen(props) {
  return (
    <View style={{flex:1,backgroundColor:"#f0f5fb"}}>
        <View style={{height:StatusBarHeight}}></View>
        <View style={{height:EStyleSheet.value("70rem"),marginTop:EStyleSheet.value("25rem"),paddingHorizontal:EStyleSheet.value("30rem"),flexDirection:"row",alignItems:"center"}}>
            <Text style={{fontSize:EStyleSheet.value("17rem"),color:"#26313b"}}>Halo, Para Surveyor!</Text>
        </View>
        <View style={{paddingHorizontal:EStyleSheet.value("30rem"),flexDirection:"row",alignItems:"center"}}>
            <Text style={{fontSize:EStyleSheet.value("30rem"),lineHeight:EStyleSheet.value("45rem"),color:"#38d49f",fontFamily:"NunitoMedium"}}>Survey Rumah Indonesia Indah</Text>
        </View>
        <View style={{marginTop:EStyleSheet.value("20rem"),flex:1,justifyContent:"center",alignItems:"center"}}>
            <View style={{paddingTop:EStyleSheet.value("150rem")}}>
                <LandingSVG/>
            </View>
        </View>
        <View style={{paddingVertical:EStyleSheet.value("30rem"),justifyContent:"center",alignItems:"center"}}>
            <View style={{backgroundColor:"#38d49f",...shadow,overflow:"hidden",width:Dimensions.get("screen").width-EStyleSheet.value("60rem"),borderRadius:EStyleSheet.value("5rem"),justifyContent:"center",alignItems:"center"}}>
                <Pressable
                android_ripple={{
                    color:"white"
                }}
                onPress={()=>{
                    props.navigation.navigate("Login");
                }}
                style={{width:"100%",paddingVertical:EStyleSheet.value("15rem"),paddingHorizontal:EStyleSheet.value("20rem"),justifyContent:"center",alignItems:"center"}}
                >
                    <Text style={{color:"white"}}>MASUK</Text>
                </Pressable>
            </View>
            <View style={{marginTop:EStyleSheet.value("10rem")}}>
                <Text style={{fontSize:EStyleSheet.value("11rem"),color:"#a2a2a2",opacity:0.5}}>Tentang Survey Rumah Indonesia Indah</Text>
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
