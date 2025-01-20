import { Alert, StyleSheet, View, Text, Image } from "react-native";
import OutlinedButton from "../ui/OutlinedButton";
import { Colors } from "../../constants/colors";
import { getCurrentPositionAsync, PermissionStatus, useForegroundPermissions } from "expo-location";
import axios from "axios";
import { useState } from "react";

export default function LocationPicker(){
    
    const [permissionInfo, requestPermission] = useForegroundPermissions();
    const [mapUri, steMapUri] = useState();
    async function verifyPermissions(){
        if(permissionInfo.status === PermissionStatus.UNDETERMINED){
                    const permission = await requestPermission();
                    return permission.granted;
                }
        
                if(permissionInfo.status === PermissionStatus.DENIED){
                    Alert.alert(
                        "Insufficient permissions! You need to grant location permissions to use the app"
                    );
        
                    return false;
                }
        
                return true;
     }

    async function getLocationHandler(){
        //console.log(process.env.EXPO_PUBLIC_API_KEY);
        const hasPermission = await verifyPermissions();

        if(!hasPermission) return;

        const location = await getCurrentPositionAsync();
        //console.log(location.coords.latitude, location.coords.longitude);
        const lat = location.coords.latitude;
        const long = location.coords.longitude;
        const url = `https://atlas.microsoft.com/map/static/png?subscription-key=${process.env.EXPO_PUBLIC_API_KEY}&api-version=1.0&center=${long},${lat}&zoom=14`;
        console.log(url);
        steMapUri(url);
    }

    function pickOnMapHandler(){

    }

    let locationPreview = <Text>No location selected</Text>

    if(mapUri){
        locationPreview  = <Image source = {{uri : mapUri}} style = {styles.image}/>
    }

    return <View>
        <View style = {styles.mapPreview}>
            {locationPreview}
        </View>
        <View style = {styles.actions}>
            <OutlinedButton onPress = {getLocationHandler} icon = "location">Locate User</OutlinedButton>
            <OutlinedButton onPress = {pickOnMapHandler} icon = "map">Pick on Map</OutlinedButton>
        </View>
    </View>
}

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    image: {
        width: '100%',
        height: '100%'
    }
});