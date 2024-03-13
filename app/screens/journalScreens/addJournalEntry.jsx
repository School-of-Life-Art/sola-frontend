import { View, Text, TextInput, SafeAreaView, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { connect } from 'react-redux';
import { useNavigation } from 'expo-router'

const AddJournalEntry = ({ theme }) => {
    const navigation = useNavigation();
    const [title, setTitle] = useState("")
    return (
        <SafeAreaView>
            <StatusBar style="light" backgroundColor="#007AFF" />
            <View className="w-full h-full px-5 py-10 bg-slate-100 dark:bg-slate-900">

                <View className="w-full flex flex-row justify-between items-center my-2">
                    <Text className="text-slate-900 dark:text-slate-100 text-lg">Add Journal</Text>
                </View>

                <TextInput
                    placeholder="Title"
                    placeholderTextColor={`${theme === 'dark' ? '#ffffffb2' : '#333333b2'}`}
                    className="mb-3 border border-gray-500 rounded-lg px-6 py-2 text-md text-gray-700 dark:text-gray-300"
                    value={title}
                    onChangeText={(title) => setTitle(title)}
                />
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    theme: state.theme.theme
});

export default connect(mapStateToProps)(AddJournalEntry);