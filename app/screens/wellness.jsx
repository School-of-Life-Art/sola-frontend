import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, View } from 'react-native';

const Wellness = () => {
  const wavePosition = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    const waveAnimation = Animated.loop(
      Animated.timing(wavePosition, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    );

    waveAnimation.start();

    return () => {
      waveAnimation.stop();
    };
  }, []);

  const waveTransform = wavePosition.interpolate({
    inputRange: [0, 1],
    outputRange: [0, screenWidth],
  });

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={{
          width: screenWidth,
          height: 100,
          backgroundColor: 'skyblue',
          transform: [{ translateX: waveTransform }],
        }}
      />
    </View>
  );
};

export default Wellness;
