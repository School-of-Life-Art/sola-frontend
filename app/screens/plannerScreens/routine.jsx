import { View, Text, ImageBackground, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native-gesture-handler';
const Routine = () => {
  return (
    <SafeAreaView className="w-full h-full  ">
      <View className="w-full h-36  bg-[#ED8E8E]" >
        <ImageBackground source={require('../../assets/images/routine/strokes.png')} className="w-full h-full relative">
          <View className="w-full flex flex-row justify-between px-10 py-10">
            <TouchableOpacity>
              <FontAwesome6 name="xmark" size={25} color="#f3f3f3" />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome6 name="check" size={25} color="#f3f3f3" />
            </TouchableOpacity>
          </View>
          <View className="absolute w-full h-16  bottom-[-30px] flex flex-row justify-around items-center ">
            <TextInput
              placeholder='Untitled Routine'
              placeholderTextColor="#f3f3f3"
              className="px-5 text-lg font-light text-gray-50 w-48 h-[80%] rounded-2xl bg-[#ED8E8E] border-2 border-gray-50"
            />
            <TouchableOpacity className="bg-[#ED8E8E] w-12 h-12 flex justify-center items-center rounded-full border-2 border-gray-50 ">
              <Ionicons name="color-palette-sharp" size={25} color="#f3f3f3" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  )
}

export default Routine