import { ActivityIndicator, Image, ImageBackground, View, Text, SafeAreaView, TouchableOpacity, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from "react-native-vector-icons/Feather"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import universe from '../../assets/images/bucket/preview.png'
import BucketList from './bucketList'
import BASE_URL from '../../baseUrl'
import { connect } from 'react-redux'
import { useNavigation } from 'expo-router'


const Bucket = ({ user }) => {
  const [buckets, setBuckets] = useState({})
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation()

  async function fetchBuckets() {
    try {
      setLoading(true)
      const response = await fetch(`${BASE_URL}/api/v1/buckets`, {
        method: 'GET',
        headers: {
          "Content-Type": 'application/json',
          "Accept": 'application/json',
          "Authorization": `Bearer ${user.jwt}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data, 'kutoka buckets');
        setBuckets(data);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBuckets();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-slate-100 dark:bg-slate-900 py-10 px-5">
      <View className="flex-row justify-between">
        <Text className="text-lg font-light text-slate-700 dark:text-slate-300">Bucket list</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddBucket',  {setBuckets: setBuckets})}>
          <Text>
            <Icon name="plus-circle" size={30} color="#80011F" />
          </Text>
        </TouchableOpacity>
      </View>
      <View className="w-full h-full relative">
        {
          loading && (
            <ActivityIndicator size={'large'} color={'#80011F'} className="top-10" />
          )
        }
            <ImageBackground source={universe} className="h-48 w-72 absolute self-center top-48">
              <Text className='text-center dark:text-slate-400 text-slate-500'>explore your potential</Text>
            </ImageBackground>

        {/* <Text className="text-gray-50">Fucker in a green big bottom</Text> */}
        <View className="flex-1 w-full h-full py-7 items-center">

          {
            !loading && <BucketList buckets={buckets} />
          }


        </View>


      </View>

      <Pressable onPress={() => navigation.navigate('Pictorama', { buckets: buckets})} className={`ease-in duration-300 transform flex justify-center items-center w-14 h-14 bg-[#80011F] absolute bottom-11 right-5 rounded-full`}>
        <Text>
          <MaterialIcons name="motion-photos-on" size={35} color="#ffffff" />
        </Text>
      </Pressable>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  theme: state.theme.theme
});

export default connect(mapStateToProps)(Bucket);