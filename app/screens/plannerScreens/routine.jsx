import { View, Text, ImageBackground, TextInput, ScrollView, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Feather"
import FontAwesome from "react-native-vector-icons/FontAwesome"


import Urgency from './Urgency';

const Routine = () => {
  const [tags, setTags] = useState([]);
  const [openSubtaskModal, setOpenSubtaskModal] = useState(false);
  const [tag, setTag] = useState("");
  const navigation = useNavigation();
  function handleBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return true;
    }
    return false;
  }
  function handleTask() {

  }
  function handleAddTag() {
    if (tag !== "") {
      setTags((tags) => [...tags, tag])
    }
    setTag((tag) => tag = "")
  }
  function handleRemoveTag(index) {
    let tagRecord = tags;
    tagRecord.splice(index, 1)
    console.log(tagRecord, "tag Record ")
    setTags([])
    setTags(tags => [...tagRecord])
  }

  function handleOpenSubtaskModal() {
    if (openSubtaskModal === false) {
      setOpenSubtaskModal(true)
    }
  }
  function handleCloseSubtaskModal() {
    if (openSubtaskModal === true) {
      setOpenSubtaskModal(false)
    }
  }

  return (

    <SafeAreaView className="w-full h-full flex-1 ">
      <View className="w-full h-36  bg-[#ED8E8E] z-10 " >
        <ImageBackground source={require('../../assets/images/routine/strokes.png')} className="w-full h-full relative">
          <View className="w-full flex flex-row justify-between px-10 py-10">
            <TouchableOpacity onPress={handleBack} >
              <FontAwesome6 name="xmark" size={25} color="#f3f3f3" />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome6 name="check" size={25} color="#f3f3f3" />
            </TouchableOpacity>
          </View>
          <View className="absolute w-full h-16  bottom-[-30px] flex flex-row justify-around items-center ">
            <TextInput
              placeholder='Untitled Routine'
              placeholderTextColor="#f3f3f3"
              className="px-5 text-lg font-light text-gray-50 w-48 h-[80%] rounded-2xl bg-[#ED8E8E] border-2 border-gray-50"
            />
            <TouchableOpacity className="bg-[#ED8E8E] w-12 h-12 flex justify-center items-center rounded-full border-2 border-gray-50 ">
              <Ionicons name="color-palette-sharp" size={25} color="#f3f3f3" />
            </TouchableOpacity>
          </View>
        </ImageBackground>

      </View>
      <ScrollView className="pt-3 z-0">
        <View className="pt-10 pb-5 px-5">
          <View className="border border-blue-300 w-36 py-1  rounded-full flex flex-row justify-around items-center">
            <TextInput
              placeholder='add tags'
              placeholderTextColor="#333"
              className="w-28 px-2 "
              value={tag}
              onChangeText={(tag) => setTag(tag)}
            />
            <TouchableOpacity className="w-8" onPress={handleAddTag}>
              <Text>
                {" "}
                <Icon name="plus-circle" size={18} color="blue" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {
          tags ? (

            <View className="mb-5  px-5 flex flex-row flex-wrap gap-3">
              {
                tags && tags.map((tag, index) => {
                  return (
                    <View key={index} className="w-28 overflow-hidden border border-blue-300 rounded-full px-3 py-1 flex flex-row items-center justify-between ">
                      <Text className="text-center">{tag}</Text>
                      <TouchableOpacity className="w-8" onPress={() => handleRemoveTag(index)}>
                        <Text>
                          {" "}
                          <Icon name="minus-circle" size={18} color="red" />
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )
                })
              }

            </View>
          )
            :
            ""
        }
        <View className="mx-5 h-20">
          <Urgency />
        </View>

        <TextInput
          multiline
          className="mx-5 h-24 rounded-xl px-4 py-3 border border-gray-400 text-md"
          placeholder='Description'
          textAlignVertical='top'
        />
        <View className="px-5 py-5">
          <View className="flex flex-row justify-start items-center border-b border-gray-400 pb-2">
            <Text className="text-xl font-light">Subtask</Text>
            <TouchableOpacity onPress={handleOpenSubtaskModal}>
              <Text>
                {" "}
                <Icon name="plus" size={24} color="#333" />
              </Text>
            </TouchableOpacity>
          </View>

          <Modal animationType="slide" transparent={true} visible={openSubtaskModal}>
            <View className="w-full h-full relative">
              <View className="h-48 bg-gray-50 border border-gray-300 top-1/2 rounded-xl py-3 px-5 z-20">
                <TouchableOpacity className="ml-auto py-1 px-1" onPress={handleCloseSubtaskModal}>
                  <FontAwesome6 name="xmark" size={23} color={'blue'} />
                </TouchableOpacity>

                <Text className="text-start text-lg font-light">Add subtask</Text>
                <View className="flex-row justify-center items-center gap-3 my-4">
                  <TextInput
                    className="border border-gray-400 w-4/5 px-4 rounded py-3"
                  />
                  <TouchableOpacity>
                    <Text>
                      <Icon name="plus-circle" size={40} color="blue" />

                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <View className="px-2">
            <TouchableWithoutFeedback className=" py-3 my-3 px-3 rounded-lg flex flex-row justify-start items-center border border-blue-300">
              <Text className="w-9">
                <FontAwesome name="circle" size={24} color="blue" />
              </Text>
              <Text className="line-through">Go to school Lorem</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback className="py-3 my-3 px-3 rounded-lg flex flex-row justify-start items-center border border-blue-300">
              <Text className="w-9">
                <FontAwesome name="circle" size={24} color="blue" />
              </Text>
              <Text className="text-wrap">Go to school </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback className="py-3 my-3 px-3 rounded-lg flex flex-row justify-start items-center border border-blue-300">
              <Text className="w-9">
                <FontAwesome name="circle" size={24} color="blue" />
              </Text>
              <Text className="line-through">Go to school Lorem</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback className="py-3 my-3 px-3 rounded-lg flex flex-row justify-start items-center border border-blue-300">
              <Text className="w-9">
                <FontAwesome name="circle" size={24} color="blue" />
              </Text>
              <Text className="text-wrap">Go to school </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback className="py-3 my-3 px-3 rounded-lg flex flex-row justify-start items-center border border-blue-300">
              <Text className="w-9">
                <FontAwesome name="circle" size={24} color="blue" />
              </Text>
              <Text className="line-through">Go to school Lorem</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback className="py-3 my-3 px-3 rounded-lg flex flex-row justify-start items-center border border-blue-300">
              <Text className="w-9">
                <FontAwesome name="circle" size={24} color="blue" />
              </Text>
              <Text className="text-wrap">Go to school </Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}


export default Routine