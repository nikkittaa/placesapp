import { Image, Pressable, StyleSheet, Text, View } from "react-native"

export default function PlaceItem({place, onSelect}){
    return  <Pressable onPress = {onSelect}>
        <Image source = {{uri : place.imageUrl}}>
            <View>
                <Text>{place.title}</Text>
                <Text>{place.address}</Text>
            </View>
        </Image>
    </Pressable>

}

const styles = StyleSheet.create({
    
});