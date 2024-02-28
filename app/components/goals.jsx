import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Agenda, DateData, AgendaEntry, AgendaSchedule } from 'react-native-calendars';
import { Card, Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';


const Goals = () => {
  // const [items, setItems] = useState({})
  const colors = ['#FFE4E1', '#d1ffbd', '#d5ffff', '#ffdbdb']
  let randomString = arr => arr[Math.floor(Math.random() * arr.length)];
  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };
  const items = {
    '2024-02-12': [{ name: 'Email Lookout CEO' }, { name: 'Hand over keys to Janitor Omondi' }, { name: 'Submit application for Chief of Staff' },],
    '2024-02-13': [{ name: 'Check into AirBnB', height: 80 }],
    '2024-02-14': [],
    '2024-02-15': [{ name: 'Ken - any js object' }, { name: 'any js object' }]
  };
  const loadItems = (day) => {
  };
  const renderItem = (item) => {
    return (
      <View
        style={{
          elevation: 3,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          marginRight: 10,
          marginTop: 17,
        }} className={`bg-slate-100 dark:bg-slate-900 flex flex-row justify-between items-center rounded-xl py-4   px-2 border-l-4 border-green-300`}>
        <View className="px-4">
          <Text className="text-xs  uppercase text-slate-700 dark:text-slate-100">study</Text>
          <Text className="text-lg text-slate-00 dark:text-slate-100 ">{item.name}</Text>
          <Text className="text-xs font-light text-slate-700 dark:text-slate-100 ">10pm-12:30pm</Text>

        </View>
        <TouchableOpacity className="">
          <Icon name="bell" size={24} color="coral" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className="h-full w-full">

      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={`${new Date()}`}
        showClosingKnob={true}
        hideKnob={false}
        renderItem={renderItem}
        theme={{
          backgroundColor: '#0f172a',
          calendarBackground: '#0f172a',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          // textDisabledColor: '#d9e'
        }}
      />


    </View>
  )
}

export default Goals