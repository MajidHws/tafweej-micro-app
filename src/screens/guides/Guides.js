import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground, Dimensions, TextInput, KeyboardAvoidingView, Image } from 'react-native'
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

const Guides = (props) => {

    const [addGuide, setAddGuide] = useState(false)
    const [deleteGuide, setDeleteGuide] = useState(false)
    const [assignBatch, setAssignBatch] = useState(false)


    const _addGuideForm = () => {
        return (
            <View style={styles.modalView}>
                {/* <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}> */}
                <View style={styles.modalHeadingView}>
                    <Text style={styles.modalHeading}>{ArText.addGuide}</Text>
                </View>
                <View style={styles.modalInputView}>
                    <TextInput
                        autoFocus
                        placeholder={ArText.name}
                        style={styles.modalInput} />
                    <TextInput
                        autoFocus
                        placeholder={ArText.mobileNumber}
                        style={styles.modalInput} />
                </View>
                <View style={styles.modalBtnView}>
                    <TButton title={ArText.add} action={() => ''} />
                </View>
                {/* </KeyboardAvoidingView> */}
            </View>
        )
    }

    const _assignFoujForm = () => {
        return (
            <View style={styles.modalView}>
                {/* <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}> */}
                <View style={styles.modalHeadingView}>
                    <Text style={styles.modalHeading}>{ArText.assignBatch}</Text>
                </View>
                <View style={styles.modalInputView}>
                    <TextInput
                        autoFocus
                        placeholder={ArText.name}
                        style={styles.modalInput} />

                </View>
                <View style={styles.modalBtnView}>
                    <TButton title={ArText.assignBatch} action={() => ''} />
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
                                <Text style={styles.goodGuidesNumber}>2000</Text>
                            </View>
                            <View style={styles.goodGuidesView}>
                                <Text style={styles.goodGuides}>{ArText.guides}</Text>
                                <Text style={styles.goodGuidesNumber}>2000</Text>
                            </View>
                            <View style={styles.goodGuidesView}>
                                <Text style={styles.goodGuides}>{ArText.guides}</Text>
                                <Text style={styles.goodGuidesNumber}>2000</Text>
                            </View>
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
                    <TouchableOpacity>
                        <Text style={styles.showAll}>{ArText.showAll}</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    contentContainerStyle={{}}
                    horizontal
                    data={[1, 2, 3, 4, 5]}
                    keyExtractor={(item, i) => String(i)}
                    renderItem={({ item }, i) => <GuideCard
                        assignBatch={assignBatch}
                        setAssignBatch={setAssignBatch}
                        deleteGuide={deleteGuide}
                        setDeleteGuide={setDeleteGuide}
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
                {_search()}
                <View style={styles.content}>
                    {_guidesList()}
                    {_guidesList()}
                </View>

            </View>
        )
    }
    return (
        <>
            {_deleteGuideModal()}
            {_addGuideModal()}
            {_assignFoujModal()}
            {_content()}
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
        justifyContent: 'space-around'
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
    }
})

export default Guides