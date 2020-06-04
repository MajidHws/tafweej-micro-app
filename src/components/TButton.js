import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { Colors } from '../utils/Colors'

const TButton = (props) => {

    const {title, action} = props

    return (
        <TouchableOpacity onPress={action} activeOpacity={.3} style={styles.container}>
            <Text style={styles.titleStyle}>{title}</Text>
        </TouchableOpacity>
     )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 5,
        paddingVertical: 15
    },
    titleStyle: {
        color: 'white'
    }
})

export default TButton