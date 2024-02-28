import { View, Text, Switch, TouchableOpacity, Touchable, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useColorScheme } from "nativewind";
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import { useNavigation } from 'expo-router';

const Settings = () => {
  const navigation = useNavigation()
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState)
    toggleColorScheme()
  };
  const { colorScheme, toggleColorScheme } = useColorScheme();
  useEffect(() => {
    console.log(colorScheme, 'current scheme here')
  }, [])


  return (<>
    <SafeAreaView className="flex-1 w-full h-full bg-slate-100 dark:bg-slate-900 ">
      <Text className="px-5 text-start text-xl pt-10 text-gray-700 dark:text-gray-200">Settings</Text>
      <View className="w-full relative">
        <Image source={require('../assets/images/home/profile.jpg')} className="w-28 h-28 mx-auto rounded-full" />
        <TouchableOpacity className="absolute left-[115px] bottom-0">
          <FontAwesome name="camera" size={24} color={colorScheme === 'light' ? '#64748b' : '#f3f3f3'} />
        </TouchableOpacity>
      </View>


      <ScrollView className="px-5 py-8">
        <View >
          <Text className="text-slate-600 dark:text-slate-400 text-sm font-semibold">Account information</Text>
          <View>
            <TouchableOpacity className="flex-row gap-2 justify-between items-center py-2 " onPress={() => navigation.navigate('FirstName')}>
              <View className="flex-row gap-2 justify-center items-center">
                <FontAwesome name="user-o" size={20} color={colorScheme === 'light' ? '#64748b' : '#f3f3f3'} />
                <Text className="text font-semibold text-gray-700 dark:text-gray-300">First Name</Text>
              </View>
              <View className="flex-row gap-2 justify-center items-center">
                <Text className=" text-gray-500 dark:text-[#64748b]">John</Text>
                <MaterialIcons name="arrow-forward-ios" size={15} color={'#64748b'} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row gap-2 justify-between items-center py-2 ">
              <View className="flex-row gap-2 justify-center items-center">
                <FontAwesome name="user-o" size={20} color={colorScheme === 'light' ? '#64748b' : '#f3f3f3'} />
                <Text className=" font-semibold text-gray-700 dark:text-gray-300">Last Name</Text>
              </View>
              <View className="flex-row gap-2 justify-center items-center">
                <Text className=" text-gray-500 dark:text-[#64748b]">Doe</Text>
                <MaterialIcons name="arrow-forward-ios" size={15} color={'#64748b'} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row gap-2 justify-between items-center py-2 ">
              <View className="flex-row gap-2 justify-center items-center">
                <AntDesign name="mail" size={20} color={colorScheme === 'light' ? '#64748b' : '#f3f3f3'} />
                <Text className=" font-semibold text-gray-700 dark:text-gray-300">Email</Text>
              </View>
              <View className="flex-row gap-2 justify-center items-center">
                <Text className=" text-gray-500 dark:text-[#64748b]">antony123murii...</Text>
                <MaterialIcons name="arrow-forward-ios" size={15} color={'#64748b'} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row gap-2 justify-between items-center py-2 ">
              <View className="flex-row gap-2 justify-center items-center">
                <FontAwesome name="mobile-phone" size={28} color={colorScheme === 'light' ? '#64748b' : '#f3f3f3'} />
                <Text className=" font-semibold text-gray-700 dark:text-gray-300">Change mobile</Text>
              </View>
              <View className="flex-row gap-2 justify-center items-center">
                <Text className="  text-gray-500 dark:text-[#64748b]">+254 740480364</Text>
                <MaterialIcons name="arrow-forward-ios" size={15} color={'#64748b'} />
              </View>
            </TouchableOpacity>
          </View>
          <Text className="text-slate-600 dark:text-slate-400 text-sm font-semibold mt-5">Privacy & Security</Text>

          <View>


            <TouchableOpacity className="flex-row gap-2 justify-between items-center py-2 ">
              <View className="flex-row gap-2 justify-center items-center">
                <AntDesign name="mail" size={20} color={colorScheme === 'light' ? '#64748b' : '#f3f3f3'} />
                <Text className=" font-semibold text-gray-700 dark:text-gray-300">Email</Text>
              </View>
              <View className="flex-row gap-2 justify-center items-center">
                <Text className=" text-gray-500 dark:text-[#64748b]">antony123murii...</Text>
                <MaterialIcons name="arrow-forward-ios" size={15} color={'#64748b'} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row gap-2 justify-between items-center py-2 ">
              <View className="flex-row gap-2 justify-center items-center">
                <Feather name="lock" size={23} color={colorScheme === 'light' ? '#64748b' : '#f3f3f3'} />
                <Text className=" font-semibold text-gray-700 dark:text-gray-300">Change Password</Text>
              </View>
              <View className="flex-row gap-2 justify-center items-center">
                <Text className="  text-gray-500 dark:text-[#64748b]">******</Text>
                <MaterialIcons name="arrow-forward-ios" size={15} color={'#64748b'} />
              </View>
            </TouchableOpacity>
          </View>

        </View>


        <View className="flex-1 gap-2 flex-row w-full px-5 py-5 justify-center items-center">
          <View className="justify-center items-center w-1/2 h-24 rounded bg-slate-950 hover:bg-[#20BBFE] dark:bg-slate-950 dark:hover:bg-dark-700">
            <Text className="text-4xl">🌙 </Text>
          </View>
          <View className="justify-center items-center w-1/2 h-24 rounded bg-slate-300 hover:bg-[#20BBFE]">
            <Text className="text-4xl">🌞 </Text>
          </View>
        </View>

        <Text className="text-slate-600 dark:text-slate-400 text-sm font-semibold mt-1 px-5">Toggle dark/light mode</Text>
        <View className="px-5 mr-auto pb-10">
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? '#019EE3' : '#f4f3f4'}
            _backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{ transform: [{ scaleX: 1.25 }, { scaleY: 1.25 }] }}
          />
        </View>

      </ScrollView>


    </SafeAreaView>
  </>
  )
}

export default Settings