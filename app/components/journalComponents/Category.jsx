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
  console.log(theme, 'this is from the category')

  return <DropDownPicker
    style={{
      backgroundColor: "", borderColor: '#80011F', borderLeftWidth: 10, borderTopWidth: 0, borderRightWidth: 0, borderBottomWidth: 0, color: theme === 'light' ? '#ffffffb1' : '#333333b1'
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
    placeholderStyle={{color: `${theme === 'dark' ? '#ffffffb2' : '#f3f3f3b2'}`}}
  />
}


export default Category