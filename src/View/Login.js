import React from 'react';
import { View, Image, Text, TextInput, Button, Pressable } from 'react-native';
import tw from '../lib/tailwind';
import logo from '../assets/svg/comphealth-logo.svg'

const Login = () => {

    return (
        <View style={tw`items-center flex-1 bg-pureblack-0`}>
            <View style={tw`items-center h-64 bg-primary-600 w-full`}>
                <Image source={logo} style={tw`h-64 w-160`} />
            </View>
            <View style={tw`w-352`}>
                <Text style={tw`pt-56 pb-40 text-21 text-black-800 text-center`}>Login</Text>                
                <View style={tw`w-full`}>
                    <Text style={tw`text-12 text-black-700`}>Email</Text>
                    <TextInput style={tw`mt-8 h-48 bg-pureblack-5 rounded-3 border border-pureblack-10 text-14 px-12 text-black-800 outline-none`}></TextInput>
                </View>
                <View style={tw`w-full my-24`}>
                    <View style={tw`flex-row justify-between`}>
                        <Text style={tw`text-12 text-black-700`}>Password</Text>
                        <Text style={tw`text-12 text-highlight-800`} href="#">Forgot Password ?</Text>
                    </View>
                    <TextInput style={tw`mt-8 h-48 bg-pureblack-5 rounded-3 border border-pureblack-10 text-14 px-12 text-black-800`}></TextInput>
                </View>

                <Pressable 
                    accessibilityRole="button"
                    style={state => tw.style(
                        'h-48 rounded-3 items-center justify-center',
                        state.hovered && 'bg-primary-400', 
                        !state.hovered && 'bg-primary-500')
                        }>
                        <Text style={tw`text-pureblack-0 text-16`}>Login</Text>
                </Pressable>

            </View>
        </View>
    )
}

export default Login