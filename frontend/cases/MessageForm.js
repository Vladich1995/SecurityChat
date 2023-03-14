import {View, KeyboardAvoidingView, TextInput, StyleSheet, Button} from "react-native";
import { useState } from "react";

function MessageForm ({cancelHandler, botToken, notificationsChannel, name, number}) {
    const [message, setMessage] =useState("");
    

    function closeMessage () {
        cancelHandler();
    };

   async function sendMessage () {
        try{
            fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: notificationsChannel,
                    text: name + ", " + number + " : " + message,
                }),
            }).then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error));
        } catch (err) {
            console.log(err);
        }
        setMessage("");
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TextInput style={styles.input} keyboardType="default" onChangeText={setMessage} value={message} />
            <View style={styles.buttonContainer}>
                <Button title="Send" onPress={sendMessage} />
                <Button title="Cancel" onPress={closeMessage}/>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "80%",
        flexDirection: "column",
        textAlign: 'center',
        justifyContent: "center",
        marginTop: 20
    },
    buttonContainer: {
        flexDirection:"row",
        textAlign: 'center',
        justifyContent: "space-between"
    },
    input: {
        backgroundColor: "#DEFAF9",
        height: 40,
        width: "100%",
        borderWidth: 1,
        padding: 10,
    },
});

export default MessageForm;