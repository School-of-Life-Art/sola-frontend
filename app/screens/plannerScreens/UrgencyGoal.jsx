import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';


const UrgencyGoal = ({theme, setUrgency}) => {
  // let urgencyColor = '#800000'
  const [urgencyColor, setUrgencyColor] = useState("#800000")

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'High', value: 'high' },
    { label: 'Medium', value: 'medium' },
    { label: 'Low', value: 'low' }
  ]);

  useEffect(() => {
    console.log(value)
    if (value === 'low') {
      setUrgencyColor('#006400')
      setUrgency('low')
    } else if (value === 'medium') {
      setUrgencyColor('#019EE3')
      setUrgency('medium')
    } else {
      setUrgencyColor('#FF6347')
      setUrgency('high')
    }

  }, [value])


  return <DropDownPicker
    style={{
      backgroundColor: "", borderLeftWidth: 10, borderColor: `${urgencyColor}`, color: theme === 'light' ? '#ffffffb1' : '#333333b1'
    }}
    labelStyle={{ borderWidth: 0, color: theme === 'dark' ? '#ffffffb1' : '#333333b1' }}
    containerStyle={{ borderWidth: 0 }}
    dropDownContainerStyle={{ borderWidth: 0 }}
    open={open}
    value={value}
    items={items}
    setOpen={setOpen}
    setValue={setValue}
    setItems={setItems}
    placeholder="How urgent is this goal?"
    placeholderStyle={{color: `${theme === 'dark' ? '#ffffffb2' : '#333333b2'}`}}
  />
}


export default UrgencyGoal