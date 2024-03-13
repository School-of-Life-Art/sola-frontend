import { View, Text, ImageBackground, TextInput, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Feather"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import DatePicker from "react-native-modal-datetime-picker";
import { connect } from 'react-redux';
import BASE_URL from '../../baseUrl';
import { useToast } from 'react-native-toast-notifications';
import UrgencyGoal from './UrgencyGoal';


const SingleGoalItem = ({ user, theme, route: { params } }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState("");
    const [openSubgoalModal, setOpenSubgoalModal] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDatePickerVisible30Mins, setDatePickerVisibility30Mins] = useState(false);
    const navigation = useNavigation();
    const [showModal, setShowModal] = useState(false);
    const toast = useToast();
    const [title, setTitle] = useState('')
    const [urgency, setUrgency] = useState('low')
    const [description, setDescription] = useState('')
    const [notify, setNotify] = useState(false)
    const [repeats, setRepeats] = useState(false)
    const [color, setColor] = useState("#ED8E8E")
    const [subGoals, setSubGoals] = useState([])
    const [subGoal, setSubGoal] = useState({ 'title': "", 'completed': false })
    const [goal, setGoal] = useState({})
    const { goalId } = params;
    // above is id from the previous screen

    useEffect(() => {
        async function fetchGoal() {
            try {
                const response = await fetch(`${BASE_URL}/api/v1/goals/${goalId}`, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user.jwt}`
                    }
                })
                if (response.ok) {
                    const data = await response.json()
                    console.log(data)
                    setGoal(data)
                    setColor(data.color)

                } else {
                    console.log(response.status)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchGoal()
    }, [])


    function handleBack() {
        if (navigation.canGoBack()) {
            navigation.goBack();
            return true;
        }
        return false;
    }

    const formatDate = (date) => {
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const dayOfWeek = daysOfWeek[date.getDay()];
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const amPm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12 || 12;
        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedDate = `${dayOfWeek}, ${day} ${month} ${year} at ${hours}:${paddedMinutes}${amPm}`;
        return formattedDate;
    };
    return (

        <SafeAreaView className="w-full h-full flex-1 bg-slate-100 dark:bg-slate-900 ">
            <View className={`w-full h-36  z-10 `} style={{ backgroundColor: color }} >
                <ImageBackground source={require('../../assets/images/routine/strokes.png')} className="w-full h-full relative">
                    <View className="w-full flex flex-row justify-between px-10 py-10">
                        <TouchableOpacity onPress={handleBack} >
                            <FontAwesome6 name="xmark" size={25} color="#f3f3f3" />
                        </TouchableOpacity>
                        {/* <TouchableOpacity onPress={saveGoal}>
              <FontAwesome6 name="check" size={25} color="#f3f3f3" />
            </TouchableOpacity> */}
                    </View>
                    <View className="absolute w-full h-16  bottom-[-30px] flex flex-row justify-around items-center ">
                        <TextInput
                            placeholder='Untitled Goal'
                            value={goal.title}
                            onChange={(event) => setTitle(event.nativeEvent.text)}
                            placeholderTextColor={`${theme === 'dark' ? '#f3f3f3b2' : '#333333b2'}`}
                            className={`px-5 text-lg font-light text-gray-50 dark:text-gray-900 border-gray-50 dark:border-gray-900 w-48 h-[80%] rounded-2xl border-2 `}
                            style={{ backgroundColor: color }}
                        />
                        <TouchableOpacity disabled onPress={() => setShowModal(true)} style={{ backgroundColor: color }} className={`w-12 h-12 flex justify-center items-center rounded-full border-2 border-gray-50  dark:border-gray-900`}>
                            <Ionicons name="color-palette-sharp" size={25} color="#f3f3f3" />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
            <ScrollView className="pt-3 z-0">
                <View className="pt-5 px-5">
                </View>

                {
                    goal.tags ? (

                        <View className="mb-5  px-5 flex flex-row flex-wrap gap-3">
                            {
                                goal.tags && goal.tags.map((tag, index) => {
                                    return (
                                        <View key={index} className="w-28 overflow-hidden border border-blue-300 rounded-full px-3 py-1 flex flex-row items-center justify-between ">
                                            <Text className="text-center text-slate-700 dark:text-slate-100">{tag.name}</Text>
                                            <TouchableOpacity className="w-8" onPress={() => handleRemoveTag(index)}>
                                                <Text>
                                                    {" "}
                                                    {/* <Icon name="minus-circle" size={18} color="red" /> */}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })
                            }

                        </View>
                    )
                        :
                        ""
                }
                <View className="mx-5 h-20">
                    <UrgencyGoal theme={theme} setUrgency={setUrgency} />
                </View>

                <TextInput
                    multiline
                    className="mx-5 h-24 rounded-xl px-4 py-3 border border-gray-400 dark:border-gray-600 text-md dark:text-slate-100"
                    placeholder='Description'
                    textAlignVertical='top'
                    value={goal.description}
                    onChange={(event) => setDescription(event.nativeEvent.text)}
                    placeholderTextColor={`${theme === 'dark' ? '#ffffffb2' : '#333333b2'}`}
                />
                <View className="px-5 py-5">
                    <View className="flex flex-row justify-start items-center border-b border-gray-400 dark:border-gray-600 pb-2">
                        <Text className="text-lg font-light dark:text-slate-100">Subgoals</Text>
                    </View>

                    <View className="px-2">
                        {
                            goal.sub_goals && goal.sub_goals.reverse().map((goalItem, index) => {
                                const handleCloseSubgoal = () => {
                                    const updatedSubGoals = [...subGoals];
                                    updatedSubGoals[index].completed = !goalItem.completed;
                                    setSubGoals(updatedSubGoals);
                                };
                                return <>
                                    <TouchableWithoutFeedback key={index} className="bg-gray-200 dark:bg-slate-800 py-3 my-2 px-3 rounded-md flex flex-row justify-start items-center" onPress={handleCloseSubgoal}>
                                        <Text className="w-9">
                                            <FontAwesome name={goalItem.completed ? 'circle' : 'circle-o'} size={28} color="#019EE3" />
                                        </Text>
                                        <Text className={`${goalItem.completed ? 'line-through' : ''} text-md text-gray-600 dark:text-gray-200`}>{goalItem.title}</Text>
                                    </TouchableWithoutFeedback>
                                </>
                            })
                        }
                    </View>


                </View>
                <View className="px-5 pb-20">
                    <View className={`flex flex-row justify-between items-center pt-2 ${subGoals.length === 0 ? '' : 'border-t border-gray-400 dark:border-gray-600'}`}>
                        <View className="flex-row items-center gap-3">
                            <Text>
                                {" "}
                                <Icon name="clock" size={24} color={`${theme === 'dark' ? '#ffffffb1' : '#333333b1'}`} />
                            </Text>
                            <Text className="text-lg text-gray-600 dark:text-gray-200">All day</Text>
                        </View>
                    </View>
                    <View className="mr-auto px-10 relative w-full">
                        {
                            !isEnabled && (
                                <>
                                    <View className="absolute rotate-90 bottom-[63px] left-0">
                                        <View className="flex-row items-center ">
                                            <View className="w-2 h-2 rounded-full bg-gray-400"></View>
                                            <View className="w-10 bg-gray-400 h-[2px]"></View>
                                            <View className="w-2 h-2 rounded-full bg-gray-400"></View>
                                        </View>
                                    </View>
                                    <TouchableOpacity className="w-full  flex-row items-center gap-3 justify-start pb-8 " disabled>
                                        <Text className="text-gray-500 text-md">{formatDate(new Date(goal.start_date))}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity className="w-full  flex-row items-center gap-3 justify-start pb-8" disabled>
                                        <Text className="text-gray-500 text-md ">{formatDate(new Date(goal.end_date))}</Text>
                                    </TouchableOpacity>
                                </>
                            )
                        }
                    </View>

                    <View className="flex flex-row justify-between items-center ">
                        {
                            goal && goal.repeats ?
                                <TouchableOpacity className="flex-row items-center gap-3 w-full" disabled>
                                    <Text>
                                        {" "}
                                        <FontAwesome6Icon name="retweet" color={`#16a34a`} size={24} />
                                    </Text>
                                    <Text className="text-lg text-green-600" >Repeats schedule</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity className="flex-row items-center gap-3 w-full" disabled>
                                    <Text>
                                        {" "}
                                        <FontAwesome6Icon name="retweet" color={`${theme === 'dark' ? '#ffffffb1' : '#333333b1'}`} size={24} />
                                    </Text>
                                    <Text className="text-lg text-gray-600 dark:text-gray-200" >No repeat schedule</Text>
                                </TouchableOpacity>
                        }
                    </View>

                    <View className="flex flex-row justify-between items-center pt-4">
                        {
                            goal && goal.notify
                                ?
                                <TouchableOpacity className="flex-row items-center gap-3 w-full" disabled>
                                    <Text>
                                        {" "}
                                        <FontAwesome6Icon name="bell" color={`#16a34a`} size={24} />
                                    </Text>
                                    <Text className="text-lg text-green-600">Notification set</Text>
                                </TouchableOpacity>
                                :

                                <TouchableOpacity className="flex-row items-center gap-3 w-full" disabled>
                                    <Text>
                                        {" "}
                                        <FontAwesome6Icon name="bell" color={`${theme === 'dark' ? '#ffffffb1' : '#333333b1'}`} size={24} />
                                    </Text>
                                    <Text className="text-lg text-gray-600 dark:text-gray-200">No notification set</Text>
                                </TouchableOpacity>
                        }
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    theme: state.theme.theme
});

export default connect(mapStateToProps)(SingleGoalItem);