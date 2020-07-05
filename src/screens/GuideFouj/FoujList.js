import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'

import TimeLine from 'react-native-timeline-theme'
import { Colors } from '../../utils/Colors'
import Card from '../../components/Card'
import Batch from '../../components/Btach'
import FoujCard from '../../components/FoujCard'
import { ArText } from '../../utils/ArText'

const FoujList = (props) => {

    const data = props.data

    return (
        <>
            <View style={styles.guidesListView}>
                <Text style={styles.guidesListTitle}>{props.title || 'NONE'}</Text>
                <TouchableOpacity>
                    {/* <Text style={styles.showAll}>{ArText.showAll}</Text> */}
                </TouchableOpacity>
            </View>
            <FlatList
                //horizontal
                numColumns={3}
                contentContainerStyle={styles.flatListStyle}
                data={data}
                keyExtractor={(item, i) => String(item)}
                renderItem={({ item }, i) => <FoujCard batch={item} goToFoujDetails={props.goToFoujDetails} />}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    flatListStyle: {
        paddingHorizontal: 20,
        paddingTop: 5
    },
    guidesListView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingVertical: 10
    },
    guidesListTitle: {
        fontSize: 15
    },
    showAll: {
        color: Colors.secondary
    },
})

export default FoujList