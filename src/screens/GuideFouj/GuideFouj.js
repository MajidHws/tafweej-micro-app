import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground, Dimensions, AsyncStorage } from 'react-native'
import img5 from '../../../assets/img/7.png'
import { ArText } from '../../utils/ArText'
const { height, width } = Dimensions.get('screen')
import { Container, Header, Tab, Tabs, TabHeading, Icon } from 'native-base';
import { Colors } from '../../utils/Colors';
import { FontAwesome5 } from '@expo/vector-icons'
import FoujList from './FoujList'
import Axios from 'axios'

import { getGuideBatches } from '../../settings/URLS'

const GuideFouj = (props) => {

    const [doneBatches, setDoneBatches] = useState([])
    const [notDoneBatches, setNotDoneBatches] = useState([])

    const _fetchBatches = async () => {
        try {

            const userInfo = await AsyncStorage.getItem('userInfo')
            const { id } = JSON.parse(userInfo)
            const result = await Axios.get(`${getGuideBatches}/${id}`)
            const batches = result.data.user_batches

            // batch.return_to_camp !== null
            // batch.dispatching_time === null
            //             || (batch.dispatching_time !== null && batch.return_to_camp === null)

            const notDone = []
            const done = []

            setNotDoneBatches(batches)
            setDoneBatches(batches)

            console.log(batches)
        } catch (e) {
            console.log(e)
        }
    }

    const _goToFoujDetails = (id, code) => {
        // alert(id)
        props.navigation.navigate('Trip', {id, code})
    }

    useEffect(() => {
        _fetchBatches()
    }, [])

    return (
        <View style={styles.container}>

            <View style={styles.headerView}>
                <ImageBackground style={{ width: width, height: 300 }} resizeMode={'cover'} source={img5}>
                    <View style={styles.headingContainer}>
                        <View style={styles.headingView}>
                            <Text style={styles.heading}>{ArText.batches}</Text>
                        </View>
                        <View style={styles.headingBackBtnView}>
                            <Text style={styles.estName}>ESTABLISHMENT</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>

            <Container style={{

            }}>
                <Tabs tabBarUnderlineStyle={{ borderBottomWidth: 4, borderColor: Colors.primary }}>

                    <Tab heading={<TabHeading><Text style={styles.tabTitle}>{ArText.foujNotOutYet}</Text></TabHeading>}>
                        <FoujList
                            navigation={props.navigation}
                            goToFoujDetails={_goToFoujDetails}
                            data={notDoneBatches}
                            title={ArText.foujNotOutYet} />
                    </Tab>
                    
                    <Tab heading={<TabHeading><Text style={styles.tabTitle}>{ArText.foujDone}</Text></TabHeading>}>
                        <FoujList
                            navigation={props.navigation}
                            goToFoujDetails={_goToFoujDetails}
                            data={doneBatches}
                            title={ArText.remainingBatches}
                            horizontal={false} />
                    </Tab>

                </Tabs>
            </Container>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabTitle: {
        color: Colors.primary
    },
    headerView: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    headingContainer: {
        //flexDirection: 'row',
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
    heading: {
        color: '#fff',
        fontSize: 20

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
    }
})

export default GuideFouj