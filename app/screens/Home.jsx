import { View, Text, Image, Platform, StyleSheet, BackHandler, ScrollView, Switch } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';
import profileImg from "../assets/images/home/profile.jpg"
// import gridMenuImg from "../assets/images/home/grid.png"
import { TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';
import Upcoming from '../components/Upcoming';
import CircularProgress from 'react-native-circular-progress-indicator';
import { connect, useDispatch } from 'react-redux';
import GridMenu from '../components/GridMenu';
import { loginSuccess } from '../actions/authActions';
import JournalHomeModal from '../components/journalComponents/JournalHomeModal';


const Home = ({ user, theme }) => {
//   const dispatch = useDispatch()

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const userFromStorage = await getData("user"); 
//         if(!user) { dispatch(loginSuccess(userFromStorage))}
//       } catch (error) {
//         console.log('Error fetching user:', error);
//       }finally{
//       }
//     };
  
//     fetchUser();
// }, [])

  const navigation = useNavigation();
  const [timeOfDay, setTimeOfDay] = useState('');

  function handleProfile() {
    navigation.navigate("SideMenu")
  }

  useEffect(() => {
    const backAction = () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
        return true;
      }
      return false;
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

  useEffect(() => {
    getHour();
  }, []);

  const getHour = () => {
    const date = new Date();
    const hour = date.getHours();
    if (hour < 5) {
      setTimeOfDay('Happy late nights!');
    }
    else if (hour < 12) {
      setTimeOfDay('Good Morning,');
    } else if (hour >= 12 && hour < 18) {
      setTimeOfDay('Good Afternoon,');
    } else {
      setTimeOfDay('Good Evening,');
    }
  };
  return (
    <SafeAreaView className="bg-slate-100 dark:bg-slate-900 w-full h-full">
      <StatusBar hidden />
      <View className="flex justify-between items-center flex-row px-7 ">
        <View className="pt-7">
          <TouchableOpacity className="" onPress={handleProfile}>
            {/* <Image source={gridMenuImg} className="w-8 h-8 " /> */}
            <GridMenu />
          </TouchableOpacity>
        </View>

        <View className="bg-[#20BBFE]  h-24 w-16 mr-4 mt-0 pt-0 rounded-b-full justify-end items-center">
          <TouchableOpacity className="mt-auto w-14 h-14  rounded-full z-10 mb-2 shadow-lg shadow-gray-700 dark:shadow-gray-100" onPress={handleProfile} >
            {
              user.user && user.user.profile_picture ? 
              <Image source={{uri: user.user.profile_picture}} className="rounded-full " style={{ width: '100%', height: '100%', zIndex: 10 }} /> 
              :
              <Image source={profileImg} className="rounded-full " style={{ width: '100%', height: '100%', zIndex: 10 }} />
            }
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="pt-5 px-5">
        <JournalHomeModal navigation={navigation} theme={theme} />
        <Text className="text-2xl font-semibold text-gray-700 dark:text-gray-200 z-10">{timeOfDay} {" \n"}
          <Text className="">{user.user && user.user.first_name}</Text>
        </Text>

        <View className="pt-7">
          <Text className="text-lg font-medium text-gray-700 dark:text-gray-200">Upcoming </Text>
        </View>

        <Upcoming />

        <View className="pt-7 ">
          <Text className="text-lg font-medium text-gray-700 dark:text-gray-200">Ongoing </Text>
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

        <TouchableOpacity  onPress={() => navigation.navigate("Wave")} className="mt-3 flex-1 justify-center items-center w-full h-32 bg-[#E9DBFF] d rounded-md">
          <Text className="text-xl dark:text-gray-50">Awesome human</Text>
        </TouchableOpacity>

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
const mapStateToProps = (state) => ({
  user: state.auth.user,
  theme: state.theme.theme
});

export default connect(mapStateToProps)(Home);