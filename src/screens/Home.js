import React from 'react';
import {View, Text, Button} from 'react-native';
import {MainLayout} from './';
import {SIZES} from '../constants';

const Home = () => {
  return (
    <MainLayout>
      <View>
        <Button
          title="hello"
          onPress={() => {
            console.log('test');
          }}
        />
      </View>
    </MainLayout>
  );
};

export default Home;
