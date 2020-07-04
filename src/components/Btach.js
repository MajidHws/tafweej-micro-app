import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors } from '../utils/Colors'

const Batch = (props) => {

    const { length, i, batch } = props
    console.log('---batch info', batch)
    return (
        <View style={[styles.container, length !== batch ? { borderLeftColor: Colors.borderColor, borderLeftWidth: .5 } : {}]}>
            <View style={styles.foujStatusView}>
                <View style={batch.dispatching_time && !batch.return_to_camp ? styles.foujStatus_out : styles.foujStatus} />
            </View>
            <View style={styles.foujNumberView}>
                <Text style={styles.foujNumber}>{batch.batche_id}</Text>
            </View>
            <View style={styles.foujGuideNameView}>
                <Text style={styles.foujGuideName}></Text>
            </View>
            <View style={styles.foujTimeView}>
                <Text style={styles.foujTime}></Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        //backgroundColor: 'red'
        // borderLeftColor: Colors.borderColor,
        // borderLeftWidth: .5,
        height: 35
    },
    foujStatusView: {
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    foujStatus: {
        backgroundColor: Colors.secondary,
        height: 10,
        width: 10,
        borderRadius: 5,
        // justifyContent: 'center',
        // alignItems: 'center',
        left: -5
    },
    foujStatus_out: {
        backgroundColor: 'green',
        height: 10,
        width: 10,
        borderRadius: 5,
        // justifyContent: 'center',
        // alignItems: 'center',
        left: -5
    },
    foujNumberView: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: 'red'
    },
    foujNumber: {
        color: Colors.primary,
        textAlign: 'left',
        marginHorizontal: 10,
        top: -5,
        fontSize: 15
    },
    foujGuideNameView: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    foujGuideName: {
        color: Colors.primary,
        top: -5
    },
    foujTimeView: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    foujTime: {
        color: Colors.primary,
        textAlign: 'right',
        top: -5
    }
})

export default Batch