import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { View, Image, Text, TextInput, Button, Pressable } from 'react-native';
import tw from '../../lib/tailwind';
import Header from '../../Components/Header'
import Navigation from '../../Components/Navigation';

// import HomeView from './01-HomeView'
// import AboutView from './02-AboutView'

import AssignmentsView from './Assignments'
import ApplicationView from './Application'
import DocumentsView from './Documents'
import TimeEntryView from './TimeEntry'
import TravelView from './Travel'

import { navigationRef } from '../../Components/RootNavigation'

const Stack = createStackNavigator();

const SecureNav = ({navigation}) => {
  return (
    <NavigationContainer ref={navigationRef} >
      <View style={tw`flex-1`}>
          <Header></Header>
          <View style={tw`flex-row flex-1`}>
              <Navigation navigation={navigation}></Navigation>
              <View style={tw`flex-1 z-20`}>
                  <Stack.Navigator  initialRouteName="AssignmentsView">
                      <Stack.Screen name="AssignmentsView" component={AssignmentsView} options={{ title: 'AssignmentsView title' }} />
                      <Stack.Screen name="ApplicationView" component={ApplicationView} options={{ title: 'ApplicationView title' }} />
                      <Stack.Screen name="DocumentsView" component={DocumentsView} options={{ title: 'title DocumentsView' }} />
                      <Stack.Screen name="TimeEntryView" component={TimeEntryView} options={{ title: 'title TimeEntryView' }} />
                      <Stack.Screen name="TravelView" component={TravelView} options={{ title: 'title TravelView' }} />
                  </Stack.Navigator>
              </View>
          </View>
      </View>
    </NavigationContainer>
  );
}

export default SecureNav;