import React from 'react'
import { View, Text, ScrollView, Pressable } from 'react-native'
import tw from '../../lib/tailwind'
import { useStoreon } from 'storeon/react'
import { useFocusEffect } from '@react-navigation/native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronUp, faChevronDown, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import TimeLine from '../../Components/Timeline'

const Day = ({ day }) => {
  const [isExpanded, setIsExpanded] = React.useState(true)

  return (
    <View style={tw`mb-8`}>
      <Pressable
        style={s => tw.style(
          'p-8 flex-row rounded-3 justify-between items-center',
          s.hovered ? 'bg-pureblack-20' : 'bg-pureblack-5'
        )}
        onPress={() => { setIsExpanded(s => !s) }}
      >
        <Text style={tw`text-black-800 text-12 font-500`}>{day.displayDate}</Text>
        <FontAwesomeIcon icon={isExpanded ? faMinus : faPlus} style={tw`text-pureblack-60`} size={20} />
      </Pressable>

      {isExpanded &&
        <View>
          <TimeLine bookings={day.travelDetails} />
        </View>}
    </View>
  )
}

const Itinerary = ({ itinerary }) => {
  const [isExpanded, setIsExpanded] = React.useState(true)

  return (
    <View style={tw`bg-pureblack-0 mb-16 rounded-3 relative`}>
      <View style={tw`p-32 flex-row justify-between`}>
        <View>
          <Text style={tw`text-black-800 font-600 text-18 mb-8`}>{itinerary.title}</Text>
          <View style={tw`flex-row`}>
            <Text style={tw`text-black-700 text-14`}>{itinerary.description} • </Text>
            <Text style={tw`text-highlight-800`} href={itinerary.location.googleUrl} hrefAttrs={{ target: '_blank' }}>{itinerary.location.name}</Text>
          </View>
        </View>
        {isExpanded &&
          <Pressable
            style={s => tw.style(
              'px-16 rounded-3 justify-center items-center h-32',
              s.hovered ? 'bg-primary-400' : 'bg-primary-500'
            )}
            onPress={() => window.open(itinerary.btnLink.url, '_blank')}
          >
            <Text style={tw`text-pureblack-0 text-12`}>Full Itinerary</Text>
          </Pressable>}
      </View>

      {isExpanded &&
        <View style={tw`px-32`}>
          {itinerary?.details?.map(day => <Day key={day.displayDate} day={day} />)}
          <Text style={tw`text-black-700 pb-4 text-12 mt-32`}>edited on {itinerary.editedOn}</Text>
        </View>}

      <Pressable
        style={s => tw.style(
          'w-32 h-32 justify-center items-center absolute bottom-4 right-4 rounded-3',
          s.hovered ? 'bg-pureblack-10' : 'bg-pureblack-5'
        )}
        onPress={() => { setIsExpanded(s => !s) }}
      >
        <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} style={tw`px-16 text-pureblack-60`} />
      </Pressable>
    </View>
  )
}

const TravelView = () => {
  const { travel, dispatch } = useStoreon('travel')

  useFocusEffect(
    React.useCallback(() => {
      dispatch('travel/get', { includeAllTravel: false })

      return () => {}
    }, [])
  )

  return (
    <ScrollView style={tw`flex-1 bg-pureblack-10 p-32`} contentContainerStyle={tw`items-center`}>
      <View style={tw`max-w-680`}>
        <View style={tw`flex-row justify-between pb-16`}>
          <Text style={tw`uppercase text-primary-500 text-12 font-700 tracking-widest`}>Itineraries</Text>
          <View style={tw`flex-row`}>
            <Text style={tw`text-black-800 text-14 font-500 pr-8`}>Travel help</Text>
            <Text style={tw`text-highlight-800`} href=''>800-328-3025</Text>
          </View>
        </View>

        {travel.data.map(itinerary => <Itinerary key={itinerary.title} itinerary={itinerary} />)}

        <Text style={tw`text-pureblack-40 text-16 italic`}>Emergency trip changes made by the Airline are not reflected in the itinerary (Flight delays, cancellations, seat changes). Longer-term reservations made with housing companies (Airbnb, Vrbo, other) are shared via email and will not be shown on the itinerary at this time.</Text>
      </View>
    </ScrollView>
  )
}

export default TravelView
