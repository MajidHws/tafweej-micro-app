import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Card } from 'native-base'
import { ArText } from '../utils/ArText'

const WeatherCard = (props) => {
    return (
        <View style={styles.container}>
            <Card style={{ margin: 0 }}>
                <View style={styles.content}>
                    <View style={styles.infoView}>
                        <Text style={styles.infoTitle}>{ArText.hour}</Text>
                        <Text style={styles.infoStat}>11:00 am</Text>
                    </View>
                    <View style={styles.infoView}>
                        <Text style={styles.infoTitle}>{ArText.tempDegree}</Text>
                        <Text style={styles.infoStat}>22</Text>
                    </View>
                    <View style={styles.infoView}>
                        <Text style={styles.infoTitle}>{ArText.status}</Text>
                        <Text style={styles.infoStat}>غائم</Text>
                    </View>
                </View>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    infoView: {
justifyContent: 'center',
alignItems: 'center'
    },
    infoTitle: {
        color: 'rgb(217, 154, 87)',
        fontSize: 12
    }
})

export default WeatherCard