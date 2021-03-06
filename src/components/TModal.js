import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Modal, 
    TouchableHighlight, TouchableWithoutFeedback, 
    Button, Keyboard } from 'react-native'

const TModal = (props) => {
    const { modalVisible, setModalVisible } = props
    return (
        <Modal
            //animationType={'fade'}
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
            }}>
            <View style={styles.modal} onPress={() => ''}>
                <TouchableWithoutFeedback onPress={() => ''}>
                    {props.children}
                </TouchableWithoutFeedback>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        width: '100%',
        backgroundColor: 'red'
    },
    modal: {
        backgroundColor: 'rgba(0, 0, 0, .5)',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
})

export default TModal