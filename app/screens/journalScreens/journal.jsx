import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { connect } from 'react-redux';
import { useNavigation } from 'expo-router';
import { Calendar } from 'react-native-calendars';
import BASE_URL from '../../baseUrl';

const Journal = ({ user, theme }) => {
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false)
    const [calendarMonth, setCalendarMonth] = useState((new Date()).getMonth() + 1);
    const [markedDates, setMarkedDates] = useState({});
    const [entries, setEntries] = useState([])
    const [entriesLoading, setEntriesLoading] = useState(false)
    const [date, setDate] = useState(new Date())


    let today = new Date()
    const currentDate = new Date();

    const year = currentDate.getFullYear(); // Get the current year
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Get the current month (adding 1 because it's zero-based) and pad with leading zero if necessary
    const day = String(currentDate.getDate()).padStart(2, '0'); // Get the current day of the month and pad with leading zero if necessary

    const formattedDate = `${year}-${month}-${day}`;

    useEffect(() => {
        journalMonths();
    }, [calendarMonth]);

    function handleMonthChange(month) {
        setCalendarMonth(month.month)
    }
    async function journalMonths() {
        try {
            setIsLoading(true)
            const response = await fetch(`${BASE_URL}/api/v1/journals/journal-months`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${user.jwt}`
                },
                body: JSON.stringify({
                    month: calendarMonth
                })
            })
            if (response.ok) {
                const data = await response.json()
                const markedDatesData = data.reduce((acc, date) => {
                    acc[date] = { selected: true, selectedColor: '#80011F', marked: true, dotColor: `${theme === 'light' ? '#f2f2f2' : '#333333'}` };
                    return acc;
                }, {});
                setMarkedDates(markedDatesData);
            }
        } catch (error) {
            console.warn(error)
        } finally {
            setIsLoading(false)
        }
    }

    async function fetchJournalsForDate(date) {
        try {
            setEntriesLoading(true)
            const response = await fetch(`${BASE_URL}/api/v1/journals/entries`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${user.jwt}`
                },
                body: JSON.stringify({
                    date: date
                })
            })

            if (response.ok) {
                const data = await response.json()
                console.log(data, 'wololo')
                setEntries(data)
            } else {
                console.log(response.status)
            }

        } catch (error) {
            console.log(error)
        } finally {
            setEntriesLoading(false)
        }
    }

    useEffect(() => {
        fetchJournalsForDate(date)
    }, [])

    function handleDayPress(day) {
        fetchJournalsForDate(day.dateString)
    }

    return (
        <SafeAreaView>
            <StatusBar style="light" backgroundColor="#007AFF" />
            <View className="w-full h-full px-5 py-10 bg-slate-100 dark:bg-slate-900">

                <View className="w-full flex flex-row justify-between items-center">
                    <Text className="text-slate-900 dark:text-slate-100 text-lg">Journal</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('AddJournalEntry')}>
                        <Text className="">
                            <FontAwesome6 name="plus" size={22} color={`${theme === 'dark' ? '#ffffffb2' : '#333333b2'}`} />
                        </Text>
                    </TouchableOpacity>
                </View>
                <View className="pt-3">
                    <Calendar
                        onMonthChange={handleMonthChange}
                        selected={`${new Date()}`}
                        markedDates={markedDates}
                        onDayPress={handleDayPress}
                        theme={{
                            backgroundColor: 'transparent', // Background color of the calendar
                            calendarBackground: 'transparent', // Background color of the calendar
                            activeDayBackgroundColor: 'blue', // Background color of the active day
                            activeDayTextColor: '#ffffff', // Text color of the active day
                            textSectionTitleColor: '#b6c1cd', // Text color of month/year title
                            selectedDayBackgroundColor: '#80011F', // Background color of selected day
                            selectedDayTextColor: '#ffffff', // Text color of selected day
                            todayTextColor: '#80011F', // Text color of today's date
                            dayTextColor: '#2d4150', // Text color of days in the calendar
                            textDisabledColor: '#d9e1e8', // Text color of disabled days
                            dotColor: 'red', // Color of dots/markers on the dates
                            selectedDotColor: '#ffffff', // Color of selected dots/markers
                            arrowColor: '#80011F', // Color of arrows for changing month
                            monthTextColor: '#80011F', // Text color of month
                            // textDayFontFamily: 'monospace', // Font family for days
                            // textMonthFontFamily: 'monospace', // Font family for month
                            // textDayHeaderFontFamily: 'monospace', // Font family for day header
                            textMonthFontWeight: 'bold', // Font weight for month
                            textDayFontSize: 14, // Font size for days
                            textMonthFontSize: 14, // Font size for month
                            textDayHeaderFontSize: 14, // Font size for day header
                        }}
                    />
                </View>
                <ScrollView className="">
                    <View className="pt-1">
                        {
                            isLoading && <ActivityIndicator color="#80011F" size={34} />
                        }
                        {
                            entries.length !== 0 ?
                                entries.map((entry, index) => {
                                    return (
                                        <TouchableOpacity onPress={() => navigation.navigate("SingleJournalEntry", {entry: entry})} key={entry.id} className="my-2 px-5 w-full h-20 rounded-md bg-red-100 justify-center">
                                            <Text className="uppercase text-xs ">
                                                {entry.category}
                                            </Text>
                                            <Text className="text-lg font-semibold">
                                                {entry.title}
                                            </Text>
                                            <Text className="">
                                                {entry.entry.slice(0, 20) + '...'}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                })
                                :
                                !entriesLoading && <Text className="font-light text-center ">
                                    No entries for this date
                                </Text>
                        }
                        {
                            entriesLoading && <ActivityIndicator color="#80011F" size={24} />
                        }
                    </View>

                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    theme: state.theme.theme
});

export default connect(mapStateToProps)(Journal);