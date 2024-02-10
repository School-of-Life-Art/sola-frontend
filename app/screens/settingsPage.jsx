import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../components/HomeScreen';
import Junky from '../components/Junky';

const Settings = () => {
  const Tab = createMaterialTopTabNavigator();

  return (<>
    <View className="w-full h-96">
      <Junky />
    </View>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Junky" component={Junky} />
    </Tab.Navigator>
  </>

  )
}

export default Settings