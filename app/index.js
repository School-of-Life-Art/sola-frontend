import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Home from './screens/home';
import Login from './screens/login';
import SignUp from './screens/signUp';
import SideMenu from './screens/sideMenu';


const App = () => {
    const Stack = createStackNavigator()
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack.Navigator screenOptions={{
                header: () => null, gestureEnabled: true,
                gestureDirection: 'horizontal',
            }} >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="SideMenu" component={SideMenu} />
            </Stack.Navigator>
        </GestureHandlerRootView>
    )
}

export default App