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
        <SafeAreaView className="w-full h-full ">
            <View className="bg-[#019EE3] pt-7">
                <CalendarPicker
                    onDateChange={onDateChange}
                    scrollable={false}
                    // startFromMonday={true}
                    allowRangeSelection={true}
                    minDate={minDate}
                    maxDate={maxDate}
                    todayBackgroundColor="#FF9C08"
                    selectedDayColor="#7300e6"
                    selectedDayTextColor="#FFFFFF"
                    previousTitle=""
                    nextTitle=" "
                    disabledDatesTextStyle={{color: "#fff"}}
                    dayShape="circle"
                    customDayHeaderStyles={{border: 0, color: "red"}}
                />
            </View>

            <View>
                <Text>SELECTED DATE:{startDate} great</Text>
            </View>
            {/* <View className=" absolute bottom-0 w-full h-3/4 z-10 bg-gray-50 rounded-t-xl">
                <Button><Icon type="down" /></Button>
            </View> */}
            <PlannerDraggable />
        </SafeAreaView>
    )
}

export default Planner