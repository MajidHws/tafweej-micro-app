import React, { useState, useEffect } from 'react'
import {
    View, Text, StyleSheet, ActivityIndicator,
    TouchableWithoutFeedback, Alert, AsyncStorage, TouchableOpacity
} from 'react-native'

import { Colors } from '../utils/Colors'
import { CheckBox } from 'native-base'
import Axios from 'axios'
import moment from 'moment-hijri'
import { isAfter } from 'date-fns'

const TripCard = (props) => {
    const { showTime } = props
    const hide = [10, 11, 12, 13]

    const [item, setItem] = useState(props.item)
    const [loading, setLoading] = useState(false)
    // if (hide.includes(item.id)) return console.log(hide.includes(item.id), item.id)


    // const actionsList = [
    //     {actions: [
    //         { "id": 1, "name": "إتمام انزال", },
    //         { "id": 2, "name": "بداية انزال", },
    //     ]},
    //     {actions: [
    //         { "id": 1, "name": "إتمام انزال", },
    //         { "id": 2, "name": "بداية انزال", },
    //     ]}
    // ]
    // let arrivalActions = (item.title.includes('الجمرات')) ? []
    //     : [
    //         { "id": 1, "name": "إتمام انزال", },
    //         { "id": 2, "name": "بداية انزال", },
    //     ]


    // let dispatchActions = (item.title.includes('الجمرات')) ? [] :
    //     [
    //         { "id": 1, "name": "إتمام اركاب", },
    //         { "id": 2, "name": "بداية اركاب", },
    //     ]


    console.log(props.arrivalAction);
    console.log(props.dispatchAction);
    
    const [dispatchActions, setDispatchActions] = useState(props.dispatchAction || [])
    const [arrivalActions, setArrivalActions] = useState(props.arrivalAction || [])


    // const [arrivalActions, setArrivalActions] = useState(() => {
    //     // if (item.title.includes('الجمرات')) return []
    //     return [
    //         { "id": 1, "name": "إتمام انزال", },
    //         { "id": 2, "name": "بداية انزال", },
    //     ]
    // })

    // const [dispatchActions, setDispatchActions] = useState(() => {
    //     // if (item.title.includes('الجمرات')) return []
    //     return [
    //         { "id": 1, "name": "إتمام اركاب", },
    //         { "id": 2, "name": "بداية اركاب", },
    //     ]
    // })

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
        if (!item.start_at) return alert('TIME ERROR')
        _uploadData()
        var d = new Date();
        var h = d.getHours();
        var m = d.getMinutes();
        var day = d.getDate()
        var month = d.getMonth() + 1
        var year = d.getFullYear()
        console.log(`http://api.aladhan.com/v1/gToH?date=${day}-${m}-${year} START`)
        // const { data } = await Axios.get(`http://api.aladhan.com/v1/gToH?date=${day}-${m}-${year}`)
        console.log(`http://api.aladhan.com/v1/gToH?date=${day}-${m}-${year} END`)
        // console.log('data', data)
        var convertedDate = moment(`1441/12/${item.day}`, 'iYYYY/iM/iD').format('YYYY-M-D').split('-'); // 2014-11-28 16:40:00
        console.log(convertedDate);
        console.log(year, month, day);
        // if (day !== convertedDate[2]) return alert(`هذه المرحلة ليوم ${item.day}`)

        const itemTime = item.start_at.trim().split(':')
        // var isInRage = isAfter(
        //     new Date(year, month, day, h, m),
        //     new Date(convertedDate[0], convertedDate[1], item.day, itemTime[0], itemTime[1]),
        // )

        // console.log(isInRage)
        // if (!isInRage) return alert(`هذه المرحلة ليوم ${item.day} تبدأ ${item.start_at}`)

        if (month < Number(convertedDate[1])) {
            console.log('--month', month);
            return alert(`هذه المرحلة ليوم ${item.day} تبدأ ${item.start_at}`)
        } else if (month === Number(convertedDate[1])) {
            console.log('same');

            if (day < Number(convertedDate[2])) {
                return alert(`هذه المرحلة ليوم ${item.day} تبدأ ${item.start_at}`)
            }
        }

        // if(!item.time) return alert('')
        if (item.time === true || item.time) return Alert.alert('تنيه', 'لا يمكن تحديث الوقت مرتين')

        try {
            setLoading(true)

            // console.log(`http://dev.hajjtafweej.net/api/batche-timeline?id=${item.id}&${item.name}=${new Date().getTime()}`);
            // console.log(`http://tafweej-app.hajjtafweej.net/api/store-following-up-batch?id=${item.id}&${item.name}=${new Date().getTime()}`);
            const userInfo = await AsyncStorage.getItem('userInfo')
            const userInfoJson = JSON.parse(userInfo)
            const result = await Axios
                .post(`http://tafweej-app.hajjtafweej.net/api/store-following-up-batch?id=${item.id}&${item.name}=${h + ':' + m}&user_id=${userInfoJson.id}`)
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
                                                checked={item.userTime !== null}
                                                onPress={_updateTrip}
                                                style={{ justifyContent: 'center', alignItems: 'center' }} />

                                                <View style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                marginHorizontal: 15
                                            }}>
                                            <Text style={{
                                                    color: Colors.secondary,
                                                    fontWeight: 'bold'
                                                }}>{item.userTime ? item.userTime : "--:--"}</Text>
                                                <Text style={{
                                                    color: Colors.secondary,
                                                    fontWeight: 'bold',
                                                    marginHorizontal: 5
                                                }}>{item.time ? item.time : '--:--'}</Text>
                                                
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

    // const _fetchDispatch = async () => {
    //     try {
    //         const result = await Axios.get('http://tafweej-app.hajjtafweej.net/api/dispatch-actions')
    //         console.log(result.data)
    //         setDispatchActions(() => result.data.dispatch_actions)
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    // const _fetchArrival = async () => {
    //     try {
    //         const result = await Axios.get('http://tafweej-app.hajjtafweej.net/api/arrival-actions')
    //         console.log(result.data)
    //         setArrivalActions(() => result.data.arrival_actions)
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }



    // const _dispatchSteps = async () => {
    //     return (<><Text>Dispatch</Text></>)
    // }

    const _arrivalSteps = (arrivalActions) => {


        const actions = arrivalActions.map((action, i) => <TouchableOpacity key={i} onPress={() => _updateArrivalAction('arrival', action.id)} style={{ backgroundColor: Colors.secondary, padding: 15, borderRadius: 10, width: 120, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>{action.name}</Text>
        </TouchableOpacity>)
        return (<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', margin: 20 }}>{actions}</View>)
    }

    useEffect(() => {
        // _fetchDispatch()
        // _fetchArrival()
    }, [])

    const _updateArrivalAction = async (type, id) => {

        // var d = new Date();
        // var h = d.getHours();
        // var m = d.getMinutes();
        // var day = d.getDate()
        // var year = d.getFullYear()

        var d = new Date();
        var h = d.getHours();
        var m = d.getMinutes();
        var day = d.getDate()
        var month = d.getMonth() + 1
        var year = d.getFullYear()
        console.log(`http://api.aladhan.com/v1/gToH?date=${day}-${m}-${year} START`)
        // const { data } = await Axios.get(`http://api.aladhan.com/v1/gToH?date=${day}-${m}-${year}`)
        console.log(`http://api.aladhan.com/v1/gToH?date=${day}-${m}-${year} END`)
        // console.log('data', data)
        var convertedDate = moment(`1441/12/${item.day}`, 'iYYYY/iM/iD').format('YYYY-M-D').split('-'); // 2014-11-28 16:40:00
        console.log(convertedDate);
        console.log(year, month, day);


        if (month < Number(convertedDate[1])) {
            console.log('--month', month);
            return alert(`هذه المرحلة ليوم ${item.day} تبدأ ${item.start_at}`)
        } else if (month === Number(convertedDate[1])) {
            console.log('same');

            if (day < Number(convertedDate[2])) {
                return alert(`هذه المرحلة ليوم ${item.day} تبدأ ${item.start_at}`)
            }
        }

        const userInfo = await AsyncStorage.getItem('userInfo')
        const userInfoJson = JSON.parse(userInfo)

        const params = `?user_id=${userInfoJson.id}&batch_id=${item.id}&action_id=${id}&action_type=${type}&action_time=${h}:${m}`

        const url = 'http://tafweej-app.hajjtafweej.net/api/store-dispatch-or-arrival-action' + params

        try {
            const result = await Axios.post(url)
            console.log(result)
            alert('تم الحفظ')
        } catch (e) {
            alert('لم يتم الحفظ')
            console.log(e);

        }
    }

    return (
        <>
            {
                item.name === 'dispatch_time' ? (

                    !showTime ? (
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', margin: 20, direction: 'rtl' }}>
                            {!showTime && (
                                dispatchActions.length > 0 ?
                                    dispatchActions.map((action, i) => <TouchableOpacity key={i} onPress={() => _updateArrivalAction('dispatch', action.id)} style={{ backgroundColor: Colors.secondary, padding: 15, borderRadius: 10, width: 120, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>{action.name}</Text>
                                    </TouchableOpacity>)
                                    : null
                            )}
                        </View>
                    ) : null

                ) : null
            }
            {_content()}
            {
                item.name === 'arrival_time' ? (
                    <View>
                        {!showTime && (arrivalActions.length > 0 ? (_arrivalSteps(arrivalActions)) : null)}
                    </View>
                ) : null
            }
            {/* {_content()}
            {_content()} */}
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
        backgroundColor: '#eee',
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15,
        //borderRadius: 10
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