import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native'
import React from 'react'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { connect } from 'react-redux';
import { useNavigation } from 'expo-router';
import { Calendar } from 'react-native-calendars';

const Journal = ({ theme }) => {
    const navigation = useNavigation()
    let today = new Date()
    const currentDate = new Date();

    const year = currentDate.getFullYear(); // Get the current year
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Get the current month (adding 1 because it's zero-based) and pad with leading zero if necessary
    const day = String(currentDate.getDate()).padStart(2, '0'); // Get the current day of the month and pad with leading zero if necessary

    const formattedDate = `${year}-${month}-${day}`
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
                        selected={`${new Date()}`}
                        markedDates={{
                            '2024-03-10': { selected: true, selectedColor: '#80011F' }, // Highlight selected date
                            '2024-03-14': { selected: true, selectedColor: '#80011F', marked: true, dotColor: `${theme === 'light'? '#f2f2f2': '#333333'}` }, // Mark a specific date with a dot
                            '2024-03-15': { marked: true, dotColor: '#80011F' }, // Mark another specific date with a dot
                        }}
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
                <ScrollView className="pt-5">
                    <Text className="font-bold text-center">
                        This is an awesome thing to have
                    </Text>
                    <Text className="font-bold text-center">
                        This is an awesome thing to have
                    </Text><Text className="font-bold text-center">
                        This is an awesome thing to have
                    </Text><Text className="font-bold text-center">
                        This is an awesome thing to have
                    </Text><Text className="font-bold text-center">
                        This is an awesome thing to have
                    </Text>
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