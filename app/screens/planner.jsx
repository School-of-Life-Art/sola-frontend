import { View, Text, SafeAreaView, Button } from 'react-native'
import React, { useState } from 'react'
import CalendarPicker from "react-native-calendar-picker";
import { getDate } from "date-fns";
import PlannerDraggable from '../components/PlannerDraggable';

const Planner = () => {
    const [selectedStartDate, setSelectedStartDate] = useState(null);

    const onDateChange = (date) => {
        setSelectedStartDate(date);
    };
    const minDate = new Date(); 
    const maxDate = new Date(2024, 6, 3);

    const startDate = selectedStartDate ? selectedStartDate.toString() : "";

    return (
        <SafeAreaView className="w-full h-full bg-[#ffffff]">
            <View className="bg-[#019EE3] pt-7 w-full h-4/5">
                <CalendarPicker
                    onDateChange={onDateChange}
                    scrollable={false}
                    // startFromMonday={true}
                    allowRangeSelection={true}
                    minDate={minDate}
                    maxDate={maxDate}
                    todayBackgroundColor="#3B77CA"
                    selectedDayColor="#7300e6"
                    selectedDayTextColor="#FFFFFF"
                    selectedRangeStyle={{
                        backgroundColor: '#3B77CA', 
                      }}
                    previousTitle=""
                    nextTitle=" "
                    textStyle={{color: "#fff",fontSize: 13}}
                    disabledDatesTextStyle={{color: "#7E7E7E"}}
                    dayShape="circle"
                />
            </View>
            <PlannerDraggable />
        </SafeAreaView>
    )
}

export default Planner