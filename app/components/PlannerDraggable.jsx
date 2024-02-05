// PlannerDraggable.js
import React, { useState, useEffect } from 'react';
import { Text, View, PanResponder, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import dropDownIcon from '../assets/images/planner/dropdown.png'
import Goals from './plannerTabs/Goals';
import TaskView from './plannerTabs/TaskView';

const PlannerDraggable = () => {
  const [active, setActive] = useState("Tasks")
  const [height, setHeight] = useState(430);

  const toggleGoals =() =>{
    setActive("Goals")
    console.log("please work man")
  }
  const toggleTasks =() =>{
    setActive("Tasks")
    console.log("who the fuck are you?!")
  }
  useEffect(() => {
    console.log(active);
  }, [active]);


  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      const newHeight = height - gesture.dy;

      if (newHeight >= 50) {
        const maxHeight = 600;
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

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'lightgray',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        {...panResponder.panHandlers}
      >
        <View
          style={{
            width: "100%",
            height: height,
            minHeight: 390,

          }}
          className={`w-full h-${height} justify-center items-center absolute bottom-0 bg-gray-50 rounded-t-3xl`}
        >
          <View className="w-full h-full bg-gray-100 rounded-t-3xl pt-5">
            <Image source={dropDownIcon} className="mx-auto w-7 h-2 mt-2" />
            <View className="w-full h-full">
              <View className="w-full h-20  flex-1 flex-row px-5 gap-10 py-2 fixed z-10">
                <TouchableOpacity onPress={toggleGoals} className=" rounded">
                  <Text className={`text-lg font-light text-gray-700 ${active} ${active=="Goals" ? ' border-b-2  border-blue-600 font-semibold' : ''}`}>Goals</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleTasks} className="px-4 rounded">
                  <Text className={`text-lg font-light text-gray-700 ${active} ${active=="Tasks" ? ' border-b-2  border-blue-600 font-semibold' : ''}`}>Tasks</Text>
                </TouchableOpacity>
              </View>
              <ScrollView className="h-[70%] px-5">
                {
                  active == "Goals" ?
                  <Goals/>
                  :
                  <TaskView />
                }
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PlannerDraggable;