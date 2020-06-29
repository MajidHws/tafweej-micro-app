import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

import TimeLine from 'react-native-timeline-theme'
import { Colors } from '../../utils/Colors'
import Card from '../../components/Card'
import Batch from '../../components/Btach'

const FoujList = (props) => {

    const data = props.data

    return (
        <>
            <FlatList
                contentContainerStyle={styles.flatListStyle}
                data={props.data}
                keyExtractor={(item, i) => String(i)}
                renderItem={({item}) => <Batch batch={item} length={data.length} />}
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