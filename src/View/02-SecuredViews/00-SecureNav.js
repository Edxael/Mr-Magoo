import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeView from './01-HomeView'
import AboutView from './02-AboutView'

const Stack = createStackNavigator();

const SecureNav = () => {
  return (
    <NavigationContainer >
        <Stack.Navigator  initialRouteName="LogIn">
            <Stack.Screen name="HomeView" component={HomeView} options={{ title: 'Home Dashboard' }} />
            <Stack.Screen name="AboutView" component={AboutView} options={{ title: 'About Us' }}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default SecureNav;