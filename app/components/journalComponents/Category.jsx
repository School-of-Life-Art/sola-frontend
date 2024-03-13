import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';


const Category = ({ theme, category, setCategory }) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Studies', value: 'studies' },
    { label: 'Career', value: 'career' },
    { label: 'Financial', value: 'financial' },
    { label: 'Wellness', value: 'wellness' }

  ]);

  return <DropDownPicker
    style={{
      backgroundColor: "", borderLeftWidth: 10, color: theme === 'light' ? '#ffffffb1' : '#333333b1'
    }}
    labelStyle={{ borderWidth: 0, color: theme === 'dark' ? '#ffffffb1' : '#333333b1' }}
    containerStyle={{ borderWidth: 0 }}
    dropDownContainerStyle={{ borderWidth: 0 }}
    open={open}
    value={category}
    items={items}
    setOpen={setOpen}
    setValue={setCategory}
    setItems={setItems}
    placeholder="Select category for this entry."
    placeholderStyle={{color: `${theme === 'dark' ? '#ffffffb2' : '#333333b2'}`}}
  />
}


export default Category