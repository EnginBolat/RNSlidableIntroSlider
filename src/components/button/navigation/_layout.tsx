import React from "react";
import { Text, TouchableOpacity } from "react-native";

const NavigationButton: React.FC<{
    textStyle?: any,
    title: string;
    onPress: any;
    style?: any;
}> =
    ({ textStyle, title, onPress, style }) => {
        return <TouchableOpacity onPress={onPress} style={style}>
            <Text style={textStyle}>{title}</Text>
        </TouchableOpacity>
    }

export default NavigationButton;
