import { StatusBar } from 'expo-status-bar';
import { registerRootComponent } from 'expo';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Home'
import DetailScreen from './Detail'
import SettingScreen from './Setting'
const Stack = createNativeStackNavigator();


const Home = () =>{ 
  return(
      <HomeScreen/>
      );
}

const Detail = () =>{ 
  return(
      <DetailScreen/>
      );
}
const Setting = () =>{  
  return(
      <SettingScreen/>
      );
}
export default function MainContainer(){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home"
        screenOptions={{
          headerShown: false
        }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Detail" component={Detail} />
            <Stack.Screen name="Setting" component={Setting} />
        </Stack.Navigator>
      </NavigationContainer>
    
  );
  }
