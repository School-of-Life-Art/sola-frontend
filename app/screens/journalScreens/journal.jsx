import { View, Text, SafeAreaView , StatusBar} from 'react-native'
import React from 'react'
// import { StatusBar } from 'expo-status-bar'

const Journal = () => {
    return (
        <SafeAreaView>
            <StatusBar style="light" backgroundColor="#007AFF" />
            <View className="w-full h-full px-5 py-10 bg-slate-100 dark:bg-slate-900">
                <Text>Journal</Text>
            </View>
        </SafeAreaView>
    )
}

export default Journal