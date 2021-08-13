import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Linking from 'expo-linking';

import { View } from 'react-native';
import tw from '../../lib/tailwind';
import Header from '../../Components/Header'
import Navigation from '../../Components/Navigation'

import AssignmentsView from './Assignments'
import ApplicationView from './Application'
import DocumentsView from './Documents'
import TimeEntryView from './TimeEntry'
import TravelView from './Travel'

import { navigationRef } from '../../Components/RootNavigation'

const Stack = createStackNavigator();
const prefix = Linking.createURL('/');

const SecureNav = ({navigation}) => {
  const linking = {
    prefixes: [prefix],
  };

  return (
    <NavigationContainer linking={linking} ref={navigationRef} >
      <View style={tw`flex-1`}>
        <Header />
        <View style={tw`flex-row flex-1`}>
          <Navigation navigation={navigation} />
          <View style={tw`flex-1 z-20`}>
            <Stack.Navigator initialRouteName='TravelView' screenOptions={{ headerShown: false }}>
              <Stack.Screen name='AssignmentsView' component={AssignmentsView} />
              <Stack.Screen name='ApplicationView' component={ApplicationView} />
              <Stack.Screen name='DocumentsView' component={DocumentsView} />
              <Stack.Screen name='TimeEntryView' component={TimeEntryView} />
              <Stack.Screen name='TravelView' component={TravelView} />
            </Stack.Navigator>
          </View>
        </View>
      </View>
    </NavigationContainer>
  )
}

export default SecureNav
