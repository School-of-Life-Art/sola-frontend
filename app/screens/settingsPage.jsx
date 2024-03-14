import { View, Text, Switch, TouchableOpacity, Touchable, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useColorScheme } from "nativewind";
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import { useNavigation } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { connect, useDispatch } from 'react-redux';
import { storeData } from '../reducers/asyncStorage';
import { loginSuccess } from '../actions/authActions';
import { useToast } from 'react-native-toast-notifications';
import BASE_URL from '../baseUrl';


const Settings = ({ user, token, theme }) => {
  const navigation = useNavigation()
  const [isEnabled, setIsEnabled] = useState(false);
  const [image, setImage] = useState(user.user.profile_picture);
  const dispatch = useDispatch()
  const toast = useToast()
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState)
    toggleColorScheme()
  };
  const { colorScheme, toggleColorScheme } = useColorScheme();
  useEffect(() => {
    // change the theme in dispatche
    dispatch({
      type: 'CURRENT_THEME',
      payload: colorScheme
    })
    storeData("theme", colorScheme)
  }, [colorScheme, toggleColorScheme])

  // pick image
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);

      const createFormData = (uri) => {
        const fileName = uri.split('/').pop();
        const fileType = fileName.split('.').pop();
        const formData = new FormData();
        formData.append('profile_picture', {
          name: fileName,
          uri,
          type: `image/${fileType}`,
        });
        return formData;
      };

      async function handleSave() {
        try {
          const data = createFormData(result.assets[0].uri);
          const response = await fetch(`${BASE_URL}/api/v1/users/update`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'multipart/form-data',
              "Accept": 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: data
          })

          if (response.ok) {
            const res = await response.json()
            // TODO: this is a lazy update to redux. Find a better way!
            dispatch(loginSuccess({
              user: res.user,
              jwt: token
            }))
            toast.show("updated", {
              type: "success",
              placement: "bottom",
              duration: 2000,
              offset: 30,
              animationType: "zoom-in",
              swipeEnabled: true
            });
          } else {
            console.log(response.status)
            toast.show("an error occured.", {
              type: "danger",
              placement: "bottom",
              duration: 2000,
              offset: 30,
              animationType: "zoom-in",
              swipeEnabled: true
            });
          }

        } catch (error) {
          console.log(error)
          toast.show("an error occured.", {
            type: "danger",
            placement: "bottom",
            duration: 2000,
            offset: 30,
            animationType: "zoom-in",
            swipeEnabled: true
          });
        }

      }
      handleSave()
    }
  };
  // end pick image



  return (<>
    <SafeAreaView className="flex-1 w-full h-full bg-slate-100 dark:bg-slate-900 ">
      <Text className="px-5 text-start text-xl pt-10 text-gray-700 dark:text-gray-200">Settings</Text>
      <View className="w-full relative">
        {
          image ? <Image source={{ uri: image }} className="w-28 h-28 mx-auto rounded-full" /> : <Image source={require('../assets/images/home/profile.jpg')} className="w-28 h-28 mx-auto rounded-full" />
        }
        <TouchableOpacity className="absolute left-[115px] bottom-0" onPress={pickImage}>
          <FontAwesome name="camera" size={24} color={colorScheme === 'light' ? '#64748b' : '#f3f3f3'} />
        </TouchableOpacity>
      </View>


      <ScrollView className="px-5 py-8">
        <View >
          <Text className="text-slate-600 dark:text-slate-400 text-sm font-semibold">Account information</Text>
          <View>
            <TouchableOpacity className="flex-row gap-2 justify-between items-center py-2 " onPress={() => navigation.navigate('FirstName')}>
              <View className="flex-row gap-2 justify-center items-center">
                <FontAwesome name="user-o" size={20} color={colorScheme === 'light' ? '#64748b' : '#f3f3f3'} />
                <Text className="text font-semibold text-gray-700 dark:text-gray-300">First Name</Text>
              </View>
              <View className="flex-row gap-2 justify-center items-center">
                <Text className=" text-gray-500 dark:text-[#64748b]">{user.user && (user.user.first_name)}</Text>
                <MaterialIcons name="arrow-forward-ios" size={15} color={'#64748b'} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row gap-2 justify-between items-center py-2 " onPress={() => navigation.navigate('LastName')}>
              <View className="flex-row gap-2 justify-center items-center">
                <FontAwesome name="user-o" size={20} color={colorScheme === 'light' ? '#64748b' : '#f3f3f3'} />
                <Text className=" font-semibold text-gray-700 dark:text-gray-300">Last Name</Text>
              </View>
              <View className="flex-row gap-2 justify-center items-center">
                <Text className=" text-gray-500 dark:text-[#64748b]">{user.user && (user.user.last_name)}</Text>
                <MaterialIcons name="arrow-forward-ios" size={15} color={'#64748b'} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row gap-2 justify-between items-center py-2 " onPress={() => navigation.navigate('ChangeUsername')}>
              <View className="flex-row gap-2 justify-center items-center">
                <FontAwesome name="user-o" size={20} color={colorScheme === 'light' ? '#64748b' : '#f3f3f3'} />
                <Text className=" font-semibold text-gray-700 dark:text-gray-300">Username</Text>
              </View>
              <View className="flex-row gap-2 justify-center items-center">
                <Text className=" text-gray-500 dark:text-[#64748b]">{user.user && ('@' + user.user.username)}</Text>
                <MaterialIcons name="arrow-forward-ios" size={15} color={'#64748b'} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row gap-2 justify-between items-center py-2 " onPress={() => navigation.navigate('ChangeEmail')}>
              <View className="flex-row gap-2 justify-center items-center">
                <AntDesign name="mail" size={20} color={colorScheme === 'light' ? '#64748b' : '#f3f3f3'} />
                <Text className=" font-semibold text-gray-700 dark:text-gray-300">Email</Text>
              </View>
              <View className="flex-row gap-2 justify-center items-center">
                <Text className=" text-gray-500 dark:text-[#64748b]">{user.user && (user.user.email.substring(0, 15))}...</Text>
                <MaterialIcons name="arrow-forward-ios" size={15} color={'#64748b'} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row gap-2 justify-between items-center py-2 " onPress={() => navigation.navigate('MobileNumber')}>
              <View className="flex-row gap-2 justify-center items-center">
                <FontAwesome name="mobile-phone" size={28} color={colorScheme === 'light' ? '#64748b' : '#f3f3f3'} />
                <Text className=" font-semibold text-gray-700 dark:text-gray-300">Change mobile</Text>
              </View>
              <View className="flex-row gap-2 justify-center items-center">
                <Text className="  text-gray-500 dark:text-[#64748b]">{user.user && user.user.mobile_number ? (user.user.mobile_number.substring(0, 10)) : 'update...'}</Text>
                <MaterialIcons name="arrow-forward-ios" size={15} color={'#64748b'} />
              </View>
            </TouchableOpacity>
          </View>
          <Text className="text-slate-600 dark:text-slate-400 text-sm font-semibold mt-5">Privacy & Security</Text>

          <View>

            <TouchableOpacity className="flex-row gap-2 justify-between items-center py-2 " onPress={() => navigation.navigate('ChangePassword')}>
              <View className="flex-row gap-2 justify-center items-center">
                <Feather name="lock" size={23} color={colorScheme === 'light' ? '#64748b' : '#f3f3f3'} />
                <Text className=" font-semibold text-gray-700 dark:text-gray-300">Change Password</Text>
              </View>
              <View className="flex-row gap-2 justify-center items-center">
                <Text className="  text-gray-500 dark:text-[#64748b]">******</Text>
                <MaterialIcons name="arrow-forward-ios" size={15} color={'#64748b'} />
              </View>
            </TouchableOpacity>
          </View>

        </View>


        <View className="flex-1 gap-2 flex-row w-full px-5 py-5 justify-center items-center">
          <View className="justify-center items-center w-1/2 h-24 rounded bg-slate-900 hover:bg-[#80011F] dark:bg-slate-900 dark:hover:bg-dark-700">
            <Text className="text-4xl">🌙 </Text>
          </View>
          <View className="justify-center items-center w-1/2 h-24 rounded bg-slate-100 hover:bg-[#80011F]">
            <Text className="text-4xl">🌞 </Text>
          </View>
        </View>

        <Text className="text-slate-600 dark:text-slate-400 text-sm font-semibold mt-1 px-5">Toggle dark/light mode</Text>
        <View className="px-5 mr-auto pb-10">
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? '#019EE3' : '#f4f3f4'}
            _backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{ transform: [{ scaleX: 1.25 }, { scaleY: 1.25 }] }}
          />
        </View>

      </ScrollView>


    </SafeAreaView>
  </>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  token: state.auth.user.jwt,
  theme: state.theme.theme
});

export default connect(mapStateToProps)(Settings);
