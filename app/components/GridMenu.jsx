import { View, Text } from 'react-native'
import React from 'react'

const GridMenu = ({ route }) => {
    return (
        <View className="text-slate-900 dark:text-slate-100 flex flex-row gap-1 ">
            <View>
                <View className="w-3 h-3 mb-1 bg-slate-900 dark:bg-slate-100 rounded  justify-center items-center">
                    <View className="w-2 h-2 rounded-sm bg-slate-100 dark:bg-slate-900"></View>
                </View>
                <View className="w-3 h-3 mb-1 bg-slate-900 dark:bg-slate-100 rounded  justify-center items-center">
                    <View className="w-2 h-2 rounded-sm bg-slate-100 dark:bg-slate-900"></View>
                </View>
            </View>
            <View>
                <View className="w-3 h-3 mb-1 bg-slate-900 dark:bg-slate-100 rounded  justify-center items-center">
                    <View className="w-2 h-2 rounded-sm bg-slate-100 dark:bg-slate-900"></View>
                </View>
                <View className="w-3 h-3 mb-1 bg-slate-900 dark:bg-slate-100 rounded  justify-center items-center">
                    <View className="w-2 h-2 rounded-sm bg-slate-100 dark:bg-slate-900"></View>
                </View>
            </View>
        </View>
    )
}

export default GridMenu