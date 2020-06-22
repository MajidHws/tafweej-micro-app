import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, AsyncStorage, Dimensions, ImageBackground } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontAwesome5 } from '@expo/vector-icons'

import img5 from '../../../assets/img/5.png'
import Analytic from './Analytic';
import Prayer from './Prayer';
import Weather from './Weather';
import { Colors } from '../../utils/Colors';
import { ArText } from '../../utils/ArText';
const { height, width } = Dimensions.get('screen')
import { Container, Header, Tab, Tabs, TabHeading, Icon } from 'native-base';

import { getDashboardBatches } from '../../settings/URLS'

import axios from 'axios'

const Analytics = (props) => {

    const [loading, setLoading] = useState(false)
    const [batchesList, setBatchesList] = useState([])
    const [totalBatches, setTotalBatches] = useState(0)
    const [done, setDone] = useState(0)
    const [inProgress, setInProgress] = useState(0)
    const [notYet, setNotYet] = useState(0)

    function MyTabs() {
        const Tab = createMaterialTopTabNavigator();

        return (
            <Tab.Navigator
                activeTintColor="red"
                tabBarOptions={{
                    indicatorStyle: { backgroundColor: Colors.primary },
                    activeTintColor: 'red',
                    labelStyle: { fontSize: 12, color: Colors.primary },
                    tabStyle: { color: 'red' },
                    style: {},
                }}
                style={{
                    margin: 20,
                    top: -45,
                    color: 'red'
                }}>

                <Tab.Screen
                    //screenOptions={}
                    name="Analytic"
                    component={Analytic}
                    options={{

                        title: ArText.analytic,
                        tabBarIcon: () => <FontAwesome5 name="chevron-right" color="#fff" size={20} />,
                    }}
                />
                <Tab.Screen
                    name="Prayer"
                    component={Prayer}
                    options={{
                        title: ArText.prayer,
                        tabBarIcon: () => <FontAwesome5 name="chevron-right" color="#fff" size={20} />
                    }}
                />
                <Tab.Screen
                    name="Weather"
                    component={Weather}
                    options={{
                        title: ArText.weather,
                        tabBarIcon: () => <FontAwesome5 name="chevron-right" color="#fff" size={20} />
                    }}
                />

            </Tab.Navigator>
        );
    }

    const _fetchData = async () => {
        try {
            const userInfo = await AsyncStorage.getItem('userInfo')
            if (!userInfo) return alert('NO USER INFO')
            const userInfoJson = JSON.parse(userInfo)
            console.log('---', userInfoJson)
            const url = `${getDashboardBatches}?user_id=${userInfoJson.id}&office_id=${userInfoJson.office_id}&user_type=${userInfoJson.user_type.id}&day=${'all'}`
            const result = await axios.get(url)

            const { batches, total, done, in_progress, not_yet } = result.data
            
            // setBatchesList(batches)
            // setTotalBatches(total)
            // setDone(done)
            // setInProgress(in_progress)
            // setNotYet(not_yet)

            console.log(result.data)
        } catch (e) {
            console.log(e)
        }
    }

    const _content = () => {
        return (
            <View style={styles.container}>
                <View style={styles.headerView}>
                    <ImageBackground style={{ width: width, height: 200 }} resizeMode={'cover'} source={img5}>
                        <View style={styles.headingContainer}>
                            <View style={styles.headingView}>
                                <Text style={styles.heading}>{ArText.analytic}</Text>
                            </View>
                            {/* <View style={styles.headingBackBtnView}>
                                <FontAwesome5 name="chevron-right" color="#fff" size={20} />
                            </View> */}
                        </View>
                    </ImageBackground>
                </View>
                {/* 
                <View style={{
                    margin: 20,
                    top: -45
                }}>
                </View> */}
                <Container style={{

                }}>
                    <Tabs tabBarUnderlineStyle={{ borderBottomWidth: 4, borderColor: Colors.primary }}>
                        <Tab heading={<TabHeading><FontAwesome5 name="train" size={20} color={Colors.primary} /><Text style={styles.tabTitle}>{ArText.analytic}</Text></TabHeading>}>
                            <Analytic />
                        </Tab>
                        <Tab heading={<TabHeading><FontAwesome5 size={20} name="compass" color={Colors.primary} /><Text style={styles.tabTitle}>{ArText.prayer}</Text></TabHeading>}>
                            <Prayer />
                        </Tab>
                        <Tab heading={<TabHeading><FontAwesome5 name="thermometer-half" size={20} color={Colors.primary} /><Text style={styles.tabTitle}>{ArText.weather}</Text></TabHeading>}>
                            <Weather />
                        </Tab>

                    </Tabs>
                </Container>


            </View>
        )
    }

    useEffect(() => {
        _fetchData()
    }, [])

    return (
        <>
            {_content()}
            {/* {MyTabs()} */}

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    headerView: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    headingContainer: {
        flexDirection: 'row',
        flex: 1,
        // backgroundColor: 'red',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    headingView: {
        flex: 1,
        alignItems: 'center',
    },
    heading: {
        color: '#fff',
        fontSize: 20

    },
    headingBackBtnView: {
        flex: .1
    },
    tabTitle: {
        color: Colors.primary,
        fontSize: 13,
        marginStart: 3
    }
})

export default Analytics