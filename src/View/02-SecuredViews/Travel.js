import React from 'react';
import { View, Text } from 'react-native';
import tw from '../../lib/tailwind';

const TravelView = ({navigation}) => {
    return (
        <View style={tw`items-center flex-1 bg-pureblack-0`}>
            <Text>TravelView Page</Text>
        </View>
    )
}

export default TravelView