import React, { useState, useEffect } from 'react'
import {
    View, Text, StyleSheet, ImageBackground, Dimensions,
    FlatList, SectionList,
    ActivityIndicator
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
import Axios from 'axios'
import Accordion from 'react-native-collapsible/Accordion';


const FoujTrip = (props) => {

    // const { id, code } = props.route.params
    const id = props.id
    const code = 'NAME'
    // console.log('foujId', props.id, props.route.params.id)
    const [trip, setTrip] = useState([])
    const [tripList, setTripList] = useState([])
    const [sectionList, setSectionList] = useState([])
    const [loading, setLoading] = useState(false)

    const [activeSections, setActiveSections] = useState([])
    const [sections, setSections] = useState([])

    const SECTIONS = [
        {
            title: 'First',
            content: 'Lorem ipsum...',
        },
        {
            title: 'Second',
            content: 'Lorem ipsum...',
        },
    ];
    const _renderSectionTitle = section => {
        return (
            <View style={styles.content}>
                <Text style={{ color: '#000', margin: 10 }}>{section.content}</Text>
            </View>
        );
    };

    const _renderHeader = section => {
        return (
            <>
                {_listHeader('section.title')}
            </>
        );
    };

    const _renderContent = section => {
        return (
            <View style={styles.content}>
                <Text>{section.content}</Text>
            </View>
        );
    };

    const _updateSections = activeSections => {
        setActiveSections(activeSections);
    };

    const _fetchTrip = async () => {
        setLoading(true)
        try {

            const result = await Axios.get(`http://tafweej-app.hajjtafweej.net/api/batch-Following-up/${id}`)
            // const data = result.data
            // arrival_time: "12:47"
            // dispatching_time: "12:46"
            // first_jamarah: "12:47"
            // id: 3
            // // is_jamarat: null
            // journey_end: null
            // // office_id: 2
            // return_to_camp: null
            // secound_jamarah: "12:47"
            // third_jamrah: null

            // const list = [
            // { name: 'dispatching_time', time: data.dispatching_time, title: 'وقت الخروج' },
            // { name: 'arrival_time', time: data.arrival_time, title: 'وقت الوصول' },
            // { name: 'first_jamarah', time: data.first_jamarah, title: 'الرمية الاولى' },
            // { name: 'secound_jamarah', time: data.secound_jamarah, title: 'الرمية الثانية' },
            // { name: 'third_jamrah', time: data.third_jamrah, title: 'الرمية الثالثة' },
            // { name: 'journey_end', time: data.journey_end, title: 'نهاية الرحلة' },
            // { name: 'return_to_camp', time: data.return_to_camp, title: 'العودة الى المخيم' },
            // ]





            console.log('result.data.batch_following_up', result.data.batch_following_up)
            const cleanedData = result.data.batch_following_up.map(b => {

                b.direction = '-'

                const child = {
                    direction: `${b.dispatch_location.name} الى ${b.arrival_location.name}`,
                    title: b.operation.name, data: [
                        { id: b.batch_follow_up.id, name: 'dispatch_time', time: b.batch_follow_up.dispatch_time, title: 'وقت الخروج', from: b.dispatch_location.name, to: b.arrival_location.name},
                        { id: b.batch_follow_up.id, name: 'arrival_time', time: b.batch_follow_up.arrival_time, title: 'وقت الوصول', from: b.dispatch_location.name, to: b.arrival_location.name },
                        // { id: b.batch_follow_up.dispatch_time, name: 'is_jamarat', time: b.batch_follow_up.is_jamarat, title: 'الرمية' }
                    ]
                }

                if (b.batch_follow_up.has_assembly) {
                    child.data.push(
                        { id: b.batch_follow_up.id, name: 'assembly_time', time: b.batch_follow_up.assembly_time, title: 'وقت التجمع', from: b.dispatch_location.name, to: b.arrival_location.name },
                    )
                }

                if (b.batch_follow_up.is_jamarat) {
                    child.data.push(
                        { id: b.batch_follow_up.id, name: 'back_to_tower_time', time: b.batch_follow_up.back_to_tower_time, title: 'العودة للفندق', from: b.dispatch_location.name, to: b.arrival_location.name },
                        { id: b.batch_follow_up.id, name: 'arrival_to_tower_time', time: b.batch_follow_up.arrival_to_tower_time, title: 'الوصول للفندق', from: b.dispatch_location.name, to: b.arrival_location.name },
                    )
                }

                
                return child
            })
            console.log('cleanedData', cleanedData)

            // setSectionList([
            //     { title: 'الجدول', data: tripList },
            //     { title: 'الجدول', data: tripList },
            //     { title: 'الجدول', data: tripList }
            // ])

            setSectionList(cleanedData)

            setLoading(false)
        } catch (e) {
            setLoading(false)
            console.log(e);

        }
    }

    const _guideStats = () => {
        return (
            <View style={[styles.statsContainerView, styles.shadow]}>
                {/* <Card height={180}  style={{ backgroundColor: Colors.prayerBox }}> */}
                <View style={styles.statsContainer}>

                    <View style={styles.statsHeadingView}>
                        <Text style={styles.statsHeading}>{code}</Text>
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

    const _content8 = () => {
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

    useEffect(() => {
        _fetchTrip()
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
    const _content = () => {
        return (
            <View style={styles.container}>



                {loading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator />
                    </View>
                ) : (

                        <View style={styles.contentView}>

                            {/* <Accordion
                                sections={SECTIONS}
                                activeSections={activeSections}
                                renderSectionTitle={_renderSectionTitle}
                                renderHeader={_renderHeader}
                                renderContent={_renderContent}
                                onChange={_updateSections}
                            /> */}

                            <SectionList
                                contentContainerStyle={styles.listStyle}
                                keyExtractor={(item, i) => String(i)}
                                sections={sectionList}
                                renderItem={({ item }, i) => <TripCard trip={trip} item={item} key={i} />}
                                renderSectionHeader={({ section }) => _listHeader(section.title, section.direction)}
                            />

                            {/* <FlatList
                                contentContainerStyle={styles.listStyle}
                                keyExtractor={(item, i) => String(i)}
                                data={tripList}
                                renderItem={({ item }, i) => <TripCard trip={trip} item={item} key={i} />}
                            /> */}
                            {/* <View style={styles.confirmTripView}>
                                <TButton title={ArText.confirmTrip} action={() => alert('')} />
                            </View> */}
                        </View>
                    )}






            </View>)
    }
    return (
        <>
            {_content()}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',

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
        // marginHorizontal: 10
    },
    listStyle: {
        //  flex: 1 ,
        // paddingTop: 10
    },
    confirmTripView: {
        marginBottom: 20
    },
})

export default FoujTrip