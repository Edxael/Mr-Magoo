import React from 'react';
import { View, Image, Text, TextInput, Button, Pressable } from 'react-native';
import tw from '../lib/tailwind';
import logo from '../assets/svg/comphealth-logo.svg'

const Header = () => {
    return (
        <View style={tw`items-center h-64 bg-primary-600 w-full`}>
            <Image source={logo} style={tw`h-64 w-160`} />
        </View>
    )
}

export default Header