import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import LandingScreen from './screen/LandingScreen';
import LoginScreen from './screen/LoginScreen';
import DashboardScreen from './screen/DashboardScreen';
import SurveyScreen from './screen/SurveyScreen';
import ListRiwayatSurveyAwalScreen from './screen/ListRiwayatSurveyAwalScreen';
import DetailRiwayatSurveyScreen from './screen/DetailRiwayatSurveyScreen';
import ListSurveyAwalTersimpanScreen from './screen/ListSurveyAwalTersimpanScreen';

import SurveyAwalScreen from './screen/SurveyAwalScreen';
import DetailRiwayatSurveyAwalScreen from './screen/DetailRiwayatSurveyAwalScreen';

import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});

const Stack = createStackNavigator();



export default function App() {

  const [loaded] = useFonts({
    Nunito: require('./fonts/Nunito-Regular.ttf'),
    NunitoMedium: require('./fonts/Nunito-Medium.ttf'),
    NunitoBold: require('./fonts/Nunito-Bold.ttf')
  });
  
  if (!loaded) {
    return null;
  }

  return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Landing" 
        options={{
           headerShown:false
        }}
        component={LandingScreen} />
        <Stack.Screen name="Login" 
        options={{
           headerShown:false
        }}
        component={LoginScreen} />
         <Stack.Screen name="Dashboard" 
        options={{
           headerShown:false
        }}
        component={DashboardScreen} />
         <Stack.Screen name="Survey" 
        options={{
           headerShown:false
        }}
        component={SurveyScreen} />
         <Stack.Screen name="ListRiwayatSurveyAwal" 
        options={{
           headerShown:false
        }}
        component={ListRiwayatSurveyAwalScreen} />
        <Stack.Screen name="DetailRiwayatSurvey" 
        options={{
           headerShown:false
        }}
        component={DetailRiwayatSurveyScreen} />
         <Stack.Screen name="ListSurveyAwalTersimpan" 
        options={{
           headerShown:false
        }}
        component={ListSurveyAwalTersimpanScreen} />
         <Stack.Screen name="SurveyAwal" 
        options={{
           headerShown:false
        }}
        component={SurveyAwalScreen} />
        <Stack.Screen name="DetailRiwayatSurveyAwal" 
        options={{
           headerShown:false
        }}
        component={DetailRiwayatSurveyAwalScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
