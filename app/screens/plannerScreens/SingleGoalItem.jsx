import { View, Text, ImageBackground, TextInput, ScrollView, Modal, Switch, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Urgency from './Urgency';
import Icon from "react-native-vector-icons/Feather"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import DatePicker from "react-native-modal-datetime-picker";
import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';
import { connect } from 'react-redux';
import BASE_URL from '../../baseUrl';
import { useToast } from 'react-native-toast-notifications';


const SingleGoalItem = ({ user, theme }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedDate30Mins, setSelectedDate30Mins] = useState(updateTimeBy30Minutes(selectedDate));
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");
  const [openSubgoalModal, setOpenSubgoalModal] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible30Mins, setDatePickerVisibility30Mins] = useState(false);
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const toast = useToast();
  const [title, setTitle] = useState('')
  const [urgency, setUrgency] = useState('low')
  const [description, setDescription] = useState('')
  const [notify, setNotify] = useState(false)
  const [repeats, setRepeats] = useState(false)
  const [color, setColor] = useState("#ED8E8E")
  const [subGoals, setSubGoals] = useState([])
  const [subGoal, setSubGoal] = useState({ 'title': "", 'completed': false })

  const onSelectColor = ({ hex }) => {
    setColor(hex)
  };

  function handleBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return true;
    }
    return false;
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
    setTags([])
    setTags(tags => [...tagRecord])
  }

  function handleOpenSubgoalModal() {
    if (openSubgoalModal === false) {
      setOpenSubgoalModal(true)
    }
  }
  function handleCloseSubgoalModal() {
    if (openSubgoalModal === true) {
      setOpenSubgoalModal(false)
    }
  }

  const formatDate = (date) => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const amPm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12;
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedDate = `${dayOfWeek}, ${day} ${month} ${year} at ${hours}:${paddedMinutes}${amPm}`;
    return formattedDate;
  };

  function updateTimeBy30Minutes(currentTime) {
    let updatedTime = new Date(currentTime);
    updatedTime.setMinutes(updatedTime.getMinutes() + 30);
    return updatedTime;
  }


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const showDatePicker30Mins = () => {
    setDatePickerVisibility30Mins(true)
  }
  const hideDatePicker30Mins = () => {
    setDatePickerVisibility30Mins(false)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date)
    hideDatePicker();
  };
  const handleConfirm30Mins = (date) => {
    setSelectedDate30Mins(date)
    hideDatePicker30Mins();
  }

  useEffect(() => {
    if (selectedDate > selectedDate30Mins) {
      setSelectedDate30Mins(updateTimeBy30Minutes(selectedDate))
    }
  }, [selectedDate])

  async function saveGoal() {
    try {
      const goalFormData = {
        title,
        color,
        urgency,
        description,
        start_date: selectedDate,
        end_date: selectedDate30Mins,
        repeats,
        notify,
        tags_attributes: tags.map(tag => ({ name: tag })),
        sub_goals_attributes: subGoals.map(item => ({ title: item.title, completed: item.completed }))
      };

      const response = await fetch(`${BASE_URL}/api/v1/goals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${user.jwt}`
        },
        body: JSON.stringify(goalFormData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        toast.show("added", {
          type: "success",
          placement: "bottom",
          duration: 2000,
          offset: 30,
          animationType: "zoom-in",
          swipeEnabled: true
        });
        navigation.navigate("Planner");
      } else {
        throw new Error('Something just ain\'t right man!');
      }
    } catch (error) {
      throw new Error('an error occurred', error);
    }
  }

  useEffect(() => {
    console.log(title, color, urgency, description, selectedDate, selectedDate30Mins)
  }, [])

  function toastNotify() {
    if (!notify) {
      setNotify(true)
      toast.show("goal notification added!", {
        type: "success",
        placement: "top",
        duration: 2000,
        offset: 30,
        animationType: "zoom-in",
        swipeEnabled: true
      });
    } else {
      setNotify(false)
      toast.show("goal notification canceled!", {
        type: "success",
        placement: "top",
        duration: 2000,
        offset: 30,
        animationType: "zoom-in",
        swipeEnabled: true
      });
    }
  }
  function toastRepeat() {
    if (!repeats) {
      setRepeats(true)
      toast.show("goal set to repeat", {
        type: "success",
        placement: "top",
        duration: 2000,
        offset: 30,
        animationType: "zoom-in",
        swipeEnabled: true
      });
    } else {
      setRepeats(false)
      toast.show("goal repeat canceled", {
        type: "success",
        placement: "top",
        duration: 2000,
        offset: 30,
        animationType: "zoom-in",
        swipeEnabled: true
      });
    }
  }

  function addSubGoal() {
    if (subGoal.title !== "") {
      setSubGoals((subGoals) => [...subGoals, subGoal])
    }
    setSubGoal({ title: "", completed: false });
  }


  return (

    <SafeAreaView className="w-full h-full flex-1 bg-slate-100 dark:bg-slate-900 ">
      <View className={`w-full h-36  z-10 `} style={{ backgroundColor: color }} >
        <ImageBackground source={require('../../assets/images/routine/strokes.png')} className="w-full h-full relative">
          <View className="w-full flex flex-row justify-between px-10 py-10">
            <TouchableOpacity onPress={handleBack} >
              <FontAwesome6 name="xmark" size={25} color="#f3f3f3" />
            </TouchableOpacity>
            <TouchableOpacity onPress={saveGoal}>
              <FontAwesome6 name="check" size={25} color="#f3f3f3" />
            </TouchableOpacity>
          </View>
          <View className="absolute w-full h-16  bottom-[-30px] flex flex-row justify-around items-center ">
            <TextInput
              placeholder='Untitled Goal'
              value={title}
              onChange={(event) => setTitle(event.nativeEvent.text)}
              placeholderTextColor={`${theme === 'dark' ? '#f3f3f3b2' : '#333333b2'}`}
              className={`px-5 text-lg font-light text-gray-50 dark:text-gray-900 border-gray-50 dark:border-gray-900 w-48 h-[80%] rounded-2xl border-2 `}
              style={{ backgroundColor: color }}
            />
            <TouchableOpacity onPress={() => setShowModal(true)} style={{ backgroundColor: color }} className={`w-12 h-12 flex justify-center items-center rounded-full border-2 border-gray-50  dark:border-gray-900`}>
              <Ionicons name="color-palette-sharp" size={25} color="#f3f3f3" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <Modal visible={showModal} transparent={true} animationType='slide'>
          <View className="w-full h-full">
            <View className="h-50 bg-gray-50 dark:bg-gray-900 w-auto top-1/3 border border-gray-200 dark:border-gray-900 items-center justify-center py-3">
              <ColorPicker style={{ width: '70%' }} value={color} onComplete={onSelectColor}>
                <Swatches />
              </ColorPicker>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <FontAwesome6Icon name="xmark" size={24} color={`${theme === 'dark' ? '#ffffffb2' : '#333333b2'}`} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </View>
      <ScrollView className="pt-3 z-0">
        <View className="pt-10 pb-5 px-5">
          <View className="border border-blue-300 w-36 py-1  rounded-full flex flex-row justify-around items-center">
            <TextInput
              placeholder='add tags'
              placeholderTextColor={`${theme === 'dark' ? '#ffffffb2' : '#333333b2'}`}
              className="w-28 px-2 text-slate-700 dark:text-slate-100"
              value={tag}
              onChangeText={(tag) => setTag(tag)}
            />
            <TouchableOpacity className="w-8" onPress={handleAddTag}>
              <Text>
                {" "}
                <Icon name="plus-circle" size={18} color="#20BBFE" />
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
                      <Text className="text-center text-slate-700 dark:text-slate-100">{tag}</Text>
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
          <Urgency theme={theme} setUrgency={setUrgency} />
        </View>

        <TextInput
          multiline
          className="mx-5 h-24 rounded-xl px-4 py-3 border border-gray-400 dark:border-gray-600 text-md dark:text-slate-100"
          placeholder='Description'
          textAlignVertical='top'
          value={description}
          onChange={(event) => setDescription(event.nativeEvent.text)}
          placeholderTextColor={`${theme === 'dark' ? '#ffffffb2' : '#333333b2'}`}
        />
        <View className="px-5 py-5">
          <View className="flex flex-row justify-start items-center border-b border-gray-400 dark:border-gray-600 pb-2">
            <Text className="text-lg font-light dark:text-slate-100">Subgoals</Text>
            <TouchableOpacity onPress={handleOpenSubgoalModal}>
              <Text>
                {" "}
                <Icon name="plus" size={24} color={`${theme === 'dark' ? '#ffffffb2' : '#333333b2'}`} />
              </Text>
            </TouchableOpacity>
          </View>

          <Modal animationType="slide" transparent={true} visible={openSubgoalModal}>
            <View className="w-full h-full relative">
              <View className="h-40 bg-gray-50 border border-gray-300 dark:border-gray-700  dark:bg-gray-900 top-1/2 rounded-xl py-3 px-5 z-20">
                <TouchableOpacity className="ml-auto py-1 px-1" onPress={handleCloseSubgoalModal}>
                  <FontAwesome6 name="xmark" size={23} color={`${theme === 'dark' ? '#ffffffb2' : '#333333b2'}`} />
                </TouchableOpacity>
                <Text className="text-start text-lg font-light text-slate-700 dark:text-slate-100">Add subgoal</Text>
                <View className="flex-row justify-center items-center gap-3 my-1">
                  <TextInput
                    className="border border-gray-400 w-4/5 px-4 rounded-xl py-2 dark:text-slate-100"
                    placeholder="sub goals"
                    value={subGoal.title}
                    onChange={(event) => setSubGoal({ 'title': event.nativeEvent.text, 'completed': false })}
                    placeholderTextColor={`${theme === 'dark' ? '#ffffffb2' : '#333333b2'}`}
                  />
                  <TouchableOpacity onPress={addSubGoal}>
                    <Text>
                      <Icon name="plus-circle" size={40} color="#20BBFE" />

                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <View className="px-2">
            {
              subGoals && subGoals.reverse().map((goalItem, index) => {
                const handleCloseSubgoal = () => {
                  const updatedSubGoals = [...subGoals];
                  updatedSubGoals[index].completed = !goalItem.completed;
                  setSubGoals(updatedSubGoals);
                };
                return <>
                  <TouchableWithoutFeedback key={index} className="bg-gray-200 dark:bg-slate-800 py-3 my-2 px-3 rounded-md flex flex-row justify-start items-center" onPress={handleCloseSubgoal}>
                    <Text className="w-9">
                      <FontAwesome name={goalItem.completed ? 'circle' : 'circle-o'} size={28} color="#019EE3" />
                    </Text>
                    <Text className={`${goalItem.completed ? 'line-through': ''} text-md text-gray-600 dark:text-gray-200`}>{goalItem.title}</Text>
                  </TouchableWithoutFeedback>
                </>
              })
            }
          </View>


        </View>
        <View className="px-5 pb-20">
          <View className={`flex flex-row justify-between items-center pt-2 ${subGoals.length === 0 ? '' : 'border-t border-gray-400 dark:border-gray-600'}`}>
            <View className="flex-row items-center gap-3">
              <Text>
                {" "}
                <Icon name="clock" size={24} color={`${theme === 'dark' ? '#ffffffb1' : '#333333b1'}`} />
              </Text>
              <Text className="text-lg text-gray-600 dark:text-gray-200">All day</Text>
            </View>

            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isEnabled ? '#019EE3' : '#f4f3f4'}
              _backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={{ transform: [{ scaleX: 1.25 }, { scaleY: 1.25 }] }}
            />
          </View>
          <View className="mr-auto px-10 relative w-full">
            {
              !isEnabled && (
                <>
                  <View className="absolute rotate-90 bottom-[63px] left-0">
                    <View className="flex-row items-center ">
                      <View className="w-2 h-2 rounded-full bg-gray-400"></View>
                      <View className="w-10 bg-gray-400 h-[2px]"></View>
                      <View className="w-2 h-2 rounded-full bg-gray-400"></View>
                    </View>
                  </View>
                  <TouchableOpacity className="w-full  flex-row items-center gap-3 justify-start pb-8 " onPress={showDatePicker}>
                    <Text className="text-gray-500 text-md">{formatDate(selectedDate)}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity className="w-full  flex-row items-center gap-3 justify-start pb-8" onPress={showDatePicker30Mins}>
                    <Text className="text-gray-500 text-md ">{formatDate(selectedDate30Mins)}</Text>
                  </TouchableOpacity>
                </>
              )
            }
          </View>

          <View className="flex flex-row justify-between items-center ">
            <TouchableOpacity className="flex-row items-center gap-3 w-full" onPress={toastRepeat}>
              <Text>
                {" "}
                <FontAwesome6Icon name="retweet" color={`${theme === 'dark' ? '#ffffffb1' : '#333333b1'}`} size={24} />
              </Text>
              <Text className="text-lg text-gray-600 dark:text-gray-200" >Set repeat schedule</Text>
            </TouchableOpacity>
          </View>

          <View className="flex flex-row justify-between items-center pt-4">
            <TouchableOpacity className="flex-row items-center gap-3 w-full" onPress={toastNotify}>
              <Text>
                {" "}
                <FontAwesome6Icon name="bell" color={`${theme === 'dark' ? '#ffffffb1' : '#333333b1'}`} size={24} />
              </Text>
              <Text className="text-lg text-gray-600 dark:text-gray-200">Add a reminder</Text>
            </TouchableOpacity>
          </View>
          <View>
            <DatePicker
              isVisible={isDatePickerVisible}
              mode="datetime"
              locale="en_GB" // Use "en_GB" here
              date={selectedDate}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />

            <DatePicker
              isVisible={isDatePickerVisible30Mins}
              mode="datetime"
              locale="en_GB" // Use "en_GB" here
              date={selectedDate30Mins}
              onConfirm={handleConfirm30Mins}
              onCancel={hideDatePicker30Mins}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  theme: state.theme.theme
});

export default connect(mapStateToProps)(SingleGoalItem);