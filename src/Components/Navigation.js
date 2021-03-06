import React from 'react'
import { View, Image, Text, Pressable, useWindowDimensions } from 'react-native'
import tw from '../lib/tailwind'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCalendarAlt, faFileSignature, faFolderOpen, faClock, faSuitcase, faPhoneAlt, faChevronRight, faChevronLeft, faLock } from '@fortawesome/free-solid-svg-icons'
import * as RootNavigation from './RootNavigation'
import { useStoreon } from 'storeon/react'

const NavLink = ({ icon, text, isExpanded, children, viewToDisplay, logOut }) => {
  const { dispatch } = useStoreon()
  const handleLogOut = async => {
    dispatch('auth/logout', {})
  }
  return (
    <Pressable
      style={s => tw.style(
        'mx-8 h-48 mt-8 rounded-3 justify-between items-center flex-row',
        RootNavigation.getCurrentRoute()?.name === viewToDisplay || s.hovered ? 'bg-pureblack-10' : 'bg-pureblack-5'
      )}
      onPress={() => {
        if (logOut) {
          console.log('Login you OUT...')
          handleLogOut()
        }
        RootNavigation.navigate(viewToDisplay)
      }}
    >
      <View style={tw`flex-row`}>
        <FontAwesomeIcon icon={icon} style={tw`px-16`} />
        {isExpanded && <Text style={tw`text-16 text-black-800`}>{text}</Text>}
      </View>
      {isExpanded && children}
    </Pressable>
  )
}

const Navigation = ({ navigation }) => {
  const window = useWindowDimensions()
  console.log(window)

  const [isExpanded, setIsExpanded] = React.useState(true)

  // if(window.width <= 900 && isExpanded){
  //     console.log("closing the menu")
  //     setIsExpanded(false)
  // }

  const updateNav = () => {
    setIsExpanded(s => !s)
  }

  return (
    <View style={tw.style('bg-pureblack-5 justify-between relative z-30', isExpanded ? 'w-256' : 'w-64')}>

      <Pressable
        onPress={updateNav}
        style={tw`absolute border w-24 h-24 rounded-full -right-12 top-8 z-40 bg-pureblack-0 justify-center items-center border-pureblack-15`}
      >
        <FontAwesomeIcon icon={isExpanded ? faChevronLeft : faChevronRight} style={tw``} size={12} />
      </Pressable>

      <View>
        <NavLink icon={faCalendarAlt} text='Assignments' isExpanded={isExpanded} viewToDisplay='AssignmentsView' />

        <NavLink icon={faFileSignature} text='Application' isExpanded={isExpanded} viewToDisplay='ApplicationView' />

        <NavLink icon={faFolderOpen} text='Documents' isExpanded={isExpanded} viewToDisplay='DocumentsView'>
          <View style={tw`pr-12 flex-row items-center`}>
            <View style={tw`bg-pureblack-20 font-700 rounded-3 px-4 py-2 uppercase`}>
              <Text style={tw`text-11 text-pureblack-65`}>Beta</Text>
            </View>
            <View style={tw`rounded-full w-12 h-12 bg-secondary-500 ml-8`} />
          </View>
        </NavLink>

        <NavLink icon={faClock} text='Time Entry' isExpanded={isExpanded} viewToDisplay='TimeEntryView' />

        <NavLink icon={faSuitcase} text='Travel' isExpanded={isExpanded} viewToDisplay='TravelView' />

        <NavLink icon={faLock} text='LogOut' isExpanded={isExpanded} viewToDisplay='' logOut='true' />
      </View>
      <View style={tw.style('px-48 py-24', isExpanded ? '' : 'hidden')}>
        <View style={tw`flex-row items-center`}>
          <FontAwesomeIcon icon={faPhoneAlt} style={tw`mr-12 p-6 border border-solid rounded-full border-pureblack-20 text-black-600`} size={9} />
          <Text style={tw`text-16 text-black-800 font-400`}>855-509-5520</Text>
        </View>
        <Text style={tw`text-12 text-black-600 mt-24`}>?? 2021 CHG Management, Inc. CHG Healthcare Company</Text>
        <Text style={tw`text-12 text-black-600 mt-24`} href='#'>Privacy Policy</Text>
        <Text style={tw`text-12 text-black-600 mt-24`} href='#'>Terms & Conditions</Text>
        <Text style={tw`text-12 text-black-600 mt-24`} href='#'>Site Feedback</Text>
      </View>
    </View>
  )
}

export default Navigation
