import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, TouchableWithoutFeedback, Alert } from 'react-native'

import { Colors } from '../utils/Colors'
import { CheckBox } from 'native-base'
import Axios from 'axios'

const TripCard = (props) => {
    const { showTime } = props

    const [item, setItem] = useState(props.item)
    const [loading, setLoading] = useState(false)
    const _updateTrip = async () => {

        if (showTime) return
        // if(item.time === true) return Alert.alert('تنيه', 'لا يمكن تحديث الوقت مرتين')

        try {
            setLoading(true)

            var d = new Date();
            var h = d.getHours();
            var m = d.getMinutes();

            // console.log(`http://dev.hajjtafweej.net/api/batche-timeline?id=${item.id}&${item.name}=${new Date().getTime()}`);
            console.log(`http://tafweej-app.hajjtafweej.net/api/store-following-up-batch?id=${item.id}&${item.name}=${new Date().getTime()}`);

            const result = await Axios.post(`http://tafweej-app.hajjtafweej.net/api/store-following-up-batch?id=${item.id}&${item.name}=${h + ':' + m}`)
            // const result = await Axios.post(`http://dev.hajjtafweej.net/api/batche-timeline?id=${trip.id}&${item.name}=${new Date().getTime()}`)

            setItem(() => ({
                ...item,
                time: true
            }))

            setLoading(false)
        } catch (e) {
            setLoading(false)
            console.log(e);

        }
    }

    const _content = () => {
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={_updateTrip}>

                    <View style={styles.contentView}>
                        <Text style={styles.contentText}>{item.title}</Text>
                        {
                            showTime
                                ? (
                                    <Text style={{
                                        color: Colors.secondary,
                                        fontWeight: 'bold'
                                    }}>{item.time}</Text>
                                )
                                : (
                                    loading ? (<ActivityIndicator />) : (
                                        <CheckBox color={Colors.primary}
                                            checked={item.time !== null}
                                            onPress={_updateTrip}
                                            style={{ justifyContent: 'center', alignItems: 'center' }} />
                                    )
                                )
                        }

                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
    return (
        <>
            {_content()}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginHorizontal: 10
    },
    contentView: {
        backgroundColor: Colors.notificationCardBg,
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15,
        // borderRadius: 10
        // alignItems: 'center'
    },
    textView: {
        justifyContent: 'center',
        // alignItems: 'center'
    },
    contentText: {
        color: Colors.darkPrimary
    }
})

export default TripCard