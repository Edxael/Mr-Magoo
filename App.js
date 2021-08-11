import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import tw from './src/lib/tailwind';
// import Login from './src/View/Login'
import MainNavigation from './src/View/00-MainNavigation';
import Login from './src/View/Login'
import { StoreContext } from 'storeon/react'
import { store } from './src/store/store'

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
    <StoreContext.Provider value={store}>
      <MainNavigation></MainNavigation>
    </StoreContext.Provider>
  );
}