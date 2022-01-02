import { StatusBar } from 'expo-status-bar';
import React,{useState, useRef} from 'react';
import { StyleSheet, Text, View,Dimensions, Pressable,ScrollView, TouchableOpacity, ToastAndroid } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { StatusBarHeight } from '../utils/heightUtils';

import { Entypo, MaterialCommunityIcons, Feather } from '@expo/vector-icons'; 

import LandingSVG from '../svg/LandingSVG';
import SurveySVG from '../svg/SurveySVG';
import SavedSVG from '../svg/SavedSVG';
import HistorySVG from '../svg/HistorySVG';
import { FlatList } from 'react-native-gesture-handler';

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

export default function WaitingListSurveyLanjutanScreen(props) {
  return (
    <View style={{flex:1,backgroundColor:"#f0f5fb"}}>
        <View style={{height:StatusBarHeight}}></View>
        <View style={{backgroundColor:"#0cca88",flexDirection:"row",paddingHorizontal:EStyleSheet.value("15rem"),height:EStyleSheet.value("50rem")}}>
            <View style={{justifyContent:"center",alignItems:"center"}}>
                <Entypo name="chevron-left" size={24} color="white" />
            </View>
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <Text style={{color:"white",fontFamily:"NunitoBold"}}>Waiting List Survey Lanjutan</Text>
            </View>
            <View style={{justifyContent:"center",opacity:0,alignItems:"center"}}>
                <Text>123</Text>
            </View>
        </View>
        <View style={{flex:1}}>
             <FlatList
             keyExtractor={(item,index)=>`riwayat-${index}`}
             contentContainerStyle={{paddingTop:EStyleSheet.value("20rem")}}
             data={[1,2]}
             renderItem={({item,index})=>{
                 if(index===0){
                    return (
                        <TouchableOpacity 
                        activeOpacity={0.8}
                        onPress={()=>{
                            //props.navigation.navigate("SurveyAwal",{draft:true});
                            ToastAndroid.show("Survey masih belum di-acc",500);
                        }}
                        style={{backgroundColor:"white",padding:EStyleSheet.value("20rem"),paddingHorizontal:EStyleSheet.value("15rem"),borderRadius:EStyleSheet.value("5rem"),...shadow,marginHorizontal:EStyleSheet.value("15rem"),marginBottom:EStyleSheet.value("15rem")}}>
                            <View style={{marginBottom:EStyleSheet.value("10rem"),flexDirection:"row",alignItems:"center",borderRadius:EStyleSheet.value("5rem")}}>
                               <View style={{backgroundColor:"#FF5959",borderRadius:EStyleSheet.value("5rem"),paddingHorizontal:EStyleSheet.value("20rem"),paddingVertical:EStyleSheet.value("5rem")}}>
                                   <Text style={{color:"white"}}>Belum Di-ACC</Text>
                               </View>
                            </View>
                            <Text style={{fontFamily:"NunitoBold",fontSize:EStyleSheet.value("18rem")}}>SRV-12032021-1156432</Text>
                            <View style={{marginTop:EStyleSheet.value("10rem"),flexDirection:"row",justifyContent:"space-between"}}>
                                <View style={{flexDirection:"row",alignItems:"center"}}>
                                   <Entypo name="back-in-time" size={EStyleSheet.value("20rem")} color="black" />
                                   <Text style={{marginLeft:EStyleSheet.value("5rem")}}>16 Desember 2021</Text>
                                </View>
                                <View style={{width:EStyleSheet.value("30rem"),backgroundColor:"whitesmoke",borderRadius:999,height:EStyleSheet.value("30rem")}}>
                                </View>
                            </View>
                       </TouchableOpacity>
                    )
                 }
                 else{
                    return (
                        <TouchableOpacity 
                        activeOpacity={0.8}
                        onPress={()=>{
                            props.navigation.navigate("SurveyLanjutan");
                        }}
                        style={{backgroundColor:"white",padding:EStyleSheet.value("20rem"),paddingHorizontal:EStyleSheet.value("15rem"),borderRadius:EStyleSheet.value("5rem"),...shadow,marginHorizontal:EStyleSheet.value("15rem"),marginBottom:EStyleSheet.value("15rem")}}>
                            <View style={{marginBottom:EStyleSheet.value("10rem"),flexDirection:"row",alignItems:"center",borderRadius:EStyleSheet.value("5rem")}}>
                               <View style={{backgroundColor:"#0cca88",borderRadius:EStyleSheet.value("5rem"),paddingHorizontal:EStyleSheet.value("20rem"),paddingVertical:EStyleSheet.value("5rem")}}>
                                   <Text style={{color:"white"}}>Sudah Di-ACC</Text>
                               </View>
                            </View>
                            <Text style={{fontFamily:"NunitoBold",fontSize:EStyleSheet.value("18rem")}}>SRV-12032021-1156432</Text>
                            <View style={{marginTop:EStyleSheet.value("10rem"),flexDirection:"row",justifyContent:"space-between"}}>
                                <View style={{flexDirection:"row",alignItems:"center"}}>
                                   <Entypo name="back-in-time" size={EStyleSheet.value("20rem")} color="black" />
                                   <Text style={{marginLeft:EStyleSheet.value("5rem")}}>16 Desember 2021</Text>
                                </View>
                                <View style={{width:EStyleSheet.value("30rem"),backgroundColor:"whitesmoke",borderRadius:999,height:EStyleSheet.value("30rem")}}>
                                </View>
                            </View>
                       </TouchableOpacity>
                    )
                 }
               
             }}
             />
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
