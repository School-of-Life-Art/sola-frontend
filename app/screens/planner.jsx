import { SafeAreaView } from 'react-native'
import React, { } from 'react'
import PlannerDraggable from '../components/PlannerDraggable';
import { connect } from 'react-redux';


const Planner = ({theme}) => {
    return (
        <SafeAreaView className="w-full h-full bg-slate-100 dark:bg-slate-900">
            <PlannerDraggable theme={theme}/>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    theme: state.theme.theme
  });
  
export default connect(mapStateToProps)(Planner);