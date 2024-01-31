import { StatusBar } from 'expo-status-bar';
import {Text, View } from 'react-native';
import { NativeWindStyleSheet } from "nativewind";

export default function App() {

  NativeWindStyleSheet.setOutput({
    default: "native",
  });
  return (
    <View className="flex-1 justify-center items-center">
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
