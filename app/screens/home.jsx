import { View, Text, Image, Platform, StyleSheet, BackHandler, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';
import profileImg from "../assets/images/home/profile.jpg"
import gridMenuImg from "../assets/images/home/grid.png"
import { TouchableOpacity } from 'react-native';
import { Link, useNavigation } from 'expo-router';
import Upcoming from '../components/Upcoming';
import CircularProgress from 'react-native-circular-progress-indicator';


const Home = () => {
  const navigation = useNavigation();
  function handleProfile() {
    navigation.navigate("SideMenu")
  }

  useEffect(() => {
    const backAction = () => {
      // Handle hardware back button press or iOS swipe gesture
      if (navigation.canGoBack()) {
        navigation.goBack();
        return true; // Prevent default behavior (exit the app)
      }
      return false; // Default behavior (exit the app)
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    if (Platform.OS === 'ios') {
      const swipeGestureHandler = navigation.addListener('swipeLeft', backAction);

      return () => {
        swipeGestureHandler.remove();
        backHandler.remove();
      };
    } else {
      return () => backHandler.remove();
    }
  }, [navigation]);

  return (
    <SafeAreaView>
      <StatusBar hidden />
      <View className="flex justify-between items-center flex-row px-7">
        <View className="pt-7">
          <TouchableOpacity className="w-16 h-16" onPress={handleProfile}>
            <Image source={gridMenuImg} className="w-8 h-8 " />
          </TouchableOpacity>
        </View>

        <View className="bg-[#20BBFE] h-24 w-16 mr-4 mt-0 pt-0 rounded-b-full justify-end items-center">
          <TouchableOpacity className="mt-auto w-14 h-14  rounded-full z-10 mb-2 shadow-lg shadow-gray-700" onPress={handleProfile} >
            <Image source={profileImg} className="rounded-full " style={{ width: '100%', height: '100%', zIndex: 10 }} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="pt-5 px-5">
        <Text className="text-2xl font-semibold text-gray-700">Good Evening, {" \n"}
          <Text className="">Anastacia</Text>
        </Text>

        <View className="pt-7">
          <Text className="text-lg font-medium text-gray-700">Upcoming </Text>
        </View>

        <Upcoming />

        <View className="pt-7 ">
          <Text className="text-lg font-medium text-gray-700">Ongoing </Text>
        </View>
        <View className="mt-3 flex-1 justify-center items-center w-full h-32 bg-[#E9DBFF] rounded-md " style={styles.shadow}>
          <View className="m-3 border-l-4  border-[#E90000] w-72 h-24 flex-a ml-auto flex-row justify-around items-center">
            <View >
            <Text className="text-sm font-light uppercase">Study</Text>
            <Text className="text-lg font-semibold capitalize">frontend dev</Text>
            <Text className="text-sm  uppercase">10am-12pm</Text>


            </View>
          <CircularProgress
            value={77}
            radius={40}
            activeStrokeColor='#20BBFE'
            inActiveStrokeColor={'#20BBFE'}
            inActiveStrokeOpacity={0.2}
            progressValueColor={'#333'}
            valueSuffix={'%'}
            duration={2000}
            onAnimationComplete={() => { console.log("completed"); }}
          />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
})


export default Home