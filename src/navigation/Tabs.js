import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../utils/Colors';

import CircleIcon from '../../assets/icons/circle.png'
import CircleActiveIcon from '../../assets/icons/circle-active.png'
import AccIcon from '../../assets/icons/acc.png'
import AccActiveIcon from '../../assets/icons/acc-active.png'
import GuideIcon from '../../assets/icons/guide.png'
import GuideActiveIcon from '../../assets/icons/guide-active.png'
import FoujIcon from '../../assets/icons/fouj.png'
import FoujActiveIcon from '../../assets/icons/fouj-active.png'

import Analytics from '../screens/analytics/Analytics';
import Inspect from '../screens/inspect/Inspect';
import Guides from '../screens/guides/Guides';
import Fouj from '../screens/fouj/Fouj';


const Tabs = (props) => {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            style={{ backgroundColor: 'white' }}
            tabBarOptions={{
                showLabel: false,
                activeTintColor: Colors.primary,
                inactiveTintColor: 'gray',

            }}
            initialRoute="Analytics"
        >

            <Tab.Screen name="Analytics" component={Analytics} options={({ route }) => {
                return ({
                    activeTintColor: '',
                    tabBarIcon: ({ color, focused }) => focused
                        ? <Image height={20} width={20} source={CircleActiveIcon} />
                        : <Image height={20} width={20} source={CircleIcon} />,
                    headerShown: false,
                    gestureDirection: 'horizontal-inverted',
                    activeTintColor: Colors.primary
                })
            }} />
            <Tab.Screen name="Inspect" component={Inspect} options={({ route }) => {
                return ({
                    activeTintColor: '',
                    tabBarIcon: ({ color, focused }) => focused
                        ? <Image height={20} width={20} source={AccActiveIcon} />
                        : <Image height={20} width={20} source={AccIcon} />,
                    headerShown: false,
                    gestureDirection: 'horizontal-inverted',
                    activeTintColor: Colors.primary
                })
            }} />
            <Tab.Screen name="Guides" component={Guides} options={({ route }) => {
                return ({
                    activeTintColor: '',
                    tabBarIcon: ({ color, focused }) => focused
                        ? <Image height={20} width={20} source={GuideActiveIcon} />
                        : <Image height={20} width={20} source={GuideIcon} />,
                    headerShown: false,
                    gestureDirection: 'horizontal-inverted',
                    activeTintColor: Colors.primary
                })
            }} />
            <Tab.Screen name="Fouj" component={Fouj} options={({ route }) => {
                return ({
                    activeTintColor: '',
                    tabBarIcon: ({ color, focused }) => focused
                        ? <Image height={20} width={20} source={FoujActiveIcon} />
                        : <Image height={20} width={20} source={FoujIcon} />,
                    headerShown: false,
                    gestureDirection: 'horizontal-inverted',
                    activeTintColor: Colors.primary
                })
            }} />

        </Tab.Navigator>
    )
}


export default Tabs