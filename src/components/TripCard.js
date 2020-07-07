import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, TouchableWithoutFeedback } from 'react-native'

import { Colors } from '../utils/Colors'
import { CheckBox } from 'native-base'
import Axios from 'axios'

const TripCard = (props) => {
    const { trip } = props

    const [item, setItem] = useState(props.item)
    const [loading, setLoading] = useState(false)
    const _updateTrip = async () => {
        try {
            setLoading(true)
            console.log(`http://dev.hajjtafweej.net/api/batche-timeline?id=${trip.id}&col_name=${item.name}`);

            const result = await Axios.post(`http://dev.hajjtafweej.net/api/batche-timeline?id=${trip.id}&col_name=${item.name}`)
            setItem({
                ...item,
                time: true
            })
            setLoading(false)
        } catch (e) {
            setLoading(false)
            console.log(e);

        }
    }
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={_updateTrip}>

                <View style={styles.contentView}>
                    <Text style={styles.contentText}>{item.title}</Text>
                    {
                        loading ? (<ActivityIndicator />) : (
                            <CheckBox color={Colors.primary}
                                checked={item.time !== null}
                                onPress={_updateTrip}
                                style={{ justifyContent: 'center', alignItems: 'center' }} />
                        )
                    }
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10
    },
    contentView: {
        backgroundColor: Colors.notificationCardBg,
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10
        // alignItems: 'center'
    },
    textView: {
        justifyContent: 'center',
        // alignItems: 'center'
    },
    contentText: {
        color: Colors.darkPrimary
    }
})

export default TripCard