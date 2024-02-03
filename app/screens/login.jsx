import { View, Text, SafeAreaView, ImageBackground, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Link, useNavigation } from 'expo-router';

const Login = () => {
    const navigation = useNavigation();
    function handleLogin(){
        navigation.navigate('Home');
    }
    return (
            <ImageBackground className=" w-full h-full flex-1" source={require("../assets/images/loginBg.png")}>
                <StatusBar hidden />
                <View className="mt-auto bg-gray-100 h-4/6 rounded-t-3xl">
                    <ScrollView>
                        <Text className="pt-5 text-center text-2xl font-semibold">
                            Login
                        </Text>
                        <View className="w-full h-full px-5 py-5 ">
                            <TouchableOpacity className="my-1 w-10px h-auto py-3 shadow-lg   bg-orange-500 rounded-full">
                                <Text className="text-md text-center text-gray-50 font-md">
                                    <Icon name="google" size={17} color="#fff" />{"   "}
                                    log in with Google</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="my-2 w-10px h-auto py-3 shadow-3xl   bg-blue-600 rounded-full ">
                                <Text className="text-md text-center text-gray-50 font-md">
                                    <Icon name="facebook-square" size={17} color="#fff" />{"   "}
                                    log in with facebook</Text>
                            </TouchableOpacity>

                            <View className="flex flex-row justify-around items-center gap-5">
                                <View className="w-32 h-1 border-gray-400 border-b"></View>
                                <Text className="text-lg ">or</Text>
                                <View className="w-32 h-1 border-gray-400 border-b"></View>

                            </View>

                            <KeyboardAvoidingView className="">
                                <TextInput
                                    placeholder="email"
                                    className="mb-3 mt-5 border border-gray-400 rounded-full px-6 py-2 text-md text-gray-500 font-semibold"
                                // value={inputText}
                                // onChangeText={handleInputChange}
                                />
                                <TextInput
                                    placeholder="password"
                                    className="border border-gray-400 rounded-full px-6 py-2 text-md text-gray-500 font-semibold"
                                    secureTextEntry
                                // value={inputText}
                                // onChangeText={handleInputChange}
                                />
                                <TouchableOpacity className="mt-7 mb-5 w-10px h-auto py-2 shadow-3xl   bg-gray-800 rounded-full" onPress={handleLogin}>
                                    <Text className="text-lg text-center text-gray-50 font-md">
                                        login {" "}
                                        <Icon name="arrow-right" size={17} color="#fff" className="font-light" />

                                    </Text>
                                </TouchableOpacity>
                                <View className="flex flex-col justify-between items-center gap-3 mb-5">
                                    <Text className="text-md text-gray-600 font-medium">Don't have an account? <Link href={'/screens/signUp'} className="underline underline-offset-4 text-blue-600 ">Sign Up</Link></Text>
                                    <Text className="text-md text-gray-600 font-medium">Forgot Password? <Link href={"/reset"} className="underline underline-offset-4 text-blue-600 ">reset</Link></Text>
                                </View>
                            </KeyboardAvoidingView>

                        </View>
                    </ScrollView>
                </View>
            </ImageBackground>
    )
}

export default Login