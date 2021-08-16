import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';

import Login from './Login'
import ForgotPassword from './02-FogotPassword'
import EmailResetInfo from './EmailResetInfo'

const Stack = createStackNavigator();

const UnSecureNav = ({navigation}) => {

  return (
      
    <NavigationContainer >
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
            <Stack.Screen name="EmailResetInfo" component={EmailResetInfo}/>
        </Stack.Navigator>
    </NavigationContainer>
      
  );
}

export default UnSecureNav;