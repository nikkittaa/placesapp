import { FlatList, StyleSheet, View } from "react-native";
import PlaceItem from "./PlaceItem";

export default function PlacesList({places}){
    if(!places || places.length === 0){
        return <View style = {styles.fallbackContainer}>
            <Text style = {styles.fallbacktext}>No places added yet - start adding some!</Text>
        </View>
    }
    return <FlatList data = {places} 
        renderItem={({item}) => <PlaceItem place = {item}/>}
        keyExtractor={(item) => item.id}
    />;
}


const styles = StyleSheet.create({
    fallbackContainer: {
        flex : 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    fallbacktext: {
        fontSize : 16
    }
});