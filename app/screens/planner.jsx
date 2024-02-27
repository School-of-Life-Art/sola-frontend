import { View, Text, SafeAreaView, Button, ImageBackground } from 'react-native'
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
        <SafeAreaView className="w-full h-full bg-slate-100 dark:bg-slate-900">
            {/* <ImageBackground source={require('../assets/images/planner/bluebg.png')} className="bg-[#019EE3] pt-7 w-full h-4/5" >
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
                    disabledDatesTextStyle={{color: "#353535"}}
                    dayShape="circle"
                />
            </ImageBackground> */}
            <PlannerDraggable />
        </SafeAreaView>
    )
}

export default Planner