import React, { useState, useEffect } from 'react'
import {
    View, Text, StyleSheet, ImageBackground, Dimensions, Picker,
    TextInput, KeyboardAvoidingView, Image, Button as Btn, Alert, AsyncStorage, ActivityIndicator
} from 'react-native'
import img5 from '../../../assets/img/9.png'
import { ArText } from '../../utils/ArText'
const { height, width } = Dimensions.get('screen')
import { Container, Header, Tab, Tabs, TabHeading, Icon, Button } from 'native-base';
import { Colors } from '../../utils/Colors';
import { FontAwesome, Octicons } from '@expo/vector-icons'
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler'
import TModal from '../../components/TModal'
import TButton from '../../components/TButton'
import Card from '../../components/Card'
import GuideCard from '../../components/GuideCard'
import axios from 'axios'

import {format, getDate, getMonth, getYear} from 'date-fns'
// import getDate from 'date-fns/getDate'
// import getMonth from 'date-fns/getMonth'
// import getYear from 'date-fns/getYear'
import { register, getGuides, removeGuide, getOfficeBatches, assignBatch } from '../../settings/URLS'

const Guides = (props) => {

    const [addGuide, setAddGuide] = useState(false)
    const [deleteGuide, setDeleteGuide] = useState(false)
    const [assignBatch, setAssignBatch] = useState(false)
    const [loadingGuides, setLoadingGuides] = useState(false)
    const [loadingBatches, setLoadingBatches] = useState(false)

    const [username, setUsername] = useState('Osama')
    const [mobile, setMobile] = useState('552912532')
    const [nationality, setNationality] = useState('لبناني')
    const [birthday, setBirthday] = useState('1995')
    const [password, setPassword] = useState('123123')
    const [id, setId] = useState('1234567891')

    const [guidesList, setGuidesList] = useState([1])
    const [selectedBatch, setSelectedBatch] = useState('')
    const [batches, setBatches] = useState([])

    const [selectedUserId, setSelectedUserId] = useState('')

    const [totalGuides, setTotalGuides] = useState([])
    const [totalGuideWithoutBatches, setTotalGuideWithoutBatches] = useState([])

    const _fetchGuides = async () => {

        setLoadingGuides(true)
        try {

            const userInfo = JSON.parse(await AsyncStorage.getItem('userInfo'))
            console.log(userInfo)

            const result = await axios.get(`${getGuides}?platform=${'tafweej-app'}&office_id=${userInfo.office_id}`)
            // alert('Loading Guides')

            const guides = result.data.filter(guide => guide.id !== userInfo.id)
            console.log(guides)
            setGuidesList(guides)

            setTotalGuides(() => [...guides].filter(guide => guide.batches.length > 0))
            setTotalGuideWithoutBatches(() => [...guides].filter(guide => guide.batches.length < 1))

            setLoadingGuides(false)
        } catch (e) {
            setLoadingGuides(false)
            console.log(e)
        }
    }



    const _removeGuide = async (id) => {
        try {
            setLoadingGuides(true)
            console.log(`${removeGuide}/${id}`)
            setLoadingGuides(false)
            const result = await axios.post(`${removeGuide}/${id}?platform=tafweej-app`)
            _fetchGuides()
        } catch (e) {
            console.log(e)
        }
    }

    const _addGuide = async () => {

        if (!username || !mobile || !nationality || !birthday)
            return Alert.alert('بيانات المستخدم غير مكتملة')


        try {

            const userInfo = JSON.parse(await AsyncStorage.getItem('userInfo'))

            const result = await axios.post(register, {
                // user_type: 2,
                // name: username,
                // user_name: null,
                // mobile,
                // nationality,
                // birthday,
                // password,
                // platform:'tafweej-portal',
                // est_id: userInfo.est_id,
                // office_id: userInfo.office_id,
                // email: null,
                // personal_id: id,

                platform: 'tafweej-portal',
                //email: `post20ee220@post.com`,
                office_id: userInfo.office_id,
                password: password,
                name: username,
                phone: mobile,
                user_name: 'post',
                nationality: nationality,
                personal_id: id,
                birth_date: birthday,
                user_type_id: 2,
                est_id: userInfo.est_id,
            })

            console.log(result.data)
            setAddGuide(false)
            _fetchGuides()
        } catch (e) {

        }
    }
    const _addGuideForm = () => {
        return (
            <View style={styles.modalView}>
                {/* <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}> */}
                {/* <View style={styles.modalHeadingView}>
                    <Text style={styles.modalHeading}>{ArText.addGuide}</Text>
                </View> */}
                <View style={styles.modalInputView}>
                    <TextInput
                        autoFocus
                        onChangeText={(text) => setUsername(text)}
                        value={username}
                        placeholder={ArText.name}
                        style={styles.modalInput} />
                    <TextInput
                        onChangeText={(text) => setMobile(text)}
                        value={mobile}
                        placeholder={ArText.mobileNumber}
                        style={styles.modalInput} />
                    <TextInput
                        onChangeText={(text) => setNationality(text)}
                        value={nationality}
                        placeholder={'الجنسية'}
                        style={styles.modalInput} />
                    <TextInput
                        onChangeText={(text) => setBirthday(text)}
                        value={birthday}
                        placeholder={'الميلاد'}
                        style={styles.modalInput} />
                    <TextInput
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        placeholder={'كلمة المرور'}
                        style={styles.modalInput} />
                    <TextInput
                        onChangeText={(text) => setId(text)}
                        value={id}
                        placeholder={'رقم الهوية'}
                        style={styles.modalInput} />
                </View>
                <View style={styles.modalBtnView}>
                    <TButton title={ArText.add} action={() => _addGuide()} />
                </View>
                <Btn title="الغاء" onPress={() => setAddGuide(false)} color={Colors.primary} />
                {/* </KeyboardAvoidingView> */}
            </View>
        )
    }

    const _getAllBatches = async () => {
        setLoadingBatches(true)
        try {
            const userInfo = JSON.parse(await AsyncStorage.getItem('userInfo'))
            const result = await axios.get(`http://dashboard.hajjtafweej.net/schedule/get-office-batches/${userInfo.office_id}`)
            // const result = await axios.get(`${getOfficeBatches}/${userInfo.office_id}`)
            setBatches(result.data.batches)
            setLoadingBatches(false)
        } catch (e) {
            setLoadingBatches(false)
            console.log(e)
        }
    }

    const _assignBatchToGuide = async () => {
        setLoadingBatches(true)
        // http://api.aladhan.com/v1/gToH?date=04-07-2020
        const date = new Date().getTime()
        const day = getDate(date)
        const month = getMonth(date)+1
        const year = getYear(date)
        
        const hijriDate = await axios.get(`http://api.aladhan.com/v1/gToH?date=${day}-${month}-${year}`)

        console.log('_assignBatchToGuide date', date)
        console.log('_assignBatchToGuide day', day)
        console.log('_assignBatchToGuide month', month)
        console.log('_assignBatchToGuide year', year)
        
        console.log('_assignBatchToGuide hijriDate', hijriDate.data.data.hijri.day)
        try {
            console.log('_assignBatchToGuide', selectedUserId, selectedBatch)
            const userInfo = JSON.parse(await AsyncStorage.getItem('userInfo'))

            const result = await axios.post(`${'http://dev.hajjtafweej.net/api/assign-batch'}`, {
                user_id: selectedUserId,
                batche_id: selectedBatch,
                office_id: userInfo.office_id,
                day: hijriDate.data.data.hijri.day
            })

            console.log(result)
            
            setLoadingBatches(false)
            setAssignBatch(false)
            _fetchGuides()
        } catch (e) {
            setLoadingBatches(false)
            console.log(e)
        }
    }
    const _assignFoujForm = () => {

        return (
            <View style={styles.modalView}>
                {/* <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}> */}
                <View style={styles.modalHeadingView}>
                    <Text style={styles.modalHeading}>{ArText.assignBatch}</Text>
                </View>
                {/* <Text>{selectedUserId || 0}</Text> */}
                <View style={styles.modalInputView}>
                    {/* <TextInput
                        autoFocus
                        placeholder={ArText.name}
                        style={styles.modalInput} /> */}

                    {
                        loadingBatches ? (<ActivityIndicator />) : (
                            <Picker
                                style={[styles.onePicker, { height: 80 }]} itemStyle={styles.onePickerItem}
                                selectedValue={selectedBatch}
                                // onValueChange={(value) => alert(value)}
                                onValueChange={(value) => setSelectedBatch(value)}
                            >
                                {/* <Picker.Item label="Java" value="java" />
                                <Picker.Item label="JavaScript" value="js" />
                                <Picker.Item label="Python" value="python" />
                                <Picker.Item label="Haxe" value="haxe" /> */}
                                {
                                    batches.map(batch => <Picker.Item key={batch.super_batche.id} label={batch.super_batche.batche_code} value={batch.super_batche.batche_code} />)
                                }
                            </Picker>
                        )
                    }

                </View>
                <View style={styles.modalBtnView}>
                    <TButton title={ArText.assignBatch} action={() => _assignBatchToGuide()} />
                    {/* <Btn title="الغاء" onPress={() => setAddGuide(false)} color={Colors.primary} /> */}
                </View>
                {/* </KeyboardAvoidingView> */}
            </View>
        )
    }

    const _deleteGuide = () => {
        return (
            <View style={styles.deleteModalView}>
                {/* <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}> */}
                <View style={styles.modalHeadingView}>
                    <Text style={styles.modalHeading}>{ArText.confirmDeleteGuide}</Text>
                </View>

                <View style={styles.deleteBtnsView}>
                    <TouchableOpacity>
                        <FontAwesome name="check" color={'green'} size={35} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome name="close" color={'red'} size={35} />
                    </TouchableOpacity>
                    {/* <TButton title={ArText.assignBatch} action={() => ''} /> */}
                </View>

                {/* </KeyboardAvoidingView> */}
            </View>
        )
    }

    const _addGuideModal = () => {
        return (
            <TModal modalVisible={addGuide} setModalVisible={setAddGuide}>
                {_addGuideForm()}
            </TModal>
        )
    }

    const _assignFoujModal = () => {
        //setAssignBatch(true)
        return (
            <TModal modalVisible={assignBatch} setModalVisible={setAssignBatch}>
                {_assignFoujForm()}
            </TModal>
        )
    }

    const _deleteGuideModal = () => {
        return (
            <TModal modalVisible={deleteGuide} setModalVisible={setDeleteGuide}>
                {_deleteGuide()}
            </TModal>
        )
    }

    const _guideStats = () => {
        return (
            <View style={styles.statsContainerView}>
                <Card>
                    <View style={styles.statsContainer}>
                        <View style={styles.iconView}>
                            <Image source={require('../../../assets/icons/guideWhiteIcon.png')} height={100} width={100} />
                        </View>
                        <View style={styles.statsViewView}>
                            <View style={styles.goodGuidesView}>
                                <Text style={styles.goodGuides}>{ArText.theGuides}</Text>
                                <Text style={styles.goodGuidesNumber}>{totalGuides.length}</Text>
                            </View>
                            <View style={styles.goodGuidesView}>
                                <Text style={styles.goodGuides}>{'بدون افواج'}</Text>
                                <Text style={styles.goodGuidesNumber}>{totalGuideWithoutBatches.length}</Text>
                            </View>
                            {/* <View style={styles.goodGuidesView}>
                                <Text style={styles.goodGuides}>{ArText.guides}</Text>
                                <Text style={styles.goodGuidesNumber}>2000</Text>
                            </View> */}
                        </View>
                    </View>
                </Card>
            </View>
        )
    }
    const _search = () => {
        return (
            <View style={styles.searchContainer}>
                <Card height={40} style={styles.cardStyle}>
                    <View style={styles.searchViewContainer}>
                        <Octicons name="search" color={'gray'} size={20} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder={ArText.guideSearch}
                        />
                    </View>
                </Card>
            </View>
        )
    }

    const _guidesList = (data, title) => {
        return (
            <View style={styles.guidesListContainer}>
                <View style={styles.guidesListView}>
                    <Text style={styles.guidesListTitle}>{ArText.theGuides}</Text>
                    {/* <TouchableOpacity>
                        <Text style={styles.showAll}>{ArText.showAll}</Text>
                    </TouchableOpacity> */}
                </View>
                <FlatList
                    contentContainerStyle={{ padding: 15 }}
                    //horizontal
                    numColumns={3}
                    data={guidesList}
                    keyExtractor={(item, i) => String(i)}
                    renderItem={({ item }, i) => <GuideCard
                        removeGuide={_removeGuide}
                        assignBatch={assignBatch}
                        setAssignBatch={setAssignBatch}
                        deleteGuide={deleteGuide}
                        setDeleteGuide={setDeleteGuide}
                        guide={item}
                        setSelectedUserId={setSelectedUserId}
                    />}
                />
            </View>
        )
    }

    const _content = () => {
        return (
            <View style={styles.container}>
                <View style={styles.headerView}>
                    <ImageBackground style={{ width: width, height: 200 }} resizeMode={'cover'} source={img5}>
                        <View style={styles.headingContainer}>
                            <View style={styles.headingView}>
                                {/* <Text style={styles.heading}>{ArText.analytic}</Text> */}
                            </View>
                            <View style={styles.headingView}>
                                <Text style={styles.heading}>{ArText.guides}</Text>
                            </View>
                            <View style={styles.headingView}>
                                <TouchableOpacity onPress={() => setAddGuide(true)}>
                                    <Text style={styles.addGuide}>{ArText.addGuide}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ImageBackground>
                </View>

                {_guideStats()}
                {/* {_search()} */}
                <View style={styles.content}>
                    {_guidesList()}
                    {/* {_guidesList()} */}
                </View>

            </View>
        )
    }

    useEffect(() => {
        _fetchGuides()
        _getAllBatches()
    }, [])

    return (
        <>
            {_deleteGuideModal()}
            {_addGuideModal()}
            {_assignFoujModal()}
            {loadingGuides ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator />
                </View>
            ) : _content()}
        </>
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
        height: 340,
        top: -120
    },
    deleteModalView: {
        backgroundColor: Colors.prayerBox,
        padding: 20,
        borderRadius: 10,
        width: width * .7,
        height: 200,
        top: -120
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

    },
    modalInput: {
        textAlign: 'right',
        padding: 8,
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
        top: -50,

    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.prayerBox,
        padding: 10,
        borderRadius: 5
    },
    statsView: {

    },
    statsViewView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        // backgroundColor: 'red',
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
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    goodGuides: {
        fontSize: 16,
    },
    goodGuidesNumber: {

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
    onePicker: {
        //width: 200,
        height: 40,
        //backgroundColor: '#FFF0E0',
        // borderColor: 'black',
        //borderWidth: 1,
        marginVertical: 10
    },
    onePickerItem: {
        height: 44,
        //color: 'red'
    }
})

export default Guides