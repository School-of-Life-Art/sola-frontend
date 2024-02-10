import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { ListItem } from '@rneui/themed';
import { List } from 'react-native-paper';


const TaskView = () => {
  const [expanded, setExpanded] = useState(true);
  const handlePress = () => setExpanded(!expanded);
  return (
    <View className=" h-full">
      <List.Section title="">
        <List.Accordion
          title="Uncontrolled Accordion"
          left={props => <List.Icon {...props} icon="folder" />}>
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>

        <List.Accordion
          title="Controlled Accordion"
          left={props => <List.Icon {...props} icon="folder" />}
          expanded={expanded}
          onPress={handlePress}>
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
      </List.Section>
    </View>
  )
}

export default TaskView