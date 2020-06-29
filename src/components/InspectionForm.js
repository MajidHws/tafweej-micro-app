import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'

import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons'
import { Colors } from '../utils/Colors';

import axios from 'axios'

import { updateReadiness } from '../settings/URLS'

const InspectionForm = (props) => {

    // Object {
    //     "app_tafweej_requirement": Object {
    //       "id": 1,
    //       "name": "الزي لحملة اللوحات والمرشدين",
    //     },
    //     "app_tafweej_requirement_id": 1,
    //     "id": 1,
    //     "image": null,
    //     "is_ready": 0,
    //     "notes": null,
    //     "user_id": 3,
    //   }

    const { app_tafweej_requirement: { id, name }, is_ready } = props.item
    const [updating, setUpdating] = useState(false)
    const [isReady, setIsReady] = useState(is_ready)

    const _updateReadiness = async () => {
        setUpdating(true)
        try {
            const result = await axios.post(updateReadiness, { id })
            //const res = await fetch(URL)
            //const result = await res.json()
            console.log(result)
            setIsReady(true)
            setUpdating(false)
        } catch (e) {
            setUpdating(false)
            console.log(e)
        }
    }

    return (
        <Content style={styles.container} >
            <Card>
                <CardItem>
                    <Body>
                        <View style={styles.contentContainer}>
                            <View style={styles.iconView}>
                                {
                                    updating ? (<ActivityIndicator />)
                                        : (<TouchableOpacity onPress={_updateReadiness} >
                                            <FontAwesome5 name="check" color={isReady ? 'green' : 'gray'} size={25} />
                                        </TouchableOpacity>)
                                }
                            </View>
                            <View style={styles.contentView}>
                                <Text style={styles.contentTitle}>{name}</Text>
                                {/* <TextInput
                                    style={styles.contentInput}
                                    placeholder="ملاحظات"
                                /> */}
                            </View>
                        </View>
                    </Body>
                </CardItem>
            </Card>
        </Content>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: -3
    },
    contentContainer: {
        flexDirection: 'row'
    },
    iconView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    contentView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    contentTitle: {},
    contentInput: {
        height: 30,
        borderBottomColor: Colors.borderColor,
        borderBottomWidth: .5,
        width: '100%',
        textAlign: 'right'
    }
})

export default InspectionForm