import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'

const Lesson = () => {
    return (
        <SafeAreaView className='w-full h-full bg-slate-100 dark:bg-slate-900'>
            <View className="bg-slate-100 dark:bg-slate-900 px-5 py-5">
                <View className="flex-row justify-between items-center">
                    <TouchableOpacity>
                        <Text className="text-slate-700 dark:text-slate-300 text-lg">Summary</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>
                            <Feather name='plus' size={24} color='white' />
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        </SafeAreaView>
    )
}

export default Lesson