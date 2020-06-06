import React, { useState, useEffect } from 'react'
import {
    View, Text, StyleSheet, ImageBackground, Dimensions,
    FlatList
} from 'react-native'
import img5 from '../../../assets/img/9.png'
import { ArText } from '../../utils/ArText'
const { height, width } = Dimensions.get('screen')
import { Container, Header, Tab, Tabs, TabHeading, Icon, Button } from 'native-base';
import { Colors } from '../../utils/Colors';
import { FontAwesome, Octicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import TModal from '../../components/TModal'
import TButton from '../../components/TButton'
import Card from '../../components/Card'
import GuideCard from '../../components/GuideCard'
import TripCard from '../../components/TripCard'

const FoujTrip = (props) => {



    const _guideStats = () => {
        return (
            <View style={[styles.statsContainerView, styles.shadow]}>
                {/* <Card height={180}  style={{ backgroundColor: Colors.prayerBox }}> */}
                <View style={styles.statsContainer}>

                    <View style={styles.statsHeadingView}>
                        <Text style={styles.statsHeading}>000</Text>
                    </View>

                    <View style={styles.statsView}>

                        <View style={styles.goodGuidesView}>
                            <Text style={styles.goodGuides}>{ArText.previousBatch}</Text>
                            <Text style={styles.goodGuidesNumber}>{`${ArText.since} 00:00`}</Text>
                        </View>

                        <View style={styles.goodGuidesView}>
                            <Text style={styles.goodGuides}>{ArText.nextBatch}</Text>
                            <Text style={styles.goodGuidesNumber}>{`${ArText.timeRemain} 00:00`}</Text>
                        </View>

                    </View>



                </View>
                {/* </Card> */}
            </View>
        )
    }

    const _content = () => {
        return (
            <View style={styles.container}>
                <View style={styles.headerView}>
                    <ImageBackground style={{ width: width, height: 200 }} resizeMode={'cover'} source={img5}>
                        <View style={styles.headingContainer}>
                            <View style={styles.headingIconView}>
                                {/* <Text style={styles.heading}>{ArText.analytic}</Text> */}
                                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                                    <FontAwesome name="chevron-right" color="#fff" size={20} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.headingTitleView}>
                                <Text style={styles.heading}>{ArText.batches}</Text>
                            </View>

                        </View>
                    </ImageBackground>
                </View>

                {_guideStats()}


            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.headerView}>
                <ImageBackground style={{ width: width, height: 200 }} resizeMode={'cover'} source={img5}>
                    <View style={styles.headingContainer}>
                        <View style={styles.headingIconView}>
                            {/* <Text style={styles.heading}>{ArText.analytic}</Text> */}
                            <TouchableOpacity onPress={() => props.navigation.goBack()}>
                                <FontAwesome name="chevron-right" color="#fff" size={20} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.headingTitleView}>
                            <Text style={styles.heading}>{ArText.batches}</Text>
                        </View>

                    </View>
                </ImageBackground>
            </View>

            {_guideStats()}

            <View style={styles.contentView}>
                <FlatList
                    contentContainerStyle={styles.listStyle}
                    keyExtractor={(item) => String(item)}
                    data={[1, 3, 4, 5, 6, 7]}
                    renderItem={({ item }) => <TripCard />}
                />
                <View style={styles.confirmTripView}>
                    <TButton title={ArText.confirmTrip} action={() => alert('')} />
                </View>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    headingContainer: {
        flexDirection: 'row',
        flex: 1,
        // backgroundColor: 'red',
        //justifyContent: 'space-around',
        //alignItems: 'center'
    },
    headingView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headingIconView: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 30
    },
    headingTitleView: {
        flex: 1.5,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    heading: {
        color: '#fff',
        fontSize: 20

    },
    addGuide: {
        color: '#fff',
        fontSize: 15

    },
    headingBackBtnView: {
        flex: .2,
        alignItems: 'flex-start',
        // backgroundColor: 'blue',
        paddingHorizontal: 20
    },
    estName: {
        // backgroundColor: 'red',
        fontSize: 20,
        color: 'white'
    },
    modalView: {
        backgroundColor: Colors.prayerBox,
        padding: 20,
        borderRadius: 10,
        width: width * .7,
        height: 330,
        top: -80
    },
    deleteModalView: {
        backgroundColor: Colors.prayerBox,
        padding: 20,
        borderRadius: 10,
        width: width * .7,
        height: 200,
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
        borderRadius: 3,
        marginBottom: 10,
        backgroundColor: 'white'
    },
    modalBtnView: {

    },
    content: {
        flex: 1,
        top: -20
    },
    statsContainerView: {
        marginHorizontal: 20,
        top: -60,

    },
    statsContainer: {
        // flexDirection: 'row',
        backgroundColor: Colors.prayerBox,
        padding: 10,
        borderRadius: 5,
        height: 130
    },

    statsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 10
    },
    iconView: {
        backgroundColor: Colors.primary,
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    goodGuidesView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    goodGuides: {
        fontSize: 16,
        color: Colors.darkPrimary,
        marginBottom: 5
    },
    goodGuidesNumber: {
        color: Colors.primary,
        fontSize: 13,
    },
    searchContainer: {
        marginHorizontal: 20,
        top: -30
    },
    searchViewContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.prayerBox,
        //padding: 10,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10
    },
    searchInput: {
        textAlign: 'right',
        flex: 1,
        height: 40,
        marginLeft: 5
    },
    cardStyle: {
        borderRadius: 30

    },
    guidesListView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 40,
        marginBottom: 15
    },
    guidesListTitle: {
        fontSize: 20
    },
    showAll: {
        color: Colors.secondary
    },
    deleteBtnsView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 40,
        paddingHorizontal: 30
    },
    statsHeadingView: {
        // justifyContent: 'center',
        // alignItems: 'center',
        // flex: 1,
        // backgroundColor: 'red'
    },
    statsHeading: {
        color: Colors.darkPrimary,
        fontSize: 25,
        margin: 20,
        alignSelf: 'center'
    },
    shadow: {
        backgroundColor: 'white',
        borderRadius: 2,

        shadowColor: '#d7d7d7',
        shadowOffset: {},
        shadowOpacity: .9,
        shadowRadius: 5,

        marginBottom: 5,
    },
    contentView: {
        flex: 1,
        marginHorizontal: 10
    },
    listStyle: {
        //  flex: 1 
    },
    confirmTripView: {
        marginBottom: 20
    },
})

export default FoujTrip