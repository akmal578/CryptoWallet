import React from 'react';
import {View, Text} from 'react-native';

import {connect} from 'react-redux';
import {getHoldings, getCoinMarket} from '../stores/market/marketActions';
import {useFocusEffect} from '@react-navigation/native';

import {MainLayout} from './';

import {SIZES, COLORS, FONTS, dummyData, icons} from '../constants';

const Home = ({getHoldings, getCoinMarket, myHoldings, coins}) => {
  useFocusEffect(
    React.useCallback(() => {
      getHoldings((holdings = dummyData.holdings));
      getCoinMarket();
    }, []),
  );

  return (
    <MainLayout>
      <View>
        <Text>Home</Text>
      </View>
    </MainLayout>
  );
};

function mapStatetoProps(state) {
  return {
    myHoldings: state.marketReducer.myHoldings,
    coins: state.marketReducer.coins,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getHoldings: (
      holdings,
      currency,
      coinList,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page,
    ) => {
      return dispatch(
        getHoldings(
          holdings,
          currency,
          coinList,
          orderBy,
          sparkline,
          priceChangePerc,
          perPage,
          page,
        ),
      );
    },

    getCoinMarket: (
      currency,
      coinList,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page,
    ) => {
      return dispatch(
        getCoinMarket(
          currency,
          coinList,
          orderBy,
          sparkline,
          priceChangePerc,
          perPage,
          page,
        ),
      );
    },
  };
}

export default connect(mapStatetoProps, mapDispatchToProps)(Home);
