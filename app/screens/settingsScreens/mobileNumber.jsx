import { View, Text, TouchableOpacity } from 'react-native'
import React, {useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

const MobileNumber = ({ user }) => {
    const [mobileNumber, setMobileNumber] = useState(user.user.mobile_number)
    return (
        <SafeAreaView className="w-full h-full bg-gray-100 dark:bg-gray-900 px-5">
            <View className="pt-16">
                <Text className="text-gray-700 dark:text-gray-200 font-semibold text-lg">Change mobile number</Text>
                <Text className="text-gray-700 dark:text-gray-300 pt-2">The number of times you can update your mobile number is limited. Edit out of necessity.</Text>
            </View>
            <View className="pt-10 ">
                <TextInput
                    placeholder='254 787654321'
                    placeholderTextColor={'#333333B3'}
                    value={mobileNumber}
                    keyboardType='numeric'
                    onChange={(mobileNumber) => setMobileNumber(mobileNumber)}
                    className="pl-2 w-full h-12 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-500 rounded-lg"
                />

                <TouchableOpacity className="w-full h-12 bg-lime-100 rounded mt-5 justify-center border border-gray-300">
                    <Text className=" text-center text-lime-600 text-lg font-semibold">Save changes</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    theme: state.theme.theme
  });
  
export default connect(mapStateToProps)(MobileNumber);
