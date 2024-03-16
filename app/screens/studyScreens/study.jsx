import { View, Text, SafeAreaView, ImageBackground, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import waves from '../../assets/images/study/layered-waves.png'
import Icon from 'react-native-vector-icons/FontAwesome6';

const Study = () => {
    return (
        <SafeAreaView className="flex-1 bg-slate-100 dark:bg-slate-900">
            <View className="w-full h-32">
                <ImageBackground st source={waves} className="w-full h-full justify-center items-center bg-cover flex-row">
                    <Text className="text-xl text-gray-200  px-5 ">
                        Lessons
                    </Text>
                    <Text>
                        <Icon name="plus" size={24} color="#f3f3f3" />
                    </Text>
                </ImageBackground>
            </View>
            <ScrollView className="w-full h-full ">
                <View className="flex-1 px-5 py-5">


                    <Text className="text-slate-700 dark:text-slate-300 text-lg pb-3">Lessons</Text>

                    <TouchableOpacity className="w-full h-28 bg-[#991B1B] rounded-xl my-1">

                    </TouchableOpacity>

                    <TouchableOpacity className="w-full h-28 bg-[#166534] rounded-xl my-1">

                    </TouchableOpacity>
                    <TouchableOpacity className="w-full h-28 bg-[#854D0E] rounded-xl my-1">

                    </TouchableOpacity>

                    <TouchableOpacity className="w-full h-28 bg-[#1E3A8A] rounded-xl my-1">

                    </TouchableOpacity>

                    <TouchableOpacity className="w-full h-28 bg-[#C2410C] rounded-xl my-1">

                    </TouchableOpacity>
                    <TouchableOpacity className="w-full h-28 bg-[#7C2D12] rounded-xl my-1">

                    </TouchableOpacity>
                    <TouchableOpacity className="w-full h-28 bg-[#581C87] rounded-xl my-1">

                    </TouchableOpacity>
                    <TouchableOpacity className="w-full h-28 bg-[#BE185D] rounded-xl my-1">

                    </TouchableOpacity>
                    <TouchableOpacity className="w-full h-28 bg-[#0F766E] rounded-xl my-1">

                    </TouchableOpacity>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    imageBackground: {
        flex: 1, // This ensures that the ImageBackground takes up the entire container
        resizeMode: 'center', // You can use 'cover', 'contain', 'stretch', 'repeat', or 'center' for resizing the image
        justifyContent: 'flex-end', // You can also use 'flex-start', 'flex-end', 'space-between', 'space-around', or 'space-evenly'
        alignItems: 'center', // You can also use 'flex-start', 'flex-end', 'stretch', 'baseline'
        // You can add more styles here as needed
    },
});
export default Study