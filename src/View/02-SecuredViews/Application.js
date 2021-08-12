import React from 'react';
import { View, Text } from 'react-native';
import tw from '../../lib/tailwind';

const ApplicationView = ({navigation}) => {
    return (
        <View style={tw`items-center flex-1 bg-pureblack-0`}>
            <Text>ApplicationView Page</Text>
        </View>
    )
}

export default ApplicationView