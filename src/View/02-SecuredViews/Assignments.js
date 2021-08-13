import React from 'react'
import { View, Text } from 'react-native'
import tw from '../../lib/tailwind'
import { useStoreon } from 'storeon/react'
import { useFocusEffect } from '@react-navigation/native'
import { Tabs, Tab } from '../../Components/Tabs'

const AssignmentsView = () => {
  const { assignments, dispatch } = useStoreon('assignments')

  useFocusEffect(
    React.useCallback(() => {
    //   dispatch('assignments/get')

      return () => {}
    }, [])
  )

  return (
    <View style={tw`items-center flex-1 bg-pureblack-0 flex-row`}>

      <View style={tw`w-352 h-full`}>
        <Tabs>
          <Tab name='Assignments'>
            <Text>Assignment</Text>
          </Tab>

          <Tab name='Shifts'>
            <Text>Shift</Text>
          </Tab>
        </Tabs>

      </View>

      <View style={tw`flex-1`}>
        <Text>{JSON.stringify(assignments)}</Text>
      </View>

    </View>
  )
}

export default AssignmentsView
