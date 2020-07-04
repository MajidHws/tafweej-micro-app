import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground, Dimensions, AsyncStorage, ActivityIndicator } from 'react-native'
import img5 from '../../../assets/img/7.png'
import { ArText } from '../../utils/ArText'
const { height, width } = Dimensions.get('screen')
import { Container, Header, Tab, Tabs, TabHeading, Icon } from 'native-base';
import { Colors } from '../../utils/Colors';
import { FontAwesome5 } from '@expo/vector-icons'
import FoujList from './FoujList'
import { getDashboardBatches } from '../../settings/URLS'
import axios from 'axios'
const Fouj = (props) => {

    const [loading, setLoading] = useState(false)
    const [doneBatches, setDoneBatches] = useState([])
    const [notDoneBatches, setNotDoneBatches] = useState([])
    const _fetchData = async () => {
        try {
            setLoading(true)
            const userInfo = await AsyncStorage.getItem('userInfo')
            if (!userInfo) return alert('NO USER INFO')
            const userInfoJson = JSON.parse(userInfo)
            console.log('---', userInfoJson)
            const url = `${getDashboardBatches}?user_id=${userInfoJson.id}&office_id=${userInfoJson.office_id}&user_type=${userInfoJson.user_type.id}&day=${'all'}`
            const result = await axios.get(url)

            const { batches, total, in_progress, not_yet } = result.data

            const listDone = [
                { title: 9, data: batches['9'] && [...batches['9']].filter(batch => batch.return_to_camp !== null) || [] },
                { title: 10, data: batches['10'] && [...batches['10']].filter(batch => batch.return_to_camp !== null) || [] },
                { title: 11, data: batches['11'] && [...batches['11']].filter(batch => batch.return_to_camp !== null) || [] },
                { title: 12, data: batches['12'] && [...batches['12']].filter(batch => batch.return_to_camp !== null) || [] },
                { title: 13, data: batches['13'] && [...batches['13']].filter(batch => batch.return_to_camp !== null) || [] },
            ]

            const listNotDone = [
                {
                    title: 9, data: batches['9'] && [...batches['9']].filter(batch=> batch.dispatching_time === null
                        || (batch.dispatching_time !== null && batch.return_to_camp === null)) || []
                },
                {
                    title: 10, data: batches['10'] && [...batches['10']].filter(batch=> batch.dispatching_time === null
                        || (batch.dispatching_time !== null && batch.return_to_camp === null)) || []
                },
                {
                    title: 11, data: batches['11'] && [...batches['11']].filter(batch=> batch.dispatching_time === null
                        || (batch.dispatching_time !== null && batch.return_to_camp === null)) || []
                },
                {
                    title: 12, data: batches['12'] && [...batches['12']].filter(batch=> batch.dispatching_time === null
                        || (batch.dispatching_time !== null && batch.return_to_camp === null)) || []
                },
                {
                    title: 13, data: batches['13'] && [...batches['13']].filter(batch=> batch.dispatching_time === null
                        || (batch.dispatching_time !== null && batch.return_to_camp === null)) || []
                },
            ]

            console.log('list done ', listDone)
            // console.log('------ result.data', result.data.batches)
            // const done = [...result.data.batches].filter(batch => batch.return_to_camp !== null)
            // const notDone = [...result.data.batches].filter(batch => 
            //     batch.dispatching_time === null 
            //     || (batch.dispatching_time !== null && batch.return_to_camp === null) )

            // console.log('---done--- result.data', done)
            // console.log('---notDone--- result.data', notDone)

            setDoneBatches(listDone)
            setNotDoneBatches(listNotDone)


            setLoading(false)
        } catch (e) {
            setLoading(false)
            console.log(e)
        }
    }

    useEffect(() => {
        _fetchData()
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

                    <Tab heading={<TabHeading><Text style={styles.tabTitle}>{ArText.doneTafweej}</Text></TabHeading>}>
                        {loading ? (<ActivityIndicator />) : <FoujList data={doneBatches} />}
                    </Tab>
                    <Tab heading={<TabHeading><Text style={styles.tabTitle}>{ArText.didntDoTafweej}</Text></TabHeading>}>
                        {loading ? (<ActivityIndicator />) : <FoujList data={notDoneBatches} />}
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

export default Fouj