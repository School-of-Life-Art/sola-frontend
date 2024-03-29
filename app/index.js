import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import store from './store';
import { ToastProvider } from 'react-native-toast-notifications'
import Home from './screens/Home';
import Login from './screens/Login';
import SignUp from './screens/signUp';
import SideMenu from './screens/sideMenu';
import Planner from './screens/planner';
import Reminders from './screens/reminders';
import Settings from './screens/settingsPage';
import Routine from './screens/plannerScreens/addGoal';
import { useNavigation } from 'expo-router';
import ChangeFirstName from './screens/settingsScreens/changeFirstName';
import ChangeLastName from './screens/settingsScreens/changeLastName';
import ChangeEmail from './screens/settingsScreens/changeEmail';
import ChangePassword from './screens/settingsScreens/changePassword';
import MobileNumber from './screens/settingsScreens/mobileNumber';
import changeUsername from './screens/settingsScreens/changeUsername';
import addTask from './screens/plannerScreens/addTask';
import Auth from './screens/auth';
import SingleGoalItem from './screens/plannerScreens/SingleGoalItem';
import Journal from './screens/journalScreens/journal';
import AddJournalEntry from './screens/journalScreens/addJournalEntry';
import SingleJournalEntry from './screens/journalScreens/singleJournalEntry';
import Study from './screens/studyScreens/study';
import Wellness from './screens/wellness';
import Bucket from './screens/bucketScreens/bucket';
import Pictorama from './screens/bucketScreens/pictorama';
import AddBucket from './screens/bucketScreens/addBucket';
import Lesson from './screens/studyScreens/lesson';
import StudySession from './screens/studyScreens/studySession';
import AddLesson from './screens/studyScreens/addLesson';

const App = () => {
  const Stack = createStackNavigator()
  const navigation = useNavigation();
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
      <ToastProvider>
        <PaperProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack.Navigator
              screenOptions={{
                header: () => null,
                animationTypeForReplace: 'push',
                gestureEnabled: true,
                screenProps: { navigation },
                ...horizontalAnimation,
              }}
            >
              <Stack.Screen name="Auth" component={Auth} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Home" component={Home}/>
              <Stack.Screen name="SideMenu" component={SideMenu} options={slideFromLeftAnimation} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="Planner" component={Planner} />
              <Stack.Screen name="Reminders" component={Reminders} />
              <Stack.Screen name="Settings" component={Settings} />
              <Stack.Screen name="Routine" component={Routine} />
              <Stack.Screen name="AddTask" component={addTask} />
              <Stack.Screen name="FirstName" component={ChangeFirstName} />
              <Stack.Screen name="LastName" component={ChangeLastName} />
              <Stack.Screen name="ChangeEmail" component={ChangeEmail} />
              <Stack.Screen name="ChangePassword" component={ChangePassword} />
              <Stack.Screen name="MobileNumber" component={MobileNumber} />
              <Stack.Screen name="ChangeUsername" component={changeUsername} />
              <Stack.Screen name="SingleGoalItem" component={SingleGoalItem} />
              <Stack.Screen name="Journal" component={Journal} />
              <Stack.Screen name="AddJournalEntry" component={AddJournalEntry} />
              <Stack.Screen name="SingleJournalEntry" component={SingleJournalEntry} />
              <Stack.Screen name="Study" component={Study} />
              <Stack.Screen name="Wellness" component={Wellness} />
              <Stack.Screen name="Bucket" component={Bucket} />
              <Stack.Screen name="Pictorama" component={Pictorama} />
              <Stack.Screen name="AddBucket" component={AddBucket} />
              <Stack.Screen name="Lesson" component={Lesson} />
              <Stack.Screen name="StudySession" component={StudySession} />
              <Stack.Screen name="AddLesson" component={AddLesson} />



            </Stack.Navigator>
          </GestureHandlerRootView>
        </PaperProvider>
      </ToastProvider>
    </Provider>
  )
}

export default App