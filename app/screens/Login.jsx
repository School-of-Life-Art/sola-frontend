import { View, Text, SafeAreaView, ImageBackground, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Link, useNavigation } from 'expo-router';
import BASE_URL from '../baseUrl';
import { useToast } from "react-native-toast-notifications";
import { loginSuccess } from '../actions/authActions';
import { connect, useDispatch } from 'react-redux';
import { getData, storeData } from '../reducers/asyncStorage';

const Login = ({ user }) => {
    const toast = useToast();
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchToken = async () => {
          try {
            const token = await getData("authToken");
            const userFromStorage = await getData("user");
            console.log(userFromStorage,'from kutoka storage')
            if(!user) { 
                if(userFromStorage){
                    console.log(userFromStorage, 'kutoka storage')
                    const userToDispatch = JSON.parse(userFromStorage);
                    dispatch(loginSuccess(userToDispatch))
                }
                // navigation.replace('Home')
            }
            // if(token) navigation.replace('Home')
          } catch (error) {
            console.log('Error fetching token:', error);
          }finally{
            setIsLoading(false)
          }
        };
      
        fetchToken();
    }, [user])
    

    async function handleLogin() {
        if (!validateEmail(email)) {
            setEmailError("Invalid email address");
            return;
        }
        if (!validatePassword(password)) {
            setPasswordError("Password must be at least 6 characters");
            return;
        }
        setIsLoading(true)
        try {
            const response = await fetch(`${BASE_URL}/api/v1/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    user: {
                        email, password
                    }
                })
            })
            if (response.ok) {
                const data = await response.json()
                storeData("user", JSON.stringify(data))
                storeData("authToken", data.jwt)
                navigation.replace('Home');
                dispatch(loginSuccess(data))
            }
            else {
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
    function handleShowPassword() {
        setShowPassword(!showPassword);
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const validatePassword = (password) => {
        return password.length >= 6;
    }

    useEffect(() => {
        if (email === "") {
            setEmailError("")
        }
        if (password === "") {
            setPasswordError("")
        }
        if (validateEmail(email)) {
            setEmailError("");
            return;
        }
        if (validatePassword(password)) {
            setPasswordError("");
            return;
        }
    }, [email, password])

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
                        {/* <TouchableOpacity className="my-2 w-10px h-auto py-3 shadow-3xl   bg-blue-600 rounded-full ">
                                <Text className="text-md text-center text-gray-50 font-md">
                                    <Icon name="facebook-square" size={17} color="#fff" />{"   "}
                                    log in with facebook</Text>
                            </TouchableOpacity> */}

                        <View className="flex flex-row justify-around items-center gap-5">
                            <View className="w-32 h-1 border-gray-400 border-b"></View>
                            <Text className="text-lg ">or</Text>
                            <View className="w-32 h-1 border-gray-400 border-b"></View>

                        </View>

                        <KeyboardAvoidingView className="">
                            {emailError ? <Text className="text-red-500 pb-2 pl-4">{emailError}</Text> : null}
                            <TextInput
                                placeholder="email"
                                className="border border-gray-400 rounded-full px-6 py-2 mb-5 text-md text-gray-500 font-semibold"
                                value={email}
                                onChangeText={(email) => setEmail(email)}
                            />
                            {passwordError ? <Text className="text-red-500 pl-4 ">{passwordError}</Text> : null}
                            <View className="mb-3 border border-gray-400 rounded-full text-md text-gray-500 font-semibold flex flex-row items-center">
                                <TextInput
                                    placeholder="password"
                                    className="rounded-full px-6 py-2 text-md text-gray-500 font-semibold w-[90%]"
                                    secureTextEntry={!showPassword}
                                    value={password}
                                    onChangeText={(password) => setPassword(password)}
                                />
                                <TouchableOpacity onPress={handleShowPassword}>
                                    <Icon name={showPassword ? "eye" : "eye-slash"} size={24} color="#333333B2" />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity className="mt-7 mb-5 w-10px h-auto py-2 shadow-3xl   bg-gray-800 rounded-full" onPress={handleLogin} disabled={!email || !password}>
                                {isLoading ? (
                                    <ActivityIndicator color="#ffffff" />
                                ) : (
                                    <Text className="text-lg text-center text-gray-50 font-md">
                                        login {" "}
                                        <Icon name="arrow-right" size={17} color="#fff" className="font-light" />
                                    </Text>
                                )}
                            </TouchableOpacity>
                            <View className="flex flex-col justify-between items-center gap-3 mb-5">
                                {/* <Touch */}
                                <Text className="text-md text-gray-600 font-medium">Don't have an account? <Link href={'/screens/signUp'} className="underline underline-offset-4 text-[#20BBFE] ">Sign Up</Link></Text>
                                <Text className="text-md text-gray-600 font-medium">Forgot Password? <Link href={"/reset"} className="underline underline-offset-4 text-[#20BBFE] ">reset</Link></Text>
                            </View>
                        </KeyboardAvoidingView>

                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
  });
  
  export default connect(mapStateToProps)(Login);