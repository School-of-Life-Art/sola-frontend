import { View, Text, SafeAreaView, BackHandler, Platform, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import longBar from "../assets/images/home/longBar.png"
import patternCircles from "../assets/images/home/pattern_circles.png"
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
import house from "../assets/images/home/house.png"
import logout from "../assets/images/home/logout.png"
import { useNavigation } from 'expo-router'
import { connect } from 'react-redux';


const SideMenu = ({ user }) => {
    const navigation = useNavigation();
    function handleCloseSideBar() {
        if (navigation.canGoBack()) {
            navigation.goBack();
            return true;
        }
        return false;
    }
    return (
        <SafeAreaView className="bg-slate-100 dark:bg-slate-900">
            <StatusBar hidden />
            <View className="w-full h-full relative">
                <View className="z-0 w-32 h-full absolute top-0 bottom-0 bg-[#20BBFE] dark:bg-slate-900">
                    <Image source={patternCircles} className="z-0 w-full h-full opacity-10" />
                </View>

                <View className="py-10 flex items-between">
                    <View className="flex-1 w-50 pl-3">
                        <Image source={sideBarLogo} className=" w-24 h-32" />
                        <TouchableOpacity onPress={handleCloseSideBar}>
                            <Image source={cancelWhite} className=" w-10 h-10 ml-7 mt-1" />
                        </TouchableOpacity>
                    </View>
                    <View className="w-50">
                        <View className="ml-auto z-10 bg-[#20BBFE] w-16 h-16 rounded-full mr-4 border">
                            <Image source={profileImg} className="rounded-full " style={{ width: '100%', height: '100%', zIndex: 10 }} />
                        </View>
                        <View className="ml-auto z-10  w-52 mt-4 border">
                            <Text className="text-end text-2xl text-gray-600 dark:text-slate-200">{user.user && (user.user.first_name + " " + user.user.last_name)}</Text>
                        </View>
                    </View>
                </View>

                <View className="mt-10 flex flex-col py-10 w-full h-96  gap-2">
                    <TouchableOpacity className="h-10 w-auto flex flex-row items-center ml-40" onPress={() => navigation.navigate('Home')}>
                        <Image source={homeIcon} className="w-10 h-10 ml-8" />
                        <Text className="ml-20 text-xl text-gray-500 dark:text-slate-200">Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="h-10 w-auto flex flex-row items-center ml-40" onPress={() => navigation.navigate('Planner')}>
                        <Image source={calendar} className="w-10 h-10 ml-8" />
                        <Text className="ml-20 text-xl text-gray-500 dark:text-slate-200">Planner</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="h-10 w-auto flex flex-row items-center ml-40">
                        <Image source={piggyBank} className="w-10 h-10 ml-8" />
                        <Text className="ml-20 text-xl text-gray-500 dark:text-slate-200">Finance</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="h-10 w-auto flex flex-row items-center ml-40">
                        <Image source={heartBeat} className="w-10 h-10 ml-8" />
                        <Text className="ml-20 text-xl text-gray-500 dark:text-slate-200">Wellness</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="h-10 w-auto flex flex-row items-center ml-40">
                        <Image source={briefcase} className="w-10 h-10 ml-8" />
                        <Text className="ml-20 text-xl text-gray-500 dark:text-slate-200">Study & Career</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="h-10 w-auto flex flex-row items-center ml-40" onPress={() => navigation.navigate('Reminders')}>
                        <Image source={bell} className="w-10 h-10 ml-8" />
                        <Text className="ml-20 text-xl text-gray-500 dark:text-slate-200">Reminders</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="h-10 w-auto flex flex-row items-center ml-40" onPress={() => navigation.navigate('Settings')}>
                        <Image source={settings} className="w-10 h-10 ml-8" />
                        <Text className="ml-20 text-xl text-gray-500 dark:text-slate-200">Settings</Text>
                    </TouchableOpacity>

                </View>

                {/* <Image source={house} className=" w-28 h-28" /> */}

                <View className="flex-1 justify-between flex-row w-full h-10 items-center">
                    <TouchableOpacity className="flex flex-row items-center ">
                        <Image source={logout} className="w-10 h-10 ml-8" />
                    </TouchableOpacity>
                    <Image source={house} className=" w-32 h-32" />
                </View>
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(SideMenu);