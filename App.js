import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import Home from './app/screens/home';
import Login from './app/screens/login';
import SideMenu from './app/screens/sideMenu';
import SignUp from './app/screens/signUp';


const App = () => {
    const Stack = createStackNavigator()
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ header: () => null }}>
                    {/* <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="SideMenu" component={SideMenu} />
                    <Stack.Screen name="SignUp" component={SignUp} /> */}

                </Stack.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    )
}

export default App