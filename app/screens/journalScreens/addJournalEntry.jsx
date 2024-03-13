import { View, ImageBackground, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { connect } from 'react-redux';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { ScrollView } from 'react-native-gesture-handler';
import Category from '../../components/journalComponents/Category';
import BASE_URL from '../../baseUrl';

const AddJournalEntry = ({ user, theme }) => {
    const [title, setTitle] = useState("")
    const [entry, setEntry] = useState("");
    const [category, setCategory] = useState("")

    async function createJournalEntry(){
        try{
            const response = await fetch(`${BASE_URL}/api/v1/journals/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({

                })
            })
        }catch(error){
            console.log("Error happened")
        }
    }
    return (
        <SafeAreaView>
            <StatusBar style="light" backgroundColor="#007AFF" />
            <View className="w-full h-full px-5 py-10 bg-slate-100 dark:bg-slate-900">

                <View className="w-full flex flex-row justify-between items-center mb-6">
                    <Text className="text-slate-900 dark:text-slate-100 text-lg">Add Entry</Text>
                    <TouchableOpacity onPress={() => console.log("I am awesome!")}>
                        <Text className="">
                            <FontAwesome6 name="check" size={22} color={`${theme === 'dark' ? '#ffffffb2' : '#333333b2'}`} />
                        </Text>
                    </TouchableOpacity>
                </View>

                <TextInput
                    placeholder="Title"
                    placeholderTextColor={`${theme === 'dark' ? '#ffffffb2' : '#333333b2'}`}
                    className="border border-gray-500 rounded-lg px-6 py-2 text-md text-gray-700 dark:text-gray-300 mb-0"
                    value={title}
                    onChangeText={(title) => setTitle(title)}
                />
                <View className="my-5">
                    <Category category={category} setCategory={setCategory} />
                </View>

                <View className='z-0 flex-1 rounded-lg border border-gray-500 dark:border-gray-700'>
                    <TextInput
                        multiline
                        placeholderTextColor={`${theme === 'dark' ? '#ffffffb2' : '#333333b2'}`}
                        style={styles.input}
                        placeholder="Start typing..."
                        textAlignVertical="top"
                        className='z-0 flex-1 px-2 py-4 text-gray-700 dark:text-gray-100'
                    />
                </View>


            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        flex: 1,
        fontSize: 16,
        textAlignVertical: 'top',
    },
});


const mapStateToProps = (state) => ({
    user: state.auth.user,
    theme: state.theme.theme
});

export default connect(mapStateToProps)(AddJournalEntry);