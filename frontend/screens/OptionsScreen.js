import {View ,StyleSheet ,Alert,   KeyboardAvoidingView } from "react-native";
import {useState} from "react";
import EmergencyButton from "../buttons/EmergencyButton";
import MessageButton from "../buttons/MessageButton";
import MessageForm from "../cases/MessageForm";

function OptionsScreen ({route}) {
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
        <KeyboardAvoidingView style={styles.container} behavior="height" >
            <View style={{flex: 1}}>
                <View style={styles.messageContainer}>
                    {needMessage && <MessageForm cancelHandler={cancelMessage} botToken={botToken} notificationsChannel={notificationsChannel} name={username} number={number} />}
                </View>
                <EmergencyButton botToken={botToken} emergencyGroup={emergencyGroup} name={username} number={number} />
                <MessageButton messageHandler={messageHandler} />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#093863',
      
    },
    messageContainer: {
        flex: 0.1,
        alignItems: "center"
    }
  });

export default OptionsScreen;