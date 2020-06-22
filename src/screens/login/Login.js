import React, { useState, useEffect } from 'react'
import {
    View, Text, StyleSheet, Image, TextInput,
    KeyboardAvoidingView, TouchableOpacity,
    AsyncStorage, Dimensions,
    ActivityIndicator
} from 'react-native'
import { StackActions } from '@react-navigation/native';
import axios from 'axios'
import image from '../../../assets/img/1.png'
import { Colors } from '../../utils/Colors'
import { ArText } from '../../utils/ArText'
import TButton from '../../components/TButton'
import TModal from '../../components/TModal'
import { login, me } from '../../settings/URLS';

const { width, height } = Dimensions.get('screen')

const Login = (props) => {

    const LOGIN_URL = `${login}`
    const ME_URL = `${me}`

    const [modalVisible, setModalVisible] = useState(false)
    const [signing, setSigning] = useState(false)

    const [personalId, setPersonalId] = useState('1111111111')
    const [password, setPassword] = useState('1122334455')
    const [checkingAuth, setCheckingAuth] = useState(true)

    //  AsyncStorage.removeItem('userInfo')
    //  AsyncStorage.removeItem('userType')
    //  AsyncStorage.removeItem('userToken')

    const toIntro = () => {
        // props.navigation.navigate('Intro')
        props.navigation.dispatch(
            StackActions.replace('Intro')
        );
    }

    const _login = async () => {
        try {
            setSigning(true)
            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }

            const result = await axios.post(`${LOGIN_URL}?personal_id=${personalId}&password=${password}`, {}, { headers })
            // console.log(result.data)
            const userToken = result.data.access_token
            setSigning(false)

            if (userToken) {
                const headers = {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                }
                const result = await axios.get(`${ME_URL}`, { headers })
                //console.log('2', result.data);

                if (result.data.user_type) {
                    const userInfo = JSON.stringify(result.data)

                    // await AsyncStorage.setItem('userInfo', userInfo)
                    // await AsyncStorage.setItem('userType', result.data.user_type.id)
                    // await AsyncStorage.setItem('userToken', userToken)

                    toIntro()
                }

            }
        } catch (e) {
            setSigning(false)
            console.log(e)
        }
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

    const _goToTabs = async () => {
        const userType = await AsyncStorage.getItem('userType')
        if (userType) {
            props.navigation.dispatch(
                StackActions.replace('Tabs')
            );
        } else {
            setCheckingAuth(false)
        }
    }

    useEffect(() => {
        //_goToTabs()
    }, [])

    const _content = () => {
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
                                value={personalId}
                                placeholder={ArText.mobileNumber}
                                style={styles.input} />
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                value={password}
                                placeholder={ArText.password}
                                secureTextEntry
                                style={styles.input} />
                        </View>
                    </View>

                    {
                        signing
                            ? (<ActivityIndicator />)
                            : (<View style={styles.loginBtnView}>
                                <TButton title={ArText.login} action={() => _login()} />
                            </View>)
                    }

                    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.forgetPasswordView}>
                        <Text style={styles.forgetPassword}>{ArText.forgetPassword}</Text>
                    </TouchableOpacity>

                </View>

            </KeyboardAvoidingView>

        )
    }
    return (
        <>
            {!checkingAuth ? (<ActivityIndicator />) : _content()}
        </>
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