import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';


const ChangePassword = (user, theme) => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    function handleShowPassword() {
        setShowPassword(!showPassword);
    }
    return (
        <SafeAreaView className="w-full h-full bg-gray-100 dark:bg-gray-900 px-5">
            <View className="pt-16">
                <Text className="text-gray-700 dark:text-gray-200 font-semibold text-lg">Change your password</Text>
                <Text className="text-gray-700 dark:text-gray-300 pt-2">Create a strong and secure password. More than 6 characters using a combination of uppercase and lowercase characters/symbols.</Text>
            </View>
            <View className="pt-5 ">
                <Text className="text-gray-500 dark:text-gray-300 pb-2">Current password</Text>
                <View className="mb-3 border border-gray-300 dark:border-gray-500 rounded-lg text-md text-gray-500 font-semibold flex flex-row items-center">
                    <TextInput
                        placeholder="password"
                        placeholderTextColor={`${theme === 'light' ? '#ffffffb2' : '#333333b2'}`}
                        className="rounded-full px-2 py-2 text-md text-gray-500 dark:text-gray-300 font-semibold w-[90%]"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={(password) => setPassword(password)}
                    />
                    <TouchableOpacity onPress={handleShowPassword}>
                        <Icon name={showPassword ? "eye" : "eye-slash"} size={24} color="#333333B2" />
                    </TouchableOpacity>
                </View>

                <Text className="text-gray-500 dark:text-gray-300 pb-2">New password</Text>
                <View className="mb-3 border border-gray-300 dark:border-gray-500 rounded-lg text-md text-gray-500 font-semibold flex flex-row items-center">
                    <TextInput
                        placeholder="password"
                        placeholderTextColor={`${theme === 'light' ? '#ffffffb2' : '#333333b2'}`}
                        className="rounded-full px-2 py-2 text-md text-gray-500 dark:text-gray-300 font-semibold w-[90%]"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={(password) => setPassword(password)}
                    />
                    <TouchableOpacity onPress={handleShowPassword}>
                        <Icon name={showPassword ? "eye" : "eye-slash"} size={24} color="#333333B2" />
                    </TouchableOpacity>
                </View>

                <Text className="text-gray-500 dark:text-gray-300 pb-2">Confirm password</Text>
                <View className="mb-3 border border-gray-300 dark:border-gray-500 rounded-lg text-md text-gray-500 font-semibold flex flex-row items-center">
                    <TextInput
                        placeholder="password"
                        placeholderTextColor={`${theme === 'light' ? '#ffffffb2' : '#333333b2'}`}
                        className="rounded-full px-2 py-2 text-md text-gray-500 dark:text-gray-300 font-semibold w-[90%]"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={(password) => setPassword(password)}
                    />
                    <TouchableOpacity onPress={handleShowPassword}>
                        <Icon name={showPassword ? "eye" : "eye-slash"} size={24} color="#333333B2" />
                    </TouchableOpacity>
                </View>



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

export default connect(mapStateToProps)(ChangePassword);

