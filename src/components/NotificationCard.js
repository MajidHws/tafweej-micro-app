import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors } from '../utils/Colors'

const NotificationCard = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <Text style={styles.text}>NotificationCard</Text>
                <Text style={styles.date}>Date</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.notificationCardBg,
        marginBottom: 2
    },
    body: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: 'red'
        padding: 5,
        paddingVertical: 10,
        alignItems: 'center'
    },
    text: {
        color: Colors.darkPrimary,
        fontSize: 13
    },
    date: {
        color: Colors.darkPrimary,
        fontSize: 10
    }
})

export default NotificationCard