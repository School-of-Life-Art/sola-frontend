import { Image, FlatList, View, Text, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons'
import teacher from '../../assets/images/study/teacher.png'
import { LinearProgress } from 'react-native-elements';
import { connect } from 'react-redux';
import { CheckBox } from 'react-native-elements';
import { useNavigation } from 'expo-router';
import BASE_URL from '../../baseUrl';
import Assignment from './assignment';


const Lesson = ({ user, theme, route }) => {
    const [checked, setChecked] = useState(false)
    const [singleLesson, setSingleLesson] = useState({});
    const [loadingSingleLesson, setLoadingSingleLesson] = useState(false)
    const [individualAssignments, setIndividualAssignments] = useState([])
    const [loadingIndividualAssignments, setLoadingIndividualAssignments] = useState(false)
    const [groupAssignments, setGroupAssignments] = useState([])
    const [loadingGroupAssignments, setLoadingGroupAssignments] = useState(false)


    const navigation = useNavigation();
    const { id } = route.params;

    async function getSingleLesson() {
        try {
            setLoadingSingleLesson(true)
            const response = await fetch(`${BASE_URL}/api/v1/lessons/${id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.jwt}`
                }
            })

            if (response.ok) {
                const data = await response.json()
                setSingleLesson(data)
            } else {
                console.log('Something unexpected happened', data)
            }
        } catch (error) {

        } finally {
            setLoadingSingleLesson(false)
        }
    }

    async function getIndividualAssignments() {
        try {
            setLoadingIndividualAssignments(true)
            const response = await fetch(`${BASE_URL}/api/v1/individual_assignments/assignments`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.jwt}`
                },
                body: JSON.stringify({
                    lesson_id: id
                })
            })

            if (response.ok) {
                const data = await response.json()
                setIndividualAssignments(data)
            } else {
                console.log('Something unexpected happened', data)
            }
        } catch (error) {

        } finally {
            setLoadingIndividualAssignments(false)
        }
    }

    async function getGroupAssignments() {
        try {
            setLoadingGroupAssignments(true)
            const response = await fetch(`${BASE_URL}/api/v1/group_assignments/assignments`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.jwt}`
                },
                body: JSON.stringify({
                    lesson_id: id
                })
            })

            if (response.ok) {
                const data = await response.json()
                console.log(data, 'group assignments')
                setGroupAssignments(data)
            } else {
                console.log('Something unexpected happened', data)
            }
        } catch (error) {

        } finally {
            setLoadingGroupAssignments(false)
        }
    }

    useEffect(() => {
        getSingleLesson()
        getIndividualAssignments()
        getGroupAssignments()
    }, [])

    return (
        <SafeAreaView className='w-full h-full bg-slate-100 dark:bg-slate-900'>
            <View className="bg-slate-100setLoadingSingleLesson dark:bg-slate-900 px-5 py-5">
                <View className="flex-row justify-between items-center mb-5">
                    <TouchableOpacity>
                        <Text>
                            <Feather name='x' size={24} color={`${theme === 'dark' ? '#f3f3f3b1' : '#333333b1'}`} />
                        </Text>
                    </TouchableOpacity>
                    <Text className="text-slate-700 dark:text-[#f3f3f3b3] text-lg font-semibold tracking-wider">Summary</Text>
                    <TouchableOpacity>
                        <Text>
                            <Feather name='plus' size={24} color={`${theme === 'dark' ? '#f3f3f3b1' : '#333333b1'}`} />
                        </Text>
                    </TouchableOpacity>

                </View>
                {loadingSingleLesson && <ActivityIndicator size={36} color="#80011F" />}

                {
                    !loadingSingleLesson && singleLesson && singleLesson.assignments_data && (
                        <ScrollView className="grow" nestedScrollEnabled >
                            <View style={{backgroundColor: singleLesson.color+'b3'}} className={`w-full h-auto rounded-lg px-3 pt-5 pb-4`}>
                                <Text className="text-slate-300 text-xl capitalize font-semibold tracking-widest">{singleLesson.title}</Text>
                                <View className="mt-3 flex-row items-center justify-start">
                                    <Image source={teacher} className="items-center mr-3 w-5 h-4" />
                                    <Text className="text-md font-semibold text-[#f3f3f3b3]">{singleLesson.teacher.name && singleLesson.teacher.name}</Text>
                                </View>
                                <View className="mt-3 gap-x-20 flex-row items-center justify-start">
                                    <View>
                                        <Text className='text-[#f3f3f3b3] font-semibold'>Assignments</Text>
                                        <Text className="text-md text-slate-300">{singleLesson.assignments_data.pending_individual_assignments + "/" + singleLesson.assignments_data.total_individual_assignments}</Text>
                                    </View>
                                    <View>
                                        <Text className='text-[#f3f3f3b3] font-semibold'>Group Work</Text>
                                        <Text className="text-md text-slate-300">{singleLesson.assignments_data.pending_group_assignments + "/" + singleLesson.assignments_data.total_group_assignments}</Text>
                                    </View>
                                </View>
                                <View className="mt-3">
                                    <Text className="capitalize text-[#f3f3f3b3] font-semibold">
                                        submission
                                    </Text>
                                    <Text className="text-slate-300 font-light">
                                        Assignment due on the 21st of April at 11:59pm
                                    </Text>
                                </View>
                                <View className="flex-row justify-center items-center gap-x-2 px-2 pt-2">
                                    <LinearProgress
                                        color="#FB923C"
                                        variant="determinate"
                                        value={singleLesson.assignments_data.percentage_completion / 100}
                                        style={{ height: 10, borderRadius: 10, width: '90%' }}
                                    />
                                    <Text className="font-semibold text-[#FB923C]">{singleLesson.assignments_data.percentage_completion}%</Text>
                                </View>
                                <Text className="text-[#FB923C] text-[12px] font-semibold">Course outline progress</Text>
                            </View>

                            <View className="my-4">
                                <Text className="text-slate-700 dark:text-[#f3f3f3b3] text-xl font-semibold tracking-widest mb-2">Assignments</Text>
                            </View>

                            <Assignment loadingIndividualAssignments={loadingIndividualAssignments} individualAssignments={individualAssignments} color={singleLesson.color+'b3'}  />

                            {/* start assignment */}
                            {
                                loadingIndividualAssignments && <View style={{backgroundColor: singleLesson.color+'b3'}} className="px-2 py-2 rounded-lg w-72 h-auto justify-center items-center">
                                    <ActivityIndicator size={36} color="#80011F" />
                                </View>
                            }

                            {
                                !loadingIndividualAssignments && individualAssignments.length <= 0 && <View className="px-2 py-2  rounded-lg w-72 h-auto justify-center items-center">
                                    <Text className="text center capitalize text-slate-700 dark:text-[#f3f3f3b3]  ">No assignments yet</Text>
                                </View>

                            }
                            {/* end assignment */}

                            <Text className="text-slate-700 dark:text-[#f3f3f3b3] text-xl font-semibold tracking-widest mb-2">Study</Text>
                            <View className="flex-row gap-x-2">
                                <TouchableOpacity onPress={() => navigation.navigate('StudySession', {color: singleLesson.color+'b3' })} className="rounded-full px-4 py-2" style={{backgroundColor: singleLesson.color+'b3'}}>
                                    <Text className="text-center text-[#f3f3f3b3]">15 mins</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('StudySession', {color: singleLesson.color+'b3' })} className="rounded-full px-4 py-2" style={{backgroundColor: singleLesson.color+'b3'}}>
                                    <Text className="text-center text-[#f3f3f3b3]">30 mins</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('StudySession', {color: singleLesson.color+'b3' })} className="rounded-full px-4 py-2" style={{backgroundColor: singleLesson.color+'b3'}}>
                                    <Text className="text-center text-[#f3f3f3b3]">1 hr</Text>
                                </TouchableOpacity>
                            </View>
                            <View className="my-4 mb-[100px]">
                                <Text className="text-slate-700 dark:text-[#f3f3f3b3] text-xl font-semibold tracking-widest mb-2">Activity</Text>


                                {/* start activity */}
                                <View className="px-2 py-2  rounded-lg w-72 h-48" style={{backgroundColor: singleLesson.color+'b3'}}>


                                </View>

                                {/* end activity */}


                            </View>
                        </ScrollView>
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

export default connect(mapStateToProps)(Lesson);