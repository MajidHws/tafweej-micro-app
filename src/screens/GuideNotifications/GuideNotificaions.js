import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, SectionList } from 'react-native'
import { ArText } from '../../utils/ArText'
import { FlatList } from 'react-native-gesture-handler'
import NotificationCard from '../../components/NotificationCard'
import { Colors } from '../../utils/Colors'

const GuideNotifications = (props) => {

    const data = [
        
        {
            title: ArText.latestNotifications,
            data: [1, 2, 3, 4, 5, 6, 7, 8]
        },
        {
            title: ArText.oldNotifications,
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }
    ]

    const _notificationsList = () => {
        return (
            <View style={styles.notificationsListContainer}>

                <SectionList
                    contentContainerStyle={styles.listStyle}
                    keyExtractor={(item, i) => String(i)}
                    sections={data}
                    
                    renderItem={({ item }, i) => <NotificationCard />}
                    renderSectionHeader={({ section }) => (<View style={styles.listHeadingView}>
                        <Text style={styles.listHeading}>{section.title}</Text>
                    </View>)}
                />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.headerView}>
                <Text style={styles.header}>{ArText.notifications}</Text>
            </View>
            <View>
                {_notificationsList()}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerView: {
        height: 100,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    header: {
        fontSize: 18
    },
    notificationsListContainer: {
        paddingHorizontal: 15,

    },
    listHeadingView: {
        alignItems: 'flex-start',
        paddingVertical: 10,
        backgroundColor: '#fff'
    },
    listHeading: {
        color: Colors.darkPrimary,
    }
})

export default GuideNotifications