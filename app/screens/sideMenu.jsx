import { View, Text, SafeAreaView, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import longBar from "../assets/images/home/longBar.png"
import profileImg from "../assets/images/home/profile.jpg"
import sideBarLogo from "../assets/images/home/sideBarLogo.png"
import cancelWhite from "../assets/images/home/cancel-white.png"
import settings from "../assets/images/home/settings.png"
import bell from "../assets/images/home/bell.png"
import briefcase from "../assets/images/home/case.png"
import piggyBank from "../assets/images/home/piggy-bank.png"
import heartBeat from "../assets/images/home/Heartbeat.png"
import calendar from "../assets/images/home/calendar.png"
import homeIcon from "../assets/images/home/homeIcon.png"

const SideMenu = () => {
    function handleCloseSideBar() {
        console.log("You tried to close the sidebar foo!")
    }
    return (
            <SafeAreaView>
                <StatusBar hidden />
                <View className="w-full h-full relative">
                    <Image source={longBar} className="z-0 w-36 h-full absolute top-0 bottom-0" />

                    <View className="py-10 flex items-between">
                        <View className="flex-1 w-50 pl-3">
                            <Image source={sideBarLogo} className=" w-24 h-32" />
                            <TouchableOpacity onPress={handleCloseSideBar}>
                                <Image source={cancelWhite} className=" w-10 h-10 ml-7 mt-1" />
                            </TouchableOpacity>
                        </View>
                        <View className="w-50">
                            <View className="ml-auto z-10 bg-[#20BBFE] w-16 h-16 rounded-full mr-4">
                                <Image source={profileImg} className="rounded-full " style={{ width: '100%', height: '100%', zIndex: 10 }} />
                            </View>
                            <View className="ml-auto z-10  w-52 mt-4">
                                <Text className="text-end font-semibold text-2xl text-gray-600">Anastacia Kamau</Text>
                            </View>
                        </View>
                    </View>

                    <View className="mt-10 flex flex-col py-10 w-full h-96  gap-2">
                        <TouchableOpacity className="h-12 w-auto flex flex-row items-center ml-40">
                            <Image source={homeIcon} className="w-10 h-10 ml-8" />
                            <Text className="ml-20 text-xl font-semibold text-gray-500">Home</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="h-12 w-auto flex flex-row items-center ml-40">
                            <Image source={calendar} className="w-10 h-10 ml-8" />
                            <Text className="ml-20 text-xl font-semibold text-gray-500">Planner</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="h-12 w-auto flex flex-row items-center ml-40">
                            <Image source={piggyBank} className="w-10 h-10 ml-8" />
                            <Text className="ml-20 text-xl font-semibold text-gray-500">Finance</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="h-12 w-auto flex flex-row items-center ml-40">
                            <Image source={heartBeat} className="w-10 h-10 ml-8" />
                            <Text className="ml-20 text-xl font-semibold text-gray-500">Wellness</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="h-12 w-auto flex flex-row items-center ml-40">
                            <Image source={briefcase} className="w-10 h-10 ml-8" />
                            <Text className="ml-20 text-xl font-semibold text-gray-500">Study & Career</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="h-12 w-auto flex flex-row items-center ml-40">
                            <Image source={bell} className="w-10 h-10 ml-8" />
                            <Text className="ml-20 text-xl font-semibold text-gray-500">Reminders</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="h-12 w-auto flex flex-row items-center ml-40">
                            <Image source={settings} className="w-10 h-10 ml-8" />
                            <Text className="ml-20 text-xl font-semibold text-gray-500">Settings</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </SafeAreaView>
    )
}

export default SideMenu