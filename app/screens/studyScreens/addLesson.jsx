import { View, Text, TouchableOpacity, SafeAreaView, TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import BASE_URL from '../../baseUrl';


const AddLesson = ({ theme, user }) => {
    const [title, setTitle] = useState('');
    const [grade, setGrade] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('')
    const [selectedTeacher, setSelectedTeacher] = useState({})
    const [teachers, setTeachers] = useState([]);
    const [loadingTeachers, setLoadingTeachers] = useState(false)
    const [loadingAddTeacher, setLoadingAddTeacher] = useState(false);
    const [loadingAddLesson, setLoadingAddLesson] = useState(false);
    const colors = ['#991B1B', '#166534', '#854D0E', '#1E3A8A', '#C2410C', '#7C2D12', '#581C87', '#BE185D', '#0F766E'];

    function getRandomColor(colors) {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }

    async function addLesson(){
        try{
            setLoadingAddLesson(true)
            const response = await fetch(`${BASE_URL}/api/v1/lessons`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${user.jwt}`
                },
                body: JSON.stringify({
                    title,
                    teacher_id: selectedTeacher.id,
                    grade: grade ? grade : null,
                    color: getRandomColor(colors)
                })
            })

            if(response.ok){
                const data = await response.json()
                console.log(data)
            }else{
                console.log('An unexpected error happened')
            }

        }catch(error){
            console.log("Something unexpected happened", error)
        }finally{
            setLoadingAddLesson(false)
        }
    }

    async function getTeachers() {
        try {
            setLoadingTeachers(true)
            const response = await fetch(`${BASE_URL}/api/v1/teachers`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${user.jwt}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setTeachers(data)
            } else {
                console.log('Response not OK');
            }

        } catch (error) {
            console.log('There was an unexpected error', error);
        } finally {
            setLoadingTeachers(false)
        }
    }

    useEffect(() => {
        getTeachers();
    }, []);

    async function addTeacher() {
        try {
            setLoadingAddTeacher(true)
            const response = await fetch(`${BASE_URL}/api/v1/teachers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${user.jwt}`
                },
                body: JSON.stringify({
                    name,
                    email,
                    mobile_number: mobileNumber
                })
            })

            if (response.ok) {
                const data = await response.json()
                setTeachers(prev => [...prev, data])
                setEmail('')
                setName('')
                setMobileNumber('')
            } else {
                console.log(response.status)
            }

        } catch (error) {
            console.log('Adding teacher failed with this error', error)
        } finally {
            setLoadingAddTeacher(false)
        }
    }


    return (
        <SafeAreaView className="bg-slate-100 dark:bg-slate-900 flex-1 px-5 py-5">
            <View className="">
                <View className="w-full flex flex-row justify-between items-center mb-3">
                    <Text className="pt-2 capitalize text-slate-700 dark:text-[#f3f3f3b3]  font-semibold text-lg">Add Lesson</Text>
                    <TouchableOpacity onPress={addLesson}>
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
                {
                    loadingAddLesson && <ActivityIndicator size={24} color={'#80011F'} />
                }
                <TextInput
                    placeholder='Grade'
                    placeholderTextColor={theme === 'light' ? '#333333b2' : '#ffffffb2'}
                    value={grade}
                    keyboardType='numeric'
                    onChange={(event) => setGrade(event.nativeEvent.text)}
                    className="my-2 pl-2 w-48 h-12 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-500 rounded-lg"
                />

                <Text className='pt-2 capitalize text-slate-700 dark:text-[#f3f3f3b3] font-semibold text-lg'>Select/Add Teacher</Text>
                <View style={{ borderBottomColor: theme === 'light' ? '#333333b2' : '#ffffffb2', borderBottomWidth: 1, marginVertical: 10 }} />

                {
                    loadingTeachers && <ActivityIndicator size={24} color={'#80011F'} />
                }
                <View className="flex-row gap-x-2 flex-wrap">
                    {
                        !loadingTeachers && teachers && teachers.map((teacher, index) => {

                            return (
                                <TouchableOpacity onPress={() => setSelectedTeacher(teacher)} key={index} style={{backgroundColor: selectedTeacher === teacher ? "#FB923C" : "#80011F"}} className=" w-auto px-3 h-10 rounded-full my-2 justify-center items-center">
                                    <Text className="text-gray-300 dark:text-gray-300">{teacher.name}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>

                {
                    loadingAddTeacher && <ActivityIndicator size={24} color={'#80011F'} />
                }

                {
                    !loadingAddTeacher && (
                        <>
                            <TextInput
                                placeholder='name'
                                placeholderTextColor={theme === 'light' ? '#333333b2' : '#ffffffb2'}
                                value={name}
                                onChange={(event) => setName(event.nativeEvent.text)}
                                className="my-2 pl-2 w-full h-12 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-500 rounded-lg"
                            />
                            <TextInput
                                placeholder='email'
                                placeholderTextColor={theme === 'light' ? '#333333b2' : '#ffffffb2'}
                                value={email}
                                onChange={(event) => setEmail(event.nativeEvent.text)}
                                className="my-2 pl-2 w-full h-12 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-500 rounded-lg"
                            />
                            <TextInput
                                placeholder='Phone Number'
                                placeholderTextColor={theme === 'light' ? '#333333b2' : '#ffffffb2'}
                                value={mobileNumber}
                                onChange={(event) => setMobileNumber(event.nativeEvent.text)}
                                className="my-2 pl-2 w-full h-12 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-500 rounded-lg"
                            />
                            <TouchableOpacity onPress={addTeacher} className="item-center mx-auto rounded-full w-auto h-10 px-3 justify-center items-center bg-[#80011F]">
                                <Text className="text-gray-300 dark:text-gray-300">Add Teacher</Text>
                            </TouchableOpacity>
                        </>
                    )
                }
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    theme: state.theme.theme
});

export default connect(mapStateToProps)(AddLesson);