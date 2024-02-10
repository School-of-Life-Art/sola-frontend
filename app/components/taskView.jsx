import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { List } from 'react-native-paper';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome'

const TaskView = () => {
  const [expanded, setExpanded] = useState(true);
  const handlePress = () => setExpanded(!expanded);
  function handleTask(){

  }
  return (
    <View className=" h-full bg-gray-100">
      <List.Section title="">
        <View className="mx-4 my-1 border-l-4 border-red-400">
          <List.Accordion
            title="Frontend Development"
          >
            <TouchableOpacity className="" onPress={handleTask}>
              <List.Item
                title={<Text style={{ textDecorationLine: "line-through" }}>Fix parallax gesture bug mobile horizontal view</Text>}
                left={props => <Icon {...props} name="circle" size={22} color="#333" />}
              />
            </TouchableOpacity>
            <List.Item
              title="Configure Redux actions"
              left={props => <EntypoIcon {...props} name="circle" size={22} color="#333" />}
            />
            <List.Item
              title="Theme with uniform style"
              left={props => <EntypoIcon {...props} name="circle" size={22} color="#333" />}
            />
          </List.Accordion>
        </View>

        <View className="mx-4 my-1 border-l-4 border-green-600">
          <List.Accordion
            title="Take out the trash"
          >
            <List.Item
              title="Recycle plastic bottles"
              left={props => <EntypoIcon {...props} name="circle" size={22} color="#333" />}
            />
            <TouchableOpacity className="" onPress={handleTask}>
              <List.Item
                title={<Text style={{ color: "black", textDecorationLine: "line-through" }}>Throw out old socks</Text>}
                left={props => <Icon {...props} name="circle" size={22} color="black" />}
              />
            </TouchableOpacity>
            <List.Item
              title="Throw out old shoes"
              left={props => <EntypoIcon {...props} name="circle" size={22} color="#333" />}
            />
          </List.Accordion>
        </View>

      </List.Section>
    </View>
  )
}

export default TaskView