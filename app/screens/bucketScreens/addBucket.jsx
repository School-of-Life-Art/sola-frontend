import { View, Image, Text, TextInput, TouchableOpacity, SafeAreaView, ImageBackground, ScrollView } from 'react-native'
import React, { useState } from 'react'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { connect } from 'react-redux'
import { CheckBox } from 'react-native-elements';

const AddBucket = ({ theme }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [checked, setChecked] = useState(false);

    async function createBucket() {

    }
    return (
        <SafeAreaView className="flex-1 py-10 px-5 bg-slate-100 dark:bg-slate-900">
            <ScrollView>
                <View className="w-full flex flex-row justify-between items-center mb-6">
                    <Text className="text-slate-900 dark:text-slate-100 text-lg">Add</Text>
                    <TouchableOpacity onPress={createBucket}>
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

                <View className="w-full h-60">
                    <TextInput
                        multiline
                        placeholderTextColor={`${theme === 'dark' ? '#ffffffb2' : '#333333b2'}`}
                        style={{
                            flex: 1,
                            fontSize: 16,
                            textAlignVertical: 'top',
                        }}
                        value={description}
                        onChange={(event) => setDescription(event.nativeEvent.text)}
                        placeholder="Details about it..."
                        textAlignVertical="top"
                        className='flex-1 mt-4 z-0 px-2 py-4 text-gray-700 dark:text-gray-100 rounded-lg border border-gray-300 dark:border-gray-700'
                    />
                </View>
                <TouchableOpacity className="w-full h-36 rounded-lg border border-gray-300 dark:border-gray-700 mt-4 justify-center items-center">
                    <ImageBackground source={require('../../assets/images/bucket/camera.png')} className="w-64 h-28">

                    </ImageBackground>
                </TouchableOpacity>

                <View className='py-2'>
                <CheckBox
                    title='Check this as done/completed!'
                    checked={checked}
                    onPress={() => setChecked(!checked)}
                    checkedColor='green'
                    uncheckedColor='red'
                    containerStyle={{backgroundColor: 'transparent', borderWidth: 0}}
                />
                </View>

                <TouchableOpacity className="flex-row">
                    <Text>
                        <FontAwesome6 name="calendar" size={27} color={`${theme==='light'? '#333333b2':'#f2f2f2b2'}`} />
                    </Text>
                    <Text className="text-lg px-4 text-slate-900 dark:text-gray-200">
                        By date
                    </Text>
                </TouchableOpacity>

                
            </ScrollView>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    theme: state.theme.theme
});

export default connect(mapStateToProps)(AddBucket);