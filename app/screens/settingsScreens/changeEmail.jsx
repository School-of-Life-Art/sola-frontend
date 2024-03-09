import React, { useEffect, useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import BASE_URL from '../../baseUrl';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../actions/authActions';
import { useToast } from 'react-native-toast-notifications';
import { useNavigation } from 'expo-router';

const ChangeEmail = ({ user, token, theme}) => {
    const [email, setEmail] = useState(user.user.email)
    const navigation = useNavigation()
    const toast = useToast()
    const dispatch = useDispatch();
    async function handleSave() {
        try {
            const response = await fetch(`${BASE_URL}/api/v1/users/update`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ email })
            })

            if (response.ok) {
                const data = await response.json()
                // TODO: this is a lazy update to redux. Find a better way!
                dispatch(loginSuccess({
                    user: data.user,
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
                navigation.navigate('Settings')
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
    return (
        <SafeAreaView className="w-full h-full bg-gray-100 dark:bg-gray-900 px-5">
            <View className="pt-16">
                <Text className="text-gray-700 dark:text-gray-200 font-semibold text-lg">Change your email</Text>
                <Text className="text-gray-700 dark:text-gray-300 pt-2">The number of times you can update your email is limited. Edit out of necessity.</Text>
            </View>
            <View className="pt-10 ">
                <TextInput
                    placeholder='email'
                    placeholderTextColor={theme === 'light' ? '#333333b2' : '#ffffffb2'}
                    value={email}
                    onChange={(event) => setEmail(event.nativeEvent.text)}
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
  
export default connect(mapStateToProps)(ChangeEmail);
