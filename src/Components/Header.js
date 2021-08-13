import React from 'react'
import { View, Image, Dimensions, Text } from 'react-native'
import tw from '../lib/tailwind'
import logo from '../assets/svg/comphealth-logo.svg'

const DesktopHeader = () =>
  <View style={tw`items-center h-64 bg-primary-600 w-full`}>
    <Image source={logo} style={tw`h-64 w-160`} />
  </View>

const MobileHeader = () => {
  return (
    <View style={tw`items-center h-64 bg-primary-600 w-full`}>
      <Image source={logo} style={tw`h-64 w-160`} />
      <Text>Mobile</Text>
    </View>
  )
}

const Header = () => {
  const [windowDims, setWindow] = React.useState(Dimensions.get('window'))

  React.useEffect(() => {
    const handleChange = ({ window: win }) => {
      setWindow(win)
    }

    Dimensions.addEventListener('change', handleChange)
    return () => {
      Dimensions.removeEventListener('change', handleChange)
    }
  }, [setWindow])

  return (
    windowDims.width >= 1200
      ? <DesktopHeader />
      : <MobileHeader />
  )
}

export default Header
