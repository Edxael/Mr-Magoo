import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import tw from './src/lib/tailwind';

const desktop = 'flex-1 bg-pureblack-0 justify-center items-center'
const mobile = 'flex-1 bg-primary-100 justify-center items-center'

export default function App(props) {
  const [layoutStyle, setLayoutStyle] = React.useState(desktop);

  const handleLayout = ({ nativeEvent }) => {
    if(nativeEvent.layout.width < 500) {
      setLayoutStyle(mobile)
    } else {
      setLayoutStyle(desktop)
    }
  };


  return (
    <View onLayout={handleLayout} style={tw`${layoutStyle}`}>
      <Text style={tw`text-primary-900 text-16 font-700`}>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}