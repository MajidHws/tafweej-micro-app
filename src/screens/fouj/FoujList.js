import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, SectionList } from 'react-native'

import TimeLine from 'react-native-timeline-theme'
import { Colors } from '../../utils/Colors'
import Card from '../../components/Card'
import Batch from '../../components/Btach'

const FoujList = (props) => {

    const data = props.data


    console.log(props.data);

    const batches = []

    for (let i in data) {
        if (data[i].data) {
            batches.push(...data[i].data)
        }
    }

    return (
        <>

            <FlatList
                contentContainerStyle={styles.flatListStyle}
                data={batches}
                keyExtractor={(item, i) => String(i)}
                renderItem={({ item }) => <Batch batch={item} length={9} />}
            />


            {/* <SectionList
                contentContainerStyle={styles.flatListStyle}
                keyExtractor={(item, i) => String(i)}
                sections={data}
                renderItem={({ item }, i) => <Batch batch={item} />}
                renderSectionHeader={({ section }) => (<View style={styles.listHeadingView}>
                    <Text style={styles.listHeading}>{`اليوم: ${section.title}`}</Text>
                </View>)}
            /> */}

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    flatListStyle: {
        padding: 30
    },
    listHeadingView: {
        alignItems: 'flex-start',
        paddingVertical: 10,
        backgroundColor: '#eee',
        padding: 5,
        borderRadius: 10,
        marginTop: 15
    },
    listHeading: {
        color: Colors.darkPrimary,
    }
})

export default FoujList