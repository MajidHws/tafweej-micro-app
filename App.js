import React from 'react';
import { StyleSheet, Text, View, I18nManager, Platform } from 'react-native';

import Tabs from './src/navigation/Tabs'
import Stacks from './src/navigation/Stacks'


export default function App() {

  // I18nManager.allowRTL(!Platform.OS === 'ios')
  // I18nManager.forceRTL(!Platform.OS === 'ios')

  return (
    <>
      <Stacks />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
