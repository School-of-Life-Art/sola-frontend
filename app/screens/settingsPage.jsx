import { View, Text, Switch, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useColorScheme } from "nativewind";
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Settings = () => {
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
      <View className="px-16">
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#019EE3' : '#f4f3f4'}
          _backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{ transform: [{ scaleX: 1.25 }, { scaleY: 1.25 }] }}
        />
      </View>

      <View className="px-5">
        <Text className="text-slate-600 dark:text-slate-400 text-sm font-semibold">Account information</Text>
        <View>
          <TouchableOpacity className="flex-row gap-2 justify-between items-center py-2 ">
            <View className="flex-row gap-2 justify-center items-center">
              <FontAwesome name="user-o" size={20} color={'#f3f3f3'} />
              <Text className="text-lg font-semibold text-gray-700 dark:text-gray-300">First Name</Text>
            </View>
            <View className="flex-row gap-2 justify-center items-center">
              <Text className="text-lg font-semibold text-gray-700 dark:text-[#64748b]">John Doe</Text>
              <MaterialIcons name="arrow-forward-ios" size={15} color={'#64748b'} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row gap-2 justify-between items-center py-2 ">
            <View className="flex-row gap-2 justify-center items-center">
              <AntDesign name="mail" size={20} color={'#f3f3f3'} />
              <Text className="text-lg font-semibold text-gray-700 dark:text-gray-300">Email</Text>
            </View>
            <View className="flex-row gap-2 justify-center items-center">
              <Text className="text-lg font-medium text-gray-700 dark:text-[#64748b]">antony123murii...</Text>
              <MaterialIcons name="arrow-forward-ios" size={15} color={'#64748b'} />
            </View>
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  </>
  )
}

export default Settings