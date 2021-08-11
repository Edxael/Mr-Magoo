import React from 'react';
import { View, Image, Text, TextInput, Button, Pressable } from 'react-native';
import tw from '../lib/tailwind';
import Header from '../Components/Header'
import Navigation from '../Components/Navigation';

const Dashboard = () => {
    return (
        <View style={tw`flex-1`}>
            <Header></Header>
            <View style={tw`flex-row flex-1`}>
                <Navigation></Navigation>
                <View style={tw`flex-1 z-20`}>
                    <Text>Content Goes Here</Text>
                </View>
            </View>
        </View>
    )
}

export default Dashboard