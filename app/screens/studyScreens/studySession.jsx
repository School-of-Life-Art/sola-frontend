import { View, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import React from 'react'
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';

const StudySession = ({ route }) => {
  const { color } = route.params
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: "center" }} className="bg-slate-100 dark:bg-slate-900">
      <View style={[{
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: color
      }, styles.center]} >
        {[...Array(3).keys()].map(index => {
          return <MotiView
            from={{ opacity: .7, scale: 1 }}
            animate={{ opacity: 0, scale: 10 }}
            transition={{
              type: 'timing',
              duration: 4000,
              delay: index * 400,
              easing: Easing.out(Easing.ease),
              loop: true,
              repeatReverse: false
            }}
            key={index}
            style={[StyleSheet.absoluteFillObject, {
              width: 100,
              height: 100,
              borderRadius: 100,
              backgroundColor: color
            }]}
          />
        })}
        <Feather name='book' size={32} color='#f3f3f3b3' />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center' }
})

export default StudySession