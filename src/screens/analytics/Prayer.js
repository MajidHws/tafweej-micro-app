import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, FlatList} from 'react-native'

import PrayerStatus from '../../components/PrayerStatus'
const Prayer = (props) => {
    return (
        <View style={styles.container}>
            <FlatList 
            keyExtractor={(item, i) => String(i)}
            contentContainerStyle={{paddingHorizontal: 20, paddingTop: 10}}
            numColumns={2}
            data={[1, 2, 3, 4, 5, 6]}
                renderItem={() => <PrayerStatus />}
            />
        </View>
     )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
})

export default Prayer