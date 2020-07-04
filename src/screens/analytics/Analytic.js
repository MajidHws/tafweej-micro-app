import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, SectionList, Alert, Platform, Button } from 'react-native'
import { ArText } from '../../utils/ArText'
import { Colors } from '../../utils/Colors'
import Card from '../../components/Card'

import { FontAwesome5, AntDesign } from '@expo/vector-icons'
import BatchStatus from '../../components/BatchStatus'

import * as Permissions from 'expo-permissions'

import { Constants, Notifications } from 'expo';

async function getiOSNotificationPermission() {
    const { status } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );
    if (status !== 'granted') {
        await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
}

const Analytic = (props) => {

    const [nId, setNId] = useState()
    const { batchesList, totalBatches, done, inProgress, notYet } = props

    const _handleButtonPress = () => {
        const localnotification = {
            title: 'Example Title!',
            body: 'This is the body text of the local notification',
            android: {
                sound: true,
            },
            ios: {
                sound: true,
            },
        };
        let sendAfterFiveSeconds = Date.now();
        sendAfterFiveSeconds += 5000;

        const schedulingOptions = { time: sendAfterFiveSeconds };
        let id = Notifications.scheduleLocalNotificationAsync(
            localnotification,
            schedulingOptions
        );
        setNId(id)
        let NotId = nId
        //console.log(NotId);
    };


    const listenForNotifications = () => {
        Notifications.addListener(notification => {
            if (notification.origin === 'received' && Platform.OS === 'ios') {
                Alert.alert(notification.title, notification.body);
            }
        });
    };

    useEffect(() => {
        getiOSNotificationPermission();
        listenForNotifications();
    }, [])


    return (

        <View style={styles.container}>

            <Card height={100}>
                <View style={[styles.remainingTimeView]}>
                    <Text style={styles.remainingTimeText}>{ArText.remainingTime}</Text>
                    <Text style={styles.remainingTime}>٠٠:٠٠:٠٠</Text>
                </View>
            </Card>

            <Card height={80}>
                <View style={[styles.totalBatchesContainer]}>
                    <View style={styles.iconView}>
                        <FontAwesome5 name="users" size={25} color={'#fff'} />
                    </View>
                    <View style={styles.totalBatchesTextView}>
                        <Text style={styles.totalBatchesText}>{ArText.totalBatches}</Text>
                    </View>
                    <View style={styles.totalBatchesView}>
                        <Text style={styles.totalBatches}>{totalBatches}</Text>
                    </View>
                </View>
            </Card>

            <View style={styles.statsContainer}>
                <View style={{ flex: 1 }}>
                    <Card>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ padding: 20 }}>
                                <AntDesign name="checkcircle" size={24} color="green" />
                            </View>
                            <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'flex-start' }}>
                                <Text>{ArText.doneTafweej}</Text>
                                <Text>{done}</Text>
                            </View>
                        </View>
                    </Card>
                </View>
                <View style={{ width: 10 }} />

                <View style={{ flex: 1 }}>
                    <Card>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ padding: 20 }}>
                                <AntDesign name="closecircle" size={24} color="red" />
                            </View>
                            <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'flex-start' }}>
                                <Text>{ArText.doneTafweej}</Text>
                                <Text>{notYet + inProgress}</Text>
                            </View>
                        </View>

                    </Card>
                </View>

            </View>

            {/* <View style={{flex: 1,padding: 5}}> */}

            <SectionList
                contentContainerStyle={styles.listStyle}
                keyExtractor={(item, i) => String(i)}
                sections={batchesList}

                renderItem={({ item }, i) => <BatchStatus batch={item} />}
                renderSectionHeader={({ section }) => (<View style={styles.listHeadingView}>
                    <Text style={styles.listHeading}>{`اليوم: ${section.title}`}</Text>
                </View>)}
            />
            {/* <FlatList
                style={{ flex: 1, height: 400 }}
                data={batchesList}
                renderItem={({ item }) => <BatchStatus batch={item} />}
                keyExtractor={(item, i) => String(i)}
            /> */}

            {/* <BatchStatus marginBottom={2} /> */}

            {/* </View> */}

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'red',
        paddingTop: 10,
        paddingHorizontal: 15,
        height: 400
    },
    remainingTimeView: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    remainingTimeText: {
        fontSize: 20
    },
    remainingTime: {
        color: Colors.secondary,
        fontSize: 20
    },
    iconView: {
        backgroundColor: Colors.primary,
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    totalBatchesContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    totalBatchesTextView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 20
    },
    totalBatchesText: {
        textAlign: 'right'
    },
    totalBatchesView: {
        flex: .3,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    statsContainer: {
        flexDirection: 'row'
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

export default Analytic