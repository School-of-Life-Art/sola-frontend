import { Image, FlatList, View, Text, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons'
import teacher from '../../assets/images/study/teacher.png'
import { LinearProgress } from 'react-native-elements';
import { connect } from 'react-redux';
import { CheckBox } from 'react-native-elements';
import { useNavigation } from 'expo-router';
import BASE_URL from '../../baseUrl';
import HorizontalPicker from '@vseslav/react-native-horizontal-picker';


const GroupAssignment = ({ loadingGroupAssignments, groupAssignments, color }) => {
    function getDaySuffix(day) {
        if (day >= 11 && day <= 13) {
            return 'th';
        }
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }
    function formatDate(inputDate) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const date = new Date(inputDate);
        const dayOfWeek = days[date.getDay()];
        const dayOfMonth = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        const suffix = getDaySuffix(dayOfMonth);

        // Format time
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // Handle midnight (0 hours)
        const formattedTime = `${hours}:${minutes}${ampm}`;

        return `${dayOfWeek} ${dayOfMonth}${suffix}, ${month}, ${year} at ${formattedTime}`;
    }

    return (
        <ScrollView horizontal contentContainerStyle={{ flexGrow: 1 }}>
            {
                !loadingGroupAssignments && groupAssignments && groupAssignments.map((groupAssignment, index) => {
                    return (
                        <View style={{
                            padding: 10,
                            backgroundColor: color,
                            borderRadius: 8,
                            maxWidth: 285,
                            minWidth: 285,

                        }} className="px-2 py-2 bg-[#581C87b3] rounded-lg mr-3 mb-5 relative overflow-hidden">
                            <Text className='capitalize text-[#f3f3f3b3] font-semibold'>Details</Text>
                            {
                                groupAssignment.on_time && (
                                    <View className=" bg-[#FB923C] w-[80px] rotate-45 absolute top-2 right-[-20]">
                                        <Text className="text-center font-semibold text-lg">late</Text>
                                    </View>
                                )
                            }

                            <Text className="pt-1 capitalize text-[#f3f3f3b3] font-light tracking-wide w-[95%]">
                                {groupAssignment.details}
                            </Text>
                            <Text className='pt-2 capitalize text-[#f3f3f3b3] font-semibold'>Submission</Text>

                            <Text className="pt-1 capitalize text-[#f3f3f3b3] font-light tracking-wide w-[95%]">
                                Assignment due on the {formatDate(groupAssignment.submision_deadline)}
                            </Text>

                            <View className="flex-row justify-between items-center">
                                <Text style={{ color: groupAssignment.complete ? '#FB923C' : '#f3f3f3b3' }} className='text-lg font-light'>{!groupAssignment.complete ? "Mark as complete" : "Complete"}</Text>
                                <CheckBox
                                    checked={groupAssignment.complete}
                                    onPress={() => setChecked(!checked)}
                                    checkedColor='#FB923C'
                                    uncheckedColor='#f3f3f3b3'
                                    containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                                />
                            </View>
                        </View>

                    )
                })


            }

        </ScrollView>
    )
}

export default GroupAssignment