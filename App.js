import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import LandingScreen from './screen/LandingScreen';
import LoginScreen from './screen/LoginScreen';
import DashboardScreen from './screen/DashboardScreen';
import SurveyScreen from './screen/SurveyScreen';

import { useFonts } from 'expo-font';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});


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
    <LandingScreen/>
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
