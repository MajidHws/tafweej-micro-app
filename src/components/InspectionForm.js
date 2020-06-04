import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'

import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons'
import { Colors } from '../utils/Colors';

const InspectionForm = (props) => {
    return (
        <Content style={styles.container}>
            <Card>
                <CardItem>
                    <Body>
                        <View style={styles.contentContainer}>
                            <View style={styles.iconView}>
                                <FontAwesome5 name="check" color={'green'} size={25} />
                            </View>
                            <View style={styles.contentView}>
                                <Text style={styles.contentTitle}>TITLE</Text>
                                <TextInput
                                    style={styles.contentInput}
                                    placeholder="ملاحظات"
                                />
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
        marginBottom: -8
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