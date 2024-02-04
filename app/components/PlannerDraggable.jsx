// PlannerDraggable.js
import React, { useState } from 'react';
import { View, PanResponder, TouchableOpacity } from 'react-native';

const PlannerDraggable = () => {
  const [height, setHeight] = useState(430); // Initial height
  const [minimized, setMinimized] = useState(false);

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

  const toggleMinimize = () => {
    setMinimized(!minimized);
    setHeight(minimized ? 300 : 50);
  };

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
            minHeight: 430,

          }}
          className={`w-full h-${height} justify-center items-center absolute bottom-0 bg-gray-50 rounded-t-3xl`}
        >
          {/*planner draggable content */}
        </View>
      </View>
    </View>
  );
};

export default PlannerDraggable;