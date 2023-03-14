import {View, Text, Pressable, StyleSheet, Dimensions, KeyboardAvoidingView} from "react-native";

function MessageButton  ({messageHandler})  {
    const { width } = Dimensions.get('window');
    const circleSize = width * 0.5;

    function sendMessage () {
        messageHandler();
    };

    return (
        <View style = {styles.container}>
            <View style={{width: circleSize,
                        height: circleSize,
                        borderRadius: circleSize / 2,
                        overflow: "hidden"}}>
                <Pressable style = {[styles.button, {
                            width: circleSize,
                            height: circleSize,
                            borderRadius: circleSize / 2,}]} android_ripple={{ color: "#ACF5EB" }} onPress={sendMessage}>
                    <Text style = {styles.text}>Message</Text>
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
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 20
    }
});

export default MessageButton;