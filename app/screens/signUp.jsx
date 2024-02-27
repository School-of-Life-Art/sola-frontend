import { View, Text, SafeAreaView, ImageBackground, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Link, useNavigation } from 'expo-router';
import { useToast } from "react-native-toast-notifications";
import BASE_URL from '../baseUrl';


const SignUp = ({navigation}) => {
    const toast = useToast();
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        age: "",
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const validatePassword = (password) => {
        return password.length >= 6;
    }
    function handleShowPassword() {
        setShowPassword(!showPassword);
    }
    async function handleSignUp() {
        if (!validateEmail(formData.email)) {
            setEmailError("Invalid email address");
            return;
        }
        if (!validatePassword(formData.password)) {
            setPasswordError("Password must be at least 6 characters");
            return;
        }
        setIsLoading(true)
        try {
            const response = await fetch(`${BASE_URL}/api/v1/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(formData)
            })
            if (response.ok) {
                console.log(response.status)
                const data = await response.json()
                console.log(data, 'from login')
                navigation.navigate("Home")
            }
            else {
                console.log(response.status)
                toast.show("Invalid email or password", {
                    type: "danger",
                    placement: "top",
                    duration: 4000,
                    offset: 30,
                    animationType: "zoom-in",
                    swipeEnabled: true
                });

            }

        }
        catch (error) {
            toast.show("There was a problem with the fetch operation", {
                type: "danger",
                placement: "bottom",
                duration: 4000,
                offset: 30,
                animationType: "zoom-in",
            });
            console.error('There was a problem with the fetch operation:', error.message);
        }
        finally {
            setIsLoading(false);
        };
    }
    useEffect(() => {
        if (formData.email === "") {
            setEmailError("")
        }
        if (formData.password === "") {
            setPasswordError("")
        }
        if (validateEmail(formData.email)) {
            setEmailError("");
            return;
        }
        if (validatePassword(formData.password)) {
            setPasswordError("");
            return;
        }
    }, [formData.email, formData.password])
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
                            {/* <TouchableOpacity className="shadow shadow-blue-800 my-2 w-10px h-auto py-3 shadow-3xl   bg-blue-600 rounded-full ">
                                <Text className="text-md text-center text-gray-50 font-md">
                                    <Icon name="facebook-square" size={17} color="#fff" />{"   "}
                                    sign up with facebook</Text>
                            </TouchableOpacity> */}

                            <View className="flex flex-row justify-around items-center gap-5">
                                <View className="w-32 h-1 border-gray-400 border-b"></View>
                                <Text className="text-lg ">or</Text>
                                <View className="w-32 h-1 border-gray-400 border-b"></View>

                            </View>

                            <KeyboardAvoidingView className="">
                                <TextInput
                                    placeholder="first name"
                                    className="mb-3 mt-5 border border-gray-300 rounded-full px-6 py-2 text-md text-gray-500 "
                                    value={formData.first_name}
                                    onChangeText={(first_name) => setFormData({ ...formData, first_name })}
                                />
                                <TextInput
                                    placeholder="last name"
                                    className="mb-3 border border-gray-300 rounded-full px-6 py-2 text-md text-gray-500 "
                                    value={formData.last_name}
                                    onChangeText={(last_name) => setFormData({ ...formData, last_name })}
                                />
                                <TextInput
                                    placeholder="username"
                                    className="mb-3 border border-gray-300 rounded-full px-6 py-2 text-md text-gray-500 "
                                    value={formData.username}
                                    onChangeText={(username) => setFormData({ ...formData, username })}
                                />
                                <TextInput
                                    placeholder="age"
                                    className="mb-3 border border-gray-300 rounded-full px-6 py-2 text-md text-gray-500"
                                    value={formData.age.toString()}
                                    keyboardType='numeric'
                                    onChangeText={(age) => setFormData({ ...formData, age })}
                                />
                                {emailError ? <Text className="text-red-500 pb-2 pl-4">{emailError}</Text> : null}
                                <TextInput
                                    placeholder="email"
                                    className="mb-3 border border-gray-300 rounded-full px-6 py-2 text-md text-gray-500"
                                    value={formData.email}
                                    onChangeText={(email) => setFormData({ ...formData, email })}
                                />
                                {passwordError ? <Text className="text-red-500 pl-4 ">{passwordError}</Text> : null}

                                <View className=" border border-gray-300 rounded-full text-md text-gray-500 font-semibold flex flex-row items-center">
                                    <TextInput
                                        placeholder="password"
                                        className="rounded-full px-6 py-2 text-md text-gray-500 font-semibold w-[90%]"
                                        secureTextEntry={!showPassword}
                                        value={formData.password}
                                        onChangeText={(password) => setFormData({ ...formData, password })}
                                        />
                                    <TouchableOpacity onPress={handleShowPassword}>
                                        <Icon name={showPassword ? "eye" : "eye-slash"} size={24} color="#333333B2" />
                                    </TouchableOpacity>
                                </View>
                                <TextInput
                                    placeholder="confirm password"
                                    className="mt-3 border border-gray-300 rounded-full px-6 py-2 text-md text-gray-500"
                                    secureTextEntry
                                    value={confirmPassword}
                                    onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                                />
                                <TouchableOpacity onPress={handleSignUp} className="shadow shadow-gray-800 mt-7 mb-5 w-10px h-auto py-2 shadow-3xl   bg-gray-800 rounded-full ">
                                    {isLoading ? (
                                        <ActivityIndicator color="#ffffff" />
                                    ) : (
                                        <Text className="text-lg text-center text-gray-50 font-md">
                                            sign up {" "}
                                            <Icon name="arrow-right" size={17} color="#fff" className="font-light" />

                                        </Text>
                                    )}
                                </TouchableOpacity>
                                <View className="flex flex-col justify-between items-center gap-3 mb-5">
                                    {/* <Text className="text-md text-gray-600 ">Already have an account?
                                     <Link  href={'/screens/login'} className="underline underline-offset-4 text-blue-600 ">login</Link></Text> */}
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