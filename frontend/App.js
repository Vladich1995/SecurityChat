import { StatusBar } from 'expo-status-bar';
import {useEffect, useState} from "react";
import { Audio } from 'expo-av';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, SafeAreaView, PermissionsAndroid} from 'react-native';
import OptionsScreen from "./screens/OptionsScreen";
import AuthScreen from './screens/AuthScreen';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    async function prepareRecording() {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
    }
  
    prepareRecording();
  }, []);

  useEffect(() => {
    async function prepareLocation () {
      try{
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
      }catch (err){}
    }

    prepareLocation();
  }, []);

  useEffect(() => {
    const removeToken = async () => {
      try {
        await AsyncStorage.removeItem('jwt_token');
      } catch (e) {
        console.error(e);
      }
    };
    //removeToken();

    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem('jwt_token');
        return token;
      } catch (e) {
        console.error(e);
      }
    };

    const checkAuthentication = async () => {
      try{
        const token = await getToken();
        if (token) {
          const decodedToken = jwtDecode(token);
          setName(decodedToken.name);
          setNumber(decodedToken.number);
          setIsSignedIn(true);
        }
      } catch (err) {
        console.log(err);
      }
    };

    checkAuthentication();
  },[]);


  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
        {isSignedIn ? (
          <>
            <Stack.Screen name="Home" component={OptionsScreen} initialParams={{ name: name, number: number }} />
          </>
        ) : (
          <>
            <Stack.Screen name="AuthScreen" component={AuthScreen} />
            <Stack.Screen name="Home" component={OptionsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#093863',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
