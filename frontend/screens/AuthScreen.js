import {useState, useEffect} from "react";
import { TextInput, View, StyleSheet, Button, Alert, Linking } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


function AuthScreen ({navigation}) {
    const [number, setNumber] = useState("");
    const [name, setName] = useState("");
    

    async function proceedHandler () {
        try{
            await fetch("http://192.168.137.154:3000/verify/",{
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name: name,
                  number: number,
                }),
              }).then((response) => {
                return response.json();
            }).then((data) => {
                if(!data.token){
                    if(data.exists){
                        Alert.alert("The details provided don't exist in the database.", "Please provide correct information",[
                            {text: "ok", style: "cancel"},
                        ])
                    }
                    if(data.message){
                        Alert.alert("User already authorized.", "You cant use the same credentials for multiple accounts",[
                            {text: "ok", style: "cancel"},
                        ])
                    }
                }
                else{
                    storeToken(data.token);
                    navigation.navigate("Home", { name: name, number: number });
                }
            })
        } catch(err) {
            console.log(err);
        };
        setName("");
        setNumber("");
    };


    const storeToken = async (token) => {
        try {
          await AsyncStorage.setItem('jwt_token', token);
        } catch (e) {
          console.error(e);
        }
      };

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} keyboardType="default" onChangeText={setName} value={name} placeholder="Name" />
            <TextInput style={styles.input} keyboardType="default" onChangeText={setNumber} value={number} placeholder="Phone number" />
            <Button title="Proceed" onPress={proceedHandler} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    input: {
        height: 30,
        width: "80%",
        borderWidth: 1,
        textAlign: "center",
        borderRadius: 3
    },
});

export default AuthScreen;