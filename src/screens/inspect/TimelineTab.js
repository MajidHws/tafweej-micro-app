import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import TimeLine from 'react-native-timeline-theme'
import TButton from '../../components/TButton'
import { Colors } from '../../utils/Colors'
import { Card } from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { getMashaerResidence } from '../../settings/URLS'
import axios from 'axios'
const TimelineTab = (props) => {


    const [masher, setMasher] = useState([])
    const [loading, setLoading] = useState(false)
    // const data = [
    //     {
    //         title: 'منى',
    //         description: 'Remember tooth brushing and read notes on the tablet',
    //         time: '',
    //     },
    //     {
    //         title: 'عرفات',
    //         description: 'Eat breakfast: bread and drink milk',
    //         time: '',
    //     },
    //     {
    //         title: 'مزدلفة',
    //         description: 'Go to ABX Company and working react-native',
    //         time: '',
    //     }
    // ]

    const _fetchMahser = async () => {
        try {
            setLoading(true)
            const result = await axios.get(getMashaerResidence)
            //const res = await fetch(URL)
            //const result = await res.json()
            console.log(result.data)
            result.data.forEach((d, i) => {
                d.time = ''
                d.id = i
            })
            setMasher(result.data)
            setLoading(false)
        } catch (e) {
            setLoading(false)
            console.log(e)
        }
    }


    const _saveBatches = async () => {
        try {
            const result = await Axios.method(URL)
            //const res = await fetch(URL)
            //const result = await res.json()
            console.log(result)
        } catch (e) {
            console.log(e)
        }
    }

    const onButtonPress = () => {
        Alert.prompt(
            'عدد الحجاج',
            '',
            [
                {
                    text: "إلغاء",
                    onPress: () => _saveBatches,
                    style: "cancel"
                },
                {
                    text: "حفظ",
                    onPress: () => null
                }
            ],
            "plain-text",
            '',
            'number-pad'
        );
    };



    let counter = 0
    const _timelineItem = (item, i) => {
        counter = i + 1
        return (
            <View key={item.name} style={i % 2 !== 0 ? { alignItems: 'flex-end' } : {}}>
                <TouchableOpacity onPress={() => onButtonPress(item.id)}>
                    <Card style={styles.timelineContentContainer}>
                        <View style={styles.timelineContentView}>
                            <Text style={styles.timelinePoint}>{item.id}</Text>
                        </View>
                    </Card>
                </TouchableOpacity>
            </View>
        )
    }

    const _counterItem = (item) => {
        return (
            <View style={{}}>
                <Text style={[{ fontWeight: '800', fontSize: 20 }, counter % 2 !== 0 ? { textAlign: 'left' } : {}]}>0{counter + 1}</Text>
            </View>
        )
    }
    const _content = () => {
        return (
            <>
                <TimeLine
                    timeContainerStyle={{}}
                    showAmPm={false}
                    circleColor={Colors.primary}
                    lineWidth={0.50}
                    contentContainerStyle={{ marginTop: 40 }}
                    timeFormat="hh"
                    data={masher}
                    //isRenderSeparator
                    columnFormat={'two-column'}
                    renderDetail={(item, i) => _timelineItem(item, i)}
                    renderTimeBottom={(item) => _counterItem(item)}
                />

                {/* <View style={styles.saveBtnView}>
                    <TButton title={'حفظ'} />
                </View> */}
            </>
        )
    }

    useEffect(() => {
        _fetchMahser()
        return () => {

        }
    }, [])
    return (
        <>
            {loading ? (<ActivityIndicator />) : _content()}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    saveBtnView: {
        margin: 15
    },
    timelineContentContainer: {
        // justifyContent: 'center',
        height: 45,
        width: 80,
        //backgroundColor: 'red',
        marginVertical: 10,
        backgroundColor: Colors.prayerBox,
        flex: 1,
        marginTop: 50
    },
    timelineContentView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,

    },
    timelinePoint: {
        color: Colors.primary
    }
})

export default TimelineTab