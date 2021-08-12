import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './Login'
import ForgotPassword from './02-FogotPassword'

const Stack = createStackNavigator();

const UnSecureNav = () => {
  return (
    <NavigationContainer >
        <Stack.Navigator  initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} options={{ title: 'Log In' }} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ title: 'Forgot Password' }}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default UnSecureNav;