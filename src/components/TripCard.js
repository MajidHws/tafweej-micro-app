import React, { useState, useEffect } from 'react'
import {
    View, Text, StyleSheet, ActivityIndicator,
    TouchableWithoutFeedback, Alert, AsyncStorage
} from 'react-native'

import { Colors } from '../utils/Colors'
import { CheckBox } from 'native-base'
import Axios from 'axios'
import moment from 'moment-hijri'
import { isAfter } from 'date-fns'

const TripCard = (props) => {
    const { showTime } = props

    const [item, setItem] = useState(props.item)
    const [loading, setLoading] = useState(false)

    const _saveOffline = async (id, name, hour, minute) => {
        try {

            const newTime = { id, name, hour, minute }
            const data = await AsyncStorage.getItem('localData')
            // check if we have local data first
            if (data) {
                // if we do get if and convert it to json
                const jsonData = JSON.parse(data)
                jsonData.push(newTime)
                const stringData = JSON.stringify(data)
                await AsyncStorage.setItem('localData', stringData)
                setItem(() => ({
                    ...item,
                    time: true
                }))
                return
            } else {
                // else convert data to stringify and save new data
                const data = JSON.stringify([newTime])
                await AsyncStorage.setItem('localData', data)
                return
            }
        } catch (e) {
            console.log(e)
            return
        }
    }
    const _uploadData = async () => {
        try {
            const data = await AsyncStorage.getItem('localData')
            if (data) {
                const jsonData = JSON.parse(data)
                const promises = data.map(d => Axios.post(`http://tafweej-app.hajjtafweej.net/api/store-following-up-batch?id=${d.id}&${d.name}=${d.hour + ':' + d.minute}`))
                await Promise.all(promises)
                AsyncStorage.removeItem('localData')
            }
        } catch (e) {
            console.log(e)
            return
        }
    }
    const _updateTrip = async () => {
        console.log('item', item);

        if (showTime) return
        _uploadData()
        var d = new Date();
        var h = d.getHours();
        var m = d.getMinutes();
        var day = d.getDate()
        var year = d.getFullYear()
        const { data } = await Axios.get(`http://api.aladhan.com/v1/gToH?date=${day}-${m}-${year}`)
        console.log('data', data)
        var convertedDate = moment(`${data.data.hijri.year}/${data.data.hijri.month.number}/${item.day}`, 'iYYYY/iM/iD').format('YYYY-M-D').split('-'); // 2014-11-28 16:40:00

        // if (day !== convertedDate[2]) return alert(`هذه المرحلة ليوم ${item.day}`)
        if (!item.start_at) return alert('TIME ERROR')
        const itemTime = item.start_at.trim().split(':')
        var isInRage = isAfter(new Date(convertedDate[0], convertedDate[1], item.day, itemTime[0], itemTime[1]), new Date(convertedDate[0], convertedDate[1], convertedDate[2], h, m))
        // return console.log(`${isInRage} ${item.day} today: ${data.data.hijri.day}`)
        if (!isInRage) return alert(`هذه المرحلة ليوم ${item.day} تبدأ ${item.start_at}`)

        // if(!item.time) return alert('')
        if (item.time === true || item.time) return Alert.alert('تنيه', 'لا يمكن تحديث الوقت مرتين')



        try {
            setLoading(true)

            // console.log(`http://dev.hajjtafweej.net/api/batche-timeline?id=${item.id}&${item.name}=${new Date().getTime()}`);
            // console.log(`http://tafweej-app.hajjtafweej.net/api/store-following-up-batch?id=${item.id}&${item.name}=${new Date().getTime()}`);

            const result = await Axios.post(`http://tafweej-app.hajjtafweej.net/api/store-following-up-batch?id=${item.id}&${item.name}=${h + ':' + m}`)
            // const result = await Axios.post(`http://dev.hajjtafweej.net/api/batche-timeline?id=${trip.id}&${item.name}=${new Date().getTime()}`)

            setItem(() => ({
                ...item,
                time: true,
                user_dispatch_time: `${h + ':' + m}`
            }))

            setLoading(false)
        } catch (e) {
            _saveOffline(item.id, item.name, h, m)
            setLoading(false)
            console.log(e);

        }
    }

    const _content = () => {
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={_updateTrip}>

                    <View style={styles.contentView}>

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
                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row'
                                        }}>

                                            <CheckBox color={Colors.primary}
                                                checked={item.time !== null}
                                                onPress={_updateTrip}
                                                style={{ justifyContent: 'center', alignItems: 'center' }} />

                                            <View style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                marginHorizontal: 30
                                            }}>
                                                <Text style={{
                                                    color: Colors.secondary,
                                                    fontWeight: 'bold',
                                                    marginHorizontal: 10
                                                }}>{item.user_dispatch_time ? item.user_dispatch_time : '--:--'}</Text>
                                                <Text style={{
                                                    color: Colors.secondary,
                                                    fontWeight: 'bold'
                                                }}>{item.dispatch_time ? item.dispatch_time : item.arrival_time}</Text>
                                            </View>

                                        </View>
                                    )
                                )
                        }
                        <Text style={styles.contentText}>{item.title}</Text>

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
        // direction: 'rtl'
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