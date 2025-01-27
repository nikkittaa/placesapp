import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/colors";

export default function Button({onPress, children}){
    return <Pressable style = {({pressed}) => [styles.button, pressed && styles.pressed]} onPress = {onPress}>
        <Text style = {styles.text}>{children}</Text>
    </Pressable>
}


const styles = StyleSheet.create({
    pressed: {
        opacity : 0.7
    },
    text:{
        textAlign: 'center',
        fontSize: 16,
        color: Colors.primary50
    },
    button: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        margin: 4,
        backgroundColor: Colors.primary800,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.15,
        borderRadius: 4
    }

});