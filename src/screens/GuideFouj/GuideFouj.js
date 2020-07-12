import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground, Dimensions, AsyncStorage, ActivityIndicator, SectionList } from 'react-native'
import img5 from '../../../assets/img/7.png'
import { ArText } from '../../utils/ArText'
const { height, width } = Dimensions.get('screen')
import { Container, Header, Tab, Tabs, TabHeading, Icon } from 'native-base';
import { Colors } from '../../utils/Colors';
import { FontAwesome5 } from '@expo/vector-icons'
import FoujList from './FoujList'
import Axios from 'axios'
import TripCard from '../../components/TripCard'

import { getGuideBatches } from '../../settings/URLS'
import FoujTrip from '../foujTrip/FoujTrip'

const GuideFouj = (props) => {

    const [doneBatches, setDoneBatches] = useState([])
    const [notDoneBatches, setNotDoneBatches] = useState([])
    const [schedule, setSchedule] = useState(null)
    const [program, setProgram] = useState(null)
    const [id, setId] = useState(null)

    const _fetchBatches = async () => {
        try {

            const userInfo = await AsyncStorage.getItem('userInfo')
            const { id } = JSON.parse(userInfo)
            const result = await Axios.get(`${'http://tafweej-app.hajjtafweej.net/api/schedule'}/${id}`)
            const data = result.data
            setId(id)

            // batch.return_to_camp !== null
            // batch.dispatching_time === null
            //             || (batch.dispatching_time !== null && batch.return_to_camp === null)



            const cleanedData = data.schedule.map(b => {
                if (b === null) return

                console.log('b.direction = `${b.dispatch_location.name} إالى ${b.arrival_location.name}`', b.direction = `${b.dispatch_location.name} إالى ${b.arrival_location.name}`);

                const child = {
                    direction: `${b.dispatch_location.name} الى ${b.arrival_location.name}`,
                    title: b.operation.name, data: [
                        { id: b.id, name: 'dispatch_time', time: b.dispatch_time, title: 'وقت الخروج', from: b.dispatch_location.name, to: b.arrival_location.name },
                        { id: b.id, name: 'arrival_time', time: b.arrival_time, title: 'وقت الوصول', from: b.dispatch_location.name, to: b.arrival_location.name },
                        // { id: b.dispatch_time, name: 'is_jamarat', time: b.is_jamarat, title: 'الرمية' }
                    ]
                }

                if (b.is_jamarat) {
                    child.data.push(
                        { id: b.id, name: 'back_to_tower_time', time: b.back_to_tower_time, title: 'العودة للفندق', from: b.dispatch_location.name, to: b.arrival_location.name },
                        { id: b.id, name: 'arrival_to_tower_time', time: b.arrival_to_tower_time, title: 'الوصول للفندق', from: b.dispatch_location.name, to: b.arrival_location.name },
                    )
                }

                if (b.has_assembly) {
                    child.data.push(
                        { id: b.id, name: 'assembly_time', time: b.assembly_time, title: 'وقت التجمع', from: b.dispatch_location.name, to: b.arrival_location.name },
                    )
                }

                return child
            })
            if (data.schedule.length > 0) {

                setProgram(data.schedule[0].program)
            } else {
                setProgram({})

            }
            setSchedule(cleanedData)
            console.log('direction', cleanedData);



            const notDone = []
            const done = []

        } catch (e) {
            console.log(e)
        }
    }

    const _goToFoujDetails = (id, code) => {
        // alert(id)
        props.navigation.navigate('Trip', { id, code })
    }

    useEffect(() => {
        _fetchBatches()
    }, [])

    const _listHeader = (header, direction) => {
        return (
            <View style={{ paddingRight: 0, }}>
                {/* <View style={{height: 20, backgroundColor: '#fff'}}/> */}
                <View style={{
                    backgroundColor: Colors.primary,
                    padding: 5,
                    // borderTopRightRadius: 20,
                    // borderBottomRightRadius: 20
                }}>

                    <Text style={{ textAlign: 'left', color: '#fff', fontSize: 12, fontWeight: 'bold' }}>                        
                        {header}
                    </Text>

                    <Text style={{ textAlign: 'left', color: '#fff', fontSize: 10}}>
                        {direction}
                    </Text>

                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>

            <View style={styles.headerView}>
                <ImageBackground style={{ width: width, height: 180 }} resizeMode={'cover'} source={img5}>
                    <View style={styles.headingContainer}>
                        <View style={styles.headingView}>
                            {
                                program !== null ? (
                                    <View style={{
                                        backgroundColor: program.color,
                                        padding: 10,
                                        height: 40,
                                        width: 40,
                                        borderRadius: 20,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={[styles.heading, {fontWeight: 'bold'}]}>{schedule !== null ? program.name : ''}</Text>
                                    </View>
                                ) : (<ActivityIndicator />)
                            }
                        </View>
                        <View style={styles.headingBackBtnView}>
                            {/* <Text style={styles.estName}>ESTABLISHMENT</Text> */}
                        </View>
                    </View>
                </ImageBackground>
            </View>

            <Container style={{

            }}>
                <Tabs tabBarUnderlineStyle={{ borderBottomWidth: 4, borderColor: Colors.primary }}>

                    <Tab heading={<TabHeading><Text style={styles.tabTitle}>{'الجدول'}</Text></TabHeading>}>
                        {/* <FoujList
                            navigation={props.navigation}
                            goToFoujDetails={_goToFoujDetails}
                            data={notDoneBatches}
                            title={ArText.foujNotOutYet} /> */}

                        {/* <View style={{paddingRight: 20, marginTop: 20}}>
                            <View style={{
                                backgroundColor: Colors.primary,
                                padding: 5,
                                borderTopRightRadius: 20,
                                borderBottomRightRadius: 20
                            }}>
                                <Text style={{ textAlign: 'left', color: '#fff', fontSize: 20, fontWeight: 'bold' }}>{'الجدول'}</Text>
                            </View>
                        </View> */}

                        <SectionList
                            contentContainerStyle={styles.listStyle}
                            keyExtractor={(item, i) => String(i)}
                            sections={schedule}
                            renderItem={({ item }, i) => <TripCard showTime={true} item={item} key={i} />}
                            renderSectionHeader={({ section }) => _listHeader(section.title, section.direction)}
                        />

                    </Tab>

                    <Tab heading={<TabHeading><Text style={styles.tabTitle}>{'متابعة الحركة'}</Text></TabHeading>}>
                        <FoujTrip id={id} />
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