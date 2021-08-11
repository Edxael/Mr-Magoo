import React from 'react';
import { View, Text, Button } from 'react-native';
import tw from '../../lib/tailwind';

const HomeView = ({navigation}) => {

    return (
        <View style={tw`items-center flex-1 bg-pureblack-0`}>
            <Text>HomeView Page</Text>
            <Button onPress={() => {
                console.log('HomeView Button Pressed')
                navigation.navigate('AboutView')
            }}>About-Page</Button>
        </View>
    )
}

export default HomeView