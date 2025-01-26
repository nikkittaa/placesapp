import { useCallback, useLayoutEffect, useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker} from "react-native-maps";
import IconButton from "../components/ui/Icon";

export default function Map({navigation}){
    const [selectedLocation, setSelectedLocation] = useState({lat: 28.5, long: 77.5});
    const region = {
        latitude: 28.5,
        longitude: 77.5,
        latitudeDelta:  0.0922,
        longitudeDelta: 0.0421,
    };

    function selectLocationHandler(event){
        const lat = event.nativeEvent.coordinate.latitude;
        const long = event.nativeEvent.coordinate.longitude;
        console.log(lat, long);

        setSelectedLocation({lat: lat, long: long});
    }

    const saveLocation = useCallback(() => {
        navigation.navigate("AddPlace", { lat : selectedLocation.lat, long: selectedLocation.long});
    }, [navigation, selectedLocation]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({tintColor}) => <IconButton icon = "save" size = {24} color = {tintColor} onPress={saveLocation} />
        });
    }, [navigation, saveLocation]);

    return <MapView 
        style = {styles.map} 
        initialRegion = {region}
        onPress = {selectLocationHandler}>
        <Marker 
            title = "Picked Location"
            coordinate={ {latitude: selectedLocation.lat, longitude: selectedLocation.long}}/>
    </MapView>
}

const styles = StyleSheet.create({
    map : {
        flex: 1
    }
});