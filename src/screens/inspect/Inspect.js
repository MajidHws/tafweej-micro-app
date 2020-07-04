import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground, Dimensions, 
    FlatList, AsyncStorage, ActivityIndicator, Button } from 'react-native'
import img5 from '../../../assets/img/7.png'
import { ArText } from '../../utils/ArText'
const { height, width } = Dimensions.get('screen')
import { Container, Header, Tab, Tabs, TabHeading, Icon } from 'native-base';
import { Colors } from '../../utils/Colors';
import { FontAwesome5 } from '@expo/vector-icons'
import InspectionForm from '../../components/InspectionForm'
import TButton from '../../components/TButton'
import TimelineTab from './TimelineTab'
import axios from 'axios'
import { getCampReadiness } from '../../settings/URLS'

const Inspect = (props) => {

    const INSPECTION_LIST_URL = `${getCampReadiness}`

    const [loading, setLoading] = useState(false)
    const [inspectionList, setInspectionList] = useState([])

    const _fetchInspectionList = async () => {
        setLoading(true)
        try {
            const userInfo = await AsyncStorage.getItem('userInfo')
            const { id } = JSON.parse(userInfo)
            console.log('url', `${INSPECTION_LIST_URL}/${id}`)
            const result = await axios.get(`${INSPECTION_LIST_URL}/${id}`)
            //const res = await fetch(URL)
            //const result = await res.json()
            console.log(result.data.requirements)
            setInspectionList(result.data.requirements)
            setLoading(false)
        } catch (e) {
            setLoading(false)
            console.log(e)
        }
    }

    useEffect(() => {
        _fetchInspectionList()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.headerView}>
                <ImageBackground style={{ width: width, height: 300 }} resizeMode={'cover'} source={img5}>
                    <View style={styles.headingContainer}>
                        <View style={styles.headingView}>
                            <Text style={styles.heading}>{ArText.accommodation}</Text>
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

                    <Tab heading={<TabHeading><Text style={styles.tabTitle}>{ArText.readiness}</Text></TabHeading>}>
                        {loading ? (<ActivityIndicator />) : (<FlatList
                            contentContainerStyle={{ paddingHorizontal: 10, marginTop: 10 }}
                            keyExtractor={(item, i) => String(i)}
                            data={inspectionList}
                            renderItem={({ item }) => <InspectionForm item={item} />}
                        />)}

                        {/* <View style={styles.saveBtnView}>
                            <TButton title={ArText.saveBtn} />
                        </View> */}
                    </Tab>
                    {/* <Tab heading={<TabHeading><Text style={styles.tabTitle}>{'متابعة الحركة'}</Text></TabHeading>}>
                        <TimelineTab />
                    </Tab> */}

                    

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
        color: Colors.primary,
        fontSize: 13,
        marginStart: 3
    },
    saveBtnView: {
        margin: 15
    },
    headerView: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    headingContainer: {
        //flexDirection: 'row',
        flex: 1,
        // backgroundColor: 'red',
        // justifyContent: 'space-around',
        // alignItems: 'center'
    },
    headingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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

export default Inspect