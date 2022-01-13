import { StatusBar } from 'expo-status-bar';
import React,{useState, useRef, useEffect} from 'react';
import { StyleSheet, Text, Platform, Linking, View,Dimensions, Pressable,TextInput, TouchableOpacity, ScrollView, ToastAndroid,Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { StatusBarHeight } from '../utils/heightUtils';
import { AntDesign, FontAwesome, MaterialIcons, Entypo} from '@expo/vector-icons'; 

import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';

import { ActivityIndicator, Checkbox } from 'react-native-paper';

import Carousel from "pinar";

import {makeid} from '../utils/extra_utils';

import LandingSVG from '../svg/LandingSVG';

import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';

import * as Location from 'expo-location';

import {endpoint} from '../utils/endpoint';

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

export default function DetailRiwayatSurveyAwalScreen(props) {


  let [informasiPenjual, setInformasiPenjual] = useState({
      nama:"",
      alamat:{
          line1:"",
          line2:"",
          rtrw:"",
          keldesa:"",
          kecamatan:"",
          kabupatenkota:"",
          provinsi:""
      }
  });

  let [alamatObjek, setAlamatObjek] = useState({
    line1:"",
    line2:"",
    rtrw:"",
    keldesa:"",
    kecamatan:"",
    kabupatenkota:"",
    provinsi:""
  })

  let [arsitekturRumah, setArsitekturRumah] = useState({
      luastanah:"",
      luasbangunan:"",
      jumlahKT:"",
      jumlahKM:""
  });

  let [aksesbilitas, setAksesbilitas] = useState({
      pasarterdekat:"",
      sekolahterdekat:"",
      stasiunkaterdekat:"",
      jarakkejalurbis:"",
      jalurbus:"",
      perumahanterdekat:""
  });

  let [harga, setHarga] = useState({
      permintaanpenjual:"",
      hargapasar:""
  });

  let [location,setLocation] = useState({
      coords:{
          latitude:"",
          longitude:""
      }
  })


  useEffect(()=>{
    if(props.route?.params?.draft){
        alert("Opened From Draft");
    }
  },[])

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
  let [showModalAtasNamaPDAM, setShowModalAtasNamaPDAM] = useState(false);

  let [showSelectAdaPLN, setShowSelectAdaPLN] = useState(false);
  let [adaPLN, setAdaPLN] = useState("Ada");

  let [showSelectAdaSinyalInternet, setShowSelectAdaSinyalInternet] = useState(false);
  let [adasinyalinternet,setAdaSinyalInternet] = useState("Tidak ada");

  let [showModalAmbilKordinat, setShowModalAmbilKordinat] = useState(false);

  let [showModalAmbilViewJalan, setShowModalAmbilViewJalan] = useState(false);

  let [showModalAmbilFotoTampakDariJalan, setShowModalAmbilFotoTampakDariJalan] = useState(false);

  let [fotoTampakDariJalan, setFotoTampakDariJalan] = useState([
      {
          uri:""
      },
      {
            uri:""
        },
        {
            uri:""
        },
  ]);

  let [showModalAmbilFotoTampakDepan, setShowModalAmbilFotoTampakDepan] = useState(false);

  let [fotoTampakDepan, setFotoTampakDepan] = useState([
    {
        uri:""
    },
    {
        uri:""
    }
  ]);

  let [fotoViewJalan ,setFotoViewJalan] = useState([
      {
          uri:""
      },
      {
          uri:""
      }
  ]);

  let [showModalAmbilFotoDalamRumah ,setShowModalAmbilFotoDalamRumah] = useState(false);

  let [fotoDalamRumah ,setFotoDalamRumah] = useState([
    {
        uri:""
    },
    {
        uri:""
    },
    {
        uri:""
    },
    {
        uri:""
    },
    {
        uri:""
    },
    // {
    //     uri:""
    // },
    // {
    //     uri:""
    // },
    // {
    //     uri:""
    // },
    ]);

  let [showModalSuratKepemilikan, setShowModalSuratKepemilikan] = useState(false);


  let [suratkepemilikan, setSuratKepemilikan] = useState([
    {
        uri:""
    },
    {
        uri:""
    },
    {
        uri:""
    },
    ]);

 let [adaPBB, setAdaPBB] = useState("Tidak ada");
 let [showSelectAdaPBB, setShowSelectAdaPBB] = useState(false);

 let [showModalDetailPBB, setShowModalDetailPBB] = useState(false);
 let [pbbSudahLunas, setPBBSudahLunas] = useState(false);

 let [lampiranPBB, setLampiranPBB] = useState("");

 let [objek, setObjek] = useState("Rumah");
 let [showSelectObjek, setShowSelectObjek] = useState(false);

 let [showSelectKebersihanDanKerapihan, setshowSelectKebersihanDanKerapihan] = useState(false);
 let [kebersihandankerapihan, setKebersihanDanKerapihan] = useState("Cukup bersih dan rapih");
 let [listKebersihanDanKerapihan, setListKebersihanDanKerapihan] = useState([
     "Cukup bersih dan rapih",
     "Tidak bersih/rapih",
     "Kotor & berantakan"
 ]);

 let [showSelectJalan, setShowSelectJalan] = useState(false);
 let [jalan, setJalan] = useState("Tanah");
 let [listJalan, setListJalan] = useState([
     "Tanah",
     "Sirtu",
     "Beton",
     "Aspal"
 ]);

 let [jalanmasuk, setJalanMasuk] = useState("Masuk mobil");
 let [showSelectJalanMasuk, setShowSelectJalanMasuk] = useState(false);

 let [rawanbanjir, setRawanBanjir] = useState("A");
 let [listRawanBanjir, setListRawanBanjir] = useState([
     "A",
     "B",
     "C",
     "D",
     "E"
 ]);
 let [showSelectRawanBanjir, setShowSelectRawanBanjir] = useState(false);

  let [keamanan, setKeamanan] = useState("A");
  let [listKeamanan, setListKeamanan] = useState([
    "A",
    "B",
    "C",
    "D",
    "E"
  ]);
  let [showSelectKeamanan, setshowSelectKeamanan] = useState(false);

  let [kebersihan, setKebersihan] = useState("A");
  let [listKebersihan, setListKebersihan] = useState([
    "A",
    "B",
    "C",
    "D",
    "E" 
  ]);
  let [showSelectKebersihan, setShowSelectKebersihan] = useState(false);

  let [showSelectBisaAmprahPLN, setShowSelectBisaAmprahPLN] = useState(false);
  let [bisaAmprahPLN, setBisaAmprahPLN] = useState("Bisa")

  let [showSelectBisaAmprahPDAM, setShowSelectBisaAmprahPDAM] = useState(false);
  let [bisaAmprahPDAM, setBisaAmprahPDAM] = useState("Bisa");


  let [yakinSubmitModal, setYakinSubmitModal] = useState(false);


  let [smokeScreenOpened, setSmokeScreenOpened] = useState(false);


  useEffect(()=>{
    //alert(props.route.params.item);
  },[]);


  return (
    <View style={{flex:1,backgroundColor:"white"}}>

        {
            (smokeScreenOpened) &&
            <View style={{position:"absolute",width:"100%",justifyContent:"center",alignItems:"center",height:"100%",zIndex:1000}}>
                    <View style={{position:"absolute",width:"100%",height:"100%",backgroundColor:"black",opacity:0.3}}>
                    </View>
                    <ActivityIndicator color="white" size="large"/>
            </View>
        }


        {
            (yakinSubmitModal) &&
            <View style={{position:"absolute",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",zIndex:1000}}>
                <Pressable 
                onPress={()=>{
                    setYakinSubmitModal(false);
                }}
                style={{backgroundColor:"black",position:"absolute",opacity:0.2,width:"100%",height:"100%",zIndex:999}}></Pressable>
                <View style={{backgroundColor:"white",overflow:"hidden",width:Dimensions.get("screen").width-EStyleSheet.value("50rem"),borderRadius:EStyleSheet.value("5rem"),zIndex:1000}}>
                    <View style={{height:EStyleSheet.value("50rem"),backgroundColor:"#f6f7fb",justifyContent:"center",alignItems:"center"}}>
                        <Text>Sudah yakin mengisi semua data?</Text>
                    </View>
                    <View style={{padding:EStyleSheet.value("15rem"),flexDirection:"row",paddingVertical:EStyleSheet.value("20rem")}}>
                        <Pressable 
                        onPress={()=>{
                            setYakinSubmitModal(false);
                        }}
                        android_ripple={{
                            color:"white"
                        }}
                        style={{flex:1,borderRadius:EStyleSheet.value("5rem"),paddingVertical:EStyleSheet.value("10rem"),justifyContent:"center",alignItems:"center",marginRight:EStyleSheet.value("10rem"),backgroundColor:"whitesmoke"}}>
                            <Text>Belum</Text>
                        </Pressable>
                        <Pressable 
                        onPress={async ()=>{

                            
                            setSmokeScreenOpened(true);
                            setYakinSubmitModal(false);

                            let payload = {};

                            payload.informasipenjual = informasiPenjual;
                            payload.alamatobjek = alamatObjek;
                            payload.arsitekturrumah = {
                                ...arsitekturRumah,
                                garasi:{
                                    garasi,
                                    daftarkendaraan:daftarKendaraan
                                }
                            };
                            payload.keadaanrumah = {
                                kapankirakiradibangun:kapandibangun,
                                butuhperbaikan:kondisirumah,
                                kebersihandankerapihan:kebersihandankerapihan
                            }
            
                            payload.fasilitas = {
                                tersambungPLN:adaPLN,
                                tersambungPDAM:adaPDAM,
                                adasinyalinternet:adasinyalinternet
                            };
            
                            payload.aksesbilitas = {
                                ...aksesbilitas,
                                jalan:jalan,
                                jalanmasuk:jalanmasuk
                            };
                            
                            payload.suasanalingkungan = {
                                rawanbanjir:rawanbanjir,
                                keamanan:keamanan,
                                kebersihan:kebersihan
                            };
            
                            payload.harga = {
                                ...harga
                            };
            
                            payload.googlemaps = {
                                ...location
                            };
            
                            let fototampakdarijalan = fotoTampakDariJalan.map((item,index)=>{
                                return {
                                    uri: item.uri,
                                    type: 'image/jpeg',
                                    name: `fototampakdarijalan-${index}.jpg`,
                                };
                            })
            
                            let fototampakdepan = fotoTampakDepan.map((item,index)=>{
                                return {
                                    uri: item.uri,
                                    type: 'image/jpeg',
                                    name: `fototampakdepan-${index}.jpg`,
                                };
                            });
            
                            let fotodalamrumah = fotoDalamRumah.map((item,index)=>{
                                return {
                                    uri: item.uri,
                                    type: 'image/jpeg',
                                    name: `fotodalamrumah-${index}.jpg`,
                                };
                            });

                            let uploadfotosingle = async (json,label)=>{

                                let formdata = new FormData();
                                formdata.append("file",json);
                                formdata.append("label",label);

                                let request = await fetch(`${endpoint}/api/surveyor/uploadfoto`,{
                                    method:"POST",
                                    body:formdata
                                });
                                let response = await request.json();
                                return response;
                            };


                           let promisefototampakdarijalan = [];
                           fototampakdarijalan.forEach((item,index)=>{
                                if(item.uri.length>0){
                                    promisefototampakdarijalan.push(uploadfotosingle(item,`fototampakdarijalan-${makeid(5)}-`));
                                }
                            });

                            let resolvefototampakdarijalan = await Promise.all(promisefototampakdarijalan);
                            resolvefototampakdarijalan = resolvefototampakdarijalan.map((item,index)=>item.filename)

                            //////////
                           
                            let promisefototampakdepan = [];
                            fototampakdepan.forEach((item,index)=>{
                                 if(item.uri.length>0){
                                      promisefototampakdepan.push(uploadfotosingle(item,`fototampakdaridepan-${makeid(5)}-`));
                                 }
                             });

                             let resolvefototampakdaridepan = await Promise.all(promisefototampakdepan);
                             resolvefototampakdaridepan = resolvefototampakdaridepan.map((item)=>item.filename);

                            //////////

                             let promisefotodalamrumah = [];
                             fotodalamrumah.forEach((item,index)=>{
                                  if(item.uri.length>0){
                                      promisefotodalamrumah.push(uploadfotosingle(item,`fotodalamrumah-${makeid(5)}-`));
                                  }
                              });
  
                              let resolvefotodalamrumah = await Promise.all(promisefotodalamrumah);
                              resolvefotodalamrumah = resolvefotodalamrumah.map((item,index)=>item.filename)
                            
                            
                            payload.fototampakdarijalan = resolvefototampakdarijalan;
                            payload.fototampakdepan = resolvefototampakdaridepan;
                            payload.fotodalamrumah = resolvefotodalamrumah;

                            let stringify = JSON.stringify(payload);

                            let req2 = await fetch(`${endpoint}/api/surveyor/insertsurveyawal`,{
                                method:"POST",
                                headers:{
                                    "content-type":"application/json"
                                },
                                body:JSON.stringify({
                                    payload:stringify
                                })
                            });

                            let res2 = await req2.json();

            
                            
                            if(res2.success){
                                alert(res2.msg);
                                props.navigation.goBack();
                            }

                            setSmokeScreenOpened(false);


                            


            
                            // let formdata = new FormData();
                            // formdata.append("json",JSON.stringify(payload));
            
                            // fototampakdarijalan.forEach((file,index)=>{
                            //     if(file.uri.length>0){
                            //         formdata.append("fototampakdarijalan[]",file);
                            //     }
                            // });
                            
                            // fototampakdepan.forEach((file,index)=>{
                            //     if(file.uri.length>0){
                            //         formdata.append("fototampakdepan[]",file);
                            //     }   
                            // });

                            // fotodalamrumah.forEach((file,index)=>{
                            //     if(file.uri.length>0){
                            //         formdata.append("fotodalamrumah[]",file);
                            //     }
                            // });

                            // let request = await fetch(`${endpoint}/api/surveyor/insertsurveyawal`,{
                            //     method:"POST",
                            //     body:formdata
                            // });

                            // let response = await request.text();

                            // console.log(response);
            
                        }}
                        android_ripple={{
                            color:"white"
                        }}
                        style={{flex:1,borderRadius:EStyleSheet.value("5rem"),paddingVertical:EStyleSheet.value("10rem"),justifyContent:"center",alignItems:"center",backgroundColor:"whitesmoke"}}>
                            <Text>Sudah</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        }


    {
            (showModalAmbilFotoTampakDepan) &&
            <View style={{position:"absolute",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",zIndex:1000}}>
                <Pressable 
                onPress={()=>{
                    setShowModalAmbilFotoTampakDepan(false);
                }}
                style={{backgroundColor:"black",position:"absolute",opacity:0.2,width:"100%",height:"100%",zIndex:999}}></Pressable>
                <View style={{backgroundColor:"white",paddingBottom:EStyleSheet.value("20rem"),overflow:"hidden",width:Dimensions.get("screen").width-EStyleSheet.value("50rem"),height:EStyleSheet.value("300rem"),borderRadius:EStyleSheet.value("5rem"),zIndex:1000}}>
                    <View style={{height:EStyleSheet.value("50rem"),backgroundColor:"#f6f7fb",justifyContent:"center",alignItems:"center"}}>
                        <Text>Ambil Foto Tampak Depan</Text>
                    </View>
                    <View style={{marginTop:EStyleSheet.value("20rem"),flex:1,paddingHorizontal:EStyleSheet.value("20rem")}}>
                        <Carousel>
                            {
                                fotoTampakDepan.map((item,index)=>{
                                    return (
                                        <View style={{backgroundColor:"whitesmoke",flex:1}}>
                                            <View style={{height:"100%",justifyContent:"center",alignItems:"center"}}>
                                                {
                                                    (fotoTampakDepan[index].uri) ?
                                                    <Image resizeMode="contain" style={{width:"100%",height:"100%"}} source={{uri:fotoTampakDepan[index].uri}}/>
                                                    :
                                                    <TouchableOpacity
                                                    onPress={async ()=>{
                                                        let capture = await ImagePicker.launchCameraAsync();

                                                     


                                                        if(!capture.cancelled){

                                                            const manipResult = await manipulateAsync(
                                                                capture.uri,
                                                                [
                                                                  { resize: {height:1200,width:800} },
                                                                ],
                                                                { compress: 1, format: SaveFormat.JPEG }
                                                              );

                                                            setFotoTampakDepan((prev)=>{
                                                                return prev.map((item,i)=>{
                                                                    if(index===i){
                                                                        return {
                                                                            ...item,
                                                                            uri:manipResult.uri
                                                                        }
                                                                    }
                                                                    return item;
                                                                })
                                                            })
                                                        }
                                                        
                                                    }}
                                                    >
                                                        <AntDesign name="camerao" size={EStyleSheet.value("80rem")} color="#e3e3e3" />
                                                    </TouchableOpacity>
                                                }
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </Carousel>
                    </View>
                </View>
            </View>
        }


        {
            (showModalAmbilFotoTampakDariJalan) &&
            <View style={{position:"absolute",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",zIndex:1000}}>
                <Pressable 
                onPress={()=>{
                    setShowModalAmbilFotoTampakDariJalan(false);
                }}
                style={{backgroundColor:"black",position:"absolute",opacity:0.2,width:"100%",height:"100%",zIndex:999}}></Pressable>
                <View style={{backgroundColor:"white",paddingBottom:EStyleSheet.value("20rem"),overflow:"hidden",width:Dimensions.get("screen").width-EStyleSheet.value("50rem"),height:EStyleSheet.value("300rem"),borderRadius:EStyleSheet.value("5rem"),zIndex:1000}}>
                    <View style={{height:EStyleSheet.value("50rem"),backgroundColor:"#f6f7fb",justifyContent:"center",alignItems:"center"}}>
                        <Text>Ambil Foto Tampak Dari Jalan</Text>
                    </View>
                    <View style={{marginTop:EStyleSheet.value("20rem"),flex:1,paddingHorizontal:EStyleSheet.value("20rem")}}>
                        <Carousel>
                            {
                                fotoTampakDariJalan.map((item,index)=>{
                                    return (
                                        <View style={{backgroundColor:"whitesmoke",flex:1}}>
                                            <View style={{height:"100%",justifyContent:"center",alignItems:"center"}}>
                                                {
                                                    (fotoTampakDariJalan[index].uri) ?
                                                    <Image resizeMode="contain" style={{width:"100%",height:"100%"}} source={{uri:fotoTampakDariJalan[index].uri}}/>
                                                    :
                                                    <TouchableOpacity
                                                    onPress={async ()=>{
                                                        let capture = await ImagePicker.launchCameraAsync();



                                                        if(!capture.cancelled){


                                                        const manipResult = await manipulateAsync(
                                                            capture.uri,
                                                            [
                                                              { resize: {height:1200,width:800} },
                                                            ],
                                                            { compress: 1, format: SaveFormat.JPEG }
                                                          );

                                                            setFotoTampakDariJalan((prev)=>{
                                                                return prev.map((item,i)=>{
                                                                    if(index===i){
                                                                        return {
                                                                            ...item,
                                                                            uri:manipResult.uri
                                                                        }
                                                                    }
                                                                    return item;
                                                                })
                                                            })
                                                        }
                                                        
                                                    }}
                                                    >
                                                        <AntDesign name="camerao" size={EStyleSheet.value("80rem")} color="#e3e3e3" />
                                                    </TouchableOpacity>
                                                }
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </Carousel>
                    </View>
                </View>
            </View>
        }


{
            (showSelectKebersihan) &&
            <View style={{position:"absolute",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",zIndex:1000}}>
                <Pressable 
                onPress={()=>{
                    setShowSelectKebersihan(false);
                }}
                style={{backgroundColor:"black",position:"absolute",opacity:0.2,width:"100%",height:"100%",zIndex:999}}></Pressable>
                <View style={{backgroundColor:"white",overflow:"hidden",width:Dimensions.get("screen").width-EStyleSheet.value("50rem"),borderRadius:EStyleSheet.value("5rem"),zIndex:1000}}>
                    <View style={{height:EStyleSheet.value("50rem"),backgroundColor:"#f6f7fb",justifyContent:"center",alignItems:"center"}}>
                        <Text>Kebersihan</Text>
                    </View>
                    <ScrollView style={{height:EStyleSheet.value("200rem")}}>
                        {
                            listKebersihan.map((item,index)=>{
                                return (
                                    <Pressable 
                                    onPress={()=>{
                                        setKebersihan(item);
                                        setShowSelectKebersihan(false);
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
            (showSelectKeamanan) &&
            <View style={{position:"absolute",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",zIndex:1000}}>
                <Pressable 
                onPress={()=>{
                    setshowSelectKeamanan(false);
                }}
                style={{backgroundColor:"black",position:"absolute",opacity:0.2,width:"100%",height:"100%",zIndex:999}}></Pressable>
                <View style={{backgroundColor:"white",overflow:"hidden",width:Dimensions.get("screen").width-EStyleSheet.value("50rem"),borderRadius:EStyleSheet.value("5rem"),zIndex:1000}}>
                    <View style={{height:EStyleSheet.value("50rem"),backgroundColor:"#f6f7fb",justifyContent:"center",alignItems:"center"}}>
                        <Text>Keamanan</Text>
                    </View>
                    <ScrollView style={{height:EStyleSheet.value("200rem")}}>
                        {
                            listKeamanan.map((item,index)=>{
                                return (
                                    <Pressable 
                                    onPress={()=>{
                                        setKeamanan(item);
                                        setshowSelectKeamanan(false);
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
            (showSelectRawanBanjir) &&
            <View style={{position:"absolute",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",zIndex:1000}}>
                <Pressable 
                onPress={()=>{
                    setShowSelectRawanBanjir(false);
                }}
                style={{backgroundColor:"black",position:"absolute",opacity:0.2,width:"100%",height:"100%",zIndex:999}}></Pressable>
                <View style={{backgroundColor:"white",overflow:"hidden",width:Dimensions.get("screen").width-EStyleSheet.value("50rem"),borderRadius:EStyleSheet.value("5rem"),zIndex:1000}}>
                    <View style={{height:EStyleSheet.value("50rem"),backgroundColor:"#f6f7fb",justifyContent:"center",alignItems:"center"}}>
                        <Text>Rawan Banjir</Text>
                    </View>
                    <ScrollView style={{height:EStyleSheet.value("200rem")}}>
                        {
                            listRawanBanjir.map((item,index)=>{
                                return (
                                    <Pressable 
                                    onPress={()=>{
                                        setRawanBanjir(item);
                                        setShowSelectRawanBanjir(false);
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
            (showSelectJalanMasuk) &&
            <View style={{position:"absolute",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",zIndex:1000}}>
                <Pressable 
                onPress={()=>{
                    setShowSelectJalanMasuk(false);
                }}
                style={{backgroundColor:"black",position:"absolute",opacity:0.2,width:"100%",height:"100%",zIndex:999}}></Pressable>
                <View style={{backgroundColor:"white",overflow:"hidden",width:Dimensions.get("screen").width-EStyleSheet.value("50rem"),borderRadius:EStyleSheet.value("5rem"),height:EStyleSheet.value("150rem"),zIndex:1000}}>
                    <View style={{height:EStyleSheet.value("50rem"),backgroundColor:"#f6f7fb",justifyContent:"center",alignItems:"center"}}>
                        <Text>Objek</Text>
                    </View>
                    <Pressable 
                    onPress={()=>{
                        setJalanMasuk("Masuk mobil");
                        setShowSelectJalanMasuk(false);
                    }}
                    android_ripple={{
                        color:"#e8e8e8"
                    }}
                    style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <Text>Masuk mobil</Text>
                    </Pressable>
                    <Pressable 
                        onPress={()=>{
                            setJalanMasuk("Tidak masuk mobil");
                            setShowSelectJalanMasuk(false);
                        }}
                    android_ripple={{
                        color:"#e8e8e8"
                    }}
                    style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <Text>Tidak masuk mobil</Text>
                    </Pressable>
                </View>
            </View>
        }


        {
            (showSelectJalan) &&
            <View style={{position:"absolute",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",zIndex:1000}}>
                <Pressable 
                onPress={()=>{
                    setShowSelectJalan(true);
                }}
                style={{backgroundColor:"black",position:"absolute",opacity:0.2,width:"100%",height:"100%",zIndex:999}}></Pressable>
                <View style={{backgroundColor:"white",overflow:"hidden",width:Dimensions.get("screen").width-EStyleSheet.value("50rem"),borderRadius:EStyleSheet.value("5rem"),zIndex:1000}}>
                    <View style={{height:EStyleSheet.value("50rem"),backgroundColor:"#f6f7fb",justifyContent:"center",alignItems:"center"}}>
                        <Text>Jalan</Text>
                    </View>
                    <ScrollView style={{height:EStyleSheet.value("200rem")}}>
                        {
                            listJalan.map((item,index)=>{
                                return (
                                    <Pressable 
                                    onPress={()=>{
                                        setJalan(item);
                                        setShowSelectJalan(false);
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
            (showSelectKebersihanDanKerapihan) &&
            <View style={{position:"absolute",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",zIndex:1000}}>
                <Pressable 
                onPress={()=>{
                    setshowSelectKebersihanDanKerapihan(false);
                }}
                style={{backgroundColor:"black",position:"absolute",opacity:0.2,width:"100%",height:"100%",zIndex:999}}></Pressable>
                <View style={{backgroundColor:"white",overflow:"hidden",width:Dimensions.get("screen").width-EStyleSheet.value("50rem"),borderRadius:EStyleSheet.value("5rem"),zIndex:1000}}>
                    <View style={{height:EStyleSheet.value("50rem"),backgroundColor:"#f6f7fb",justifyContent:"center",alignItems:"center"}}>
                        <Text>Butuh Perbaikan</Text>
                    </View>
                    <ScrollView style={{height:EStyleSheet.value("200rem")}}>
                        {
                            listKebersihanDanKerapihan.map((item,index)=>{
                                return (
                                    <Pressable 
                                    onPress={()=>{
                                        setKebersihanDanKerapihan(item);
                                        setshowSelectKebersihanDanKerapihan(false);
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
            (showSelectObjek) &&
            <View style={{position:"absolute",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",zIndex:1000}}>
                <Pressable 
                onPress={()=>{
                    setShowSelectObjek(false);
                }}
                style={{backgroundColor:"black",position:"absolute",opacity:0.2,width:"100%",height:"100%",zIndex:999}}></Pressable>
                <View style={{backgroundColor:"white",overflow:"hidden",width:Dimensions.get("screen").width-EStyleSheet.value("50rem"),borderRadius:EStyleSheet.value("5rem"),height:EStyleSheet.value("150rem"),zIndex:1000}}>
                    <View style={{height:EStyleSheet.value("50rem"),backgroundColor:"#f6f7fb",justifyContent:"center",alignItems:"center"}}>
                        <Text>Objek</Text>
                    </View>
                    <Pressable 
                    onPress={()=>{
                        setObjek("Rumah");
                        setShowSelectObjek(false);
                    }}
                    android_ripple={{
                        color:"#e8e8e8"
                    }}
                    style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <Text>Rumah</Text>
                    </Pressable>
                    <Pressable 
                        onPress={()=>{
                            setObjek("Tanah");
                            setShowSelectObjek(false);
                        }}
                    android_ripple={{
                        color:"#e8e8e8"
                    }}
                    style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <Text>Tanah</Text>
                    </Pressable>
                </View>
            </View>
        }

        {
            (showModalDetailPBB) &&
            <View style={{position:"absolute",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",zIndex:1000}}>
                <Pressable 
                onPress={()=>{
                    setShowModalDetailPBB(false);
                }}
                style={{backgroundColor:"black",position:"absolute",opacity:0.2,width:"100%",height:"100%",zIndex:999}}></Pressable>
                <View style={{backgroundColor:"white",paddingBottom:EStyleSheet.value("20rem"),overflow:"hidden",width:Dimensions.get("screen").width-EStyleSheet.value("50rem"),borderRadius:EStyleSheet.value("5rem"),zIndex:1000}}>
                    <View style={{height:EStyleSheet.value("50rem"),backgroundColor:"#f6f7fb",justifyContent:"center",alignItems:"center"}}>
                        <Text>Detail PBB</Text>
                    </View>
                    <View style={{paddingHorizontal:EStyleSheet.value("20rem"),marginTop:EStyleSheet.value("10rem"),flexDirection:"row"}}>
                         <View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                             <Text>Sudah Lunas</Text>
                            <Checkbox
                                color="#e8e8e8"
                                status={(pbbSudahLunas) ? 'checked':'unchecked'}
                                onPress={() => {
                                    setPBBSudahLunas(true);
                                }}
                                />
                         </View>
                         <View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                             <Text>Belum Lunas</Text>
                            <Checkbox
                                color="#e8e8e8"
                                status={(pbbSudahLunas===false) ? 'checked':'unchecked'}
                                onPress={() => {
                                    setPBBSudahLunas(false);
                                }}
                                />
                         </View>
                    </View>
                    <View style={{paddingHorizontal:EStyleSheet.value("20rem"),marginTop:EStyleSheet.value("10rem")}}>
                        {
                            (!pbbSudahLunas) &&
                            <View>
                                <TextInput editable={false} placeholder="PBB Terakhir Tahun Kapan"/>
                            </View>
                        }
                        <View style={{backgroundColor:"whitesmoke",justifyContent:"center",alignItems:"center",marginTop:EStyleSheet.value("10rem"),height:EStyleSheet.value("250rem")}}>
                               {
                                   (lampiranPBB) ?
                                   <Image resizeMode="contain" source={{uri:lampiranPBB}} style={{width:"100%",height:"100%"}}></Image>
                                   :
                                   <TouchableOpacity
                                   onPress={async ()=>{
                                       let capture = await ImagePicker.launchCameraAsync();
                                       if(!capture.cancelled){
                                          setLampiranPBB(capture.uri);
                                       }
                                       
                                   }}
                                   >
                                       <AntDesign name="camerao" size={EStyleSheet.value("80rem")} color="#e3e3e3" />
                                   </TouchableOpacity>
                               }
                        </View>
                    </View>
                </View>
            </View>
        }


        {
            (showSelectAdaSinyalInternet) &&
            <View style={{position:"absolute",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",zIndex:1000}}>
                <Pressable 
                onPress={()=>{
                    setShowSelectAdaSinyalInternet(false);
                }}
                style={{backgroundColor:"black",position:"absolute",opacity:0.2,width:"100%",height:"100%",zIndex:999}}></Pressable>
                <View style={{backgroundColor:"white",overflow:"hidden",width:Dimensions.get("screen").width-EStyleSheet.value("50rem"),borderRadius:EStyleSheet.value("5rem"),height:EStyleSheet.value("150rem"),zIndex:1000}}>
                    <View style={{height:EStyleSheet.value("50rem"),backgroundColor:"#f6f7fb",justifyContent:"center",alignItems:"center"}}>
                        <Text>Ada Sinyal Internet</Text>
                    </View>
                    <Pressable 
                    onPress={()=>{
                        setAdaSinyalInternet("Ada");
                        setShowSelectAdaSinyalInternet(false);
                    }}
                    android_ripple={{
                        color:"#e8e8e8"
                    }}
                    style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <Text>Ada</Text>
                    </Pressable>
                    <Pressable 
                        onPress={()=>{
                            setAdaSinyalInternet("Tidak Ada");
                            setShowSelectAdaSinyalInternet(false);
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
            (showSelectAdaPBB) &&
            <View style={{position:"absolute",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",zIndex:1000}}>
                <Pressable 
                onPress={()=>{
                    setShowSelectAdaPBB(false);
                }}
                style={{backgroundColor:"black",position:"absolute",opacity:0.2,width:"100%",height:"100%",zIndex:999}}></Pressable>
                <View style={{backgroundColor:"white",overflow:"hidden",width:Dimensions.get("screen").width-EStyleSheet.value("50rem"),borderRadius:EStyleSheet.value("5rem"),height:EStyleSheet.value("150rem"),zIndex:1000}}>
                    <View style={{height:EStyleSheet.value("50rem"),backgroundColor:"#f6f7fb",justifyContent:"center",alignItems:"center"}}>
                        <Text>Ada PBB</Text>
                    </View>
                    <Pressable 
                    onPress={()=>{
                        setAdaPBB("Ada");
                        setShowSelectAdaPBB(false);
                    }}
                    android_ripple={{
                        color:"#e8e8e8"
                    }}
                    style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <Text>Ada</Text>
                    </Pressable>
                    <Pressable 
                        onPress={()=>{
                            setAdaPBB("Tidak ada");
                            setShowSelectAdaPBB(false);
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
              (showModalSuratKepemilikan) &&
              <View style={{position:"absolute",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",zIndex:1000}}>
                  <Pressable 
                  onPress={()=>{
                      setShowModalSuratKepemilikan(false);
                  }}
                  style={{backgroundColor:"black",position:"absolute",opacity:0.2,width:"100%",height:"100%",zIndex:999}}></Pressable>
                  <View style={{backgroundColor:"white",paddingBottom:EStyleSheet.value("20rem"),overflow:"hidden",width:Dimensions.get("screen").width-EStyleSheet.value("50rem"),height:EStyleSheet.value("300rem"),borderRadius:EStyleSheet.value("5rem"),zIndex:1000}}>
                      <View style={{height:EStyleSheet.value("50rem"),backgroundColor:"#f6f7fb",justifyContent:"center",alignItems:"center"}}>
                          <Text>FC Surat Kepemilikan Tanah</Text>
                      </View>
                      <View style={{marginTop:EStyleSheet.value("20rem"),flex:1,paddingHorizontal:EStyleSheet.value("20rem")}}>
                          <Carousel>
                             {
                                 [1,2,3].map((item,index)=>{
                                     return (
                                        <View style={{backgroundColor:"whitesmoke",flex:1}}>
                                                <View style={{height:"100%",justifyContent:"center",alignItems:"center"}}>
                                                {
                                                    (suratkepemilikan[index].uri) ?
                                                    <Image resizeMode="contain" style={{width:"100%",height:"100%"}} source={{uri:suratkepemilikan[index].uri}}/>
                                                    :
                                                    <TouchableOpacity
                                                    onPress={async ()=>{
                                                        let capture = await ImagePicker.launchCameraAsync();
                                                        if(!capture.cancelled){
                                                            setSuratKepemilikan((prev)=>{
                                                                return prev.map((item,i)=>{
                                                                    if(i===index){
                                                                        return {
                                                                            ...item,
                                                                            uri:capture.uri
                                                                        }
                                                                    }
                                                                    return item;
                                                                })
                                                            })
                                                        }
                                                        
                                                    }}
                                                    >
                                                        <AntDesign name="camerao" size={EStyleSheet.value("80rem")} color="#e3e3e3" />
                                                    </TouchableOpacity>
                                                }
                                            </View>
                                        </View>
                                     )
                                 })
                             }
                          </Carousel>
                      </View>
                  </View>
              </View>
        }


        {
              (showModalAmbilFotoDalamRumah) &&
              <View style={{position:"absolute",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",zIndex:1000}}>
                  <Pressable 
                  onPress={()=>{
                      setShowModalAmbilFotoDalamRumah(false);
                  }}
                  style={{backgroundColor:"black",position:"absolute",opacity:0.2,width:"100%",height:"100%",zIndex:999}}></Pressable>
                  <View style={{backgroundColor:"white",paddingBottom:EStyleSheet.value("20rem"),overflow:"hidden",width:Dimensions.get("screen").width-EStyleSheet.value("50rem"),height:EStyleSheet.value("300rem"),borderRadius:EStyleSheet.value("5rem"),zIndex:1000}}>
                      <View style={{height:EStyleSheet.value("50rem"),backgroundColor:"#f6f7fb",justifyContent:"center",alignItems:"center"}}>
                          <Text>Ambil Foto Dalam Rumah</Text>
                      </View>
                      <View style={{marginTop:EStyleSheet.value("20rem"),flex:1,paddingHorizontal:EStyleSheet.value("20rem")}}>
                          <Carousel>
                             {
                                 [1,2,3,4,5].map((item,index)=>{
                                     return (
                                        <View style={{backgroundColor:"whitesmoke",flex:1}}>
                                                <View style={{height:"100%",justifyContent:"center",alignItems:"center"}}>
                                                {
                                                    (fotoDalamRumah[index].uri) ?
                                                    <Image resizeMode="contain" style={{width:"100%",height:"100%"}} source={{uri:fotoDalamRumah[index].uri}}/>
                                                    :
                                                    <TouchableOpacity
                                                    onPress={async ()=>{
                                                        let capture = await ImagePicker.launchCameraAsync();

                                                    


                                                        if(!capture.cancelled){

                                                            const manipResult = await manipulateAsync(
                                                                capture.uri,
                                                                [
                                                                  { resize: {height:1200,width:800} },
                                                                ],
                                                                { compress: 1, format: SaveFormat.JPEG }
                                                              );

                                                            setFotoDalamRumah((prev)=>{
                                                                return prev.map((item,i)=>{
                                                                    if(i===index){
                                                                        return {
                                                                            ...item,
                                                                            uri:manipResult.uri
                                                                        }
                                                                    }
                                                                    return item;
                                                                })
                                                            })
                                                        }
                                                        
                                                    }}
                                                    >
                                                        <AntDesign name="camerao" size={EStyleSheet.value("80rem")} color="#e3e3e3" />
                                                    </TouchableOpacity>
                                                }
                                            </View>
                                        </View>
                                     )
                                 })
                             }
                          </Carousel>
                      </View>
                  </View>
              </View>
        }

        {
            (showModalAmbilViewJalan) &&
            <View style={{position:"absolute",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",zIndex:1000}}>
                <Pressable 
                onPress={()=>{
                    setShowModalAmbilViewJalan(false);
                }}
                style={{backgroundColor:"black",position:"absolute",opacity:0.2,width:"100%",height:"100%",zIndex:999}}></Pressable>
                <View style={{backgroundColor:"white",paddingBottom:EStyleSheet.value("20rem"),overflow:"hidden",width:Dimensions.get("screen").width-EStyleSheet.value("50rem"),height:EStyleSheet.value("300rem"),borderRadius:EStyleSheet.value("5rem"),zIndex:1000}}>
                    <View style={{height:EStyleSheet.value("50rem"),backgroundColor:"#f6f7fb",justifyContent:"center",alignItems:"center"}}>
                        <Text>Ambil Foto View Jalan</Text>
                    </View>
                    <View style={{marginTop:EStyleSheet.value("20rem"),flex:1,paddingHorizontal:EStyleSheet.value("20rem")}}>
                        <Carousel>
                            <View style={{backgroundColor:"whitesmoke",flex:1}}>
                                 <View style={{height:"100%",justifyContent:"center",alignItems:"center"}}>
                                    {
                                        (fotoViewJalan[0].uri) ?
                                        <Image resizeMode="contain" style={{width:"100%",height:"100%"}} source={{uri:fotoViewJalan[0].uri}}/>
                                        :
                                        <TouchableOpacity
                                        onPress={async ()=>{
                                            let capture = await ImagePicker.launchCameraAsync();
                                            if(!capture.cancelled){
                                                setFotoViewJalan((prev)=>{
                                                    return prev.map((item,index)=>{
                                                        if(index===0){
                                                            return {
                                                                ...item,
                                                                uri:capture.uri
                                                            }
                                                        }
                                                        return item;
                                                    })
                                                })
                                            }
                                            
                                        }}
                                        >
                                            <AntDesign name="camerao" size={EStyleSheet.value("80rem")} color="#e3e3e3" />
                                        </TouchableOpacity>
                                    }
                                </View>
                            </View>
                            <View style={{backgroundColor:"whitesmoke",flex:1}}>
                                <View style={{height:"100%",justifyContent:"center",alignItems:"center"}}>
                                    {
                                        (fotoViewJalan[1].uri) ?
                                        <Image resizeMode="contain" style={{width:"100%",height:"100%"}} source={{uri:fotoViewJalan[1].uri}}/>
                                        :
                                        <TouchableOpacity
                                        onPress={async ()=>{
                                            let capture = await ImagePicker.launchCameraAsync();
                                            if(!capture.cancelled){
                                                setFotoViewJalan((prev)=>{
                                                    return prev.map((item,index)=>{
                                                        if(index===1){
                                                            return {
                                                                ...item,
                                                                uri:capture.uri
                                                            }
                                                        }
                                                        return item;
                                                    })
                                                })
                                            }
                                            
                                        }}
                                        >
                                            <AntDesign name="camerao" size={EStyleSheet.value("80rem")} color="#e3e3e3" />
                                        </TouchableOpacity>
                                    }
                                </View>
                            </View>
                        </Carousel>
                    </View>
                </View>
            </View>
        }

        {
            (showModalAmbilKordinat) &&
            <View style={{position:"absolute",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",zIndex:1000}}>
                <Pressable 
                onPress={()=>{
                    setShowModalAmbilKordinat(false);
                }}
                style={{backgroundColor:"black",position:"absolute",opacity:0.2,width:"100%",height:"100%",zIndex:999}}></Pressable>
                <View style={{backgroundColor:"white",paddingBottom:EStyleSheet.value("20rem"),overflow:"hidden",width:Dimensions.get("screen").width-EStyleSheet.value("50rem"),borderRadius:EStyleSheet.value("5rem"),zIndex:1000}}>
                    <View style={{height:EStyleSheet.value("50rem"),backgroundColor:"#f6f7fb",justifyContent:"center",alignItems:"center"}}>
                        <Text>Ambil Kordinat GPS</Text>
                    </View>
                   <View style={{paddingVertical:EStyleSheet.value("15rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                       <TextInput editable={false} 
                       value={location.coords.latitude.toString()}
                       placeholder="Latitude"/>
                    </View>
                    <View style={{paddingVertical:EStyleSheet.value("15rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                       <TextInput editable={false} 
                       value={location.coords.longitude.toString()}
                       placeholder="Longitude"/>
                    </View>
                    <View style={{marginTop:EStyleSheet.value("5rem"),flexDirection:"row",paddingHorizontal:EStyleSheet.value("20rem")}}>
                        <TouchableOpacity 
                        activeOpacity={0.8}
                        onPress={async ()=>{
                            let { status } = await Location.requestForegroundPermissionsAsync();
                            if (status !== 'granted') {
                              alert('Permission to access location was denied');
                            }
                            else{
                                let enabled = await Location.hasServicesEnabledAsync();
                                if(enabled){
                                    let provider = await Location.enableNetworkProviderAsync();
                                     let location = await Location.getCurrentPositionAsync({});
    
                                    // let l = await Location.reverseGeocodeAsync({
                                    //     latitude:location.coords.latitude,
                                    //      longitude:location.coords.longitude
                                    // });
                                    setLocation(location);
                                }   
                                else{
                                    alert("Not supported service");
                                }
                                
    
                               
                            }   
                        }}
                        style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"whitesmoke",borderRadius:EStyleSheet.value("5rem"),paddingHorizontal:EStyleSheet.value("10rem"),marginRight:EStyleSheet.value("15rem"),paddingVertical:EStyleSheet.value("10rem")}}>
                            <Text>Ambil Kordinat</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        activeOpacity={0.8}
                        onPress={()=>{
                            const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
                            const latLng = `${location.coords.latitude},${location.coords.longitude}`;
                            const label = 'Cek Google Map';
                            const url = Platform.select({
                            ios: `${scheme}${label}@${latLng}`,
                            android: `${scheme}${latLng}(${label})`
                            });

                                
                            Linking.openURL(url);
                        }}  
                        style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"whitesmoke",borderRadius:EStyleSheet.value("5rem"),paddingHorizontal:EStyleSheet.value("10rem"),paddingVertical:EStyleSheet.value("10rem")}}>
                            <Text>Cek Google Map</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        }

        {
            (showModalAtasNamaPDAM) &&
            <View style={{position:"absolute",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",zIndex:1000}}>
                <Pressable 
                onPress={()=>{
                    setShowModalAtasNamaPDAM(false);
                }}
                style={{backgroundColor:"black",position:"absolute",opacity:0.2,width:"100%",height:"100%",zIndex:999}}></Pressable>
                <View style={{backgroundColor:"white",paddingBottom:EStyleSheet.value("10rem"),overflow:"hidden",width:Dimensions.get("screen").width-EStyleSheet.value("50rem"),borderRadius:EStyleSheet.value("5rem"),zIndex:1000}}>
                    <View style={{height:EStyleSheet.value("50rem"),backgroundColor:"#f6f7fb",justifyContent:"center",alignItems:"center"}}>
                        <Text>Isi Nomor & Atas Nama PDAM</Text>
                    </View>
                   <View style={{paddingVertical:EStyleSheet.value("15rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                       <TextInput editable={false} placeholder="Nomor"/>
                    </View>
                    <View style={{paddingVertical:EStyleSheet.value("15rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                       <TextInput editable={false} placeholder="Atas Nama"/>
                    </View>
                </View>
            </View>
        }

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
            (showSelectBisaAmprahPLN) &&
            <View style={{position:"absolute",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",zIndex:1000}}>
                <Pressable 
                onPress={()=>{
                    setShowSelectBisaAmprahPLN(false);
                }}
                style={{backgroundColor:"black",position:"absolute",opacity:0.2,width:"100%",height:"100%",zIndex:999}}></Pressable>
                <View style={{backgroundColor:"white",overflow:"hidden",width:Dimensions.get("screen").width-EStyleSheet.value("50rem"),borderRadius:EStyleSheet.value("5rem"),height:EStyleSheet.value("150rem"),zIndex:1000}}>
                    <View style={{height:EStyleSheet.value("50rem"),backgroundColor:"#f6f7fb",justifyContent:"center",alignItems:"center"}}>
                        <Text>Bisa Amparah PLN</Text>
                    </View>
                    <Pressable 
                    onPress={()=>{
                        setBisaAmprahPLN("Bisa");
                        setShowSelectBisaAmprahPLN(false);
                    }}
                    android_ripple={{
                        color:"#e8e8e8"
                    }}
                    style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <Text>Bisa</Text>
                    </Pressable>
                    <Pressable 
                        onPress={()=>{
                            setBisaAmprahPLN("Tidak bisa");
                            setShowSelectBisaAmprahPLN(false);
                        }}
                    android_ripple={{
                        color:"#e8e8e8"
                    }}
                    style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <Text>Tidak bisa</Text>
                    </Pressable>
                </View>
            </View>
        }

        {
            (showSelectBisaAmprahPDAM) &&
            <View style={{position:"absolute",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",zIndex:1000}}>
                <Pressable 
                onPress={()=>{
                    setShowSelectBisaAmprahPDAM(false);
                }}
                style={{backgroundColor:"black",position:"absolute",opacity:0.2,width:"100%",height:"100%",zIndex:999}}></Pressable>
                <View style={{backgroundColor:"white",overflow:"hidden",width:Dimensions.get("screen").width-EStyleSheet.value("50rem"),borderRadius:EStyleSheet.value("5rem"),height:EStyleSheet.value("150rem"),zIndex:1000}}>
                    <View style={{height:EStyleSheet.value("50rem"),backgroundColor:"#f6f7fb",justifyContent:"center",alignItems:"center"}}>
                        <Text>Bisa Amparah PDAM</Text>
                    </View>
                    <Pressable 
                    onPress={()=>{
                        setBisaAmprahPDAM("Bisa");
                        setShowSelectBisaAmprahPDAM(false);
                    }}
                    android_ripple={{
                        color:"#e8e8e8"
                    }}
                    style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <Text>Bisa</Text>
                    </Pressable>
                    <Pressable 
                        onPress={()=>{
                            setBisaAmprahPDAM("Tidak bisa");
                            setShowSelectBisaAmprahPDAM(false);
                        }}
                    android_ripple={{
                        color:"#e8e8e8"
                    }}
                    style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <Text>Tidak bisa</Text>
                    </Pressable>
                </View>
            </View>
        }

        {
            (showSelectAdaPLN) &&
            <View style={{position:"absolute",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",zIndex:1000}}>
                <Pressable 
                onPress={()=>{
                    setShowSelectAdaPLN(true);
                }}
                style={{backgroundColor:"black",position:"absolute",opacity:0.2,width:"100%",height:"100%",zIndex:999}}></Pressable>
                <View style={{backgroundColor:"white",overflow:"hidden",width:Dimensions.get("screen").width-EStyleSheet.value("50rem"),borderRadius:EStyleSheet.value("5rem"),height:EStyleSheet.value("150rem"),zIndex:1000}}>
                    <View style={{height:EStyleSheet.value("50rem"),backgroundColor:"#f6f7fb",justifyContent:"center",alignItems:"center"}}>
                        <Text>Ada PLN</Text>
                    </View>
                    <Pressable 
                    onPress={()=>{
                        setAdaPLN("Ada");
                        setShowSelectAdaPLN(false);
                    }}
                    android_ripple={{
                        color:"#e8e8e8"
                    }}
                    style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <Text>Ada</Text>
                    </Pressable>
                    <Pressable 
                        onPress={()=>{
                            setAdaPLN("Tidak ada");
                            setShowSelectAdaPLN(false);
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
                        <Text>Butuh Perbaikan</Text>
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
                       <TextInput editable={false} placeholder="Nomor"/>
                    </View>
                    <View style={{paddingVertical:EStyleSheet.value("15rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                       <TextInput editable={false} placeholder="Tanggal"/>
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
                        <TextInput editable={false} 
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
                             <TextInput editable={false} 
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
            <Text style={{fontSize:EStyleSheet.value("16rem"),color:"#a9adb8"}}>Isikan form survey awal berikut</Text>
        </View>
       <ScrollView>
       <View style={{paddingVertical:EStyleSheet.value("10rem"),backgroundColor:"#f6f7fb",borderTopWidth:1,borderColor:"#e8e8e8",paddingHorizontal:EStyleSheet.value("25rem")}}>
            <Text style={{color:"#2d2d2a",fontFamily:"NunitoBold",letterSpacing:1.1}}>INFORMASI PENJUAL</Text>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>Nama (Sesuai KTP)</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TextInput editable={false} 
                onChangeText={(text)=>{
                    setInformasiPenjual((prev)=>{
                        return {
                            ...prev,
                            nama:text
                        }
                    })
                }}
                value={informasiPenjual.nama}
                style={{flex:1}} placeholder='Nama (Sesuai KTP)'/>
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>Alamat</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TextInput editable={false} 
                onChangeText={(text)=>{
                    setInformasiPenjual((prev)=>{
                        return {
                            ...prev,
                            alamat:{
                                ...prev.alamat,
                                line1:text
                            }
                        }
                    })
                }}
                value={informasiPenjual.alamat.line1}
                placeholder='Line 1'/>
                <TextInput editable={false} 
                  onChangeText={(text)=>{
                    setInformasiPenjual((prev)=>{
                        return {
                            ...prev,
                            alamat:{
                                ...prev.alamat,
                                line2:text
                            }
                        }
                    })
                }}
                value={informasiPenjual.alamat.line2}
                placeholder='Line 2'/>
                <TextInput editable={false} 
                  onChangeText={(text)=>{
                    setInformasiPenjual((prev)=>{
                        return {
                            ...prev,
                            alamat:{
                                ...prev.alamat,
                                rtrw:text
                            }
                        }
                    })
                }}
                value={informasiPenjual.alamat.rtrw}
                placeholder='RT/RW'/>
                <TextInput editable={false} 
                  onChangeText={(text)=>{
                    setInformasiPenjual((prev)=>{
                        return {
                            ...prev,
                            alamat:{
                                ...prev.alamat,
                                keldesa:text
                            }
                        }
                    })
                }}
                value={informasiPenjual.alamat.keldesa}
                placeholder='Kel/Desa'/>
                <TextInput editable={false} 
                  onChangeText={(text)=>{
                    setInformasiPenjual((prev)=>{
                        return {
                            ...prev,
                            alamat:{
                                ...prev.alamat,
                                kecamatan:text
                            }
                        }
                    })
                }}
                value={informasiPenjual.alamat.kecamatan}
                placeholder='Kecamatan'/>
                <TextInput editable={false} 
                  onChangeText={(text)=>{
                    setInformasiPenjual((prev)=>{
                        return {
                            ...prev,
                            alamat:{
                                ...prev.alamat,
                                kabupatenkota:text
                            }
                        }
                    })
                }}
                value={informasiPenjual.alamat.kabupatenkota}
                placeholder='Kabupaten/Kota'/>
                <TextInput editable={false} 
                  onChangeText={(text)=>{
                    setInformasiPenjual((prev)=>{
                        return {
                            ...prev,
                            alamat:{
                                ...prev.alamat,
                                provinsi:text
                            }
                        }
                    })
                }}
                value={informasiPenjual.alamat.provinsi}
                placeholder='Provinsi'/>
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>Objek</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"column",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                    <TouchableOpacity 
                    activeOpacity={0.7}
                    onPress={()=>{
                        //setShowSelectObjek(true);
                    }}
                    style={{flexDirection:"row"}}>
                        <View style={{borderBottomWidth:1,flex:1,alignItems:"center",paddingBottom:EStyleSheet.value("5rem"),borderColor:"#e8e8e8",flexDirection:"row",justifyContent:"space-between"}}>
                            <Text>{objek}</Text>
                            <AntDesign name="caretdown" size={EStyleSheet.value("10rem")} color="grey" />
                        </View>
                    </TouchableOpacity>
                    {/* {
                   (adaIMB==="Ada") &&
                        <TouchableOpacity
                        activeOpacity={0.6} 
                        onPress={()=>{
                            setShowIsiNoTglIMB(true);
                        }}
                        style={{justifyContent:"center",width:"100%",borderRadius:EStyleSheet.value("5rem"),marginTop:EStyleSheet.value("5rem"),paddingVertical:EStyleSheet.value("3rem"),backgroundColor:"#f6f7fb",alignItems:"center"}}>
                            <Text style={{color:"black"}}>Isi No. & Tgl</Text>
                        </TouchableOpacity>
                    } */}
            </View>
        </View>
        {
            (objek==="Rumah") &&
            <View>
        <View style={{paddingVertical:EStyleSheet.value("10rem"),backgroundColor:"#f6f7fb",borderTopWidth:1,borderColor:"#e8e8e8",paddingHorizontal:EStyleSheet.value("25rem")}}>
            <Text style={{color:"#2d2d2a",fontFamily:"NunitoBold",letterSpacing:1.1}}>INFORMASI TENTANG RUMAH</Text>
        </View>
        <View style={{paddingVertical:EStyleSheet.value("10rem"),backgroundColor:"#f6f7fb",borderTopWidth:1,borderColor:"#e8e8e8",paddingHorizontal:EStyleSheet.value("25rem")}}>
            <Text style={{color:"#2d2d2a",fontFamily:"NunitoBold",letterSpacing:1.1}}>A. Alamat Objek</Text>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>Alamat</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TextInput editable={false} 
                 onChangeText={(text)=>{
                    setAlamatObjek((prev)=>{
                        return {
                            ...prev,
                            line1:text
                        }
                    })
                }}
                value={alamatObjek.line1}
                placeholder='Line 1'/>
                <TextInput editable={false} 
                onChangeText={(text)=>{
                    setAlamatObjek((prev)=>{
                        return {
                            ...prev,
                            line2:text
                        }
                    })
                }}
                value={alamatObjek.line2}
                placeholder='Line 2'/>
                <TextInput editable={false} 
                onChangeText={(text)=>{
                    setAlamatObjek((prev)=>{
                        return {
                            ...prev,
                            rtrw:text
                        }
                    })
                }}
                value={alamatObjek.rtrw}
                placeholder='RT/RW'/>
                <TextInput editable={false} 
                onChangeText={(text)=>{
                    setAlamatObjek((prev)=>{
                        return {
                            ...prev,
                            keldesa:text
                        }
                    })
                }}
                value={alamatObjek.keldesa}
                placeholder='Kel/Desa'/>
                <TextInput editable={false} 
                onChangeText={(text)=>{
                    setAlamatObjek((prev)=>{
                        return {
                            ...prev,
                            kecamatan:text
                        }
                    })
                }}
                value={alamatObjek.kecamatan}
                placeholder='Kecamatan'/>
                <TextInput editable={false} 
                onChangeText={(text)=>{
                    setAlamatObjek((prev)=>{
                        return {
                            ...prev,
                            kabupatenkota:text
                        }
                    })
                }}
                value={alamatObjek.kabupatenkota}
                placeholder='Kabupaten/Kota'/>
                <TextInput editable={false} 
                onChangeText={(text)=>{
                    setAlamatObjek((prev)=>{
                        return {
                            ...prev,
                            provinsi:text
                        }
                    })
                }}
                value={alamatObjek.provinsi}
                placeholder='Provinsi'/>
            </View>
        </View>
        <View style={{paddingVertical:EStyleSheet.value("10rem"),backgroundColor:"#f6f7fb",borderTopWidth:1,borderColor:"#e8e8e8",paddingHorizontal:EStyleSheet.value("25rem")}}>
            <Text style={{color:"#2d2d2a",fontFamily:"NunitoBold",letterSpacing:1.1}}>B. Arsitektur Rumah</Text>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>Luas Tanah (M2)</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TextInput editable={false} 
                onChangeText={(text)=>{
                    setArsitekturRumah((prev)=>{
                        return {
                            ...prev,
                            luastanah:text
                        }
                    })
                }}
                value={arsitekturRumah.luastanah}
                style={{flex:1}} placeholder='Luas Tanah'/>
                <Text style={{marginLeft:EStyleSheet.value("10rem")}}>M2</Text>
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>Luas Bangunan (M2)</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TextInput editable={false} 
                 onChangeText={(text)=>{
                    setArsitekturRumah((prev)=>{
                        return {
                            ...prev,
                            luasbangunan:text
                        }
                    })
                }}
                value={arsitekturRumah.luasbangunan}
                style={{flex:1}} placeholder='Luas Bangunan'/>
                <Text style={{marginLeft:EStyleSheet.value("10rem")}}>M2</Text>
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>Jumlah KT</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TextInput editable={false} 
                 onChangeText={(text)=>{
                    setArsitekturRumah((prev)=>{
                        return {
                            ...prev,
                            jumlahKT:text
                        }
                    })
                }}
                value={arsitekturRumah.jumlahKT}
                style={{flex:1}} placeholder='Jumlah KT'/>
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>Jumlah KM</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TextInput editable={false} 
                 onChangeText={(text)=>{
                    setArsitekturRumah((prev)=>{
                        return {
                            ...prev,
                            jumlahKM:text
                        }
                    })
                }}
                value={arsitekturRumah.jumlahKM}
                style={{flex:1}} placeholder='Jumlah KM'/>
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
                    //setSelectGarasiExist(true);
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
        {/* <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>Surat Tanah Atas Nama</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TextInput editable={false} style={{flex:1}} placeholder='Surat Tanah Atas Nama'/>
            </View>
        </View> */}
        {/* <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
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
        </View> */}
        {/* <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
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
        </View> */}
        {/* <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
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
        </View> */}
         <View style={{paddingVertical:EStyleSheet.value("10rem"),backgroundColor:"#f6f7fb",borderTopWidth:1,borderColor:"#e8e8e8",paddingHorizontal:EStyleSheet.value("25rem")}}>
            <Text style={{color:"#2d2d2a",fontFamily:"NunitoBold",letterSpacing:1.1}}>C. Keadaan Rumah</Text>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>Kapan Kira" Dibangun</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                    <TouchableOpacity 
                    activeOpacity={0.7}
                    onPress={()=>{
                        //setShowSelectKapanDibangun(true);
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
                <Text>Butuh Perbaikan</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                    <TouchableOpacity 
                    activeOpacity={0.7}
                    onPress={()=>{
                        //setShowSelectKondisiRumah(true);
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
                <Text>Kebersihan & Kerapihan</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                    <TouchableOpacity 
                    activeOpacity={0.7}
                    onPress={()=>{
                        //setshowSelectKebersihanDanKerapihan(true);
                    }}
                    style={{flexDirection:"row"}}>
                        <View style={{borderBottomWidth:1,flex:1,alignItems:"center",paddingBottom:EStyleSheet.value("5rem"),borderColor:"#e8e8e8",flexDirection:"row",justifyContent:"space-between"}}>
                            <Text>{kebersihandankerapihan}</Text>
                            <AntDesign name="caretdown" size={EStyleSheet.value("10rem")} color="grey" />
                        </View>
                    </TouchableOpacity>
            </View>
        </View>
        <View style={{paddingVertical:EStyleSheet.value("10rem"),backgroundColor:"#f6f7fb",borderTopWidth:1,borderColor:"#e8e8e8",paddingHorizontal:EStyleSheet.value("25rem")}}>
            <Text style={{color:"#2d2d2a",fontFamily:"NunitoBold",letterSpacing:1.1}}>D. Fasilitas</Text>
        </View>
        {/* <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>No. ID PLN</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TextInput editable={false} style={{flex:1}} placeholder='No. ID PLN'/>
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>ID PLN Atas Nama</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TextInput editable={false} style={{flex:1}} placeholder='ID PLN Atas Nama'/>
            </View>
        </View> */}
         <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>Tersambung PLN</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"column",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TouchableOpacity 
                activeOpacity={0.7}
                onPress={()=>{
                   //setShowSelectAdaPLN(true);
                }}
                style={{flexDirection:"row"}}>
                    <View style={{borderBottomWidth:1,flex:1,alignItems:"center",paddingBottom:EStyleSheet.value("5rem"),borderColor:"#e8e8e8",flexDirection:"row",justifyContent:"space-between"}}>
                        <Text>{adaPLN}</Text>
                        <AntDesign name="caretdown" size={EStyleSheet.value("10rem")} color="grey" />
                    </View>
                </TouchableOpacity>
               {/* {
                   (adaPDAM==="Ada") &&
                   <TouchableOpacity
                   activeOpacity={0.6} 
                   onPress={()=>{
                       setShowModalAtasNamaPDAM(true);
                   }}
                   style={{justifyContent:"center",borderRadius:EStyleSheet.value("5rem"),marginTop:EStyleSheet.value("5rem"),paddingVertical:EStyleSheet.value("3rem"),backgroundColor:"#f6f7fb",alignItems:"center"}}>
                       <Text style={{color:"black"}}>No, atas nama</Text>
                   </TouchableOpacity>
               } */}
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>Tersambung PDAM</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"column",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TouchableOpacity 
                activeOpacity={0.7}
                onPress={()=>{
                    //setShowSelectAdaPDAM(true);
                }}
                style={{flexDirection:"row"}}>
                    <View style={{borderBottomWidth:1,flex:1,alignItems:"center",paddingBottom:EStyleSheet.value("5rem"),borderColor:"#e8e8e8",flexDirection:"row",justifyContent:"space-between"}}>
                        <Text>{adaPDAM}</Text>
                        <AntDesign name="caretdown" size={EStyleSheet.value("10rem")} color="grey" />
                    </View>
                </TouchableOpacity>
               {/* {
                   (adaPDAM==="Ada") &&
                   <TouchableOpacity
                   activeOpacity={0.6} 
                   onPress={()=>{
                       setShowModalAtasNamaPDAM(true);
                   }}
                   style={{justifyContent:"center",borderRadius:EStyleSheet.value("5rem"),marginTop:EStyleSheet.value("5rem"),paddingVertical:EStyleSheet.value("3rem"),backgroundColor:"#f6f7fb",alignItems:"center"}}>
                       <Text style={{color:"black"}}>No, atas nama</Text>
                   </TouchableOpacity>
               } */}
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>Ada Sinyal Internet</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"column",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TouchableOpacity 
                activeOpacity={0.7}
                onPress={()=>{
                    //setShowSelectAdaSinyalInternet(true);
                }}
                style={{flexDirection:"row"}}>
                    <View style={{borderBottomWidth:1,flex:1,alignItems:"center",paddingBottom:EStyleSheet.value("5rem"),borderColor:"#e8e8e8",flexDirection:"row",justifyContent:"space-between"}}>
                        <Text>{adasinyalinternet}</Text>
                        <AntDesign name="caretdown" size={EStyleSheet.value("10rem")} color="grey" />
                    </View>
                </TouchableOpacity>
               {/* {
                   (adaPDAM==="Ada") &&
                   <TouchableOpacity
                   activeOpacity={0.6} 
                   onPress={()=>{
                       setShowModalAtasNamaPDAM(true);
                   }}
                   style={{justifyContent:"center",borderRadius:EStyleSheet.value("5rem"),marginTop:EStyleSheet.value("5rem"),paddingVertical:EStyleSheet.value("3rem"),backgroundColor:"#f6f7fb",alignItems:"center"}}>
                       <Text style={{color:"black"}}>No, atas nama</Text>
                   </TouchableOpacity>
               } */}
            </View>
        </View>
        <View style={{paddingVertical:EStyleSheet.value("10rem"),backgroundColor:"#f6f7fb",borderTopWidth:1,borderColor:"#e8e8e8",paddingHorizontal:EStyleSheet.value("25rem")}}>
            <Text style={{color:"#2d2d2a",fontFamily:"NunitoBold",letterSpacing:1.1}}>E. Aksesbilitas</Text>
        </View>
        {/* <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>Lingkungan</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TextInput editable={false} style={{flex:1}} placeholder='Lingkungan'/>
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>Riwayat Properti</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TextInput editable={false} multiline={true} style={{flex:1}} placeholder='Riwayat Properti'/>
            </View>
        </View> */}
         <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>Jalan</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                    <TouchableOpacity 
                    activeOpacity={0.7}
                    onPress={()=>{
                        //setShowSelectJalan(true);
                    }}
                    style={{flexDirection:"row"}}>
                        <View style={{borderBottomWidth:1,flex:1,alignItems:"center",paddingBottom:EStyleSheet.value("5rem"),borderColor:"#e8e8e8",flexDirection:"row",justifyContent:"space-between"}}>
                            <Text>{jalan}</Text>
                            <AntDesign name="caretdown" size={EStyleSheet.value("10rem")} color="grey" />
                        </View>
                    </TouchableOpacity>
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>Jalan Masuk</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                    <TouchableOpacity 
                    activeOpacity={0.7}
                    onPress={()=>{
                        //setShowSelectJalanMasuk(true);
                    }}
                    style={{flexDirection:"row"}}>
                        <View style={{borderBottomWidth:1,flex:1,alignItems:"center",paddingBottom:EStyleSheet.value("5rem"),borderColor:"#e8e8e8",flexDirection:"row",justifyContent:"space-between"}}>
                            <Text>{jalanmasuk}</Text>
                            <AntDesign name="caretdown" size={EStyleSheet.value("10rem")} color="grey" />
                        </View>
                    </TouchableOpacity>
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>Pasar Terdekat</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TextInput editable={false} 
                onChangeText={(text)=>{
                    setAksesbilitas((prev)=>{
                        return {
                            ...prev,
                            pasarterdekat:text
                        }
                    })
                }}
                value={aksesbilitas.pasarterdekat}
                style={{flex:1}} placeholder='Pasar Terdekat'/>
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>Sekolah Terdekat</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TextInput editable={false} 
                 onChangeText={(text)=>{
                    setAksesbilitas((prev)=>{
                        return {
                            ...prev,
                            sekolahterdekat:text
                        }
                    })
                }}
                value={aksesbilitas.sekolahterdekat}
                style={{flex:1}} placeholder='Sekolah Terdekat'/>
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text style={{paddingRight:EStyleSheet.value("20rem")}}>Stasiun KA/halte bus terdekat</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TextInput editable={false} 
                 onChangeText={(text)=>{
                    setAksesbilitas((prev)=>{
                        return {
                            ...prev,
                            stasiunkaterdekat:text
                        }
                    })
                }}
                value={aksesbilitas.stasiunkaterdekat}
                style={{flex:1}} placeholder='Stasiun KA/halte bus terdekat'/>
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text style={{paddingRight:EStyleSheet.value("20rem")}}>Jarak ke jalur bis/mikrolet terdekat</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TextInput editable={false} 
                 onChangeText={(text)=>{
                    setAksesbilitas((prev)=>{
                        return {
                            ...prev,
                            jarakkejalurbis:text
                        }
                    })
                }}
                value={aksesbilitas.jarakkejalurbis}
                style={{flex:1}} placeholder='Jarak ke jalur bis/mikrolet terdekat'/>
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text style={{paddingRight:EStyleSheet.value("20rem")}}>Jalur Bus/Mikrolet No.</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TextInput editable={false} 
                 onChangeText={(text)=>{
                    setAksesbilitas((prev)=>{
                        return {
                            ...prev,
                            jalurbus:text
                        }
                    })
                }}
                value={aksesbilitas.jalurbus}
                style={{flex:1}} placeholder='Jalur Bus/Mikrolet No.'/>
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text style={{paddingRight:EStyleSheet.value("20rem")}}>Perumahan/Kompleks Perumahan Terdekat</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TextInput editable={false} 
                 onChangeText={(text)=>{
                    setAksesbilitas((prev)=>{
                        return {
                            ...prev,
                            perumahanterdekat:text
                        }
                    })
                }}
                value={aksesbilitas.perumahanterdekat}
                style={{flex:1}} placeholder='Perumahan/Kompleks Perumahan Terdekat'/>
            </View>
        </View>
        <View style={{paddingVertical:EStyleSheet.value("10rem"),backgroundColor:"#f6f7fb",borderTopWidth:1,borderColor:"#e8e8e8",paddingHorizontal:EStyleSheet.value("25rem")}}>
            <Text style={{color:"#2d2d2a",fontFamily:"NunitoBold",letterSpacing:1.1}}>F. Suasana Lingkungan</Text>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>Rawan Banjir</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                    <TouchableOpacity 
                    activeOpacity={0.7}
                    onPress={()=>{
                        //setShowSelectRawanBanjir(true);
                    }}
                    style={{flexDirection:"row"}}>
                        <View style={{borderBottomWidth:1,flex:1,alignItems:"center",paddingBottom:EStyleSheet.value("5rem"),borderColor:"#e8e8e8",flexDirection:"row",justifyContent:"space-between"}}>
                            <Text>{rawanbanjir}</Text>
                            <AntDesign name="caretdown" size={EStyleSheet.value("10rem")} color="grey" />
                        </View>
                    </TouchableOpacity>
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>Keamanan</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                    <TouchableOpacity 
                    activeOpacity={0.7}
                    onPress={()=>{
                        //setshowSelectKeamanan(true);
                    }}
                    style={{flexDirection:"row"}}>
                        <View style={{borderBottomWidth:1,flex:1,alignItems:"center",paddingBottom:EStyleSheet.value("5rem"),borderColor:"#e8e8e8",flexDirection:"row",justifyContent:"space-between"}}>
                            <Text>{keamanan}</Text>
                            <AntDesign name="caretdown" size={EStyleSheet.value("10rem")} color="grey" />
                        </View>
                    </TouchableOpacity>
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>Kebersihan</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                    <TouchableOpacity 
                    activeOpacity={0.7}
                    onPress={()=>{
                        //setShowSelectKebersihan(true);
                    }}
                    style={{flexDirection:"row"}}>
                        <View style={{borderBottomWidth:1,flex:1,alignItems:"center",paddingBottom:EStyleSheet.value("5rem"),borderColor:"#e8e8e8",flexDirection:"row",justifyContent:"space-between"}}>
                            <Text>{kebersihan}</Text>
                            <AntDesign name="caretdown" size={EStyleSheet.value("10rem")} color="grey" />
                        </View>
                    </TouchableOpacity>
            </View>
        </View>
        <View style={{paddingVertical:EStyleSheet.value("10rem"),backgroundColor:"#f6f7fb",borderTopWidth:1,borderColor:"#e8e8e8",paddingHorizontal:EStyleSheet.value("25rem")}}>
            <Text style={{color:"#2d2d2a",fontFamily:"NunitoBold",letterSpacing:1.1}}>G. Harga</Text>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text style={{paddingRight:EStyleSheet.value("20rem")}}>Permintaan Penjual</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TextInput editable={false} 
                 onChangeText={(text)=>{
                    setHarga((prev)=>{
                        return {
                            ...prev,
                            permintaanpenjual:text
                        }
                    })
                }}
                value={harga.permintaanpenjual}
                multiline={true} style={{flex:1}} placeholder='Harga Permintaan'/>
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text style={{paddingRight:EStyleSheet.value("20rem")}}>Harga Pasar</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TextInput editable={false} 
                 onChangeText={(text)=>{
                    setHarga((prev)=>{
                        return {
                            ...prev,
                            hargapasar:text
                        }
                    })
                }}
                value={harga.hargapasar}
                multiline={true} style={{flex:1}} placeholder='Harga Pasar'/>
            </View>
        </View>
        <View style={{paddingVertical:EStyleSheet.value("10rem"),backgroundColor:"#f6f7fb",borderTopWidth:1,borderColor:"#e8e8e8",paddingHorizontal:EStyleSheet.value("25rem")}}>
            <Text style={{color:"#2d2d2a",fontFamily:"NunitoBold",letterSpacing:1.1}}>H. Foto & Geolokasi</Text>
        </View>
        {/* <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text style={{paddingRight:EStyleSheet.value("20rem")}}>Pros</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TextInput editable={false} multiline={true} style={{flex:1}} placeholder='Pros'/>
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text style={{paddingRight:EStyleSheet.value("20rem")}}>Cons</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TextInput editable={false} multiline={true} style={{flex:1}} placeholder='Cons'/>
            </View>
        </View> */}
       
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text style={{paddingRight:EStyleSheet.value("20rem")}}>Foto tampak dari jalan</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                    <TouchableOpacity
                    activeOpacity={0.6} 
                    onPress={()=>{
                        setShowModalAmbilFotoTampakDariJalan(true);
                    }}
                    style={{justifyContent:"center",width:"100%",borderRadius:EStyleSheet.value("5rem"),marginTop:EStyleSheet.value("5rem"),paddingVertical:EStyleSheet.value("3rem"),backgroundColor:"#f6f7fb",alignItems:"center"}}>
                        <Text style={{color:"black"}}>Ambil Foto</Text>
                    </TouchableOpacity>
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text style={{paddingRight:EStyleSheet.value("20rem")}}>Foto tampak depan</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                    <TouchableOpacity
                    activeOpacity={0.6} 
                    onPress={()=>{
                        setShowModalAmbilFotoTampakDepan(true);
                    }}
                    style={{justifyContent:"center",width:"100%",borderRadius:EStyleSheet.value("5rem"),marginTop:EStyleSheet.value("5rem"),paddingVertical:EStyleSheet.value("3rem"),backgroundColor:"#f6f7fb",alignItems:"center"}}>
                        <Text style={{color:"black"}}>Ambil Foto</Text>
                    </TouchableOpacity>
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text style={{paddingRight:EStyleSheet.value("20rem")}}>Foto dalam rumah</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                    <TouchableOpacity
                    activeOpacity={0.6} 
                    onPress={()=>{
                        setShowModalAmbilFotoDalamRumah(true);
                    }}
                    style={{justifyContent:"center",width:"100%",borderRadius:EStyleSheet.value("5rem"),marginTop:EStyleSheet.value("5rem"),paddingVertical:EStyleSheet.value("3rem"),backgroundColor:"#f6f7fb",alignItems:"center"}}>
                        <Text style={{color:"black"}}>Ambil Foto</Text>
                    </TouchableOpacity>
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text style={{paddingRight:EStyleSheet.value("20rem")}}>Google Maps</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                    <TouchableOpacity
                    activeOpacity={0.6} 
                    onPress={async()=>{
                        let { status } = await Location.requestForegroundPermissionsAsync();
                        if (status !== 'granted') {
                          alert('Permission to access location was denied');
                        }
                        else{
                            let enabled = await Location.hasServicesEnabledAsync();
                            if(enabled){
                                let provider = await Location.enableNetworkProviderAsync();
                                 let location = await Location.getCurrentPositionAsync({});

                                // let l = await Location.reverseGeocodeAsync({
                                //     latitude:location.coords.latitude,
                                //      longitude:location.coords.longitude
                                // });
                                setLocation(location);
                                setShowModalAmbilKordinat(true);
                            }   
                            else{
                                alert("Not supported service");
                            }
                            

                           
                        }   
                        
                    }}
                    style={{justifyContent:"center",width:"100%",borderRadius:EStyleSheet.value("5rem"),marginTop:EStyleSheet.value("5rem"),paddingVertical:EStyleSheet.value("3rem"),backgroundColor:"#f6f7fb",alignItems:"center"}}>
                        <Text style={{color:"black"}}>Ambil Kordinat</Text>
                    </TouchableOpacity>
            </View>
        </View>
        {/* <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text style={{paddingRight:EStyleSheet.value("20rem")}}>FC Surat Kepemilikan Tanah</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                    <TouchableOpacity
                    activeOpacity={0.6} 
                    onPress={()=>{
                        setShowModalSuratKepemilikan(true);
                    }}
                    style={{justifyContent:"center",width:"100%",borderRadius:EStyleSheet.value("5rem"),marginTop:EStyleSheet.value("5rem"),paddingVertical:EStyleSheet.value("3rem"),backgroundColor:"#f6f7fb",alignItems:"center"}}>
                        <Text style={{color:"black"}}>Ambil Foto</Text>
                    </TouchableOpacity>
            </View>
        </View> */}
        {/* <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>Ada PBB</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"column",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TouchableOpacity 
                activeOpacity={0.7}
                onPress={()=>{
                    setShowSelectAdaPBB(true);
                }}
                style={{flexDirection:"row"}}>
                    <View style={{borderBottomWidth:1,flex:1,alignItems:"center",paddingBottom:EStyleSheet.value("5rem"),borderColor:"#e8e8e8",flexDirection:"row",justifyContent:"space-between"}}>
                        <Text>{adaPBB}</Text>
                        <AntDesign name="caretdown" size={EStyleSheet.value("10rem")} color="grey" />
                    </View>
                </TouchableOpacity>
               {
                   (adaPBB==="Ada") &&
                   <TouchableOpacity
                   activeOpacity={0.6} 
                   onPress={()=>{
                       setShowModalDetailPBB(true);
                   }}
                   style={{justifyContent:"center",borderRadius:EStyleSheet.value("5rem"),marginTop:EStyleSheet.value("5rem"),paddingVertical:EStyleSheet.value("3rem"),backgroundColor:"#f6f7fb",alignItems:"center"}}>
                       <Text style={{color:"black"}}>Detail PBB</Text>
                   </TouchableOpacity>
               }
            </View>
        </View> */}
       
        {/* <View style={{paddingVertical:EStyleSheet.value("10rem"),backgroundColor:"#f6f7fb",borderTopWidth:1,borderColor:"#e8e8e8",paddingHorizontal:EStyleSheet.value("25rem")}}>
            <Text style={{color:"#2d2d2a",fontFamily:"NunitoBold",letterSpacing:1.1}}>INFORMASI TENTANG PENJUAL</Text>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text style={{paddingRight:EStyleSheet.value("20rem")}}>Nama Penjual</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TextInput editable={false} multiline={true} style={{flex:1}} placeholder='Nama Penjual'/>
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text style={{paddingRight:EStyleSheet.value("20rem")}}>NIK</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TextInput editable={false} multiline={true} style={{flex:1}} placeholder='NIK'/>
            </View>
        </View> */}
        {/* <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text style={{paddingRight:EStyleSheet.value("20rem")}}>FC KTP</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                    <TouchableOpacity
                    activeOpacity={0.6} 
                    onPress={()=>{
                       // setShowModalAmbilViewJalan(true);
                    }}
                    style={{justifyContent:"center",width:"100%",borderRadius:EStyleSheet.value("5rem"),marginTop:EStyleSheet.value("5rem"),paddingVertical:EStyleSheet.value("3rem"),backgroundColor:"#f6f7fb",alignItems:"center"}}>
                        <Text style={{color:"black"}}>Ambil Foto</Text>
                    </TouchableOpacity>
            </View>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text style={{paddingRight:EStyleSheet.value("20rem")}}>FC KK</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                    <TouchableOpacity
                    activeOpacity={0.6} 
                    onPress={()=>{
                        //setShowModalAmbilViewJalan(true);
                    }}
                    style={{justifyContent:"center",width:"100%",borderRadius:EStyleSheet.value("5rem"),marginTop:EStyleSheet.value("5rem"),paddingVertical:EStyleSheet.value("3rem"),backgroundColor:"#f6f7fb",alignItems:"center"}}>
                        <Text style={{color:"black"}}>Ambil Foto</Text>
                    </TouchableOpacity>
            </View>
        </View> */}
        {/* <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>Alamat Sesuai KTP</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TextInput editable={false} placeholder='Line 1'/>
                <TextInput editable={false} placeholder='Line 2'/>
                <TextInput editable={false} placeholder='RT/RW'/>
                <TextInput editable={false} placeholder='Kel/Desa'/>
                <TextInput editable={false} placeholder='Kecamatan'/>
                <TextInput editable={false} placeholder='Kabupaten/Kota'/>
                <TextInput editable={false} placeholder='Provinsi'/>
            </View>
        </View> */}
        {/* <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>Alamat Domisili</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TextInput editable={false} placeholder='Sama dengan alamat KTP'/>
                <TextInput editable={false} placeholder='Beda dengan alamat KTP'/>
                <TextInput editable={false} placeholder='RT/RW'/>
                <TextInput editable={false} placeholder='Kel/Desa'/>
                <TextInput editable={false} placeholder='Kecamatan'/>
                <TextInput editable={false} placeholder='Kabupaten/Kota'/>
                <TextInput editable={false} placeholder='Provinsi'/>
            </View>
        </View> */}
        {/* <View style={{paddingVertical:EStyleSheet.value("20rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
            <Pressable 
            android_ripple={{
                color:"white"
            }}
            onPress={()=>{
                setYakinSubmitModal(true);
            }}
            style={{height:EStyleSheet.value("40rem"),justifyContent:"center",alignItems:"center",backgroundColor:"#e8e8e8",borderRadius:EStyleSheet.value("7rem")}}>
                <Text>Simpan</Text>
            </Pressable>
        </View> */}
        </View> 
        }
        {
            (objek==="Tanah") &&
            <View>
                <View style={{paddingVertical:EStyleSheet.value("10rem"),backgroundColor:"#f6f7fb",borderTopWidth:1,borderColor:"#e8e8e8",paddingHorizontal:EStyleSheet.value("25rem")}}>
                    <Text style={{color:"#2d2d2a",fontFamily:"NunitoBold",letterSpacing:1.1}}>INFORMASI TENTANG TANAH</Text>
                </View>
                <View style={{paddingVertical:EStyleSheet.value("10rem"),backgroundColor:"#f6f7fb",borderTopWidth:1,borderColor:"#e8e8e8",paddingHorizontal:EStyleSheet.value("25rem")}}>
                    <Text style={{color:"#2d2d2a",fontFamily:"NunitoBold",letterSpacing:1.1}}>A. Alamat Objek</Text>
                </View>
                <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
                    <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                        <Text>Alamat</Text>
                    </View>
                    <View style={{flex:1,backgroundColor:"white",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                        <TextInput editable={false} 
                        onChangeText={(text)=>{
                            setAlamatObjek((prev)=>{
                                return {
                                    ...prev,
                                    line1:text
                                }
                            })
                        }}
                        value={alamatObjek.line1}
                        placeholder='Line 1'/>
                        <TextInput editable={false} 
                        onChangeText={(text)=>{
                            setAlamatObjek((prev)=>{
                                return {
                                    ...prev,
                                    line2:text
                                }
                            })
                        }}
                        value={alamatObjek.line2}
                        placeholder='Line 2'/>
                        <TextInput editable={false} 
                        onChangeText={(text)=>{
                            setAlamatObjek((prev)=>{
                                return {
                                    ...prev,
                                    rtrw:text
                                }
                            })
                        }}
                        value={alamatObjek.rtrw}
                        placeholder='RT/RW'/>
                        <TextInput editable={false} 
                        onChangeText={(text)=>{
                            setAlamatObjek((prev)=>{
                                return {
                                    ...prev,
                                    keldesa:text
                                }
                            })
                        }}
                        value={alamatObjek.keldesa}
                        placeholder='Kel/Desa'/>
                        <TextInput editable={false} 
                        onChangeText={(text)=>{
                            setAlamatObjek((prev)=>{
                                return {
                                    ...prev,
                                    kecamatan:text
                                }
                            })
                        }}
                        value={alamatObjek.kecamatan}
                        placeholder='Kecamatan'/>
                        <TextInput editable={false} 
                        onChangeText={(text)=>{
                            setAlamatObjek((prev)=>{
                                return {
                                    ...prev,
                                    kabupatenkota:text
                                }
                            })
                        }}
                        value={alamatObjek.kabupatenkota}
                        placeholder='Kabupaten/Kota'/>
                        <TextInput editable={false} 
                        onChangeText={(text)=>{
                            setAlamatObjek((prev)=>{
                                return {
                                    ...prev,
                                    provinsi:text
                                }
                            })
                        }}
                        value={alamatObjek.provinsi}
                        placeholder='Provinsi'/>
                    </View>
                </View>
                <View style={{paddingVertical:EStyleSheet.value("10rem"),backgroundColor:"#f6f7fb",borderTopWidth:1,borderColor:"#e8e8e8",paddingHorizontal:EStyleSheet.value("25rem")}}>
                    <Text style={{color:"#2d2d2a",fontFamily:"NunitoBold",letterSpacing:1.1}}>B. Fasilitas</Text>
                </View>
                <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
                    <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                        <Text>Bisa Amprah PLN</Text>
                    </View>
                    <View style={{flex:1,backgroundColor:"white",flexDirection:"column",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                        <TouchableOpacity 
                        activeOpacity={0.7}
                        onPress={()=>{
                            //setShowSelectBisaAmprahPLN(true);
                        }}
                        style={{flexDirection:"row"}}>
                            <View style={{borderBottomWidth:1,flex:1,alignItems:"center",paddingBottom:EStyleSheet.value("5rem"),borderColor:"#e8e8e8",flexDirection:"row",justifyContent:"space-between"}}>
                                <Text>{bisaAmprahPLN}</Text>
                                <AntDesign name="caretdown" size={EStyleSheet.value("10rem")} color="grey" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
                    <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                        <Text>Bisa Amprah PDAM</Text>
                    </View>
                    <View style={{flex:1,backgroundColor:"white",flexDirection:"column",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                        <TouchableOpacity 
                        activeOpacity={0.7}
                        onPress={()=>{
                            //setShowSelectBisaAmprahPDAM(true);
                        }}
                        style={{flexDirection:"row"}}>
                            <View style={{borderBottomWidth:1,flex:1,alignItems:"center",paddingBottom:EStyleSheet.value("5rem"),borderColor:"#e8e8e8",flexDirection:"row",justifyContent:"space-between"}}>
                                <Text>{bisaAmprahPDAM}</Text>
                                <AntDesign name="caretdown" size={EStyleSheet.value("10rem")} color="grey" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
                    <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                        <Text>Ada Sinyal Internet</Text>
                    </View>
                    <View style={{flex:1,backgroundColor:"white",flexDirection:"column",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                        <TouchableOpacity 
                        activeOpacity={0.7}
                        onPress={()=>{
                            //setShowSelectAdaSinyalInternet(true);
                        }}
                        style={{flexDirection:"row"}}>
                            <View style={{borderBottomWidth:1,flex:1,alignItems:"center",paddingBottom:EStyleSheet.value("5rem"),borderColor:"#e8e8e8",flexDirection:"row",justifyContent:"space-between"}}>
                                <Text>{adasinyalinternet}</Text>
                                <AntDesign name="caretdown" size={EStyleSheet.value("10rem")} color="grey" />
                            </View>
                        </TouchableOpacity>
                    {/* {
                        (adaPDAM==="Ada") &&
                        <TouchableOpacity
                        activeOpacity={0.6} 
                        onPress={()=>{
                            setShowModalAtasNamaPDAM(true);
                        }}
                        style={{justifyContent:"center",borderRadius:EStyleSheet.value("5rem"),marginTop:EStyleSheet.value("5rem"),paddingVertical:EStyleSheet.value("3rem"),backgroundColor:"#f6f7fb",alignItems:"center"}}>
                            <Text style={{color:"black"}}>No, atas nama</Text>
                        </TouchableOpacity>
                    } */}
                    </View>
                </View>
                <View style={{paddingVertical:EStyleSheet.value("10rem"),backgroundColor:"#f6f7fb",borderTopWidth:1,borderColor:"#e8e8e8",paddingHorizontal:EStyleSheet.value("25rem")}}>
                    <Text style={{color:"#2d2d2a",fontFamily:"NunitoBold",letterSpacing:1.1}}>C. Aksesbilitas</Text>
                </View>
                <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
                    <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                        <Text>Jalan</Text>
                    </View>
                    <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                            <TouchableOpacity 
                            activeOpacity={0.7}
                            onPress={()=>{
                                //setShowSelectJalan(true);
                            }}
                            style={{flexDirection:"row"}}>
                                <View style={{borderBottomWidth:1,flex:1,alignItems:"center",paddingBottom:EStyleSheet.value("5rem"),borderColor:"#e8e8e8",flexDirection:"row",justifyContent:"space-between"}}>
                                    <Text>{jalan}</Text>
                                    <AntDesign name="caretdown" size={EStyleSheet.value("10rem")} color="grey" />
                                </View>
                            </TouchableOpacity>
                    </View>
                </View>
                <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
                    <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                        <Text>Jalan Masuk</Text>
                    </View>
                    <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                            <TouchableOpacity 
                            activeOpacity={0.7}
                            onPress={()=>{
                                //setShowSelectJalanMasuk(true);
                            }}
                            style={{flexDirection:"row"}}>
                                <View style={{borderBottomWidth:1,flex:1,alignItems:"center",paddingBottom:EStyleSheet.value("5rem"),borderColor:"#e8e8e8",flexDirection:"row",justifyContent:"space-between"}}>
                                    <Text>{jalanmasuk}</Text>
                                    <AntDesign name="caretdown" size={EStyleSheet.value("10rem")} color="grey" />
                                </View>
                            </TouchableOpacity>
                    </View>
                </View>
                <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
                    <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                        <Text>Pasar Terdekat</Text>
                    </View>
                    <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                        <TextInput editable={false} 
                        onChangeText={(text)=>{
                            setAksesbilitas((prev)=>{
                                return {
                                    ...prev,
                                    pasarterdekat:text
                                }
                            })
                        }}
                        value={aksesbilitas.pasarterdekat}
                        style={{flex:1}} placeholder='Pasar Terdekat'/>
                    </View>
                </View>
                <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
                    <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                        <Text>Sekolah Terdekat</Text>
                    </View>
                    <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                        <TextInput editable={false} 
                        onChangeText={(text)=>{
                            setAksesbilitas((prev)=>{
                                return {
                                    ...prev,
                                    sekolahterdekat:text
                                }
                            })
                        }}
                        value={aksesbilitas.sekolahterdekat}
                        style={{flex:1}} placeholder='Sekolah Terdekat'/>
                    </View>
                </View>
                <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
                    <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                        <Text style={{paddingRight:EStyleSheet.value("20rem")}}>Stasiun KA/halte bus terdekat</Text>
                    </View>
                    <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                        <TextInput editable={false} 
                        onChangeText={(text)=>{
                            setAksesbilitas((prev)=>{
                                return {
                                    ...prev,
                                    stasiunkaterdekat:text
                                }
                            })
                        }}
                        value={aksesbilitas.stasiunkaterdekat}
                        style={{flex:1}} placeholder='Stasiun KA/halte bus terdekat'/>
                    </View>
                </View>
                <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
                    <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                        <Text style={{paddingRight:EStyleSheet.value("20rem")}}>Jarak ke jalur bis/mikrolet terdekat</Text>
                    </View>
                    <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                        <TextInput editable={false} 
                        onChangeText={(text)=>{
                            setAksesbilitas((prev)=>{
                                return {
                                    ...prev,
                                    jarakkejalurbis:text
                                }
                            })
                        }}
                        value={aksesbilitas.jarakkejalurbis}
                        style={{flex:1}} placeholder='Jarak ke jalur bis/mikrolet terdekat'/>
                    </View>
                </View>
                <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
                    <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                        <Text style={{paddingRight:EStyleSheet.value("20rem")}}>Jalur Bus/Mikrolet No.</Text>
                    </View>
                    <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                        <TextInput editable={false} 
                        onChangeText={(text)=>{
                            setAksesbilitas((prev)=>{
                                return {
                                    ...prev,
                                    jalurbus:text
                                }
                            })
                        }}
                        value={aksesbilitas.jalurbus}
                        style={{flex:1}} placeholder='Jalur Bus/Mikrolet No.'/>
                    </View>
                </View>
                <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
                    <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                        <Text style={{paddingRight:EStyleSheet.value("20rem")}}>Perumahan/Kompleks Perumahan Terdekat</Text>
                    </View>
                    <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                        <TextInput editable={false} 
                        onChangeText={(text)=>{
                            setAksesbilitas((prev)=>{
                                return {
                                    ...prev,
                                    perumahanterdekat:text
                                }
                            })
                        }}
                        value={aksesbilitas.perumahanterdekat}
                        style={{flex:1}} placeholder='Perumahan/Kompleks Perumahan Terdekat'/>
                    </View>
                </View>
                <View style={{paddingVertical:EStyleSheet.value("10rem"),backgroundColor:"#f6f7fb",borderTopWidth:1,borderColor:"#e8e8e8",paddingHorizontal:EStyleSheet.value("25rem")}}>
                    <Text style={{color:"#2d2d2a",fontFamily:"NunitoBold",letterSpacing:1.1}}>D. Suasana Lingkungan</Text>
                </View>
                <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
                    <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                        <Text>Rawan Banjir</Text>
                    </View>
                    <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                            <TouchableOpacity 
                            activeOpacity={0.7}
                            onPress={()=>{
                                //setShowSelectRawanBanjir(true);
                            }}
                            style={{flexDirection:"row"}}>
                                <View style={{borderBottomWidth:1,flex:1,alignItems:"center",paddingBottom:EStyleSheet.value("5rem"),borderColor:"#e8e8e8",flexDirection:"row",justifyContent:"space-between"}}>
                                    <Text>{rawanbanjir}</Text>
                                    <AntDesign name="caretdown" size={EStyleSheet.value("10rem")} color="grey" />
                                </View>
                            </TouchableOpacity>
                    </View>
                </View>
                <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
                    <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                        <Text>Keamanan</Text>
                    </View>
                    <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                            <TouchableOpacity 
                            activeOpacity={0.7}
                            onPress={()=>{
                                //setshowSelectKeamanan(true);
                            }}
                            style={{flexDirection:"row"}}>
                                <View style={{borderBottomWidth:1,flex:1,alignItems:"center",paddingBottom:EStyleSheet.value("5rem"),borderColor:"#e8e8e8",flexDirection:"row",justifyContent:"space-between"}}>
                                    <Text>{keamanan}</Text>
                                    <AntDesign name="caretdown" size={EStyleSheet.value("10rem")} color="grey" />
                                </View>
                            </TouchableOpacity>
                    </View>
                </View>
                <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
                    <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                        <Text>Kebersihan</Text>
                    </View>
                    <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                            <TouchableOpacity 
                            activeOpacity={0.7}
                            onPress={()=>{
                                //setShowSelectKebersihan(true);
                            }}
                            style={{flexDirection:"row"}}>
                                <View style={{borderBottomWidth:1,flex:1,alignItems:"center",paddingBottom:EStyleSheet.value("5rem"),borderColor:"#e8e8e8",flexDirection:"row",justifyContent:"space-between"}}>
                                    <Text>{kebersihan}</Text>
                                    <AntDesign name="caretdown" size={EStyleSheet.value("10rem")} color="grey" />
                                </View>
                            </TouchableOpacity>
                    </View>
                </View>
                <View style={{paddingVertical:EStyleSheet.value("10rem"),backgroundColor:"#f6f7fb",borderTopWidth:1,borderColor:"#e8e8e8",paddingHorizontal:EStyleSheet.value("25rem")}}>
                    <Text style={{color:"#2d2d2a",fontFamily:"NunitoBold",letterSpacing:1.1}}>E. Harga</Text>
                </View>
                <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
                    <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                        <Text style={{paddingRight:EStyleSheet.value("20rem")}}>Permintaan Penjual</Text>
                    </View>
                    <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                        <TextInput editable={false} 
                        onChangeText={(text)=>{
                            setHarga((prev)=>{
                                return {
                                    ...prev,
                                    permintaanpenjual:text
                                }
                            })
                        }}
                        value={harga.permintaanpenjual}
                        multiline={true} style={{flex:1}} placeholder='Harga Permintaan'/>
                    </View>
                </View>
                <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
                    <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                        <Text style={{paddingRight:EStyleSheet.value("20rem")}}>Harga Pasar</Text>
                    </View>
                    <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                        <TextInput editable={false} 
                        onChangeText={(text)=>{
                            setHarga((prev)=>{
                                return {
                                    ...prev,
                                    hargapasar:text
                                }
                            })
                        }}
                        value={harga.hargapasar}
                        multiline={true} style={{flex:1}} placeholder='Harga Pasar'/>
                    </View>
                </View>
                {/* <View style={{paddingVertical:EStyleSheet.value("20rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                    <Pressable 
                    onPress={()=>{
                        let payload = {};

                        payload.informasipenjual = informasiPenjual;
                        payload.alamatobjek = alamatObjek;
                        payload.fasilitas = {
                            bisaamprahPLN:bisaAmprahPLN,
                            bisaamprahPDAM:bisaAmprahPDAM,
                            adasinyalinternet:adasinyalinternet
                        };
                        payload.aksesbilitas = {
                            ...aksesbilitas,
                            jalan:jalan,
                            jalanmasuk:jalanmasuk
                        };
                        payload.suasanalingkungan = {
                            rawanbanjir:rawanbanjir,
                            keamanan:keamanan,
                            kebersihan:kebersihan
                        };
        
                        payload.harga = {
                            ...harga
                        };

                        console.log(payload);
                    }}
                    android_ripple={{
                        color:"white"
                    }}
                    style={{height:EStyleSheet.value("40rem"),justifyContent:"center",alignItems:"center",backgroundColor:"#e8e8e8",borderRadius:EStyleSheet.value("7rem")}}>
                        <Text>Simpan</Text>
                    </Pressable>
                </View> */}
            </View>
        }
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
