import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { ArText } from '../../utils/ArText'

import userAvatart from '../../../assets/img/profileAvatar.png'
import { Colors } from '../../utils/Colors'
const GuideProfile = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.headerView}>
                <Text style={styles.header}>{ArText.guideProfile}</Text>
            </View>
            <View style={styles.userInfoContainer}>
                <Image source={require('../../../assets/img/profileAvatar.png')} style={styles.img} />
                <View style={styles.infoView}>
                    <View style={styles.statView}>
                        <Text style={styles.infoNumber}>30</Text>
                        <Text style={styles.infoTitle}>{ArText.allBatches}</Text>
                    </View>
                    <View style={styles.statView}>
                        <Text style={styles.infoNumber}>30</Text>
                        <Text style={styles.infoTitle}>{ArText.doneTafweej}</Text>
                    </View>
                    <View style={styles.statView}>
                        <Text style={styles.infoNumber}>30</Text>
                        <Text style={styles.infoTitle}>{ArText.upcomingBatches}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.actionsContainer}>

                <View style={styles.actionView}>
                    <View style={styles.actionIconView}>
                        <FontAwesome5 name="users" size={18} color={Colors.primary} />
                    </View>
                    <View style={styles.actionTextView}>
                        <Text style={styles.actionText}>{ArText.batches}</Text>
                    </View>
                </View>

                <View style={styles.actionView}>
                    <View style={styles.actionIconView}>
                        <FontAwesome5 name="compass" size={18} color={Colors.primary} />
                    </View>
                    <View style={styles.actionTextView}>
                        <Text style={styles.actionText}>{ArText.batches}</Text>
                    </View>
                </View>
                
                <View style={styles.actionView}>
                    <View style={styles.actionIconView}>
                        <FontAwesome5 name="map" size={18} color={Colors.primary} />
                    </View>
                    <View style={styles.actionTextView}>
                        <Text style={styles.actionText}>{ArText.batches}</Text>
                    </View>
                </View>

                <View style={styles.actionView}>
                    <View style={styles.actionIconView}>
                        <FontAwesome5 name="train" size={18} color={Colors.primary} />
                    </View>
                    <View style={styles.actionTextView}>
                        <Text style={styles.actionText}>{ArText.batches}</Text>
                    </View>
                </View>

                <View style={styles.actionView}>
                    <View style={styles.actionIconView}>
                        <FontAwesome5 name="cog" size={18} color={Colors.primary} />
                    </View>
                    <View style={styles.actionTextView}>
                        <Text style={styles.actionText}>{ArText.batches}</Text>
                    </View>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20
    },
    headerView: {
        height: 100,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 30
    },
    header: {
        fontSize: 18
    },
    userInfoContainer: {
        // justifyContent: 'center',
        // alignItems: 'center',
        borderBottomColor: Colors.borderColor,
        borderBottomWidth: .5,
        // marginHorizontal: 20
    },
    img: {
        height: 200,
        width: 200,
        alignSelf: 'center',
        marginBottom: 30
    },
    infoView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingBottom: 25
        // backgroundColor: 'red'
    },
    statView: {
        justifyContent: 'center',
        alignSelf: 'center',
        // backgroundColor: 'red'
    },
    infoNumber: {
        color: Colors.darkPrimary,
        alignSelf: 'center',
        fontSize: 20,
        marginBottom: 5
    },
    infoTitle: {
        color: Colors.secondary
    },
    actionsContainer: {
marginTop: 10,
        backgroundColor: Colors.lightPrimary,
        paddingHorizontal: 40,
        paddingTop: 20
    },
    actionView: {
        flexDirection: 'row',
        marginBottom: 25
    },
    actionIconView: {
        flex: .2,
        justifyContent: 'center',
        alignItems: 'center',

    },
    actionTextView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        // backgroundColor: 'red'
    },
    actionText: {
        color: Colors.darkPrimary,
        fontSize: 13,
    }
})

export default GuideProfile