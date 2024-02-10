import React, { useState, useEffect } from 'react';
import { View, PanResponder, Image, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Goals from './goals';
import TaskView from './taskView';
import dropDownIcon from '../assets/images/planner/dropdown.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';

const Tab = createMaterialTopTabNavigator();

const PlannerDraggable = () => {
  const [active, setActive] = useState('Tasks');
  const [height, setHeight] = useState(430);
  const [btnOpen, setBtnOpen] = useState(true);
  


  useEffect(() => {
    console.log(active);
  }, [active]);

  function handleMenu() {
    if(btnOpen) setBtnOpen(false)
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
          <View style={{ flex: 1 }} className="rounded-3xl bg-white pt-2">
            <Image source={dropDownIcon} className="w-10 h-3 items-center mt-5 " style={{ alignSelf: 'center', marginTop: 5 }} />
            <Tab.Navigator
              initialRouteName="Goals"
              tabBarOptions={{
                activeTintColor: 'blue',
                inactiveTintColor: 'gray',
              }}
            >
              <Tab.Screen
                name="Goals"
                component={Goals}
                listeners={({ navigation }) => ({
                  tabPress: () => handleTabPress('Goals'),
                })}
              />
              <Tab.Screen
                name="TaskView"
                component={TaskView}
                listeners={({ navigation }) => ({
                  tabPress: () => handleTabPress('Tasks'),
                })}
              />
            </Tab.Navigator>
          </View>
        </View>
        <TouchableOpacity onPress={handleMenu} className={`ease-in duration-300 transform rotate-${btnOpen ? 45 : 0}  flex justify-center items-center w-14 h-14 bg-orange-600 absolute bottom-30 right-5 z-50 rounded-full`}>
          <Text>
            <Icon name="plus" size={24} color="#fff" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlannerDraggable;
