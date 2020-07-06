import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { StackActions } from '@react-navigation/native';

import Swiper from 'react-native-swiper'

import img1 from '../../../assets/img/2.png'
import img2 from '../../../assets/img/3.png'
import img3 from '../../../assets/img/4.png'
import { Colors } from '../../utils/Colors'
import { ArText } from '../../utils/ArText'
import { TouchableOpacity } from 'react-native-gesture-handler'

const {width, height} = Dimensions.get('screen')

const Intro = (props) => {

    const images = [
        { img: img1, title: 'title' },
        { img: img2, title: 'title' },
        { img: img3, title: 'title' },
    ]

    const swiperInactiveDot = () => {
        return (
            <View style={{
                backgroundColor: Colors.dots,
                width: 6,
                height: 6,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3,
            }} />
        )
    }
    const swiperActiveDot = () => {
        return (
            <View style={[{
                backgroundColor: Colors.primary,
                width: 6,
                height: 6,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3,

            }, styles.shadow]} />
        )
    }

    const _goToHome = () => {
        // props.navigation.navigate('Tabs')
        props.navigation.dispatch(
            StackActions.replace('guideFouj')
        );
    }

    const swiper = () => {
        return (
            <Swiper
            style={{}}
                dot={swiperInactiveDot()}
                activeDot={swiperActiveDot()}
            //activeDotColor={Colors.primary}
            >
                {
                    images.map((image, i) => {
                        return (
                            <View key={i} style={styles.imageView}>
                                <View style={styles.headingView}>
                                    <Text style={styles.headingText}>Intro</Text>
                                </View>
                                <Image source={image.img} style={styles.img} />
                            </View>
                        )
                    })
                }

            </Swiper>
        )
    }

    return (
        <View style={styles.container}>

            <View style={styles.skipView}>
                <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => _goToHome()}>
                    <Text style={styles.skipText}>{ArText.skip}</Text>
                    <FontAwesome5 name="chevron-left" color={Colors.primary} size={15} />
                </TouchableOpacity>
            </View>
            <>
            {swiper()}
            </>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: height * .05,
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom: height * .22
    },
    imageView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    headingView: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headingText: {
        color: Colors.primary
    },
    skipView: {
        position: 'absolute',
        bottom: height * .18,
        right: width * .05,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 10,
        // backgroundColor: 'red',
        marginHorizontal: 20,
    },
    skipText: {
        color: Colors.primary,
        marginHorizontal: 10
    },
    shadow: {
        // justifyContent: 'space-between',
        backgroundColor: Colors.primary,

        // borderBottomRightRadius: 20,
        // borderBottomLeftRadius: 20,

        shadowColor: Colors.primary,
        shadowOffset: {},
        shadowOpacity: .9,
        shadowRadius: 5,

        // marginBottom: 12,
    }
})

export default Intro