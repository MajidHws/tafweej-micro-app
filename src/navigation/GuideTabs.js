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
import profileIcon from '../../assets/icons/profile.png'
import profileActiveIcon from '../../assets/icons/profileActive.png'
import notificationsIcon from '../../assets/icons/notifications.png'
import notificationsActiveIcon from '../../assets/icons/notificationsActive.png'

import Analytics from '../screens/analytics/Analytics';
import Inspect from '../screens/inspect/Inspect';
import Guides from '../screens/guides/Guides';
import Fouj from '../screens/fouj/Fouj';
import GuideNotifications from '../screens/GuideNotifications/GuideNotificaions';
import GuideProfile from '../screens/guideProfile/GuideProfile';
import GuideFouj from '../screens/GuideFouj/GuideFouj';
import FoujTrip from '../screens/foujTrip/FoujTrip';
import { createStackNavigator } from '@react-navigation/stack';


const GuideTabs = (props) => {

    const Stack = createStackNavigator();
    const foujStack = createStackNavigator();
    const Tab = createBottomTabNavigator();

    const foujStackComponent = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Fouj" component={GuideFouj} options={({ route }) => {
                    return ({
                        headerShown: false,
                    })
                }} />

                {/* <Stack.Screen name="Trip" component={FoujTrip} options={({ route }) => {
                    return ({
                        headerShown: false,
                    })
                }} /> */}
                
            </Stack.Navigator>
        )
    }
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

            <Tab.Screen name="foujStackComponent" component={foujStackComponent} options={({ route }) => {
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

            <Tab.Screen name="notifications" component={GuideNotifications} options={({ route }) => {
                return ({
                    activeTintColor: '',
                    tabBarIcon: ({ color, focused }) => focused
                        ? <Image height={20} width={20} source={notificationsActiveIcon} />
                        : <Image height={20} width={20} source={notificationsIcon} />,
                    headerShown: false,
                    gestureDirection: 'horizontal-inverted',
                    activeTintColor: Colors.primary
                })
            }} />
            {/* <Tab.Screen name="profile" component={GuideProfile} options={({ route }) => {
                return ({
                    activeTintColor: '',
                    tabBarIcon: ({ color, focused }) => focused
                        ? <Image height={20} width={20} source={profileActiveIcon} />
                        : <Image height={20} width={20} source={profileIcon} />,
                    headerShown: false,
                    gestureDirection: 'horizontal-inverted',
                    activeTintColor: Colors.primary
                })
            }} /> */}



        </Tab.Navigator>
    )
}


export default GuideTabs