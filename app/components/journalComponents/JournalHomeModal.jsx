import { View, Text, Modal, TouchableOpacity, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';


const JournalHomeModal = ({ theme }) => {
  const [showModal, setShowModal] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(-1000));

  useEffect(() => {
    if (isVisible) {
      // Animate the view to slide in from the right
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Animate the view to slide out to the right
      Animated.timing(slideAnim, {
        toValue: 1000,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <View className="z-20 flex-1 justify-center items-center">
      <Animated.View
        style={{
          transform: [{ translateX: slideAnim }],
          backgroundColor: '',
          padding: 20,
          borderRadius: 10,
          position: 'absolute',
          right: 0,
        }}
      >
        <View className="w-48 h-36 bg-red-100 rounded-lg border-t-4 ">
          <TouchableOpacity onPress={toggleVisibility}>
            <Text className="">Close</Text>
          </TouchableOpacity>

        </View>
      </Animated.View>
    </View>
  )
}

export default JournalHomeModal