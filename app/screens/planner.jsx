import { SafeAreaView } from 'react-native'
import React, { } from 'react'
import PlannerDraggable from '../components/PlannerDraggable';
import { connect } from 'react-redux';


const Planner = ({theme}) => {
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
            <PlannerDraggable theme={theme}/>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    theme: state.theme.theme
  });
  
export default connect(mapStateToProps)(Planner);