import { useCallback, useState } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../ui/Button";
import { getAddress } from "../../util/locations";
import { Place } from "../../models/place";


export default function PlaceForm({onCreatePlace}){
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState();
    const [image, setImage] = useState();

    function changeTitleHandler(enteredTitle){
        setTitle(enteredTitle);
    }


    const imageHandler = useCallback( (imageUri) => {
        setImage(imageUri);
    }, []);

    const locationHandler = useCallback( (pickedLocation) => {
        setLocation(pickedLocation);
    }, []);

    function savePlaceHandler(){
        const placeData = new Place(title, image, location);
        onCreatePlace(placeData);
    }
    
    return (
        <ScrollView style = {styles.form}>
            <View>
                <Text style = {styles.label}>Title</Text>
                <TextInput style = {styles.input} onChangeText={changeTitleHandler}
                    value = {title}
                />
            </View>
            <ImagePicker onImageTaken = {imageHandler}/>
            <LocationPicker onLocationPicked = {locationHandler}/>
            <Button onPress = {savePlaceHandler}>Add Place</Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24,
        

    },
    label: {
        fontWeight:'bold',
        marginBottom: 4,
        color: Colors.primary500
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100
    }
});