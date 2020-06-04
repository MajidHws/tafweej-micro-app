import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Card } from 'native-base'
import { Colors } from '../utils/Colors'
import { ArText } from '../utils/ArText'

const { width, height } = Dimensions.get('screen')
const PrayerStatus = (props) => {
    return (
        <View style={styles.container}>
            <Card>
                <View style={styles.cardContainer}>
                    <View style={styles.prayerTitleView}>
                        <Text style={styles.prayerTitle}>Prayer</Text>
                    </View>
                    <View style={styles.prayerTimeView}>
                        <Text style={styles.prayerTime}>00:00 AM</Text>
                        <Text style={styles.prayerRemainingTime}>{`${ArText.remain} ${'00:00'}`}</Text>
                    </View>
                </View>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10

    },
    cardContainer: {
        height: height * .19,
        width: width * .43,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: Colors.prayerBox
    },
    prayerTitleView: {
        flex: 1,
        borderBottomColor: Colors.borderColor,
        borderBottomWidth: .5,
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
    },
    prayerTitle: {
        color: Colors.primary,
        fontSize: 25
    },
    prayerTimeView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginHorizontal: 20,
        marginBottom: 10
    },
    prayerTime: {
        color: Colors.secondary
    },
    prayerRemainingTime: {
color: Colors.lightGray
    }

})

export default PrayerStatus