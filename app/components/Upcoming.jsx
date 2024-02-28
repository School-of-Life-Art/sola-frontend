import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import PagerView from 'react-native-pager-view';
import { ScrollView } from 'react-native-gesture-handler';


const Upcoming = () => {

  return (
    <View className="w-full h-40 py-3">
      <ScrollView className="flex-1 gap-4 " horizontal >
        <View style={styles.shadow} className="justify-center items-center px-2 h-32 bg-blue-200 dark:bg-blue-950 rounded-lg" key="1">
          <View className="rounded-full bg-gray-100 p-2">
            <Text className="text-3xl font-semibold text-gray-700">12</Text>
          </View>
          <Text className="text-lg mx-2 dark:text-gray-300 ">Assignments</Text>
        </View>
        <View style={styles.shadow} className="justify-center items-center px-2 h-32 bg-red-100 dark:bg-red-950 rounded-lg my-2" key="2">
          <View className="rounded-full bg-gray-100 p-2">
            <Text className="text-3xl font-semibold text-gray-700">18</Text>
          </View>
          <Text className="text-lg mx-2 dark:text-gray-300">Tasks</Text>
        </View>
        <View style={styles.shadow} className="justify-center items-center px-2 h-32 bg-green-200 dark:bg-green-950 rounded-lg" key="3">
          <View className="rounded-full bg-gray-100 p-2">
            <Text className="text-3xl font-semibold text-gray-700">7</Text>
          </View>
          <Text className="text-lg mx-2 dark:text-gray-300">Bills</Text>
        </View>
        <View style={styles.shadow} className="justify-center items-center px-2 h-32 bg-yellow-100 dark:bg-yellow-950 shadow rounded-lg" key="4">
          <View className="rounded-full bg-gray-100 p-2">
            <Text className="text-3xl font-semibold text-gray-700">1</Text>
          </View>
          <Text className="text-lg mx-2 dark:text-gray-300">Examinations</Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.27,
    shadowRadius: 1,

    elevation: 6,
  },
})
export default Upcoming