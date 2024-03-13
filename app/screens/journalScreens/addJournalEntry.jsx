import { View, ImageBackground, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { connect } from 'react-redux';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const AddJournalEntry = ({ theme }) => {
    const [title, setTitle] = useState("")
    const [entry, setEntry] = useState("");
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
                    className="border border-gray-500 rounded-lg px-6 py-2 text-md text-gray-700 dark:text-gray-300 mb-5"
                    value={title}
                    onChangeText={(title) => setTitle(title)}
                />

                {/* <TextInput
                    multiline
                    className="h-[85%] rounded-xl px-4 py-3 border border-gray-500 dark:border-gray-600 text-md dark:text-slate-100"
                    placeholder='What are you thinking today?'
                    textAlignVertical='top'
                    value={entry}
                    style={styles.input}
                    onChange={(event) => setEntry(event.nativeEvent.text)}
                    placeholderTextColor={`${theme === 'dark' ? '#ffffffb2' : '#333333b2'}`}
                /> */}
                {/* <Image source={require('../../assets/images/home/input-line.png')} /> */}

                <View className='z-0 flex-1 rounded-lg border border-gray-300'>
                    <ImageBackground
                        source={require('../../assets/images/home/input-line.png')}
                        resizeMode="repeat"
                        className='w-full h-full'
                        imageStyle={{resizeMode: 'repeat', margin: '10', padding:10}}
                    >
                    <TextInput
                        multiline
                        style={styles.input}
                        placeholder="Start typing..."
                        textAlignVertical="top"
                        className='z-0 flex-1'
                    />

                    </ImageBackground>
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