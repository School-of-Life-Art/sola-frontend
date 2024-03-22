import { FlatList, Image, ImageBackground, Text, View } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';
import patternCircles from '../../assets/images/home/pattern_circles.png'



const BucketList = ({ buckets }) => {
    const [loaded] = useFonts({
        Rochester: require('../../assets/images/bucket/Rochester-Regular.ttf'),
    });

    if (!loaded) {
        return null; // Return null while the font is loading to prevent rendering components without the custom font
    }
    const renderItem = ({ item }) => {
        if (!item) {
            return null;
        }
        return <>
            <View style={{ maxWidth: '100%', maxHeight: '100%', overflow: 'hidden' }} className="my-1 rounded-lg w-[153px] mx-1 max-h-60 h-60 bg-red-100 flex justify-center items-center">
                {
                    item.snapshot ? (
                        <ImageBackground resizeMode='cover' imageStyle={{
                            resizeMode: 'cover',
                            backgroundPosition: 'center',
                        }}
                            source={{ uri: item.snapshot }} style={{ width: '100%', height: '100%' }}>
                        </ImageBackground>
                    )
                        :
                        (
                            <ImageBackground resizeMode='cover' imageStyle={{
                                resizeMode: 'cover',
                                backgroundPosition: 'center',
                            }}
                            className="justify-center items-center"
                                source={patternCircles} style={{ width: '100%', height: '100%' }}>
                                <Text style={{ fontFamily: 'Rochester', fontSize: 18 }} className='text-center text-[12px] h-24'>{item.title}</Text>

                            </ImageBackground>
                        )
                }
                {
                    item.snapshot && <Text style={{ fontFamily: 'Rochester', fontSize: 18 }} className='text-center text-[12px] h-24'>{item.title}</Text>
                }
            </View>

        </>

    }

    return (
        <FlatList
            data={buckets}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
        />
    )
}

export default BucketList