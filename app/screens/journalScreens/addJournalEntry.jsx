import { View, ImageBackground, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { connect } from 'react-redux';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { ScrollView } from 'react-native-gesture-handler';
import Category from '../../components/journalComponents/Category';
import BASE_URL from '../../baseUrl';
import { useToast } from 'react-native-toast-notifications';
import { useNavigation } from 'expo-router';

const AddJournalEntry = ({ user, theme }) => {
    const toast = useToast()
    const navigation = useNavigation();
    const [title, setTitle] = useState("")
    const [entry, setEntry] = useState("");
    const [category, setCategory] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    async function createJournalEntry() {
        const formData = {
            title,
            entry,
            category
        }
        try {
            setIsLoading(true)
            const response = await fetch(`${BASE_URL}/api/v1/journals/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${user.jwt}`
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                const data = await response.json();
                console.log(data)
                toast.show("added!", {
                    type: "success",
                    placement: "top",
                    duration: 2000,
                    offset: 30,
                    animationType: "zoom-in",
                    swipeEnabled: true
                });
                navigation.goBack()

            } else {
                toast.show(`Request failed unexpectedly`, {
                    type: "danger",
                    placement: "top",
                    duration: 2000,
                    offset: 30,
                    animationType: "zoom-in",
                    swipeEnabled: true
                });
            }
        } catch (error) {
            toast.show(`Something unexpected happened, ${error}`, {
                type: "danger",
                placement: "top",
                duration: 2000,
                offset: 30,
                animationType: "zoom-in",
                swipeEnabled: true
            });
            console.log("Error happened")
        }finally{
            setIsLoading(false)
        }
    }
    return (
        <SafeAreaView>
            <StatusBar style="light" backgroundColor="#007AFF" />
            <View className="w-full h-full px-5 py-10 bg-slate-100 dark:bg-slate-900">

                <View className="w-full flex flex-row justify-between items-center mb-6">
                    <Text className="text-slate-900 dark:text-slate-100 text-lg">Add Entry</Text>
                    <TouchableOpacity onPress={createJournalEntry}>
                        <Text className="">
                            <FontAwesome6 name="check" size={22} color={`${theme === 'dark' ? '#ffffffb2' : '#333333b2'}`} />
                        </Text>
                    </TouchableOpacity>
                </View>

                <TextInput
                    placeholder="Title"
                    placeholderTextColor={`${theme === 'dark' ? '#ffffffb2' : '#333333b2'}`}
                    className="border border-gray-300 rounded-lg px-6 py-2 text-md text-gray-700 dark:text-gray-300 mb-0"
                    value={title}
                    onChangeText={(title) => setTitle(title)}
                />
                <View className="my-5">
                    <Category category={category} setCategory={setCategory} />
                </View>

                {
                    isLoading && <ActivityIndicator color="#80011F" size={24} />
                }

                <View className='z-0 flex-1 rounded-lg border border-gray-300 dark:border-gray-700'>
                    <TextInput
                        multiline
                        placeholderTextColor={`${theme === 'dark' ? '#ffffffb2' : '#333333b2'}`}
                        style={styles.input}
                        value={entry}
                        onChange={(event) => setEntry(event.nativeEvent.text)}
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