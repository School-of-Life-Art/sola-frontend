import { View, Text, SafeAreaView, Image, ImageBackground, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import waves from '../../assets/images/study/layered-waves.png'
import Icon from 'react-native-vector-icons/FontAwesome6';
import divide from '../../assets/images/study/divide.png'
import teacher from '../../assets/images/study/teacher.png'
import CircularProgress from 'react-native-circular-progress-indicator';
import { useNavigation } from 'expo-router';


const Study = () => {
    const navigation = useNavigation();
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
                    <TouchableOpacity className="w-full h-32 bg-[#991B1B] rounded-xl my-1" onPress={() => navigation.navigate('Lesson')}>
                        <View className="w-full h-full flex-row justify-between items-center px-3">
                            <View className="flex-row justify-center items-center">
                                <Image source={divide} className="items-center mr-2 w-6 h-6" />
                                <View className="py-6">
                                    <Text className="text-lg font-bold text-slate-200">Limits & Continuity</Text>
                                    <Text className="text-md font-medium text-slate-200">9/24 pending assignments</Text>
                                    <Text className="text-md font-medium text-slate-200">6/10 group work assignments</Text>
                                    <View className="mt-4 flex-row items-center justify-start">
                                        <Image source={teacher} className="items-center mr-3 w-5 h-4" />
                                        <Text className="text-md font-semibold text-slate-300">Mr Mwirigi</Text>
                                    </View>
                                </View>
                            </View>
                            <CircularProgress
                                value={10}
                                radius={28}
                                activeStrokeColor='#FB923C'
                                inActiveStrokeColor={'#333333'}
                                inActiveStrokeOpacity={0.2}
                                progressValueColor={'#f3f3f3'}
                                valueSuffix={'%'}
                                duration={2000}
                                onAnimationComplete={() => { console.log("completed"); }}
                            />
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity className="w-full h-32 bg-[#166534] rounded-xl my-1">
                        <View className="w-full h-full flex-row justify-between items-center px-3">
                            <View className="flex-row justify-center items-center">
                                <Image source={divide} className="items-center mr-2 w-6 h-6" />
                                <View className="py-6">
                                    <Text className="text-lg font-bold text-slate-200">Probability & Statistics</Text>
                                    <Text className="text-md font-medium text-slate-200">12/16 pending assignments</Text>
                                    <Text className="text-md font-medium text-slate-200">1/2 group work assignments</Text>
                                    <View className="mt-4 flex-row items-center justify-start">
                                        <Image source={teacher} className="items-center mr-3 w-5 h-4" />
                                        <Text className="text-md font-semibold text-slate-300">Mrs Linda Njihia</Text>
                                    </View>
                                </View>
                            </View>
                            <CircularProgress
                                value={89}
                                radius={28}
                                activeStrokeColor='#FB923C'
                                inActiveStrokeColor={'#333333'}
                                inActiveStrokeOpacity={0.2}
                                progressValueColor={'#f3f3f3'}
                                valueSuffix={'%'}
                                duration={2000}
                                onAnimationComplete={() => { console.log("completed"); }}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity className="w-full h-32 bg-[#854D0E] rounded-xl my-1">
                        <View className="w-full h-full flex-row justify-between items-center px-3">
                            <View className="flex-row justify-center items-center">
                                <Image source={divide} className="items-center mr-2 w-6 h-6" />
                                <View className="py-6">
                                    <Text className="text-lg font-bold text-slate-200">Limits & Continuity</Text>
                                    <Text className="text-md font-medium text-slate-200">9/24 pending assignments</Text>
                                    <Text className="text-md font-medium text-slate-200">6/10 group work assignments</Text>
                                    <View className="mt-4 flex-row items-center justify-start">
                                        <Image source={teacher} className="items-center mr-3 w-5 h-4" />
                                        <Text className="text-md font-semibold text-slate-300">Mr Mwirigi</Text>
                                    </View>
                                </View>
                            </View>
                            <CircularProgress
                                value={10}
                                radius={28}
                                activeStrokeColor='#FB923C'
                                inActiveStrokeColor={'#333333'}
                                inActiveStrokeOpacity={0.2}
                                progressValueColor={'#f3f3f3'}
                                valueSuffix={'%'}
                                duration={2000}
                                onAnimationComplete={() => { console.log("completed"); }}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity className="w-full h-32 bg-[#1E3A8A] rounded-xl my-1">
                        <View className="w-full h-full flex-row justify-between items-center px-3">
                            <View className="flex-row justify-center items-center">
                                <Image source={divide} className="items-center mr-2 w-6 h-6" />
                                <View className="py-6">
                                    <Text className="text-lg font-bold text-slate-200">Limits & Continuity</Text>
                                    <Text className="text-md font-medium text-slate-200">9/24 pending assignments</Text>
                                    <Text className="text-md font-medium text-slate-200">6/10 group work assignments</Text>
                                    <View className="mt-4 flex-row items-center justify-start">
                                        <Image source={teacher} className="items-center mr-3 w-5 h-4" />
                                        <Text className="text-md font-semibold text-slate-300">Mr Mwirigi</Text>
                                    </View>
                                </View>
                            </View>
                            <CircularProgress
                                value={10}
                                radius={28}
                                activeStrokeColor='#FB923C'
                                inActiveStrokeColor={'#333333'}
                                inActiveStrokeOpacity={0.2}
                                progressValueColor={'#f3f3f3'}
                                valueSuffix={'%'}
                                duration={2000}
                                onAnimationComplete={() => { console.log("completed"); }}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity className="w-full h-32 bg-[#C2410C] rounded-xl my-1">
                        <View className="w-full h-full flex-row justify-between items-center px-3">
                            <View className="flex-row justify-center items-center">
                                <Image source={divide} className="items-center mr-2 w-6 h-6" />
                                <View className="py-6">
                                    <Text className="text-lg font-bold text-slate-200">Limits & Continuity</Text>
                                    <Text className="text-md font-medium text-slate-200">9/24 pending assignments</Text>
                                    <Text className="text-md font-medium text-slate-200">6/10 group work assignments</Text>
                                    <View className="mt-4 flex-row items-center justify-start">
                                        <Image source={teacher} className="items-center mr-3 w-5 h-4" />
                                        <Text className="text-md font-semibold text-slate-300">Mr Mwirigi</Text>
                                    </View>
                                </View>
                            </View>
                            <CircularProgress
                                value={10}
                                radius={28}
                                activeStrokeColor='#FB923C'
                                inActiveStrokeColor={'#333333'}
                                inActiveStrokeOpacity={0.2}
                                progressValueColor={'#f3f3f3'}
                                valueSuffix={'%'}
                                duration={2000}
                                onAnimationComplete={() => { console.log("completed"); }}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity className="w-full h-32 bg-[#7C2D12] rounded-xl my-1">
                        <View className="w-full h-full flex-row justify-between items-center px-3">
                            <View className="flex-row justify-center items-center">
                                <Image source={divide} className="items-center mr-2 w-6 h-6" />
                                <View className="py-6">
                                    <Text className="text-lg font-bold text-slate-200">Limits & Continuity</Text>
                                    <Text className="text-md font-medium text-slate-200">9/24 pending assignments</Text>
                                    <Text className="text-md font-medium text-slate-200">6/10 group work assignments</Text>
                                    <View className="mt-4 flex-row items-center justify-start">
                                        <Image source={teacher} className="items-center mr-3 w-5 h-4" />
                                        <Text className="text-md font-semibold text-slate-300">Mr Mwirigi</Text>
                                    </View>
                                </View>
                            </View>
                            <CircularProgress
                                value={10}
                                radius={28}
                                activeStrokeColor='#FB923C'
                                inActiveStrokeColor={'#333333'}
                                inActiveStrokeOpacity={0.2}
                                progressValueColor={'#f3f3f3'}
                                valueSuffix={'%'}
                                duration={2000}
                                onAnimationComplete={() => { console.log("completed"); }}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity className="w-full h-32 bg-[#581C87] rounded-xl my-1">
                        <View className="w-full h-full flex-row justify-between items-center px-3">
                            <View className="flex-row justify-center items-center">
                                <Image source={divide} className="items-center mr-2 w-6 h-6" />
                                <View className="py-6">
                                    <Text className="text-lg font-bold text-slate-200">Limits & Continuity</Text>
                                    <Text className="text-md font-medium text-slate-200">9/24 pending assignments</Text>
                                    <Text className="text-md font-medium text-slate-200">6/10 group work assignments</Text>
                                    <View className="mt-4 flex-row items-center justify-start">
                                        <Image source={teacher} className="items-center mr-3 w-5 h-4" />
                                        <Text className="text-md font-semibold text-slate-300">Mr Mwirigi</Text>
                                    </View>
                                </View>
                            </View>
                            <CircularProgress
                                value={10}
                                radius={28}
                                activeStrokeColor='#FB923C'
                                inActiveStrokeColor={'#333333'}
                                inActiveStrokeOpacity={0.2}
                                progressValueColor={'#f3f3f3'}
                                valueSuffix={'%'}
                                duration={2000}
                                onAnimationComplete={() => { console.log("completed"); }}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity className="w-full h-32 bg-[#BE185D] rounded-xl my-1">
                        <View className="w-full h-full flex-row justify-between items-center px-3">
                            <View className="flex-row justify-center items-center">
                                <Image source={divide} className="items-center mr-2 w-6 h-6" />
                                <View className="py-6">
                                    <Text className="text-lg font-bold text-slate-200">Limits & Continuity</Text>
                                    <Text className="text-md font-medium text-slate-200">9/24 pending assignments</Text>
                                    <Text className="text-md font-medium text-slate-200">6/10 group work assignments</Text>
                                    <View className="mt-4 flex-row items-center justify-start">
                                        <Image source={teacher} className="items-center mr-3 w-5 h-4" />
                                        <Text className="text-md font-semibold text-slate-300">Mr Mwirigi</Text>
                                    </View>
                                </View>
                            </View>
                            <CircularProgress
                                value={10}
                                radius={28}
                                activeStrokeColor='#FB923C'
                                inActiveStrokeColor={'#333333'}
                                inActiveStrokeOpacity={0.2}
                                progressValueColor={'#f3f3f3'}
                                valueSuffix={'%'}
                                duration={2000}
                                onAnimationComplete={() => { console.log("completed"); }}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity className="w-full h-28 bg-[#0F766E] rounded-xl my-1">
                        <View className="w-full h-full flex-row justify-between items-center px-3">
                            <View className="flex-row justify-center items-center">
                                <Image source={divide} className="items-center mr-2 w-6 h-6" />
                                <View className="py-6">
                                    <Text className="text-lg font-bold text-slate-200">Limits & Continuity</Text>
                                    <Text className="text-md font-medium text-slate-200">9/24 pending assignments</Text>
                                    <Text className="text-md font-medium text-slate-200">6/10 group work assignments</Text>
                                    <View className="mt-4 flex-row items-center justify-start">
                                        <Image source={teacher} className="items-center mr-3 w-5 h-4" />
                                        <Text className="text-md font-semibold text-slate-300">Mr Mwirigi</Text>
                                    </View>
                                </View>
                            </View>
                            <CircularProgress
                                value={10}
                                radius={28}
                                activeStrokeColor='#FB923C'
                                inActiveStrokeColor={'#333333'}
                                inActiveStrokeOpacity={0.2}
                                progressValueColor={'#f3f3f3'}
                                valueSuffix={'%'}
                                duration={2000}
                                onAnimationComplete={() => { console.log("completed"); }}
                            />
                        </View>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default Study