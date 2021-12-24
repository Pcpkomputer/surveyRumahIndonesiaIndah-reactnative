import { StatusBar } from 'expo-status-bar';
import React,{useState, useRef} from 'react';
import { StyleSheet, Text, View,Dimensions, Pressable,ScrollView, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { StatusBarHeight } from '../utils/heightUtils';

import { Entypo, MaterialCommunityIcons, Feather } from '@expo/vector-icons'; 

import LandingSVG from '../svg/LandingSVG';
import SurveySVG from '../svg/SurveySVG';
import SavedSVG from '../svg/SavedSVG';
import HistorySVG from '../svg/HistorySVG';

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

export default function DashboardScreen(props) {
  return (
    <View style={{flex:1,backgroundColor:"#f0f5fb"}}>
        <View style={{height:StatusBarHeight}}></View>
        <View style={{justifyContent:"flex-end",height:EStyleSheet.value("130rem")}}>
            <View style={{flexDirection:"row",paddingHorizontal:EStyleSheet.value("25rem"),justifyContent:"space-between",alignItems:"center",paddingVertical:EStyleSheet.value("20rem")}}>
                <View>
                    <Entypo name="chevron-left" size={EStyleSheet.value("23rem")} color="#26313b" />
                </View>
                <View style={{flexDirection:"row"}}>
                    <View style={{width:EStyleSheet.value("50rem"),marginRight:EStyleSheet.value("10rem"),justifyContent:"center",alignItems:"center",height:EStyleSheet.value("50rem"),borderRadius:999,backgroundColor:"white"}}>
                        <MaterialCommunityIcons name="account-details" size={24} color="black" />
                    </View>
                    <View style={{width:EStyleSheet.value("50rem"),justifyContent:"center",alignItems:"center",height:EStyleSheet.value("50rem"),borderRadius:999,backgroundColor:"white"}}>
                        <Feather name="menu" size={24} color="black" />
                    </View>
                </View>
            </View>
        </View>
        <View style={{flexDirection:"row",alignItems:"center",paddingHorizontal:EStyleSheet.value("25rem"),height:EStyleSheet.value("90rem")}}>
             <View style={{backgroundColor:"white",marginRight:EStyleSheet.value("18rem"),borderRadius:999,width:EStyleSheet.value("55rem"),height:EStyleSheet.value("55rem")}}>
             </View>
             <View>
                 <Text style={{fontSize:EStyleSheet.value("20rem"),fontFamily:"NunitoBold"}}>Padang Perwira Yudha</Text>
             </View>
        </View>
        <View style={{flex:1,backgroundColor:"#0cca88",borderTopLeftRadius:EStyleSheet.value("30rem"),borderTopRightRadius:EStyleSheet.value("30rem"),marginTop:EStyleSheet.value("10rem")}}>
            <View style={{height:EStyleSheet.value("130rem"),paddingVertical:EStyleSheet.value("30rem")}}>
                <View style={{paddingHorizontal:EStyleSheet.value("20rem")}}>
                    <View style={{width:"100%",backgroundColor:"#31bb8b",borderRadius:EStyleSheet.value("10rem"),padding:EStyleSheet.value("15rem")}}>
                        <Text style={{color:"white",fontSize:EStyleSheet.value("30rem"),fontFamily:"NunitoBold"}}>320</Text>
                        <Text style={{color:"white",fontSize:EStyleSheet.value("13rem"),marginTop:EStyleSheet.value("3rem")}}>Total pencapaian survey</Text>
                    </View>
                </View>
            </View>
            <View style={{flex:1,backgroundColor:"white",borderTopRightRadius:EStyleSheet.value("30rem"),borderTopLeftRadius:EStyleSheet.value("30rem"),marginTop:EStyleSheet.value("15rem")}}>
                    <ScrollView>
                    <View style={{marginTop:EStyleSheet.value("30rem"),marginBottom:EStyleSheet.value("15rem"),flexDirection:"row",paddingHorizontal:EStyleSheet.value("20rem")}}>
                        <TouchableOpacity 
                        activeOpacity={0.8}
                        onPress={()=>{
                            props.navigation.navigate("Survey");
                        }}
                        style={{backgroundColor:"white",paddingVertical:EStyleSheet.value("20rem"),borderRadius:EStyleSheet.value("5rem"),borderColor:"#cad8ec",justifyContent:"center",alignItems:"center",borderWidth:1,flex:1,marginRight:EStyleSheet.value("15rem")}}>
                            <SurveySVG
                            width={EStyleSheet.value("80rem")}
                            height={EStyleSheet.value("80rem")}
                            />
                            <Text style={{fontFamily:"NunitoBold",marginTop:EStyleSheet.value("10rem"),color:"#47515b",fontSize:EStyleSheet.value("15rem")}}>Survey</Text>
                        </TouchableOpacity>
                        <View style={{backgroundColor:"white",paddingVertical:EStyleSheet.value("20rem"),borderRadius:EStyleSheet.value("5rem"),borderColor:"#cad8ec",justifyContent:"center",alignItems:"center",borderWidth:1,flex:1}}>
                           
                             <HistorySVG
                            width={EStyleSheet.value("80rem")}
                            height={EStyleSheet.value("80rem")}
                            />
                            <Text style={{fontFamily:"NunitoBold",marginTop:EStyleSheet.value("10rem"),color:"#47515b",fontSize:EStyleSheet.value("15rem")}}>Riwayat Survey</Text>
                        </View>
                    </View>
                    <View style={{marginBottom:EStyleSheet.value("15rem"),flexDirection:"row",paddingHorizontal:EStyleSheet.value("20rem")}}>
                        <View style={{backgroundColor:"white",paddingVertical:EStyleSheet.value("20rem"),borderRadius:EStyleSheet.value("5rem"),borderColor:"#cad8ec",justifyContent:"center",alignItems:"center",borderWidth:1,flex:1,marginRight:EStyleSheet.value("15rem")}}>
                            <SavedSVG
                            width={EStyleSheet.value("80rem")}
                            height={EStyleSheet.value("80rem")}
                            />
                            <Text style={{fontFamily:"NunitoBold",marginTop:EStyleSheet.value("10rem"),color:"#47515b",fontSize:EStyleSheet.value("15rem")}}>Survey Tersimpan</Text>
                        </View>
                        <View style={{backgroundColor:"white",opacity:0,paddingVertical:EStyleSheet.value("20rem"),borderRadius:EStyleSheet.value("5rem"),borderColor:"#cad8ec",justifyContent:"center",alignItems:"center",borderWidth:1,flex:1}}>
                            <Text style={{fontFamily:"NunitoBold",color:"#47515b",fontSize:EStyleSheet.value("15rem")}}>Survey</Text>
                        </View>
                    </View>
                    </ScrollView>
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
