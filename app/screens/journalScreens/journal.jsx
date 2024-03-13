import { View, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { connect } from 'react-redux';
import { useNavigation } from 'expo-router';


const Journal = ({ theme }) => {
    const navigation = useNavigation()
    return (
        <SafeAreaView>
            <StatusBar style="light" backgroundColor="#007AFF" />
            <View className="w-full h-full px-5 py-10 bg-slate-100 dark:bg-slate-900">

                <View className="w-full flex flex-row justify-between items-center">
                    <Text className="text-slate-900 dark:text-slate-100 text-lg">Journal</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('AddJournalEntry')}>
                        <Text className="">
                            <FontAwesome6 name="plus" size={22} color={`${theme === 'dark' ? '#ffffffb2' : '#333333b2'}`} />
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    theme: state.theme.theme
});

export default connect(mapStateToProps)(Journal);