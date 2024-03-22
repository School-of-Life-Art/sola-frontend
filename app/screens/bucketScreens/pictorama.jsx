import { MotiImage, AnimatePresence, Text } from 'moti';
import React, { useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { wrap } from 'popmotion';

export default function Pictorama({ route }) {
    const { width } = useWindowDimensions();
    const [[index, direction], setState] = useState([0, 0]);
    const { buckets } = route.params;

    const photos = buckets.map(item => item.snapshot).filter(Boolean);
    console.log(photos, 'mapicha')

    const paginate = (direction) => () => {
        setState(([index]) => {
            return [index + direction, direction];
        });
    };

    const url = photos[wrap(0, photos.length, index)];

    return (
        <View style={styles.container}>
            <AnimatePresence initial={false} custom={direction}>
                <MotiImage
                    from={{
                        opacity: 0,
                        translateX: direction * width,
                    }}
                    animate={{
                        opacity: 1,
                        translateX: 0,
                        zIndex: 1,
                    }}
                    exit={(custom) => {
                        'worklet';
                        return {
                            opacity: 0,
                            translateX: custom * width * -1,
                            zIndex: 0,
                        };
                    }}
                    style={[styles.image, { width }]}
                    key={index}
                    source={{ uri: url }}
                    transition={{
                        translateX: { type: 'spring', stiffness: 300, damping: 30 },
                        opacity: { duration: 200, type: 'timing' },
                    }}
                />
            </AnimatePresence>
            <View style={styles.actions}>
                <View className="justify-center items-center" style={styles.button} >
                    <Text className="text-3xl text-slate-900" selectable={false} onPress={paginate(-1)}>
                        {'<'}
                    </Text>
                </View>
                <View className="justify-center items-center" style={styles.button}>
                    <Text className="text-3xl text-slate-900" selectable={false} onPress={paginate(1)}>
                        {'>'}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#0D1117',
    },
    padded: {
        padding: 16,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        alignSelf: 'center',
    },
    actions: {
        flexDirection: 'row',
        margin: 16,
        justifyContent: 'space-between',
        zIndex: 1,
    },
    button: {
        fontSize: 42,
        backgroundColor: 'white',
        height: 40,
        width: 40,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        lineHeight: 75,
    },
    action: {},
});
