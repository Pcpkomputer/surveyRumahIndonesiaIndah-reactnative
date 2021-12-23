import { StatusBar } from 'expo-status-bar';
import React,{useState, useRef, useEffect} from 'react';
import { StyleSheet, Text, View,Dimensions, Pressable,TextInput, TouchableOpacity, ScrollView, ToastAndroid,Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { StatusBarHeight } from '../utils/heightUtils';
import { AntDesign, FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons'; 

import LandingSVG from '../svg/LandingSVG';

import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';

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

export default function SurveyScreen() {

  let [showModalInputKendaraan, setShowModalInputKendaraan] = useState(false);

  let [selectGarasiExist, setSelectGarasiExist] = useState(false);
  let [garasi, setGarasi] = useState("Tidak ada");

  let jenissurattanah = [
    "SHM - Sertifikat Hak Milik",
    "SHGB - Hak Guna Bangunan",
    "Strata",
    "Tanah Girik / Rincik / Kikitir",
    "Petok D / Letter C",
    "Tanah Eigendom Verponding",
    "Warisan",
    "Tanah Wakaf",
    "Sertifikat Belum Pecah",
    "PPJB - Perjanjian Pengikatan Jual Beli",
    "AJB - Akta Jual Beli",
    "Hak Sewa",
    "Hak Pakai"
  ];


  let [selectJenisSuratTanah, setSelectJenisSuratTanah] = useState(false);

  let [txtNamaKendaraan, setTxtNamaKendaraan] = useState("");
  let [daftarKendaraan, setDaftarKendaraan] = useState([
    //   {
    //       nama_kendaraan:"Suzuki Ertiga"
    //   },
    //   {
    //     nama_kendaraan:"Suzuki Ertiga"
    //   },
    //   {
    //     nama_kendaraan:"Suzuki Ertiga"
    // },
    // {
    //     nama_kendaraan:"Suzuki Ertiga"
    // },
    // {
    //     nama_kendaraan:"Suzuki Ertiga"
    // }
  ]);

  let [jenisSuratTanah, setJenisSuratTanah] = useState("SHM - Sertifikat Hak Milik");


  let [sedangDigadaikan, setSedangDigadaikan] = useState("Tidak");
  let [selectSedangDigadaikan, setSelectSedangDigadaikan] = useState(false);
  let [showSedangDigadaikan, setShowSedangDigadaikan] = useState(false);
  let [showTidakSedangDigadaikan, setShowTidakSedangDigadaikan] = useState(false);

  let [sedangdigadaikanketerangan,setSedangDigadaikanKeterangan] = useState("");

  let [dokumensedangdigadaikan, setDokumenSedangDigadaikan] = useState("");

  let [adaIMB, setAdaIMB] = useState("Tidak ada");

  let [showSelectIMB, setShowSelectIMB] = useState(false);

  let [showIsiNoTglIMB, setShowIsiNoTglIMB] = useState(false);

  let [kapandibangun, setKapanDibangun] = useState("Baru");

  let [showSelectKapanDibangun ,setShowSelectKapanDibangun] = useState(false);
  
  let [listKapanDibangun, setListKapanDibangun] = useState([
      "Baru",
      "1-2 tahun lalu",
      "3-5 tahun lalu",
      "6-10 tahun lalu",
      "11-20 tahun lalu"
  ]);

  let [kondisirumah, setKondisiRumah] = useState("Tidak butuh perbaikan");
  let [showSelectKondisiRumah, setShowSelectKondisiRumah] = useState(false);
  let [listKondisiRumah, setListKondisiRumah] = useState([
      "Tidak butuh perbaikan",
      "Butuh sedikit perbaikan",
      "Butuh banyak perbaikan",
      "Harus dibangun ulang"
  ]);

  let [showSelectAdaPDAM, setShowSelectAdaPDAM] = useState(false);
  let [adaPDAM, setAdaPDAM] = useState("Ada");

  return (
    <View style={{flex:1,backgroundColor:"white"}}>


        {
            (showSelectAdaPDAM) &&
            <View style={{position:"absolute",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",zIndex:1000}}>
                <Pressable 
                onPress={()=>{
                    setShowSelectAdaPDAM(false);
                }}
                style={{backgroundColor:"black",position:"absolute",opacity:0.2,width:"100%",height:"100%",zIndex:999}}></Pressable>
                <View style={{backgroundColor:"white",overflow:"hidden",width:Dimensions.get("screen").width-EStyleSheet.value("50rem"),borderRadius:EStyleSheet.value("5rem"),height:EStyleSheet.value("150rem"),zIndex:1000}}>
                    <View style={{height:EStyleSheet.value("50rem"),backgroundColor:"#f6f7fb",justifyContent:"center",alignItems:"center"}}>
                        <Text>Ada PDAM</Text>
                    </View>
                    <Pressable 
                    onPress={()=>{
                        setAdaPDAM("Ada");
                        setShowSelectAdaPDAM(false);
                    }}
                    android_ripple={{
                        color:"#e8e8e8"
                    }}
                    style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <Text>Ada</Text>
                    </Pressable>
                    <Pressable 
                        onPress={()=>{
                            setAdaPDAM("Tidak ada");
                            setShowSelectAdaPDAM(false);
                        }}
                    android_ripple={{
                        color:"#e8e8e8"
                    }}
                    style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <Text>Tidak ada</Text>
                    </Pressable>
                </View>
            </View>
        }


        {
            (showSelectKondisiRumah) &&
            <View style={{position:"absolute",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",zIndex:1000}}>
                <Pressable 
                onPress={()=>{
                    setShowSelectKondisiRumah(false);
                }}
                style={{backgroundColor:"black",position:"absolute",opacity:0.2,width:"100%",height:"100%",zIndex:999}}></Pressable>
                <View style={{backgroundColor:"white",overflow:"hidden",width:Dimensions.get("screen").width-EStyleSheet.value("50rem"),borderRadius:EStyleSheet.value("5rem"),zIndex:1000}}>
                    <View style={{height:EStyleSheet.value("50rem"),backgroundColor:"#f6f7fb",justifyContent:"center",alignItems:"center"}}>
                        <Text>Kondisi Rumah</Text>
                    </View>
                    <ScrollView style={{height:EStyleSheet.value("200rem")}}>
                        {
                            listKondisiRumah.map((item,index)=>{
                                return (
                                    <Pressable 
                                    onPress={()=>{
                                        setKondisiRumah(item);
                                        setShowSelectKondisiRumah(false);
                                    }}
                                    android_ripple={{
                                        color:"#e8e8e8"
                                    }}
                                    style={{paddingVertical:EStyleSheet.value("20rem"),justifyContent:"center",alignItems:"center"}}>
                                        <Text>{item}</Text>
                                    </Pressable>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </View>
        }

        {
            (showSelectKapanDibangun) &&
            <View style={{position:"absolute",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",zIndex:1000}}>
                <Pressable 
                onPress={()=>{
                    setShowSelectKapanDibangun(false);
                }}
                style={{backgroundColor:"black",position:"absolute",opacity:0.2,width:"100%",height:"100%",zIndex:999}}></Pressable>
                <View style={{backgroundColor:"white",overflow:"hidden",width:Dimensions.get("screen").width-EStyleSheet.value("50rem"),borderRadius:EStyleSheet.value("5rem"),zIndex:1000}}>
                    <View style={{height:EStyleSheet.value("50rem"),backgroundColor:"#f6f7fb",justifyContent:"center",alignItems:"center"}}>
                        <Text>Kapan Kira" Dibangun?</Text>
                    </View>
                    <ScrollView style={{height:EStyleSheet.value("200rem")}}>
                        {
                            listKapanDibangun.map((item,index)=>{
                                return (
                                    <Pressable 
                                    onPress={()=>{
                                        setKapanDibangun(item);
                                        setShowSelectKapanDibangun(false);
                                    }}
                                    android_ripple={{
                                        color:"#e8e8e8"
                                    }}
                                    style={{paddingVertical:EStyleSheet.value("20rem"),justifyContent:"center",alignItems:"center"}}>
                                        <Text>{item}</Text>
                                    </Pressable>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </View>
        }

        {
            (showIsiNoTglIMB) &&
            <View style={{position:"absolute",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",zIndex:1000}}>
                <Pressable 
                onPress={()=>{
                    setShowIsiNoTglIMB(false);
                }}
                style={{backgroundColor:"black",position:"absolute",opacity:0.2,width:"100%",height:"100%",zIndex:999}}></Pressable>
                <View style={{backgroundColor:"white",paddingBottom:EStyleSheet.value("10rem"),overflow:"hidden",width:Dimensions.get("screen").width-EStyleSheet.value("50rem"),borderRadius:EStyleSheet.value("5rem"),zIndex:1000}}>
                    <View style={{height:EStyleSheet.value("50rem"),backgroundColor:"#f6f7fb",justifyContent:"center",alignItems:"center"}}>
                        <Text>Isi Nomor & Tanggal IMB</Text>
                    </View>
                   <View style={{paddingVertical:EStyleSheet.value("15rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                       <TextInput placeholder="Nomor"/>
                    </View>
                    <View style={{paddingVertical:EStyleSheet.value("15rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                       <TextInput placeholder="Tanggal"/>
                    </View>
                </View>
            </View>
        }

        {
            (showSelectIMB) &&
            <View style={{position:"absolute",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",zIndex:1000}}>
                <Pressable 
                onPress={()=>{
                    setShowSelectIMB(false);
                }}
                style={{backgroundColor:"black",position:"absolute",opacity:0.2,width:"100%",height:"100%",zIndex:999}}></Pressable>
                <View style={{backgroundColor:"white",overflow:"hidden",width:Dimensions.get("screen").width-EStyleSheet.value("50rem"),borderRadius:EStyleSheet.value("5rem"),height:EStyleSheet.value("150rem"),zIndex:1000}}>
                    <View style={{height:EStyleSheet.value("50rem"),backgroundColor:"#f6f7fb",justifyContent:"center",alignItems:"center"}}>
                        <Text>Ada IMB?</Text>
                    </View>
                    <Pressable 
                    onPress={()=>{
                        setAdaIMB("Ada");
                        setShowSelectIMB(false);
                    }}
                    android_ripple={{
                        color:"#e8e8e8"
                    }}
                    style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <Text>Ada</Text>
                    </Pressable>
                    <Pressable 
                        onPress={()=>{
                            setAdaIMB("Tidak ada");
                            setShowSelectIMB(false);
                        }}
                    android_ripple={{
                        color:"#e8e8e8"
                    }}
                    style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <Text>Tidak ada</Text>
                    </Pressable>
                </View>
            </View>
        }

        {
            (showTidakSedangDigadaikan) &&
            <View style={{position:"absolute",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",zIndex:1000}}>
                <Pressable 
                onPress={()=>{
                    setShowTidakSedangDigadaikan(false);
                }}
                style={{backgroundColor:"black",position:"absolute",opacity:0.2,width:"100%",height:"100%",zIndex:999}}></Pressable>
                <View style={{backgroundColor:"white",overflow:"hidden",width:Dimensions.get("screen").width-EStyleSheet.value("50rem"),borderRadius:EStyleSheet.value("5rem"),zIndex:1000}}>
                    <View style={{height:EStyleSheet.value("50rem"),backgroundColor:"#f6f7fb",justifyContent:"center",alignItems:"center"}}>
                        <Text>Foto Dokumen Asli</Text>
                    </View>
                    <View style={{paddingVertical:EStyleSheet.value("15rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                        <View style={{flexDirection:"row"}}>
                            <TouchableOpacity 
                            activeOpacity={0.8}
                            onPress={async ()=>{
                                let result = await ImagePicker.launchImageLibraryAsync({
                                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                                    allowsEditing: true,
                                    aspect: [4, 3],
                                    quality: 1,
                                  });
                            
                              
                                  if (!result.cancelled) {
                                    setDokumenSedangDigadaikan(result.uri);
                                  }
                            }}
                            style={{backgroundColor:"#e8e8e8",paddingVertical:EStyleSheet.value("5rem"),justifyContent:"center",alignItems:"center",borderRadius:EStyleSheet.value("5rem"),marginRight:EStyleSheet.value("15rem"),flex:1}}>
                                <Text>Galeri</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                            activeOpacity={0.8}
                            onPress={async ()=>{
                                let permission = await ImagePicker.requestCameraRollPermissionsAsync();
                                if(permission.granted){
                                    let result = await ImagePicker.launchCameraAsync();
                                    setDokumenSedangDigadaikan(result.uri);
                                }
                            }}
                            style={{backgroundColor:"#e8e8e8",paddingVertical:EStyleSheet.value("5rem"),justifyContent:"center",alignItems:"center",borderRadius:EStyleSheet.value("5rem"),flex:1}}>
                                <Text>Kamera</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginTop:EStyleSheet.value("10rem"),justifyContent:"center",alignItems:"center",height:EStyleSheet.value("300rem"),backgroundColor:"whitesmoke"}}>
                             {
                                 (dokumensedangdigadaikan) ?
                                 <Image  resizeMode="contain" source={{uri:dokumensedangdigadaikan}} style={{width:"100%",height:"100%"}}></Image>
                                 :
                                 <Entypo name="image" size={EStyleSheet.value("150rem")} color="#e8e8e8" />
                             }
                        </View>
                    </View>
                </View>
            </View>
        }

        {
            (showSedangDigadaikan) &&
            <View style={{position:"absolute",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",zIndex:1000}}>
                <Pressable 
                onPress={()=>{
                    setShowSedangDigadaikan(false);
                }}
                style={{backgroundColor:"black",position:"absolute",opacity:0.2,width:"100%",height:"100%",zIndex:999}}></Pressable>
                <View style={{backgroundColor:"white",overflow:"hidden",width:Dimensions.get("screen").width-EStyleSheet.value("50rem"),borderRadius:EStyleSheet.value("5rem"),height:EStyleSheet.value("150rem"),zIndex:1000}}>
                    <View style={{height:EStyleSheet.value("50rem"),backgroundColor:"#f6f7fb",justifyContent:"center",alignItems:"center"}}>
                        <Text>Beri Keterangan & Fotocopy Dokumen</Text>
                    </View>
                    <View style={{flex:1,paddingVertical:EStyleSheet.value("5rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                        <TextInput 
                        onChangeText={(text)=>{
                            setSedangDigadaikanKeterangan(text);
                        }}
                        value={sedangdigadaikanketerangan} multiline={true} placeholder="Keterangan"/>
                    </View>
                </View>
            </View>
        }

        {
            (showModalInputKendaraan) &&
            <View style={{position:"absolute",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",zIndex:1000}}>
                <Pressable 
                onPress={()=>{
                    setShowModalInputKendaraan(false);
                }}
                style={{backgroundColor:"black",position:"absolute",opacity:0.2,width:"100%",height:"100%",zIndex:999}}></Pressable>
                <View style={{backgroundColor:"white",overflow:"hidden",width:Dimensions.get("screen").width-EStyleSheet.value("50rem"),borderRadius:EStyleSheet.value("5rem"),zIndex:1000}}>
                    <View style={{height:EStyleSheet.value("50rem"),backgroundColor:"#f6f7fb",justifyContent:"center",alignItems:"center"}}>
                        <Text>Daftar Kendaraan</Text>
                    </View>
                    <View style={{paddingHorizontal:EStyleSheet.value("20rem"),borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",paddingVertical:EStyleSheet.value("10rem")}}>
                         <View style={{flex:1}}>
                             <TextInput 
                             onChangeText={(text)=>{
                                 setTxtNamaKendaraan(text);
                             }}
                             value={txtNamaKendaraan}
                             placeholder="Nama Kendaraan"/>
                         </View>
                         <TouchableOpacity
                         activeOpacity={0.8}
                         onPress={()=>{
                             if(txtNamaKendaraan.length===0){
                                ToastAndroid.show("Masukkan nama kendaraan",500);
                             }
                             else{
                                setDaftarKendaraan((prev)=>{
                                    return [
                                        ...prev,
                                        {
                                            nama_kendaraan:txtNamaKendaraan
                                        }
                                    ]
                                });
                                setTxtNamaKendaraan("");
                             }
                         }}
                         style={{backgroundColor:"#f6f7fb",paddingHorizontal:EStyleSheet.value("15rem"),justifyContent:"center",alignItems:"center",borderRadius:EStyleSheet.value("5rem")}}>
                             <Text>Tambah</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={{height:EStyleSheet.value("200rem")}}>
                       {
                           (daftarKendaraan).map((item,index)=>{
                               return (
                                <View style={{paddingHorizontal:EStyleSheet.value("20rem"),alignItems:"center",justifyContent:"center",flexDirection:"row",paddingVertical:EStyleSheet.value("20rem")}}>
                                    <FontAwesome name="car" size={EStyleSheet.value("17rem")} style={{paddingRight:EStyleSheet.value("10rem")}} color="black" />
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    <Text numberOfLines={1} style={{marginLeft:EStyleSheet.value("5rem"),flex:1}} >{item.nama_kendaraan}</Text>
                                    </ScrollView>
                                    <TouchableOpacity 
                                    activeOpacity={0.5}
                                    onPress={()=>{
                                        setDaftarKendaraan((prev)=>{
                                            return prev.filter((item,i)=>{
                                                if(i!==index){
                                                    return item;
                                                }
                                            })
                                        })
                                    }}
                                    style={{width:EStyleSheet.value("40rem"),justifyContent:"center",alignItems:"center"}}>
                                        <MaterialIcons name="delete" size={EStyleSheet.value("17rem")} color="#ff5555" />
                                    </TouchableOpacity>
                                </View>
                               )
                           })
                       }
                    </ScrollView>
                </View>
            </View>
        }



        {
            (selectGarasiExist) &&
            <View style={{position:"absolute",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",zIndex:1000}}>
                <Pressable 
                onPress={()=>{
                    setSelectGarasiExist(false);
                }}
                style={{backgroundColor:"black",position:"absolute",opacity:0.2,width:"100%",height:"100%",zIndex:999}}></Pressable>
                <View style={{backgroundColor:"white",overflow:"hidden",width:Dimensions.get("screen").width-EStyleSheet.value("50rem"),borderRadius:EStyleSheet.value("5rem"),height:EStyleSheet.value("150rem"),zIndex:1000}}>
                    <View style={{height:EStyleSheet.value("50rem"),backgroundColor:"#f6f7fb",justifyContent:"center",alignItems:"center"}}>
                        <Text>Terdapat garasi?</Text>
                    </View>
                    <Pressable 
                    onPress={()=>{
                        setGarasi("Ada");
                        setSelectGarasiExist(false);
                    }}
                    android_ripple={{
                        color:"#e8e8e8"
                    }}
                    style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <Text>Ada</Text>
                    </Pressable>
                    <Pressable 
                        onPress={()=>{
                            setGarasi("Tidak ada");
                            setSelectGarasiExist(false);
                        }}
                    android_ripple={{
                        color:"#e8e8e8"
                    }}
                    style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <Text>Tidak ada</Text>
                    </Pressable>
                </View>
            </View>
        }




        {
            (selectSedangDigadaikan) &&
            <View style={{position:"absolute",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",zIndex:1000}}>
                <Pressable 
                onPress={()=>{
                    setSelectSedangDigadaikan(false);
                }}
                style={{backgroundColor:"black",position:"absolute",opacity:0.2,width:"100%",height:"100%",zIndex:999}}></Pressable>
                <View style={{backgroundColor:"white",overflow:"hidden",width:Dimensions.get("screen").width-EStyleSheet.value("50rem"),borderRadius:EStyleSheet.value("5rem"),height:EStyleSheet.value("150rem"),zIndex:1000}}>
                    <View style={{height:EStyleSheet.value("50rem"),backgroundColor:"#f6f7fb",justifyContent:"center",alignItems:"center"}}>
                        <Text>Sedang Digadaikan?</Text>
                    </View>
                    <Pressable 
                    onPress={()=>{
                        setSedangDigadaikan("Ya");
                        setSelectSedangDigadaikan(false);
                    }}
                    android_ripple={{
                        color:"#e8e8e8"
                    }}
                    style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <Text>Ya</Text>
                    </Pressable>
                    <Pressable 
                        onPress={()=>{
                            setSedangDigadaikan("Tidak");
                            setSelectSedangDigadaikan(false);
                        }}
                    android_ripple={{
                        color:"#e8e8e8"
                    }}
                    style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <Text>Tidak</Text>
                    </Pressable>
                </View>
            </View>
        }


        {
            (selectJenisSuratTanah) &&
            <View style={{position:"absolute",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",zIndex:1000}}>
                <Pressable 
                onPress={()=>{
                    setSelectJenisSuratTanah(false);
                }}
                style={{backgroundColor:"black",position:"absolute",opacity:0.2,width:"100%",height:"100%",zIndex:999}}></Pressable>
                <View style={{backgroundColor:"white",overflow:"hidden",width:Dimensions.get("screen").width-EStyleSheet.value("50rem"),borderRadius:EStyleSheet.value("5rem"),zIndex:1000}}>
                    <View style={{height:EStyleSheet.value("50rem"),backgroundColor:"#f6f7fb",justifyContent:"center",alignItems:"center"}}>
                        <Text>Jenis Surat Tanah?</Text>
                    </View>
                    <ScrollView style={{height:EStyleSheet.value("200rem")}}>
                        {
                            jenissurattanah.map((item,index)=>{
                                return (
                                    <Pressable 
                                    onPress={()=>{
                                        setJenisSuratTanah(item);
                                        setSelectJenisSuratTanah(false);
                                    }}
                                    android_ripple={{
                                        color:"#e8e8e8"
                                    }}
                                    style={{paddingVertical:EStyleSheet.value("20rem"),justifyContent:"center",alignItems:"center"}}>
                                        <Text>{item}</Text>
                                    </Pressable>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </View>
        }


        <View style={{height:StatusBarHeight}}></View>
        <View style={{backgroundColor:"#f6f7fb",justifyContent:"center",alignItems:"center",height:EStyleSheet.value("50rem")}}>
            <Text style={{fontSize:EStyleSheet.value("16rem"),color:"#a9adb8"}}>Isikan form survey berikut</Text>
        </View>
       <ScrollView>
       <View style={{paddingVertical:EStyleSheet.value("10rem"),backgroundColor:"#f6f7fb",borderTopWidth:1,borderColor:"#e8e8e8",paddingHorizontal:EStyleSheet.value("25rem")}}>
            <Text style={{color:"#2d2d2a",fontFamily:"NunitoBold",letterSpacing:1.1}}>INFORMASI TENTANG RUMAH</Text>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>Alamat</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TextInput placeholder='Line 1'/>
                <TextInput placeholder='Line 2'/>
                <TextInput placeholder='RT/RW'/>
                <TextInput placeholder='Kel/Desa'/>
                <TextInput placeholder='Kecamatan'/>
                <TextInput placeholder='Kabupaten/Kota'/>
                <TextInput placeholder='Provinsi'/>
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>Luas Tanah (M2)</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TextInput style={{flex:1}} placeholder='Luas Tanah'/>
                <Text style={{marginLeft:EStyleSheet.value("10rem")}}>M2</Text>
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>Luas Bangunan (M2)</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TextInput style={{flex:1}} placeholder='Luas Bangunan'/>
                <Text style={{marginLeft:EStyleSheet.value("10rem")}}>M2</Text>
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>Jumlah KT</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TextInput style={{flex:1}} placeholder='Jumlah KT'/>
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>Jumlah KM</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TextInput style={{flex:1}} placeholder='Jumlah KM'/>
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>Garasi</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"column",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TouchableOpacity 
                activeOpacity={0.7}
                onPress={()=>{
                    setSelectGarasiExist(true);
                }}
                style={{flexDirection:"row"}}>
                    <View style={{borderBottomWidth:1,flex:1,alignItems:"center",paddingBottom:EStyleSheet.value("5rem"),borderColor:"#e8e8e8",flexDirection:"row",justifyContent:"space-between"}}>
                        <Text>{garasi}</Text>
                        <AntDesign name="caretdown" size={EStyleSheet.value("10rem")} color="grey" />
                    </View>
                </TouchableOpacity>
               {
                   (garasi==="Ada") &&
                   <TouchableOpacity
                   activeOpacity={0.6} 
                   onPress={()=>{
                       setShowModalInputKendaraan(true);
                   }}
                   style={{justifyContent:"center",borderRadius:EStyleSheet.value("5rem"),marginTop:EStyleSheet.value("5rem"),paddingVertical:EStyleSheet.value("3rem"),backgroundColor:"#f6f7fb",alignItems:"center"}}>
                       <Text style={{color:"black"}}>Daftar Kendaraan</Text>
                   </TouchableOpacity>
               }
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>Surat Tanah Atas Nama</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TextInput style={{flex:1}} placeholder='Surat Tanah Atas Nama'/>
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>Jenis Surat Tanah</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                    <TouchableOpacity 
                    activeOpacity={0.7}
                    onPress={()=>{
                        setSelectJenisSuratTanah(true);
                    }}
                    style={{flexDirection:"row"}}>
                        <View style={{borderBottomWidth:1,flex:1,alignItems:"center",paddingBottom:EStyleSheet.value("5rem"),borderColor:"#e8e8e8",flexDirection:"row",justifyContent:"space-between"}}>
                            <Text>{jenisSuratTanah}</Text>
                            <AntDesign name="caretdown" size={EStyleSheet.value("10rem")} color="grey" />
                        </View>
                    </TouchableOpacity>
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>Sedang digadaikan/diberatkan?</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"column",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                    <TouchableOpacity 
                    activeOpacity={0.7}
                    onPress={()=>{
                        setSelectSedangDigadaikan(true);
                    }}
                    style={{flexDirection:"row"}}>
                        <View style={{borderBottomWidth:1,flex:1,alignItems:"center",paddingBottom:EStyleSheet.value("5rem"),borderColor:"#e8e8e8",flexDirection:"row",justifyContent:"space-between"}}>
                            <Text>{sedangDigadaikan}</Text>
                            <AntDesign name="caretdown" size={EStyleSheet.value("10rem")} color="grey" />
                        </View>
                    </TouchableOpacity>
                    {
                        (sedangDigadaikan==="Tidak") &&
                        <TouchableOpacity
                        activeOpacity={0.6} 
                        onPress={()=>{
                            setShowTidakSedangDigadaikan(true);
                        }}
                        style={{justifyContent:"center",width:"100%",borderRadius:EStyleSheet.value("5rem"),marginTop:EStyleSheet.value("5rem"),paddingVertical:EStyleSheet.value("3rem"),backgroundColor:"#f6f7fb",alignItems:"center"}}>
                            <Text style={{color:"black"}}>Foto Dokumen Asli</Text>
                        </TouchableOpacity>
                    }
                     {
                        (sedangDigadaikan==="Ya") &&
                        <TouchableOpacity
                        activeOpacity={0.6} 
                        onPress={()=>{
                            setShowSedangDigadaikan(true);
                        }}
                        style={{justifyContent:"center",width:"100%",borderRadius:EStyleSheet.value("5rem"),marginTop:EStyleSheet.value("5rem"),paddingVertical:EStyleSheet.value("3rem"),backgroundColor:"#f6f7fb",alignItems:"center"}}>
                            <Text style={{color:"black"}}>Beri Keterangan & FC</Text>
                        </TouchableOpacity>
                    }
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>Ada IMB</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"column",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                    <TouchableOpacity 
                    activeOpacity={0.7}
                    onPress={()=>{
                        setShowSelectIMB(true);
                    }}
                    style={{flexDirection:"row"}}>
                        <View style={{borderBottomWidth:1,flex:1,alignItems:"center",paddingBottom:EStyleSheet.value("5rem"),borderColor:"#e8e8e8",flexDirection:"row",justifyContent:"space-between"}}>
                            <Text>{adaIMB}</Text>
                            <AntDesign name="caretdown" size={EStyleSheet.value("10rem")} color="grey" />
                        </View>
                    </TouchableOpacity>
                    {
                   (adaIMB==="Ada") &&
                        <TouchableOpacity
                        activeOpacity={0.6} 
                        onPress={()=>{
                            setShowIsiNoTglIMB(true);
                        }}
                        style={{justifyContent:"center",width:"100%",borderRadius:EStyleSheet.value("5rem"),marginTop:EStyleSheet.value("5rem"),paddingVertical:EStyleSheet.value("3rem"),backgroundColor:"#f6f7fb",alignItems:"center"}}>
                            <Text style={{color:"black"}}>Isi No. & Tgl</Text>
                        </TouchableOpacity>
                    }
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>Kapan Kira" Dibangun</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                    <TouchableOpacity 
                    activeOpacity={0.7}
                    onPress={()=>{
                        setShowSelectKapanDibangun(true);
                    }}
                    style={{flexDirection:"row"}}>
                        <View style={{borderBottomWidth:1,flex:1,alignItems:"center",paddingBottom:EStyleSheet.value("5rem"),borderColor:"#e8e8e8",flexDirection:"row",justifyContent:"space-between"}}>
                            <Text>{kapandibangun}</Text>
                            <AntDesign name="caretdown" size={EStyleSheet.value("10rem")} color="grey" />
                        </View>
                    </TouchableOpacity>
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>Kondisi Rumah</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                    <TouchableOpacity 
                    activeOpacity={0.7}
                    onPress={()=>{
                        setShowSelectKondisiRumah(true);
                    }}
                    style={{flexDirection:"row"}}>
                        <View style={{borderBottomWidth:1,flex:1,alignItems:"center",paddingBottom:EStyleSheet.value("5rem"),borderColor:"#e8e8e8",flexDirection:"row",justifyContent:"space-between"}}>
                            <Text>{kondisirumah}</Text>
                            <AntDesign name="caretdown" size={EStyleSheet.value("10rem")} color="grey" />
                        </View>
                    </TouchableOpacity>
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>No. ID PLN</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TextInput style={{flex:1}} placeholder='No. ID PLN'/>
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>ID PLN Atas Nama</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TextInput style={{flex:1}} placeholder='ID PLN Atas Nama'/>
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>Ada PDAM</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"column",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TouchableOpacity 
                activeOpacity={0.7}
                onPress={()=>{
                    setShowSelectAdaPDAM(true);
                }}
                style={{flexDirection:"row"}}>
                    <View style={{borderBottomWidth:1,flex:1,alignItems:"center",paddingBottom:EStyleSheet.value("5rem"),borderColor:"#e8e8e8",flexDirection:"row",justifyContent:"space-between"}}>
                        <Text>{adaPDAM}</Text>
                        <AntDesign name="caretdown" size={EStyleSheet.value("10rem")} color="grey" />
                    </View>
                </TouchableOpacity>
               {
                   (adaPDAM==="Ada") &&
                   <TouchableOpacity
                   activeOpacity={0.6} 
                   onPress={()=>{
                       //setShowModalInputKendaraan(true);
                   }}
                   style={{justifyContent:"center",borderRadius:EStyleSheet.value("5rem"),marginTop:EStyleSheet.value("5rem"),paddingVertical:EStyleSheet.value("3rem"),backgroundColor:"#f6f7fb",alignItems:"center"}}>
                       <Text style={{color:"black"}}>No, atas nama</Text>
                   </TouchableOpacity>
               }
            </View>
        </View>
        <View style={{paddingVertical:EStyleSheet.value("10rem"),backgroundColor:"#f6f7fb",borderTopWidth:1,borderColor:"#e8e8e8",paddingHorizontal:EStyleSheet.value("25rem")}}>
            <Text style={{color:"#2d2d2a",fontFamily:"NunitoBold",letterSpacing:1.1}}>INFORMASI TENTANG PENJUAL</Text>
        </View>
       </ScrollView>
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
