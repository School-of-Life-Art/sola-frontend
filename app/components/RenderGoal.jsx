import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'


const RenderGoal = ({ item }) => {
    return (
        <View
            style={{
                elevation: 3,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                marginRight: 10,
                marginTop: 17,
            }} className={`bg-slate-100 dark:bg-slate-900 flex flex-row justify-between items-center rounded-xl py-4   px-2 border-l-4 border-green-300`}>
            <View className="px-4">
                <Text className="text-xs  uppercase text-slate-700 dark:text-slate-100">Goal</Text>
                <Text className="text-lg text-slate-00 dark:text-slate-100 ">{item.name}</Text>
                <Text className="text-xs font-light text-slate-700 dark:text-slate-100 ">{item.start_time}-{item.end_date}</Text>
            </View>
            <TouchableOpacity className="">
                <Icon name="bell" size={24} color="coral" />
            </TouchableOpacity>
        </View>
    );
};

const MemoizedRenderItem = memo(RenderGoal);

const renderItem = ({ item }) => {
    return <MemoizedRenderItem item={item} />;
};

export default renderItem;