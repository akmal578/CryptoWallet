import React from 'react';
import {Text, View, Image} from 'react-native';
import {FONTS, COLORS} from '../constants';

const TabIcon = ({focused, icon, iconStyle, label, isTrade}) => {
  if (isTrade) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: 55,
          height: 55,
          borderRadius: 40,
          backgroundColor: COLORS.black,
        }}>
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
            tintColor: COLORS.white,
            ...iconStyle,
          }}
        />
        <Text style={{color: COLORS.white, ...FONTS.h4}}>Trade</Text>
      </View>
    );
  } else {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
            tintColor: focused ? COLORS.white : COLORS.secondary,
            ...iconStyle,
          }}
        />
        <Text
          style={{
            ...FONTS.h4,
            color: focused ? COLORS.white : COLORS.secondary,
          }}>
          {label}
        </Text>
      </View>
    );
  }
};

export default TabIcon;
