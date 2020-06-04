import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Colors } from '../utils/Colors'
import Card from './Card'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ArText } from '../utils/ArText'

const GuideCard = (props) => {
    const {assignBatch, setAssignBatch, deleteGuide, setDeleteGuide} = props
    return (
        <View style={styles.container}>
            <Card height={120} style={styles.cardStyle}>
                <View style={styles.content}>
                    <Image height={20} width={20} source={require('../../assets/img/guideAvatar.png')} />
                    <Text style={styles.guideName}>Name</Text>
                    <Text style={styles.foujNum}>Foujs Num</Text>
                </View>
                <View style={styles.actionView}>
                    <TouchableOpacity onPress={() => setAssignBatch(true)}>
                        <Text style={styles.actionAssign}>{ArText.assignBatch}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setDeleteGuide(true)}>
                        <Text style={styles.actionDelete}>{ArText.deleteGuide}</Text>
                    </TouchableOpacity>
                </View>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 3,
    },
    content: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardStyle: {
        backgroundColor: Colors.prayerBox,
        width: 120
    },
    guideName: {
        fontSize: 13
    },
    foujNum: {
        fontSize: 10,
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
        fontSize: 13,
    },
    actionDelete: {
fontSize: 13,
color: 'gray'
    }
})

export default GuideCard