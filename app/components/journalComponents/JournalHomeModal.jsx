import { View, Text, Modal, TouchableOpacity, Animated, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import OpenBook from '../../assets/images/home/open-book.png'

const JournalHomeModal = ({ theme, navigation }) => {
  const [isVisible, setIsVisible] = useState(true);
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
      <TouchableOpacity onPress={toggleVisibility}>
        <Text className="">Close</Text>
      </TouchableOpacity>
      <Animated.View
        style={{
          transform: [{ translateX: slideAnim }],
          position: 'absolute',
          right: 0,
          top: 0,
        }}
      >
        <View className="w-48 h-30 bg-red-100 dark:bg-slate-600 rounded-lg py-2 mt-16 px-4 relative">
          <View className="justify-center items-start w-full h-full ">
            <TouchableOpacity onPress={() => navigation.navigate('Journal')}>
              <Image source={OpenBook} className="w-20 h-10" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity className="top-2 right-2 absolute" onPress={toggleVisibility}>
            <Text className="">
              <FontAwesome6 name="xmark" size={18} color={`${theme === 'dark' ? '#ffffffb2' : '#333333b2'}`} />
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  )
}

export default JournalHomeModal