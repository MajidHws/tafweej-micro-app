import React, { useState, useEffect } from 'react'
import {
    View, Text, StyleSheet, Image, TextInput,
    KeyboardAvoidingView, TouchableOpacity, Modal,
    TouchableHighlight, Dimensions
} from 'react-native'
import { StackActions } from '@react-navigation/native';

import image from '../../../assets/img/1.png'
import { Colors } from '../../utils/Colors'
import { ArText } from '../../utils/ArText'
import TButton from '../../components/TButton'
import TModal from '../../components/TModal'

const { width, height } = Dimensions.get('screen')

const Login = (props) => {

    const [modalVisible, setModalVisible] = useState(false);

    const toIntro = () => {
        // props.navigation.navigate('Intro')
        props.navigation.dispatch(
            StackActions.replace('Intro')
        );
    }

    const modal = () => {
        return (
            <View style={styles.modalView}>
                <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>
                    <View style={styles.modalHeadingView}>
                        <Text style={styles.modalHeading}>{ArText.enterMobileNumber}</Text>
                    </View>
                    <View style={styles.modalInputView}>
                        <TextInput
                            autoFocus
                            placeholder={ArText.mobileNumber}
                            style={styles.modalInput} />
                    </View>
                    <View style={styles.modalBtnView}>
                        <TButton title={ArText.resetPassword} action={() => toIntro()} />
                    </View>
                </KeyboardAvoidingView>
            </View>
        )
    }
    return (
        <KeyboardAvoidingView behavior={'padding'} style={styles.container}>

            <KeyboardAvoidingView behavior={'padding'}>
                <TModal modalVisible={modalVisible} setModalVisible={setModalVisible} >
                    {modal()}
                </TModal>
            </KeyboardAvoidingView>

            <View style={styles.sectionOne}>
                <Image source={image} style={styles.img} />
                <Text style={styles.headingText}>{ArText.tafweej}</Text>
            </View>

            <View style={styles.sectionTow}>

                <View style={styles.formView}>
                    <View style={styles.inputView}>
                        <TextInput
                            placeholder={ArText.mobileNumber}
                            style={styles.input} />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            placeholder={ArText.password}
                            secureTextEntry
                            style={styles.input} />
                    </View>
                </View>

                <View style={styles.loginBtnView}>
                    <TButton title={ArText.login} action={() => toIntro()} />
                </View>

                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.forgetPasswordView}>
                    <Text style={styles.forgetPassword}>{ArText.forgetPassword}</Text>
                </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    sectionOne: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        //width: 305, 
        //height: 159
    },
    headingText: {
        color: Colors.third,
        fontSize: 24
    },
    sectionTow: {
        flex: 1.5,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    formView: {
        borderColor: Colors.borderColor,
        borderTopWidth: 1,
        marginBottom: 20,
        width: '100%'
    },
    inputView: {
        borderBottomColor: Colors.borderColor,
        borderBottomWidth: 1,
    },
    input: {
        textAlign: 'right',
        padding: 15,
        color: Colors.primary
    },
    loginBtnView: {
        width: '85%',
    },
    forgetPassword: {
        color: Colors.primary,
    },
    forgetPasswordView: {
        justifyContent: 'flex-start',
        marginVertical: 20,
        flexDirection: 'row'
    },
    modalView: {
        backgroundColor: Colors.prayerBox,
        padding: 20,
        borderRadius: 10,
        width: width * .7,
        height: 330,
        top: -80
    },
    modalHeadingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalHeading: {
        color: Colors.primary
    },
    modalInputView: {
        marginBottom: 20
    },
    modalInput: {
        textAlign: 'right',
        padding: 15,
        color: Colors.primary,
        borderColor: Colors.borderColor,
        borderWidth: .5,
        borderRadius: 3
    },
    modalBtnView: {

    }
})

export default Login