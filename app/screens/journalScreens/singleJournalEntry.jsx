import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'

const SingleJournalEntry = ({ route: { params } }) => {
    const { entry } = params
    return (
        <SafeAreaView className="flex-1 w-full h-full bg-gray-100 dark:bg-gray-900" >
            <View className="pt-10 px-5">
                <Text className="text-xl capitalize font-semibold text-gray-700 dark:text-gray-200">{entry.title}</Text>
                <View className="w-auto h-8 mt-4 bg-red-100 rounded justify-center pl-3">
                    <Text className="text-lg capitalize font-light ">{entry.category}</Text>
                </View>
                <ScrollView className="h-[88%]" >
                    <View className="w-full">
                        <Text className="text-md leading-9 pt-2 text-gray-700 dark:text-gray-300">{entry.entry}</Text>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default SingleJournalEntry