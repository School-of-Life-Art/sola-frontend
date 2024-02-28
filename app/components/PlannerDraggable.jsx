import React, { useState, useEffect } from 'react';
import { View, PanResponder, Image, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Goals from './goals';
import TaskView from './taskView';
import dropDownIcon from '../assets/images/planner/dropdown.png';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome';


import { TouchableOpacity } from 'react-native';
import { Overlay } from '@rneui/base';
import { useNavigation } from 'expo-router';


const PlannerDraggable = () => {
  const Tab = createMaterialTopTabNavigator();
  const navigation = useNavigation()
  const [active, setActive] = useState('Tasks');
  const [height, setHeight] = useState(430);
  const [btnOpen, setBtnOpen] = useState(false);

  function handleMenu() {
    if (btnOpen) setBtnOpen(false)
    else setBtnOpen(true)
  }

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 5,
    onPanResponderMove: (_, gestureState) => {
      const newHeight = height - gestureState.dy;

      if (newHeight >= 50) {
        const maxHeight = 1000;
        if (newHeight <= maxHeight) {
          setHeight(newHeight);
        } else {
          setHeight(maxHeight);
        }
      } else {
        setHeight(50);
      }
    },
  });

  const handleTabPress = (tabName) => {
    setActive(tabName);
  };

  return (
    <View style={{ flex: 1 }} className="">
      <View
        className="flex-1 justify-center items-center relative"
        {...panResponder.panHandlers}
      >
        <View
          style={{
            width: '100%',
            height: height,
            minHeight: 675,
          }}
        >
          <View className="w-full h-full flex-1 rounded-3xl bg-slate-100 dark:bg-slate-900 pt-2">
            <Tab.Navigator
              // initialRouteName="Goals"
              // screenOptions={{ headerShown: false }}
              screenOptions={{
                tabBarLabelStyle: { fontSize: 12, color: '#f3f3f3' },
                tabBarStyle: { backgroundColor: 'transparent' },
              }}
              sceneContainerStyle={{backgroundColor: 'transparent'}}
            >
              <Tab.Screen
                name="Goals"
                component={Goals}
              listeners={({ navigation }) => ({
                tabPress: () => handleTabPress('Goals'),
              })}
              />
              <Tab.Screen
                name="Tasks"
                component={TaskView}
              listeners={({ navigation }) => ({
                tabPress: () => handleTabPress('Tasks'),
              })}
              />
            </Tab.Navigator>
          </View>
        </View>

        <Overlay fullScreen={true} isVisible={btnOpen} overlayStyle={{ backgroundColor: 'transparent' }}>
          {
            !btnOpen ? "" :
              <>
                <View className=" flex justify-center items-end absolute bottom-32 right-5 z-50 rounded-full`} gap-5">
                  <TouchableOpacity className="shadow-lg border bg-gray-100 dark:bg-slate-900 dark:border-slate-800 border-gray-200 hover:shadow-xl w-32 rounded-full py-2 px-3`}" onPress={() => navigation.navigate('Routine')}>
                    <Text className="font-light text-lg text-center text-slate-700 dark:text-slate-100 ">
                      <AntDesignIcon name="retweet" size={20} color="#333" />{"   "}
                      Routine </Text>
                  </TouchableOpacity>

                  <TouchableOpacity className="shadow-lg border bg-gray-100 dark:bg-slate-900 dark:border-slate-800 border-gray-200 hover:shadow-xl w-28 rounded-full py-2 px-3`}">
                    <Text className="font-light text-lg text-center text-slate-700 dark:text-slate-100">
                      <AntDesignIcon name="checkcircleo" size={20} color="#333" />{"   "}
                      Task</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="shadow-lg border bg-gray-100 dark:bg-slate-900 dark:border-slate-800 border-gray-200  hover:shadow-xl rounded-full py-2 px-3 `}">
                    <Text className="font-light text-lg text-center text-slate-700 dark:text-slate-100">
                      <EntypoIcon name="bar-graph" size={18} color="#333" />{"   "}
                      Goal</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleMenu} className={`ease-in duration-300 transform rotate-45  flex justify-center items-center w-14 h-14 bg-red-700 absolute bottom-11 right-5 z-50 rounded-full`}>
                  <Text>
                    <Icon name="plus" size={20} color="#fff" />
                  </Text>
                </TouchableOpacity>
              </>
          }
        </Overlay>

        <TouchableOpacity onPress={handleMenu} className={`ease-in duration-300 transform rotate-${btnOpen ? 45 : 0}  flex justify-center items-center w-14 h-14 bg-[#3B77CA] absolute bottom-11 right-5 rounded-full`}>
          <Text>
            <Icon name="plus" size={20} color="#fff" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlannerDraggable;
