import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
// import Card from './Card'
import { Colors } from '../utils/Colors'
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';

const BatchStatus = (props) => {
    const { batch } = props

    // const content = () => {
    //     return (
    //         <View style={[styles.container, styles.shadow]}>
    //         <Card height={40} marginBottom={7}>

    {/* <View style={styles.infoContainer}>

                    <View style={styles.dotView}>
                        <View style={styles.dot}/>
                    </View>

                    <View style={styles.batchNumView}>
                        <Text style={styles.batchNum}>Batch</Text>
                    </View>

                    <View style={styles.batchTimeView}>
                        <Text style={styles.batchTime}>Batch</Text>
                    </View>

                    <View style={styles.batchStatusView}>
                        <Text style={styles.batchStatus}>Batch</Text>
                    </View>

                </View> */}

    //         </Card>
    //     </View>
    //     )
    // }
    // console.log('---', batch)

    const _content = () => {
        return (
            <Card style={styles.container}>
            <CardItem>
                {/* <Body> */}
                <View style={styles.infoContainer}>

                    <View style={styles.dotView}>
                        <View style={styles.dot} />
                    </View>

                    <View style={styles.batchNumView}>
                        <Text style={styles.batchNum}>{batch.batche_id}</Text>
                    </View>

                    <View style={styles.batchTimeView}>
                        <Text style={styles.batchTime}>{batch.batch_times.length > 0 ?
                            `${batch.batch_times[0].dispatch_d_hour}:${batch.batch_times[0].dispatch_d_minute}` : '-'}</Text>
                    </View>

                    {/* <View style={styles.batchStatusView}>
                        <Text style={styles.batchStatus}>{'ll'}</Text>
                    </View> */}

                </View>
                {/* </Body> */}
            </CardItem>
        </Card>
        )
    }
    return (

        <>
            {
                batch.batch_times.length > 0 ? (_content()) : null
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: -2
    },
    infoContainer: {
        flexDirection: 'row',

    },
    dotView: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    dot: {
        backgroundColor: Colors.secondary,
        height: 10, width: 10,
        borderRadius: 5
    },
    batchNumView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    batchNum: {

    },
    batchTimeView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    batchTime: {

    },
    batchStatusView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    batchStatus: {

    },
    shadow: {
        backgroundColor: 'white',
        borderRadius: 2,

        shadowColor: '#d7d7d7',
        shadowOffset: { height: .5, width: 2 },
        shadowOpacity: .9,
        shadowRadius: 5,

        marginBottom: 10,
    }

})

export default BatchStatus