import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Colors } from '../utils/Colors'
import Card from './Card'
import { ArText } from '../utils/ArText'

const FoujCard = (props) => {
    const {assignBatch, setAssignBatch, deleteGuide, setDeleteGuide, goToFoujDetails, batch} = props
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => goToFoujDetails(batch.id, batch.batche_id)}>

            <Card height={60} style={styles.cardStyle}>
                <View style={styles.content}>
                    <Text style={styles.guideName}>{batch.batche_id}</Text>
                    <Text style={styles.foujNum}>----</Text>
                </View>
                <View style={styles.actionView}>
                    <View onPress={() => setDeleteGuide(true)}>
                        
                    </View>
                    {/* <TouchableOpacity onPress={() => setAssignBatch(true)}> */}
                        <Text style={styles.actionAssign}>{'لم يتم التفويج'}</Text>
                    {/* </TouchableOpacity> */}
                </View>
            </Card>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 5,
    },
    content: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardStyle: {
        backgroundColor: Colors.prayerBox,
        width: 100
    },
    guideName: {
        fontSize: 10
    },
    foujNum: {
        fontSize: 13,
        color: 'gray'
    },
    actionView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: 'red',
        width: '100%',
        paddingHorizontal: 10,
        paddingBottom: 3
    },
    actionAssign: {
color: Colors.secondary,
        fontSize: 10,
    },
    actionDelete: {
fontSize: 15,
color: 'gray'
    }
})

export default FoujCard