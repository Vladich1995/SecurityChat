import {View, Text, Dimensions, StyleSheet, TouchableOpacity, Animated} from "react-native";
import {useState, useRef, useEffect} from "react";
import { Audio } from 'expo-av';
import * as Location from 'expo-location';

function EmergencyButton  ({botToken, emergencyGroup, name, number})  {
    const [isPressed, setIsPressed] = useState(false);
    const [uri, setUri] = useState(null);
    const [location, setLocation] = useState(null);
    const { width } = Dimensions.get('window');
    // const circleSize = width * 0.5;
    const circleSize = 280;
    const timeoutRef = useRef(null);


    useEffect(() => {
        if(uri){
            sendRecording();
            getLocation();
            setUri(null);
        }
    }, [uri]);

    useEffect(() => {
        if(location){
            sendLocation();
        }
        setLocation(null);
    }, [location]);

    function handlePressIn  () {
        setIsPressed(true);
        timeoutRef.current = setTimeout(() => {
            handlePressOut();
            startRecording();
        }, 3000);
    };

    function handlePressOut () {
        setIsPressed(false);
        clearTimeout(timeoutRef.current);
    };

    async function startRecording () {
        try {
          const recording = new Audio.Recording();
          await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
          await recording.startAsync();
          setTimeout(async () => {
            await recording.stopAndUnloadAsync();
            setUri(recording.getURI());
          }, 3000);
        } catch (error) {
          console.log(error);
        }
    }

   async function getLocation () {
        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
    }
    
    async function sendRecording () {
        try{
            fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: emergencyGroup,
                    text: "Emergency call from " + name + ", Phone number: " + number,
                }),
            }).then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error));
        } catch (err) {
            console.log(err);
        }
        try{
            const formData = new FormData();
            formData.append('chat_id', emergencyGroup);
            formData.append('voice', { uri, name: 'recording.mp3', type: 'audio/mp3'});
            const response = await fetch(`https://api.telegram.org/bot${botToken}/sendVoice`, {
                method: 'POST',
                body: formData,
                headers: { 'Content-Type': 'multipart/form-data' },
             });
            const data = await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    function sendLocation() {
        fetch(`https://api.telegram.org/bot${botToken}/sendLocation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: emergencyGroup,
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            }),
        }).then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={1}
                style={[styles.button, {
                    width: circleSize,
                    height: circleSize,
                    borderRadius: circleSize / 2,
                    backgroundColor: isPressed ? "#F74949" : "red"}]}
                android_ripple={{ color: "#F74949" }}
            >
                <Text style={styles.text} >{isPressed ? "המשך ללחוץ" : 'חירום'}</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 0.45,
        overflow:"hidden",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        overflow:"hidden",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 30
    }
});

export default EmergencyButton;