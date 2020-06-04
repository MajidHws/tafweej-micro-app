import React, { useState, useEffect } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/login/Login';
import Intro from '../screens/intro/Intro';
import Tabs from './Tabs'
const Stack = createStackNavigator();
const LoginStack = createStackNavigator();

const LoginStackScreen = () => {
    return (
        <LoginStack.Navigator>
            <LoginStack.Screen 
            name="Login" 
            component={Login}
            options={({ route }) => ({ headerShown: false })} />
            <LoginStack.Screen name="Intro" component={Intro} options={({ route }) => ({ headerShown: false })} />
            <LoginStack.Screen name="Tabs" component={Tabs} options={({ route }) => ({headerShown: false})} />

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