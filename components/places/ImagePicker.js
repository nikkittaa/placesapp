import { launchCameraAsync, PermissionStatus, useCameraPermissions } from "expo-image-picker";
import { useEffect, useState } from "react";
import { Alert, Image, View, Text, StyleSheet } from "react-native";

import { Colors } from "../../constants/colors";
import OutlinedButton from "../ui/OutlinedButton";

export default function ImagePicker({onImageTaken}){
    const [imageUri, setImageUri] = useState();
    const [cameraPermissionInfo, requestPermission] = useCameraPermissions();

    async function verifyPermissions(){
        if(cameraPermissionInfo.status === PermissionStatus.UNDETERMINED){
            const permission = await requestPermission();
            return permission.granted;
        }

        if(cameraPermissionInfo.status === PermissionStatus.DENIED){
            Alert.alert(
                "Insufficient permissions! You need to grant camera permissions to use the app"
            );

            return false;
        }

        return true;
    }

    async function takeImageHandler(){
        const hasPermission = await verifyPermissions();

        if(!hasPermission){
            return;
        }

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16,9],
            quality: 0.5,
        });
       // console.log(image);
       // console.log(image.assets[0].uri);
        setImageUri(image.assets[0].uri);
    }

    

    useEffect(() => {
        onImageTaken(imageUri);
    }, [imageUri, onImageTaken]);

    let imagePreview = <Text>No image taken yet</Text>;

    if(imageUri){
        imagePreview = <Image style = {styles.image} source = {{uri : imageUri}} />;
    }

    return (
        <View>
            <View style =  {styles.imagePreview}>
                {imagePreview}
            </View>
            <OutlinedButton icon = "camera" onPress = {takeImageHandler}> Take Image </OutlinedButton>
        </View>
    );
}

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    image: {
        width: '100%',
        height: '100%'
    }
});