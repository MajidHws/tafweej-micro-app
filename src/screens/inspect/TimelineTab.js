import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import TimeLine from 'react-native-timeline-theme'
import TButton from '../../components/TButton'
import ArText from '../../utils/ArText'
import { Colors } from '../../utils/Colors'
import { Card } from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler'
const TimelineTab = (props) => {

    const data = [
        {
            title: 'منى',
            description: 'Remember tooth brushing and read notes on the tablet',
            time: '',
        },
        {
            title: 'عرفات',
            description: 'Eat breakfast: bread and drink milk',
            time: '',
        },
        {
            title: 'مزدلفة',
            description: 'Go to ABX Company and working react-native',
            time: '',
        }
    ]


    let counter = 0
    const _timelineItem = (item, i) => {
        counter = i + 1
        return (
            <View style={i % 2 !== 0 ? { alignItems: 'flex-end' } : {}}>
                <TouchableOpacity onPress={() => alert('DONE')}>
                    <Card style={styles.timelineContentContainer}>
                        <View style={styles.timelineContentView}>
                            <Text style={styles.timelinePoint}>{item.title}</Text>
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
                    data={data}
                    //isRenderSeperator
                    columnFormat={'two-column'}
                    renderDetail={(item, i) => _timelineItem(item, i)}
                    renderTimeBottom={(item) => _counterItem(item)}
                />

                <View style={styles.saveBtnView}>
                    <TButton title={'حفظ'} />
                </View>
            </>
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