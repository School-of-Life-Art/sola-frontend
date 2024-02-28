import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import PagerView from 'react-native-pager-view';
import { ScrollView } from 'react-native-gesture-handler';


const Upcoming = () => {

  return (
    <View className="w-full h-40 py-3">
      <ScrollView className="flex-1 gap-4 " horizontal >
        <View style={styles.shadow} className="justify-center items-center px-2 w-40 h-32 bg-blue-200 dark:bg-blue-950 rounded-lg" key="1">
          <View className="rounded-full bg-gray-100 dark:bg-gray-950 p-2">
            <Text className="w-7 h-7 text-center text-2xl font-semibold text-gray-600 dark:text-gray-300">12</Text>
          </View>
          <Text className="text-lg text-gray-600 py-2 mx-2 dark:text-gray-300 ">Assignments</Text>
        </View>

        <View style={styles.shadow} className="justify-center items-center px-2 w-40 h-32 bg-blue-200 dark:bg-blue-950 rounded-lg" key="2">
          <View className="rounded-full bg-gray-100 dark:bg-gray-950 p-2">
            <Text className="w-7 h-7 text-center text-2xl font-semibold text-gray-600 dark:text-gray-300">18</Text>
          </View>
          <Text className="text-lg text-gray-600 py-2 mx-2 dark:text-gray-300 ">Tasks</Text>
        </View>

        <View style={styles.shadow} className="justify-center items-center px-2 w-40 h-32 bg-blue-200 dark:bg-blue-950 rounded-lg" key="3">
          <View className="rounded-full bg-gray-100 dark:bg-gray-950 p-2">
            <Text className="w-7 h-7 text-center text-2xl font-semibold text-gray-600 dark:text-gray-300">7</Text>
          </View>
          <Text className="text-lg text-gray-600 py-2 mx-2 dark:text-gray-300 ">Bills</Text>
        </View>
        
        <View style={styles.shadow} className="justify-center items-center px-2 w-40 h-32 bg-blue-200 dark:bg-blue-950 rounded-lg" key="4">
          <View className="rounded-full bg-gray-100 dark:bg-gray-950 p-2">
            <Text className="w-7 h-7 text-center text-2xl font-semibold text-gray-600 dark:text-gray-300">1</Text>
          </View>
          <Text className="text-lg text-gray-600 py-2 mx-2 dark:text-gray-300 ">Examinations</Text>
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