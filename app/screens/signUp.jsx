import { View, Text, SafeAreaView, ImageBackground, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Link } from 'expo-router';

const SignUp = () => {
    return (
        <View className="w-full h-full">
            <ImageBackground className=" w-full h-auto flex-1" source={require("../assets/images/loginBg.png")}>
                <StatusBar hidden />
                <View className="mt-auto bg-gray-100 h-3/4 rounded-t-3xl">
                    <ScrollView>
                        <Text className="pt-5 text-center text-2xl font-semibold">
                            Sign Up
                        </Text>
                        <View className="w-full h-full px-5 py-5 ">
                            <TouchableOpacity className="  my-1 w-10px h-auto py-3 shadow shadow-orange-800   bg-orange-500 rounded-full">
                                <Text className="text-md text-center text-gray-50 font-md">
                                    <Icon name="google" size={17} color="#fff" />{"   "}
                                    sign up with Google</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="shadow shadow-blue-800 my-2 w-10px h-auto py-3 shadow-3xl   bg-blue-600 rounded-full ">
                                <Text className="text-md text-center text-gray-50 font-md">
                                    <Icon name="facebook-square" size={17} color="#fff" />{"   "}
                                    sign up with facebook</Text>
                            </TouchableOpacity>

                            <View className="flex flex-row justify-around items-center gap-5">
                                <View className="w-32 h-1 border-gray-400 border-b"></View>
                                <Text className="text-lg ">or</Text>
                                <View className="w-32 h-1 border-gray-400 border-b"></View>

                            </View>

                            <KeyboardAvoidingView className="">
                                <TextInput
                                    placeholder="username"
                                    className="mb-3 mt-5 border border-gray-300 rounded-full px-6 py-2 text-md text-gray-500 "
                                // value={inputText}
                                // onChangeText={handleInputChange}
                                />
                                <TextInput
                                    placeholder="age"
                                    className="mb-3 border border-gray-300 rounded-full px-6 py-2 text-md text-gray-500"
                                // value={inputText}
                                // onChangeText={handleInputChange}
                                />
                                <TextInput
                                    placeholder="email"
                                    className="mb-3 border border-gray-300 rounded-full px-6 py-2 text-md text-gray-500"
                                // value={inputText}
                                // onChangeText={handleInputChange}
                                />
                                <TextInput
                                    placeholder="password"
                                    className="border border-gray-300 rounded-full px-6 py-2 text-md text-gray-500"
                                    secureTextEntry
                                // value={inputText}
                                // onChangeText={handleInputChange}
                                />
                                <TextInput
                                    placeholder="confirm password"
                                    className="mt-3 border border-gray-300 rounded-full px-6 py-2 text-md text-gray-500"
                                    secureTextEntry
                                // value={inputText}
                                // onChangeText={handleInputChange}
                                />
                                <TouchableOpacity className="shadow shadow-gray-800 mt-7 mb-5 w-10px h-auto py-2 shadow-3xl   bg-gray-800 rounded-full ">
                                    <Text className="text-lg text-center text-gray-50 font-md">
                                        sign up {" "}
                                        <Icon name="arrow-right" size={17} color="#fff" className="font-light" />

                                    </Text>
                                </TouchableOpacity>
                                <View className="flex flex-col justify-between items-center gap-3 mb-5">
                                    <Text className="text-md text-gray-600 ">Already have an account? <Link href={'/screens/login'} className="underline underline-offset-4 text-blue-600 ">login</Link></Text>
                                    <Text className="text-md text-gray-600 ">Read our <Link href={'/termsAndConditions'} className="underline underline-offset-4 text-blue-600 ">Terms & Conditions</Link></Text>
                                </View>
                            </KeyboardAvoidingView>

                        </View>
                    </ScrollView>
                </View>
            </ImageBackground>
        </View>
    )
}

export default SignUp