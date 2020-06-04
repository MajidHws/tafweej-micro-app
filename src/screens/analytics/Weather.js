import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet} from 'react-native'

const Weather = (props) => {
    return (
        <View style={styles.container}>
            <Text>Weather</Text>
        </View>
     )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Weather