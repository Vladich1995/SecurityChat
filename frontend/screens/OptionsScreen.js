import {View ,StyleSheet ,ImageBackground, SafeAreaView, Dimensions } from "react-native";
import {useState} from "react";
import EmergencyButton from "../buttons/EmergencyButton";
import MessageButton from "../buttons/MessageButton";
import MessageForm from "../cases/MessageForm";

function OptionsScreen ({route}) {
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const [needMessage, setNeedMessage] = useState(false);
    const username = route.params.name;
    const number = route.params.number;

    const botToken = '5969997560:AAEmNsmKdrglAUa0xFOE9ys-RHXfL2q_95I';
    const emergencyGroup = '-1001841045837';
    const notificationsChannel = '-1001857870089';


    function messageHandler () {
        setNeedMessage(true);
    };

    function cancelMessage() {
        setNeedMessage(false);
    };

    return (
        <SafeAreaView style={[styles.container, {height: height, width: width}]} >
            <View style={styles.messageContainer}>
                    {needMessage ? <MessageForm cancelHandler={cancelMessage} botToken={botToken} notificationsChannel={notificationsChannel} name={username} number={number} />:
                        <MessageButton messageHandler={messageHandler} />
                    }
            </View>           
            <ImageBackground source={require('../images/Bnei_Ayish.jpeg')} resizeMode="contain" style={[styles.image]}>
                <EmergencyButton botToken={botToken} emergencyGroup={emergencyGroup} name={username} number={number} />
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      position: "absolute", 
      backgroundColor: "white"
    },
    messageContainer: {
        position: "absolute",
        width: "100%",
        height: 80,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
    },
    image: {
        flex: 1,
        justifyContent: "center"
    }
  });

export default OptionsScreen;