import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground, Dimensions, FlatList, KeyboardAvoidingView } from 'react-native'
import img5 from '../../../assets/img/7.png'
import { ArText } from '../../utils/ArText'
const { height, width } = Dimensions.get('screen')
import { Container, Header, Tab, Tabs, TabHeading, Icon } from 'native-base';
import { Colors } from '../../utils/Colors';
import { FontAwesome5 } from '@expo/vector-icons'
import InspectionForm from '../../components/InspectionForm'
import TButton from '../../components/TButton'
import TimelineTab from './TimelineTab'

const Inspect = (props) => {
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
                        <FlatList
                            contentContainerStyle={{ paddingHorizontal: 10, marginTop: 10 }}
                            keyExtractor={(item, i) => String(i)}
                            data={[1, 2, 3, 4]}
                            renderItem={({ item }) => <InspectionForm />}
                        />

                        <View style={styles.saveBtnView}>
                            <TButton title={ArText.saveBtn} />
                        </View>
                    </Tab>
                    <Tab heading={<TabHeading><Text style={styles.tabTitle}>{ArText.accommodation}</Text></TabHeading>}>
                        <TimelineTab />
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