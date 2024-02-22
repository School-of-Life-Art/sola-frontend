import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import store from './store';
import Home from './screens/home';
import Login from './screens/login';
import SignUp from './screens/signUp';
import SideMenu from './screens/sideMenu';
import Planner from './screens/planner';
import Reminders from './screens/reminders';
import Settings from './screens/settingsPage';
import Routine from './screens/plannerScreens/routine';

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
    <Provider store={store}>
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
            <Stack.Screen name="Login" component={Login} />
            {/* <Stack.Screen name="Home" component={Home} /> */}
            <Stack.Screen name="SideMenu" component={SideMenu} options={slideFromLeftAnimation} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Planner" component={Planner} />
            <Stack.Screen name="Reminders" component={Reminders} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Routine" component={Routine} />


          </Stack.Navigator>
        </GestureHandlerRootView>
      </PaperProvider>
    </Provider>
  )
}

export default App