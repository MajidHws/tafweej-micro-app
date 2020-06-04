import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors } from '../utils/Colors'

const Batch = (props) => {

    const { length, i, batch } = props
    // alert(batch)
    return (
        <View style={[styles.container, length !== batch ? { borderLeftColor: Colors.borderColor, borderLeftWidth: .5 } : {}]}>
            <View style={styles.foujStatusView}>
                <View style={styles.foujStatus} />
            </View>
            <View style={styles.foujNumberView}>
                <Text style={styles.foujNumber}>Batch</Text>
            </View>
            <View style={styles.foujGuideNameView}>
                <Text style={styles.foujGuideName}>Batch</Text>
            </View>
            <View style={styles.foujTimeView}>
                <Text style={styles.foujTime}>Batch</Text>
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
        top: -5
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