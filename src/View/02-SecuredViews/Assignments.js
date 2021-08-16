import React from 'react'
import { View, Text, Pressable } from 'react-native'
import tw from '../../lib/tailwind'
import { useStoreon } from 'storeon/react'
import { useFocusEffect } from '@react-navigation/native'
import { Tabs, Tab } from '../../Components/Tabs'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import advancedFormat from 'dayjs/plugin/advancedFormat'

dayjs.extend(utc)
dayjs.extend(advancedFormat)

const getAssignmentDateRange = (assignment) => {
  const endDate = assignment.endDate && assignment.endDate !== assignment.startDate ? ` - ${dayjs.utc(assignment.endDate).format('MMM D, YYYY')}` : ''
  return `${dayjs.utc(assignment.startDate).format('MMM D, YYYY')}${endDate}`
}

const AssignmentsView = () => {
  const { assignments, dispatch } = useStoreon('assignments')
  const [displayCompleted, setDisplayCompleted] = React.useState(false)

  const isSelectedAssignment = assignment => {
    return assignment.assignmentId === assignments.selectedAssignment?.assignmentId && assignment.worksiteId === assignments.selectedAssignment?.worksiteId
  }

  useFocusEffect(
    React.useCallback(() => {
      dispatch('assignments/get')

      return () => {}
    }, [])
  )

  return (
    <View style={tw`items-center flex-1 bg-pureblack-0 flex-row`}>

      <View style={tw`w-352 h-full border-l border-pureblack-20 relative`}>
        <Tabs>
          <Tab name='Assignments'>

            {assignments.confirmed.map(assignment =>
              <Pressable
                key={`${assignment.assignmentId}-${assignment.worksiteId}`}
                style={s => tw.style(
                  'pl-16',
                  (s.hovered || isSelectedAssignment(assignment)) && 'bg-highlight-50'
                )}
                onPress={() => dispatch('assignments/update/selectAssignment', assignment)}
              >
                <View style={tw`border-b border-pureblack-20 flex-row justify-between py-16 pr-16 pl-8`}>
                  <View style={tw``}>
                    <Text style={tw`text-12 text-pureblack-50 uppercase`}>{getAssignmentDateRange(assignment)}</Text>
                    <Text style={tw`text-16 text-pureblack-80 font-700 mt-2`}>{assignment.location.city}, {assignment.location.state}</Text>
                    <Text style={tw`text-14 text-pureblack-80 mt-2`}>{assignment.name}</Text>
                  </View>
                  <Text style={tw`bg-highlight-100 text-highlight-900 px-4 text-11 font-500 rounded-3 leading-normal h-16`}>Confirmed</Text>
                </View>

              </Pressable>
            )}

            {assignments.completed.length > 0 &&
              <Pressable
                style={s => tw.style(
                  'rounded-3 border px-16 h-32 justify-center items-center w-max m-16',
                  s.hovered ? 'bg-pureblack-15 border-pureblack-20' : 'bg-transparent border-pureblack-15'
                )}
                onPress={() => setDisplayCompleted(s => !s)}
              >
                <Text style={tw`text-black-800 text-12 font-400`}>View completed assignments ({assignments.completed.length})</Text>
              </Pressable>}

          </Tab>

          <Tab name='Shifts'>
            <Text>Shift Content</Text>
          </Tab>
        </Tabs>

        {/* {
          displayCompleted &&
            <View style={tw`h-full w-full absolute`} from={{ opacity: 0, translateX: tw`tw-translate-x-full` }} animate={{ opacity: 1, translateX: 0, }}>
              <Text>In Drawer</Text>
            </View>
        } */}

      </View>

      <View style={tw`flex-1 border-l border-pureblack-20 h-full`}>
        <Text>{JSON.stringify(assignments)}</Text>
      </View>

    </View>
  )
}

export default AssignmentsView
