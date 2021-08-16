import React from 'react'
import { View, Text, Pressable, ScrollView } from 'react-native'
import tw from '../lib/tailwind'

export const Tabs = ({ children }) => {
  const [selectedTab, setSelectedTab] = React.useState(0)

  return (
    <View>
      <View style={tw`flex-row h-48 items-center border-b border-pureblack-20`}>
        {children.map((child, index) =>
          <Pressable
            key={child.props.name}
            style={s => tw.style(
              'px-16 h-full items-center justify-center',
              selectedTab === index && 'border-b-4',
              s.hovered && selectedTab !== index && 'border-b-4 border-pureblack-40',
              !s.hovered && selectedTab !== index && 'pb-4'
            )}
            onPress={() => { setSelectedTab(index) }}
          >
            <Text
              style={tw.style(
                'font-600 text-12',
                selectedTab === index ? 'text-black-800' : 'text-pureblack-40'
              )}
            >
              {child.props.name}
            </Text>
          </Pressable>
        )}
      </View>

      <View>
        {children.map((child, index) => selectedTab === index && <View key={child.props.name}>{child}</View>)}
      </View>
    </View>
  )
}

export const Tab = ({ title, children }) => {
  return (
    <ScrollView>{children}</ScrollView>
  )
}
