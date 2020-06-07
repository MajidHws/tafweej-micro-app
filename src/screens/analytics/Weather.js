import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import Colors from '../../utils/Colors'
import WeatherCard from '../../components/WeatherCard'


const Weather = (props) => {

    const _listHeader = () => {
        return (
            <View style={styles.headingInfo} >

                <View style={styles.tempTextView}>
                    <Text style={styles.tempText}>22</Text>
                </View>

                <View style={styles.weatherDetailsView}>
                    <View style={styles.weatherView}>
                        <Text>weather</Text>
                        <Text style={styles.degree}>19</Text>
                    </View>
                    <View style={styles.weatherPeriodView}>
                        <View style={styles.weatherPeriod}>
                            <View style={styles.weatherPeriodOrangeDo} />
                            <Text>weather</Text>
                        </View>
                        <View style={styles.weatherPeriod}>
                            <View style={styles.weatherPeriodGrayDo} />
                            <Text>weather</Text>
                        </View>
                    </View>
                </View>

            </View>
        )

    }
    return (
        <View style={styles.container}>

            {_listHeader()}
            <View style={styles.listContainer}>
                <FlatList
                    //ListHeaderComponent={() => _listHeader()}
                    keyExtractor={(item, i) => String(i)}
                    data={[1, 2, 3, 4, 5, 6, 7]}
                    renderItem={({ item }) => <WeatherCard />}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tempTextView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
    },
    tempText: {
        fontSize: 60,
        color: 'rgb(166, 115, 96)'
    },
    weatherDetailsView: {
        marginHorizontal: 130
    },
    weatherView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        borderBottomWidth: .5,
        borderBottomColor: 'lightgray',
        paddingBottom: 5
    },
    headingInfo: {

    },
    degree: {
        color: 'gray'
    },
    weatherPeriodView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    weatherPeriod: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    weatherPeriodOrangeDo: {
        width: 10,
        height: 10,
        backgroundColor: 'rgb(217, 154, 87)',
        borderRadius: 5,
        marginRight: 5
    },
    weatherPeriodGrayDo: {
        width: 10,
        height: 10,
        backgroundColor: 'lightgray',
        borderRadius: 5,
        marginRight: 5
    },
    listContainer: {
        margin: 20,
        flex: 1
    }
})

export default Weather