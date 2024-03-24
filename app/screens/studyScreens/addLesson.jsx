import { View, Text, TouchableOpacity, SafeAreaView, TextInput } from 'react-native'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';


const AddLesson = ({ theme }) => {
    const [title, setTitle] = useState('');
    const [grade, setGrade] = useState(0);
    const [color, setColor] = useState('');
    return (
        <SafeAreaView className="bg-slate-100 dark:bg-slate-900 flex-1 px-5 py-5">
            <View className="">
                <View className="w-full flex flex-row justify-between items-center mb-3">
                    <Text className="text-slate-900 dark:text-slate-100">Add Entry</Text>
                    <TouchableOpacity>
                        <Text className="">
                            <FontAwesome6 name="check" size={22} color={`${theme === 'dark' ? '#ffffffb2' : '#333333b2'}`} />
                        </Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                    placeholder='title'
                    placeholderTextColor={theme === 'light' ? '#333333b2' : '#ffffffb2'}
                    value={title}
                    onChange={(event) => setTitle(event.nativeEvent.text)}
                    className="my-2 pl-2 w-full h-12 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-500 rounded-lg"
                />
                <TextInput
                    placeholder='title'
                    placeholderTextColor={theme === 'light' ? '#333333b2' : '#ffffffb2'}
                    value={title}
                    onChange={(event) => setTitle(event.nativeEvent.text)}
                    className="my-2 pl-2 w-full h-12 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-500 rounded-lg"
                />
                <TextInput
                    placeholder='title'
                    placeholderTextColor={theme === 'light' ? '#333333b2' : '#ffffffb2'}
                    value={title}
                    onChange={(event) => setTitle(event.nativeEvent.text)}
                    className="my-2 pl-2 w-48 h-12 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-500 rounded-lg"
                />
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    theme: state.theme.theme
});

export default connect(mapStateToProps)(AddLesson);