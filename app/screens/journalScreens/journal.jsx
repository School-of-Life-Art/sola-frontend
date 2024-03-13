import { View, Text, SafeAreaView , StatusBar} from 'react-native'
import React from 'react'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { connect } from 'react-redux';


const Journal = () => {
    return (
        <SafeAreaView>
            <StatusBar style="light" backgroundColor="#007AFF" />
            <View className="w-full h-full px-5 py-10 bg-slate-100 dark:bg-slate-900">
                
                <View className="w-full justify-between">
                    <Text className="text-slate-900 dark:text-slate-100 text-lg">Journal</Text>
                    <Text className="">
                        <FontAwesome6 name="xmark" size={18} color={`${theme === 'dark' ? '#ffffffb2' : '#333333b2'}`} />
                    </Text>
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