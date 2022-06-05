import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const MainLayout = ({children}) => {
  return <View style={{flex: 1}}>{children}</View>;
};

export default MainLayout;

const styles = StyleSheet.create({});