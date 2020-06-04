import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

import TimeLine from 'react-native-timeline-theme'
import { Colors } from '../../utils/Colors'
import Card from '../../components/Card'
import Batch from '../../components/Btach'

const FoujList = (props) => {

    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

    return (
        <>
            <FlatList
                contentContainerStyle={styles.flatListStyle}
                data={data}
                keyExtractor={(item, i) => String(item)}
                renderItem={({item}, i) => <Batch batch={item} length={data.length} i={i} />}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    flatListStyle: {
        padding: 30
    }
})

export default FoujList