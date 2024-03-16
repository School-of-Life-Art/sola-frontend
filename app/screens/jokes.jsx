import { View, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import React from 'react'
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';

const _color="red";
const _size = 100
const Reminders = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: "center"}} className="bg-slate-100 dark:bg-slate-900">
      <View style={[styles.dot, styles.center]} >
        {[...Array(3).keys()].map(index => {
          return <MotiView
          from={{opacity: .7, scale: 1}}
          animate={{ opacity: 0, scale: 10}}
          transition={{
            type: 'timing',
            duration: 4000,
            delay: index * 400,
            easing: Easing.out(Easing.ease),
            loop: true,
            repeatReverse: false
          }}
          key={index}
          style={[StyleSheet.absoluteFillObject, styles.dot]}
          />
        })}
        <Feather name='book' size={32} color='#fff' />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  dot: {
    width: _size,
    height: _size,
    borderRadius: _size,
    backgroundColor: _color
  },
  center: { alignItems: 'center', justifyContent: 'center'}
})

export default Reminders