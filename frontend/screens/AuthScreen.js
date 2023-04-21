import {useState, useEffect} from "react";
import { TextInput, View, StyleSheet, Button, Alert, ImageBackground, SafeAreaView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from "expo-linear-gradient";


function AuthScreen ({navigation}) {
    const [number, setNumber] = useState("");
    const [name, setName] = useState("");

    async function proceedHandler () {
        try{
            await fetch("http://192.168.137.129:3000/verify/",{
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
                    if(data.exists == false){
                        Alert.alert("הפרטים שהיקשת שגואים.", "נא לשים לב שהפרטים המוזנים תואמים את אלה שנמסרו בעת קבלת האפליקציה",[
                            {text: "אוקיי", style: "cancel"},
                        ])
                    }
                    else{
                        if(data.message){
                            Alert.alert("המשתמש התחבר בעבר", "הפרטים שהוזנו משמשים משתמש אחר שכבר התחבר לאפליקציה",[
                                {text: "אוקיי", style: "cancel"},
                            ])
                        }
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
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../images/Bnei_Ayish.jpeg')} resizeMode="cover" style={styles.image}>
            </ImageBackground>
            <View style={styles.inputs}>
                <TextInput style={styles.input} keyboardType="default" onChangeText={setName} value={name} placeholder="שם כפי שנמסר" />
                <TextInput style={styles.input} keyboardType="default" onChangeText={setNumber} value={number} placeholder="מספר טלפון" />
                <View style={styles.buttonContainer}>
                    <Button title="Proceed" onPress={proceedHandler} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        
    },
    image: {
        flex: 1
    },
    inputs: {
        flex: 1,
        alignItems: "center"
    },
    input: {
        height: 30,
        width: "80%",
        borderWidth: 1,
        textAlign: "center",
        borderRadius: 3,
        marginTop: 10
    },
    buttonContainer: {
        height: 40,
        width: 100,
        marginTop: 10
    }
});

export default AuthScreen;