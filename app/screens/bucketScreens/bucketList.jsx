import { FlatList, Image, ImageBackground, Text, View } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';



const BucketList = ({ buckets }) => {
    const [loaded] = useFonts({
        Rochester: require('../../assets/images/bucket/Rochester-Regular.ttf'),
      });
    
      if (!loaded) {
        return null; // Return null while the font is loading to prevent rendering components without the custom font
      }
    const renderItem = ({item}) => {
        if (!item || !item.snapshot) {
            return null;
        }
        return <>
            <View className="rounded-lg w-[153px] mx-1 h-60  bg-red-100 flex justify-center items-center">
                <ImageBackground resizeMode='cover' source={{ uri: item.snapshot }}  className="w-full h-full" >
                </ImageBackground>
                <Text style={{ fontFamily: 'Rochester', fontSize: 18 }} className='text-center text-[12px] h-24'>{item.title}</Text>
            </View>
        </>

    }

    return (
        <FlatList
            data={buckets}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={3}
        />
    )
}

export default BucketList