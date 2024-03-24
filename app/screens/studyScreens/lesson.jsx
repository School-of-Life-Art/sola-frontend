import { Image, View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons'
import teacher from '../../assets/images/study/teacher.png'
import { LinearProgress } from 'react-native-elements';
import { connect } from 'react-redux';
import { CheckBox } from 'react-native-elements';
import { useNavigation } from 'expo-router';


const Lesson = ({ theme }) => {
    const percentage = 12
    const [checked, setChecked] = useState(false)
    const navigation = useNavigation();
    return (
        <SafeAreaView className='w-full h-full bg-slate-100 dark:bg-slate-900'>
            <View className="bg-slate-100 dark:bg-slate-900 px-5 py-5">
                <View className="flex-row justify-between items-center mb-5">
                    <TouchableOpacity>
                        <Text>
                            <Feather name='x' size={24} color={`${theme === 'dark' ? '#f3f3f3b1' : '#333333b1'}`} />
                        </Text>
                    </TouchableOpacity>
                    <Text className="text-slate-700 dark:text-[#f3f3f3b3] text-lg font-semibold tracking-wider">Summary</Text>
                    <TouchableOpacity>
                        <Text>
                            <Feather name='plus' size={24} color={`${theme === 'dark' ? '#f3f3f3b1' : '#333333b1'}`} />
                        </Text>
                    </TouchableOpacity>

                </View>

                <ScrollView>
                    <View className="w-full h-auto bg-[#581C87b3] rounded-lg px-3 pt-5 pb-4">
                        <Text className="text-slate-300 text-xl capitalize font-semibold tracking-widest">c++ programming</Text>
                        <View className="mt-3 flex-row items-center justify-start">
                            <Image source={teacher} className="items-center mr-3 w-5 h-4" />
                            <Text className="text-md font-semibold text-[#f3f3f3b3]">Mr Mwirigi</Text>
                        </View>
                        <View className="mt-3 gap-x-20 flex-row items-center justify-start">
                            <View>
                                <Text className='text-[#f3f3f3b3] font-semibold'>Assignments</Text>
                                <Text className="text-md text-slate-300">2/5</Text>
                            </View>
                            <View>
                                <Text className='text-[#f3f3f3b3] font-semibold'>Group Work</Text>
                                <Text className="text-md text-slate-300">2/2</Text>
                            </View>
                        </View>
                        <View className="mt-3">
                            <Text className="capitalize text-[#f3f3f3b3] font-semibold">
                                submission
                            </Text>
                            <Text className="text-slate-300 font-light">
                                Assignment due on the 21st of April at 11:59pm
                            </Text>
                        </View>
                        <View className="flex-row justify-center items-center gap-x-2 px-2 pt-2">
                            <LinearProgress
                                color="#FB923C"
                                variant="determinate"
                                value={percentage / 100}
                                style={{ height: 10, borderRadius: 10, width: '90%' }}
                            />
                            <Text className="font-semibold text-[#FB923C]">{percentage}%</Text>
                        </View>
                        <Text className="text-[#FB923C] text-[12px] font-semibold">Course outline progress</Text>
                    </View>

                    <View className="my-4">
                        <Text className="text-slate-700 dark:text-[#f3f3f3b3] text-xl font-semibold tracking-widest mb-2">Assignments</Text>
                        <ScrollView className="gap-2" horizontal>


                            {/* start assignment */}
                            <View className="px-2 py-2 bg-[#581C87b3] rounded-lg w-72 h-auto">
                                <Text className='capitalize text-[#f3f3f3b3] font-semibold'>Details</Text>

                                <Text className="pt-1 capitalize text-[#f3f3f3b3] font-light tracking-wide w-[95%]">
                                    Question on object oriented programming.
                                    Test your understanding with coding problems
                                    and answer them carefully.
                                </Text>
                                <Text className='pt-2 capitalize text-[#f3f3f3b3] font-semibold'>Submission</Text>

                                <Text className="pt-1 capitalize text-[#f3f3f3b3] font-light tracking-wide w-[95%]">
                                    Assignment die on the 21st of April at 11:59pm
                                </Text>

                                <View className="flex-row justify-between items-center">
                                    <Text style={{ color: checked ? '#FB923C' : '#f3f3f3b3' }} className='text-lg font-light'>{!checked ? "Mark as complete" : "Complete"}</Text>
                                    <CheckBox
                                        checked={checked}
                                        onPress={() => setChecked(!checked)}
                                        checkedColor='#FB923C'
                                        uncheckedColor='#f3f3f3b3'
                                        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                                    />
                                </View>
                            </View>

                            <View className="px-2 py-2 bg-[#581C87b3] rounded-lg w-72 h-auto">
                                <Text className='capitalize text-[#f3f3f3b3] font-semibold'>Details</Text>

                                <Text className="pt-1 capitalize text-[#f3f3f3b3] font-light tracking-wide w-[95%]">
                                    Question on object oriented programming.
                                    Test your understanding with coding problems
                                    and answer them carefully.
                                </Text>
                                <Text className='pt-2 capitalize text-[#f3f3f3b3] font-semibold'>Submission</Text>

                                <Text className="pt-1 capitalize text-[#f3f3f3b3] font-light tracking-wide w-[95%]">
                                    Assignment die on the 21st of April at 11:59pm
                                </Text>

                                <View className="flex-row justify-between items-center">
                                    <Text style={{ color: checked ? '#FB923C' : '#f3f3f3b3' }} className='text-lg font-light'>{!checked ? "Mark as complete" : "Complete"}</Text>
                                    <CheckBox
                                        checked={checked}
                                        onPress={() => setChecked(!checked)}
                                        checkedColor='#FB923C'
                                        uncheckedColor='#f3f3f3b3'
                                        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                                    />
                                </View>
                            </View>
                            {/* end assignment */}


                        </ScrollView>
                    </View>

                    <View className="my-4">
                        <Text className="text-slate-700 dark:text-[#f3f3f3b3] text-xl font-semibold tracking-widest mb-2">Group work</Text>
                        <ScrollView className="gap-2" horizontal>


                            {/* start assignment */}
                            <View className="px-2 py-2 bg-[#581C87b3] rounded-lg w-72 h-auto">
                                <Text className='capitalize text-[#f3f3f3b3] font-semibold'>Details</Text>

                                <Text className="pt-1 capitalize text-[#f3f3f3b3] font-light tracking-wide w-[95%]">
                                    Question on object oriented programming.
                                    Test your understanding with coding problems
                                    and answer them carefully.
                                </Text>
                                <Text className='pt-2 capitalize text-[#f3f3f3b3] font-semibold'>Submission</Text>

                                <Text className="pt-1 capitalize text-[#f3f3f3b3] font-light tracking-wide w-[95%]">
                                    Assignment die on the 21st of April at 11:59pm
                                </Text>

                                <View className="flex-row justify-between items-center">
                                    <Text style={{ color: checked ? '#FB923C' : '#f3f3f3b3' }} className='text-lg font-light'>{!checked ? "Mark as complete" : "Complete"}</Text>
                                    <CheckBox
                                        checked={checked}
                                        onPress={() => setChecked(!checked)}
                                        checkedColor='#FB923C'
                                        uncheckedColor='#f3f3f3b3'
                                        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                                    />
                                </View>
                            </View>

                            <View className="px-2 py-2 bg-[#581C87b3] rounded-lg w-72 h-auto">
                                <Text className='capitalize text-[#f3f3f3b3] font-semibold'>Details</Text>

                                <Text className="pt-1 capitalize text-[#f3f3f3b3] font-light tracking-wide w-[95%]">
                                    Question on object oriented programming.
                                    Test your understanding with coding problems
                                    and answer them carefully.
                                </Text>
                                <Text className='pt-2 capitalize text-[#f3f3f3b3] font-semibold'>Submission</Text>

                                <Text className="pt-1 capitalize text-[#f3f3f3b3] font-light tracking-wide w-[95%]">
                                    Assignment die on the 21st of April at 11:59pm
                                </Text>

                                <View className="flex-row justify-between items-center">
                                    <Text style={{ color: checked ? '#FB923C' : '#f3f3f3b3' }} className='text-lg font-light'>{!checked ? "Mark as complete" : "Complete"}</Text>
                                    <CheckBox
                                        checked={checked}
                                        onPress={() => setChecked(!checked)}
                                        checkedColor='#FB923C'
                                        uncheckedColor='#f3f3f3b3'
                                        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                                    />
                                </View>
                            </View>
                            {/* end assignment */}

                        </ScrollView>
                    </View>

                    <Text className="text-slate-700 dark:text-[#f3f3f3b3] text-xl font-semibold tracking-widest mb-2">Study</Text>
                    <View className="flex-row gap-x-2">
                        <TouchableOpacity onPress={() => navigation.navigate('StudySession')} className="rounded-full px-4 py-2 bg-[#581C87b3]">
                            <Text className="text-center text-[#f3f3f3b3]">15 mins</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('StudySession')} className="rounded-full px-4 py-2 bg-[#581C87b3]">
                            <Text className="text-center text-[#f3f3f3b3]">30 mins</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('StudySession')} className="rounded-full px-4 py-2 bg-[#581C87b3]">
                            <Text className="text-center text-[#f3f3f3b3]">1 hr</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="my-4 mb-[100px]">
                        <Text className="text-slate-700 dark:text-[#f3f3f3b3] text-xl font-semibold tracking-widest mb-2">Activity</Text>


                            {/* start activity */}
                            <View className="px-2 py-2 bg-[#581C87b3] rounded-lg w-72 h-48">

                                
                            </View>

                            {/* end activity */}


                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    theme: state.theme.theme
});

export default connect(mapStateToProps)(Lesson);