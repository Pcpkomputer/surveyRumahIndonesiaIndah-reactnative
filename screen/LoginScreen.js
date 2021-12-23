import { StatusBar } from 'expo-status-bar';
import React,{useState, useRef} from 'react';
import { StyleSheet, Text, View,Dimensions, Pressable} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { StatusBarHeight } from '../utils/heightUtils';

import LandingSVG from '../svg/LandingSVG';
import { ActivityIndicator, TextInput } from 'react-native-paper';

import { Ionicons , AntDesign, MaterialIcons} from '@expo/vector-icons'; 

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

export default function LoginScreen() {


  let [loginLoading, setLoginLoading] = useState(false);

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  let removeError = ()=>{
    setEmailError({error:false,msg:""});
    setPasswordError({error:false,msg:""});
  }

  let [emailerror, setEmailError] = useState({
    error:false,
    msg:""
  });

  let [passworderror, setPasswordError] = useState({
    error:false,
    msg:""
  })

  return (
    <View style={{flex:1,backgroundColor:"#f0f5fb"}}>
        <View style={{height:StatusBarHeight}}></View>
        <View style={{height:EStyleSheet.value("70rem"),paddingHorizontal:EStyleSheet.value("30rem"),flexDirection:"row",alignItems:"center"}}>
          <AntDesign name="arrowleft" size={24} color="grey" />
        </View>
        <View style={{flex:1,justifyContent:"center",alignItems:"center",paddingBottom:EStyleSheet.value("30rem")}}>
             <View style={{width:"100%",paddingHorizontal:EStyleSheet.value("30rem")}}>
                <Text style={{fontSize:EStyleSheet.value("35rem")}}>Selamat datang!</Text>
             </View>
             <View style={{width:"100%",marginTop:EStyleSheet.value("40rem"),paddingHorizontal:EStyleSheet.value("30rem")}}>
                  <TextInput
                      dense={true}
                      underlineColor={emailerror.error ? "#d43b3b":undefined}
                     activeUnderlineColor={emailerror.error ? "#d43b3b":'#38d49f'}
                      style={{backgroundColor:"white"}}
                      label="Email"
                      value={email}
                      onChangeText={(text)=>{
                        setEmail(text);
                      }}
                    />
                       {
                      emailerror.error &&
                      <View style={{position:"absolute",right:EStyleSheet.value("30rem"),top:EStyleSheet.value("21rem")}}>
                      <MaterialIcons name="dangerous" size={EStyleSheet.value("23rem")} color="#d43b3b" />
                      </View>
                    }
                     {
                      (emailerror.error) &&
                      <View style={{marginTop:EStyleSheet.value("5rem")}}>
                        <Text style={{fontSize:EStyleSheet.value("12rem"),color:"#d43b3b"}}>Ket. : {emailerror.msg}</Text>
                      </View>
                    }
             </View>
             <View style={{width:"100%",marginTop:EStyleSheet.value("10rem"),paddingHorizontal:EStyleSheet.value("30rem")}}>
                  <TextInput
                  dense={true}
                   selectionColor='#38d49f'
                   underlineColor={passworderror.error ? "#d43b3b":undefined}
                   activeUnderlineColor={passworderror.error ? "#d43b3b":'#38d49f'}
                      style={{backgroundColor:"white"}}
                      label="Password"
                      secureTextEntry={true}
                      value={password}
                      onChangeText={(text)=>{
                        setPassword(text);
                      }}
                    />
                    {
                      passworderror.error &&
                      <View style={{position:"absolute",right:EStyleSheet.value("30rem"),top:EStyleSheet.value("21rem")}}>
                      <MaterialIcons name="dangerous" size={EStyleSheet.value("23rem")} color="#d43b3b" />
                      </View>
                    }
                    {
                      (passworderror.error) &&
                      <View style={{marginTop:EStyleSheet.value("5rem")}}>
                        <Text style={{fontSize:EStyleSheet.value("12rem"),color:"#d43b3b"}}>Ket. : {passworderror.msg}</Text>
                      </View>
                    }
             </View>
             <View style={{width:"100%",flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingHorizontal:EStyleSheet.value("30rem"),marginTop:EStyleSheet.value("20rem")}}>
                  <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                    <View style={{marginRight:EStyleSheet.value("5rem"),borderRadius:999,borderWidth:1,borderColor:"#bdbdbd",width:EStyleSheet.value("12rem"),height:EStyleSheet.value("12rem")}}>
                      
                    </View>
                    <Text style={{color:"#bdbdbd"}}>Ingat saya</Text>
                  </View>
                  <View>
                    <Text style={{color:"#38d49f",fontFamily:"NunitoMedium"}}>Lupa Password?</Text>
                  </View>
             </View>
             <View style={{width:"100%",flexDirection:"column",paddingHorizontal:EStyleSheet.value("30rem"),marginTop:EStyleSheet.value("20rem")}}>

                      <View style={{backgroundColor:"#38d49f",...shadow,opacity:(loginLoading) ? 0.8:1,overflow:"hidden",width:"100%",borderRadius:EStyleSheet.value("5rem"),justifyContent:"center",alignItems:"center"}}>
                         {
                           (loginLoading) ?
                           <View
                      
                           style={{width:"100%",height:EStyleSheet.value("43rem"),paddingHorizontal:EStyleSheet.value("20rem"),justifyContent:"center",alignItems:"center"}}
                           >
                               <ActivityIndicator size={EStyleSheet.value("15rem")} color="white"/>
                           </View>
                           :
                           <Pressable
                           android_ripple={{
                               color:"white"
                           }}
                           onPress={()=>{
                               removeError();
                               
                               try {
 
                                 if(email.length===0){
                                    throw new Error(JSON.stringify({type:"email",message:"Email tidak boleh kosong"}));
                                 }
                                 if(password.length===0){
                                   throw new Error(JSON.stringify({type:"password",message:"Password tidak boleh kosong"}));
                                 }

                                 setLoginLoading(true);
 
                                 
                               } catch (error) {
                                   error = JSON.parse(error.message);
                                   switch (error.type) {
                                     case "email":
                                       setEmailError({
                                         error:true,
                                         msg:error.message
                                       })
                                       break;
                                     case "password":
                                       setPasswordError({
                                         error:true,
                                         msg:error.message
                                       })
                                       break;
                                     default:
                                       break;
                                   }
                               }
                               
                           }}
                           style={{width:"100%",height:EStyleSheet.value("43rem"),paddingHorizontal:EStyleSheet.value("20rem"),justifyContent:"center",alignItems:"center"}}
                           >
                               <Text style={{color:"white"}}>MASUK</Text>
                           </Pressable>
                         }
                      </View>
                      <View style={{marginTop:EStyleSheet.value("20rem"),justifyContent:"center",alignItems:"center"}}>
                          <Text style={{fontSize:EStyleSheet.value("11rem"),color:"#a2a2a2",opacity:0.5}}>Hanya surveyor resmi yang bisa masuk.</Text>
                      </View>
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
