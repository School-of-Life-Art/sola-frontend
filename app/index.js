import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as PaperProvider } from 'react-native-paper';
import Home from './screens/home';
import Login from './screens/login';
import SignUp from './screens/signUp';
import SideMenu from './screens/sideMenu';
import Planner from './screens/planner';


const App = () => {
    const Stack = createStackNavigator()
    const horizontalAnimation = {
        gestureDirection: 'horizontal',
        cardStyleInterpolator: ({ current, layouts }) => {
            return {
                cardStyle: {
                    transform: [
                        {
                            translateX: current.progress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [layouts.screen.width, 0],
                            }),
                        },
                    ],
                },
            };
        },
    };
    const slideFromLeftAnimation = {
        gestureDirection: 'horizontal-inverted',
        cardStyleInterpolator: ({ current, layouts }) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        },
      };
    return (
      <PaperProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack.Navigator
                screenOptions={{
                    header: () => null,
                    animationTypeForReplace: 'push',
                    gestureEnabled: true,
                    ...horizontalAnimation, 
                }}
            >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="SideMenu" component={SideMenu} options={slideFromLeftAnimation}/>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="Planner" component={Planner} />
            </Stack.Navigator>
        </GestureHandlerRootView>
      </PaperProvider>
    )
}

export default App