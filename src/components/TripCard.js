import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { Colors } from '../utils/Colors'
import { CheckBox } from 'native-base'

const TripCard = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.contentView}>
                <Text style={styles.contentText}>TRIP TITLE</Text>
                <CheckBox color={Colors.primary} checked style={{ justifyContent: 'center', alignItems: 'center' }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentView: {
        backgroundColor: Colors.notificationCardBg,
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15
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