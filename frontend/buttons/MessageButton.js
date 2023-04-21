import {View, Text, Pressable, StyleSheet, Dimensions, KeyboardAvoidingView} from "react-native";

function MessageButton  ({messageHandler})  {
    const { width } = Dimensions.get('window');
    const circleSize = width * 0.5;

    function sendMessage () {
        messageHandler();
    };

    return (
        <View style = {styles.container}>
            <View style={{width: 150,
                        height: 70,
                        overflow: "hidden"}}>
                <Pressable style = {[styles.button, {
                            width: 150,
                            height: 70,}]} android_ripple={{ color: "#ACF5EB" }} onPress={sendMessage}>
                    <Text style = {styles.text}>דיווח מהיר</Text>
                </Pressable>
            </View>
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
        backgroundColor: "#017CFE",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 20
    }
});

export default MessageButton;