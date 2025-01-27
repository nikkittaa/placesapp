import { useEffect, useState } from "react";
import PlacesList from "../components/places/PlacesList";
import { useIsFocused } from "@react-navigation/native";

export default function AllPlaces({route}){
    const isFocused = useIsFocused();
    const [loadedPlaces, setLoadedPlaces] = useState([]);
    
    useEffect(() => {
        if(isFocused && route.params){
            setLoadedPlaces(currPlaces => [...currPlaces, route.params.place]);
        }
    }, [isFocused, route]);
    return (
        <PlacesList places = {loadedPlaces}/>
    );
}