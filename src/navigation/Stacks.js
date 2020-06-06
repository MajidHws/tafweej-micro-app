import React, { useState, useEffect } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/login/Login';
import Intro from '../screens/intro/Intro';
import FoujTrip from '../screens/foujTrip/FoujTrip';

import Tabs from './Tabs'
import GuideTabs from './GuideTabs'

const Stack = createStackNavigator();
const LoginStack = createStackNavigator();

const LoginStackScreen = () => {

    const tabNav = GuideTabs

    return (
        <LoginStack.Navigator>
            <LoginStack.Screen 
            name="Login" 
            component={Login}
            options={({ route }) => ({ headerShown: false })} />
            <LoginStack.Screen name="Intro" component={Intro} options={({ route }) => ({ headerShown: false })} />
            <LoginStack.Screen name="Tabs" component={tabNav} options={({ route }) => ({headerShown: false})} />
        </LoginStack.Navigator>
    )
}
const Stacks = () => {
    return (
        <>
        <NavigationContainer>
            <LoginStackScreen/>
        </NavigationContainer>
        </>
    )
}



export default Stacks