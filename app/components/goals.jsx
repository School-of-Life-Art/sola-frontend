import { View, Text, TouchableOpacity } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { Agenda, DateData, AgendaEntry, AgendaSchedule } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import BASE_URL from '../baseUrl';
import { useNavigation } from 'expo-router';


const Goals = ({ user, theme }) => {
  const navigation = useNavigation();
  // const [items, setItems] = useState({})
  const colors = ['#FFE4E1', '#d1ffbd', '#d5ffff', '#ffdbdb']
  const [loading, setLoading] = useState(false)
  const [items, setTaskItems] = useState({});

  let randomString = arr => arr[Math.floor(Math.random() * arr.length)];
  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  const getDateRange = () => {
    let today = new Date();
    const before = new Date(today);
    before.setMonth(before.getMonth() - 4);

    const after = new Date(today);
    after.setMonth(after.getMonth() + 4);

    return [before, after];
  }
  const [start_date, end_date] = getDateRange();
  // const items = {
  //   '2024-03-06': [{ name: 'Email Lookout CEO' }, { name: 'Hand over keys to Janitor Omondi' }, { name: 'Submit application for Chief of Staff' },],
  //   '2024-03-08': [{ name: 'Check into AirBnB', height: 80 }],
  //   '2024-03-07': [],
  //   '2024-03-07': [{ name: 'Ken - any js object' }, { name: 'any js object' }]
  // };

  const formatTime = (time) => {
    const options = { hour: 'numeric', minute: '2-digit', hour12: true };
    return new Date(time).toLocaleTimeString('en-US', options);
  };

  useEffect(() => {
    // Fetch goals from Rails backend
    const fetchGoals = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/goals/agenda`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${user.jwt}`
          },
          body: JSON.stringify({
            start_date, end_date
          })
        });
        if (response.ok) {
          const goals = await response.json();
          // Organize goals into the desired format
          const formattedGoals = {};
          goals.forEach(goal => {
            const startDate = goal.start_date.split('T')[0];
            if (!formattedGoals[startDate]) {
              formattedGoals[startDate] = [{ id: goal.id, name: goal.title, start_time: formatTime(goal.start_date), end_date: formatTime(goal.end_date) }];
            } else {
              formattedGoals[startDate].push({ id: goal.id, name: goal.title, start_time: formatTime(goal.start_date), end_date: formatTime(goal.end_date) });
            }
          });
          setTaskItems(formattedGoals);
        } else {
          console.error('Failed to fetch goals');
        }
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };

    fetchGoals();
  }, []);






  const loadItems = (day) => {
  };
  const RenderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('SingleGoalItem', {goalId: item.id})}
        style={{
          elevation: 3,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          marginRight: 10,
          marginTop: 17,
        }} className={`bg-slate-100 dark:bg-slate-900 flex flex-row justify-between items-center rounded-xl py-4   px-2 border-l-4 border-green-300`}>
        <View className="px-4">
          <Text className="text-xs  uppercase text-slate-700 dark:text-slate-100">Goal</Text>
          <Text className="text-lg text-slate-00 dark:text-slate-100 ">{item.name}</Text>
          <Text className="text-xs font-light text-slate-700 dark:text-slate-100 ">{item.start_time}-{item.end_date}</Text>
        </View>
        <TouchableOpacity className="pr-5">
          <Icon name="bell" size={24} color="coral" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const MemoizedRenderItem = memo(RenderItem)
  const renderItem = (item) => {
    return <MemoizedRenderItem item={item} />;
  };


  const renderEmptyData = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text className="text-gray-700 dark:text-gray-400">Nothing planned for this date</Text>
      </View>
    );
  };

  return (

    <Agenda
      items={items}
      loadItemsForMonth={loadItems}
      selected={`${new Date()}`}
      showClosingKnob={true}
      hideKnob={false}
      renderItem={renderItem}
      minDate={start_date.toDateString()}
      maxDate={end_date.toDateString()}
      style={{ backgroundColor: 'transparent' }}
      theme={{
        backgroundColor: theme === 'light' ? '#f1f5f9' : '#0f172a',
        calendarBackground: theme === 'light' ? '#f1f5f9' : '#0f172a',
        textSectionTitleColor: '#b6c1cd',
        selectedDayBackgroundColor: '#00adf5',
        selectedDayTextColor: '#ffffff',
        // selectedDayTextColor: theme === 'light' ? '#f1f5f9' : '#0f172a',
        todayTextColor: '#00adf5',
        dayTextColor: theme === 'light' ? '#2d4150' : '#ffffffb3',
        reservationsBackgroundColor: theme === 'light' ? '#f1f5f9' : '#0f172a'

        // textDisabledColor: '#d9e'
      }}
      renderEmptyData={renderEmptyData}

    />


  )
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  theme: state.theme.theme
});

export default connect(mapStateToProps)(Goals);
