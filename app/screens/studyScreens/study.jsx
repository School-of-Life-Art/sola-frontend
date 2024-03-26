import { View, Text, SafeAreaView, Image, ImageBackground, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import waves from '../../assets/images/study/layered-waves.png'
import Icon from 'react-native-vector-icons/FontAwesome6';
import divide from '../../assets/images/study/divide.png'
import teacher from '../../assets/images/study/teacher.png'
import CircularProgress from 'react-native-circular-progress-indicator';
import { useNavigation } from 'expo-router';
import BASE_URL from '../../baseUrl';
import { connect } from 'react-redux';


const Study = ({ user, theme }) => {
    const navigation = useNavigation();
    const [lessons, setLessons] = useState([]);
    const [lessonsLoading, setLessonsLoading] = useState(false);


    async function getLessons() {
        try {
            setLessonsLoading(true)
            const response = await fetch(`${BASE_URL}/api/v1/lessons`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.jwt}`
                },
            })

            if (response.ok) {
                const data = await response.json();
                setLessons(data)
                console.log(data)
            } else {
                console.log("An unexpected error occured!", error)
            }
        } catch (error) {
            console.log("An unexpected error occured! hit catch", error)
        } finally {
            setLessonsLoading(false)
        }
    }

    useEffect(() => {
        getLessons()
    }, [])
    return (
        <SafeAreaView className="flex-1 bg-slate-100 dark:bg-slate-900">
            <View className="w-full h-32">
                <ImageBackground st source={waves} className="w-full h-full justify-center items-center bg-cover flex-row">
                    <Text className="text-xl text-gray-200  px-5 ">
                        Lessons
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('AddLesson')}>
                        <Text>
                            <Icon name="plus" size={24} color="#f3f3f3" />
                        </Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
            <ScrollView className="w-full h-full ">
                <View className="flex-1 px-5 py-5">
                    <Text className="text-slate-700 dark:text-[#f3f3f3b3] text-lg pb-3">Lessons</Text>
                    {
                        !lessonsLoading && lessons && lessons.map((lesson, index) => {
                            return <TouchableOpacity key={index} style={{backgroundColor: lesson.color+'b3' }} className="w-full h-32  rounded-xl my-1" onPress={() => navigation.navigate('Lesson', {id: lesson.id})}>
                                <View className="w-full h-full flex-row justify-between items-center px-3">
                                    <View className="flex-row justify-center items-center">
                                        <Image source={divide} className="items-center mr-2 w-6 h-6" />
                                        <View className="py-6">
                                            <Text className="text-lg font-bold text-[#f3f3f3]">{lesson.title.length > 20 ? lesson.title.slice(0, 20) + '...': lesson.title}</Text>
                                            <Text className="text-md font-medium text-[#f3f3f3b3]">{lesson.assignments_data.pending_individual_assignments +"/" + lesson.assignments_data.total_assignments} pending assignments</Text>
                                            <Text className="text-md font-medium text-[#f3f3f3b3]">{lesson.assignments_data.pending_group_assignments +"/" + lesson.assignments_data.total_assignments} pending group assignments</Text>
                                            <View className="mt-4 flex-row items-center justify-start">
                                                <Image source={teacher} className="items-center mr-2 w-5 h-4" />
                                                <Text className="text-md font-semibold text-[#f3f3f3b3]">{lesson.teacher.name}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <CircularProgress
                                        value={lesson.assignments_data.percentage_completion}
                                        radius={28}
                                        activeStrokeColor='#FB923C'
                                        inActiveStrokeColor={'#333333'}
                                        inActiveStrokeOpacity={0.2}
                                        progressValueColor={'#f3f3f3'}
                                        valueSuffix={'%'}
                                        duration={2000}
                                        onAnimationComplete={() => { console.log("completed"); }}
                                    />
                                </View>

                            </TouchableOpacity>
                        })
                    }

                    {
                        lessonsLoading && <ActivityIndicator size={40} color="#80011F" />
                    }

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    theme: state.theme.theme
});

export default connect(mapStateToProps)(Study);