import React, { useState, useEffect } from 'react'
import { AsyncStorage, View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/login/Login';
import Intro from '../screens/intro/Intro';
import FoujTrip from '../screens/foujTrip/FoujTrip';

import Tabs from './Tabs'
import GuideTabs from './GuideTabs'
import GuideFouj from '../screens/GuideFouj/GuideFouj';
import TripDetails from '../screens/foujTrip/TripDetails'

const Stack = createStackNavigator();
const LoginStack = createStackNavigator();

const LoginStackScreen = () => {

    let tabNav = GuideTabs

    const [initialRoute, setInitialRoute] = useState('Tabs')
    const [checking, setChecking] = useState(false)
    const userType = async () => await AsyncStorage.getItem('userType')
    const _checkAuth = async () => {
        const userType = await AsyncStorage.getItem('userType')
        if (userType) {
            setChecking(true)
        }
    }

    useEffect(() => {
        // _checkAuth()
    }, [])

    const _content = async () => {
        const userType = await AsyncStorage.getItem('userType')
        const stack = checking ? (
            <LoginStack.Navigator initialRouteName="Tabs">
                <LoginStack.Screen
                    name="Login"
                    component={Login}
                    options={({ route }) => ({ headerShown: false })} />
                <LoginStack.Screen name="Intro" component={Intro} options={({ route }) => ({ headerShown: false })} />
                <LoginStack.Screen name="Tabs" component={tabNav} options={({ route }) => ({ headerShown: false })} />
                <LoginStack.Screen name="TripDetails" component={TripDetails} options={({ route }) => ({ headerShown: false })} />
            </LoginStack.Navigator>
        ) : (
                <LoginStack.Navigator initialRouteName="Login">
                    <LoginStack.Screen
                        name="Login"
                        component={Login}
                        options={({ route }) => ({ headerShown: false })} />
                    <LoginStack.Screen name="Intro" component={Intro} options={({ route }) => ({ headerShown: false })} />
                    <LoginStack.Screen name="Tabs" component={tabNav} options={({ route }) => ({ headerShown: false })} />
                </LoginStack.Navigator>
            )

        return (
            <>
                {stack}
            </>
        )
    }

    return (
        <>
            {
                userType ? (
                    <LoginStack.Navigator initialRouteName="Login">
                        <LoginStack.Screen
                            name="Login"
                            component={Login}
                            options={({ route }) => ({ headerShown: false })} />
                        <LoginStack.Screen name="Trip" component={FoujTrip} options={({ route }) => ({ headerShown: false })} />
                        <LoginStack.Screen name="TripDetails" component={TripDetails} options={({ route }) => ({ headerShown: false })} />
                        <Stack.Screen name="guideFouj" component={GuideFouj} options={({ route }) => ({ headerShown: false })} />
                        <LoginStack.Screen name="Intro" component={Intro} options={({ route }) => ({ headerShown: false })} />
                        <LoginStack.Screen name="Tabs" component={tabNav} options={({ route }) => ({ headerShown: false })} />
                    </LoginStack.Navigator>
                ) : (
                        <LoginStack.Navigator>
                            <LoginStack.Screen
                                name="Login"
                                component={Login}
                                options={({ route }) => ({ headerShown: false })} />
                            <LoginStack.Screen name="Intro" component={Intro} options={({ route }) => ({ headerShown: false })} />
                            <LoginStack.Screen name="Tabs" component={tabNav} options={({ route }) => ({ headerShown: false })} />
                        </LoginStack.Navigator>
                    )
            }


        </>
    )
}
const Stacks = () => {


    return (
        <>
            <NavigationContainer>
                <LoginStackScreen />
            </NavigationContainer>
        </>
    )
}



export default Stacks