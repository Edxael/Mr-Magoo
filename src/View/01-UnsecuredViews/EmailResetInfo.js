import React from 'react';
import { View, Image, Text, TextInput, Button, Pressable } from 'react-native';
import tw from '../../lib/tailwind';
import logo from '../../assets/svg/comphealth-logo.svg'
import { useStoreon } from 'storeon/react'

const EmailResetInfo = ({ navigation }) => {

    const { dispatch } = useStoreon()
    const [state, setState] = React.useState({
        username: '',
        password: '',
        showPassword: false,
        isLoading: false
    })

    const handleSubmit = async e => {
        console.log("Executing password reset...")
    }

    return (
        <View style={tw`items-center flex-1 bg-pureblack-0`}>
            <View style={tw`items-center h-64 bg-primary-600 w-full`}>
                <Image source={logo} style={tw`h-64 w-160`} />
            </View>
            <View style={tw`w-352`}>
                <Text style={tw`pt-56 pb-40 text-21 text-black-800 text-center`}>Password Reset</Text>                
                <View style={tw`w-full mb-16`}>
                    <Text>An Email with instructions in how to reset your Password has been send, please check your email.</Text>
                </View>

                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 3,
                        marginTop: 20,
                        marginBottom: 8,
                    }}
                />

                <Pressable 
                    accessibilityRole="button"
                    style={s => tw.style(
                        'h-48 rounded-3 items-center justify-center mt-16',
                        s.hovered && 'bg-primary-200', 
                        !s.hovered && 'bg-primary-300')
                        }
                    onPress={() => { navigation.navigate('Login') }}
                    >
                        <Text style={tw`text-pureblack-0 text-16`}>Return to LogIn</Text>
                </Pressable>

            </View>
        </View>
    )
}

export default EmailResetInfo