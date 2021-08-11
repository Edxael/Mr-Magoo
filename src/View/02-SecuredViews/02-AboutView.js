import React from 'react';
import { View, Text, Button } from 'react-native';
import tw from '../../lib/tailwind';

const AboutView = ({navigation}) => {

    return (
        <View style={tw`items-center flex-1 bg-pureblack-0`}>
            <Text>AboutView Page</Text>
            <Button onPress={() => {
                console.log("change view to AboutView")
                navigation.navigate('HomeView')
            }}>Back</Button>
        </View>
    )
}

export default AboutView