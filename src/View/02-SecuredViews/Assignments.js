import React from 'react';
import { View, Text } from 'react-native';
import tw from '../../lib/tailwind';

const AssignmentsView = ({navigation}) => {
    return (
        <View style={tw`items-center flex-1 bg-pureblack-0`}>
            <Text>AssignmentsView Page</Text>
        </View>
    )
}

export default AssignmentsView