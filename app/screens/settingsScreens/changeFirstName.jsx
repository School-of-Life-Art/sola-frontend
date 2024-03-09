import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, {useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import BASE_URL from '../../baseUrl';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../actions/authActions';


const ChangeFirstName = ({ user, token, theme}) => {
  const [firstName, setFirstName] = useState(user.user.first_name)
  const dispatch = useDispatch();

  async function handleSave(){
    try{
      const response = await fetch(`${BASE_URL}/api/v1/users/update`, {
        method: 'PATCH',
        headers: {
          "Content-Type": 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          first_name: firstName
        })
      })

      if(response.ok){
        const data = await response.json()
        // TODO: this is a lazy update to redux. Find a better way!
        dispatch(loginSuccess({
          user: data.user,
          jwt: token
        }))
      }else{
        console.log(response.status)
      }

    }catch(error){
      Alert(error)
      throw new Error("Something unexpected occured",error)
    }

  }
  return (
    <SafeAreaView className="w-full h-full bg-gray-100 dark:bg-gray-900 px-5">
      <View className="pt-16">
        <Text className="text-gray-700 dark:text-gray-200 font-semibold text-lg">Change first name</Text>
        <Text className="text-gray-700 dark:text-gray-300 pt-2">The number of times you can update your names is limited. Edit out of necessity.</Text>
      </View>
      <View className="pt-10 ">
        <TextInput
          placeholder='first name'
          value={firstName}
          onChange={(event) => setFirstName(event.nativeEvent.text)}
          placeholderTextColor={theme ==="light" ? '#333333b2' : '#ffffffb2'}
          className="pl-2 w-full h-12 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-500 rounded-lg"
        />

        <TouchableOpacity className="w-full h-12 bg-lime-100 rounded mt-5 justify-center border border-gray-300" onPress={handleSave}>
          <Text className=" text-center text-lime-600 text-lg font-semibold">Save changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  token: state.auth.user.jwt,
  theme: state.theme.theme
});

export default connect(mapStateToProps)(ChangeFirstName);
