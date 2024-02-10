import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Goals from './goals';
import TaskView from './taskView';

const TabsScreen = () => {
    const Tab = createMaterialTopTabNavigator();
    const screenOptions = {
        tabBarStyle: {
            backgroundColor: 'transparent',
            // height:100,
            textColor: "#fff",
            shadow: "none",
            shadowColor: 'transparent',
            shadowOpacity: 0,
            shadowRadius: 0,
            elevation: 0

        },
        tabBarItemStyle: {
            backgroundColor: 'transparent',
        }
    }
    return (
        <Tab.Navigator {...{ screenOptions }}>
            <Tab.Screen name="Goals" component={Goals} />
            <Tab.Screen name="TaskView" component={TaskView} />
        </Tab.Navigator>
    )
}

export default TabsScreen