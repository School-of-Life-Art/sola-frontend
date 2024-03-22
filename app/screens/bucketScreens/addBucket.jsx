import { View, Image, Text, TextInput, TouchableOpacity, SafeAreaView, ImageBackground, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { connect } from 'react-redux'
import { CheckBox } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import BASE_URL from '../../baseUrl';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from 'expo-router';


const AddBucket = ({ theme, user, route }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [checked, setChecked] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [image, setImage] = useState();
    const [fileType, setFileType] = useState();
    const [fileName, setFileName] = useState();
    const formData = new FormData();
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false);
    const {setBuckets} = route.params;

    const onChange = (event, selectedDate) => {
        if (event.type === 'dismissed') {
            // User dismissed the date picker
            setShowPicker(false);
        } else {
            const currentDate = selectedDate || date;
            setShowPicker(Platform.OS === 'ios');
            setDate(currentDate);
        }
    };

    const toggleDatepicker = () => {
        setShowPicker(!showPicker);
    };



    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);

            const createFormData = (uri) => {
                setFileName(uri.split('/').pop())
                setFileType(fileName && fileName.split('.').pop())
            };
            createFormData(result.assets[0].uri);
        }
    };


    async function createBucket() {
        formData.append('title', title);
        formData.append('description', description);
        formData.append('completed', checked);
        formData.append('deadline', date.toISOString()); // Convert date to ISO string
        formData.append('snapshot', {
            name: fileName,
            uri: image,
            type: `image/${fileType}`,
        });
    
        try {
            setLoading(true)
            const response = await fetch(`${BASE_URL}/api/v1/buckets`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${user.jwt}`
                },
                body: formData
            });
    
            if (response.ok) {
                const data = await response.json();
                navigation.navigate('Bucket')
                setBuckets(prevBuckets => [data, ...prevBuckets])
            } else {
                console.log(response.status, 'status');
            }
        } catch (error) {
            console.error('Error:', error);
        }finally{
            setLoading(false)
        }
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
                {
                    loading && <ActivityIndicator size={28} color='#80011F'/>
                }
                <TouchableOpacity onPress={pickImage} className="w-full h-36 rounded-lg border border-gray-300 dark:border-gray-700 mt-4 justify-center items-center">
                    {
                        image ? (
                            <ImageBackground source={{ uri: image }} className="w-64 h-full" >

                            </ImageBackground>
                        )
                            :
                            (
                                <ImageBackground source={require('../../assets/images/bucket/camera.png')} className="w-64 h-28">

                                </ImageBackground>
                            )
                    }
                </TouchableOpacity>

                <View className='py-2'>
                    <CheckBox
                        title='Check this as done/completed!'
                        checked={checked}
                        onPress={() => setChecked(!checked)}
                        checkedColor='green'
                        uncheckedColor='red'
                        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                    />
                </View>

                <TouchableOpacity className="flex-row" onPress={toggleDatepicker}>
                    <Text>
                        <FontAwesome6 name="calendar" size={27} color={`${theme === 'light' ? '#333333b2' : '#f2f2f2b2'}`} />
                    </Text>
                    <Text className="text-lg px-4 text-slate-900 dark:text-gray-200">
                        By date
                    </Text>
                </TouchableOpacity>

                {showPicker && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="date"
                        display="calendar"
                        onChange={onChange}
                    />
                )}

            </ScrollView>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    theme: state.theme.theme
});

export default connect(mapStateToProps)(AddBucket);