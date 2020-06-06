import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Card = (props) => {
    const { height, marginBottom, style, width } = props
    return (
        <View style={[
            styles.remainingTimeView,
            styles.shadow,
            { height: height || 80, marginBottom: marginBottom || 15 },
            style, width
        ]}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    remainingTimeView: {
        backgroundColor: '#fff',
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    shadow: {
        backgroundColor: 'white',
        borderRadius: 2,

        shadowColor: '#d7d7d7',
        shadowOffset: {},
        shadowOpacity: .9,
        shadowRadius: 5,

        marginBottom: 5,
    }
})

export default Card