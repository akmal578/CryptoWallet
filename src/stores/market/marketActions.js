import axios from 'axios';
export const GET_HOLD_BEGIN = 'GET_HOLD_BEGIN';
export const GET_HOLD_SUCCESS = 'GET_HOLD_SUCCESS';
export const GET_HOLD_FAIL = 'GET_HOLD_FAIL';
export const GET_COIN_BEGIN = 'GET_COIN_BEGIN';
export const GET_COIN_SUCCESS = 'GET_COIN_SUCCESS';
export const GET_COIN_FAIL = 'GET_COIN_FAIL';

// Hodl, My hodl
export const getHoldBegin = () => ({
  type: GET_HOLD_BEGIN,
});

export const getHoldSuccess = myHold => ({
  type: GET_HOLD_SUCCESS,
  payload: {myHold},
});

export const getHoldFail = error => ({
  type: GET_HOLD_FAIL,
  payload: {error},
});

export function getHoldings(
  holdings = [],
  currency = 'usd',
  orderBy = 'market_cap_desc',
  sparkline = true,
  priceChangePerc = '7d',
  perPage = 10,
  page = 1,
) {
  return dispatch => {
    dispatch(getHoldBegin());

    let ids = holdings
      .map(item => {
        return item.id;
      })
      .join(',');

    let apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}&ids=${ids}`;

    return axios({
      url: apiUrl,
      method: 'GET',
      header: {
        Accept: 'application/json',
      },
    }).then(response => {
      console.log('Get holdings');
      console.log(response);

      if (response.state == 200) {
        //Give Data
        let myHold = response.data.map(item => {
          // Retrieve current hodl -> current quantity
          let coin = holdings.find(a => a.id == item.id);

          // Price from 7 days ago
          let price7d =
            item.current_price /
            (1 + item.price_change_percentage_7d_in_currency * 0.01);

          return {
            id: item.id,
            symbol: item.symbol,
            name: item.name,
            image: item.image,
            current_price: item.current_price,
            qty: coin.qty,
            total: coin.qty * item.current_price,
            price_change_percentage_7d_in_currency:
              item.price_change_percentage_7d_in_currency,
            holding_value_change_7d: (item.curret_price - price7d) * coin.qty,
            sparkline_in_7d: {
              value: item.sparkline_in_7d.price.map(price => {
                return price * coin.qty;
              }),
            },
          };
        });

        dispatch(getHoldSuccess(myHold));
      } else {
        dispatch(getHoldFail(response.data));
      }
    });
  };
}

// Coin market

export const getCoinMarketBegin = () => ({
  type: GET_COIN_BEGIN,
});
export const getCoinMarketSuccess = coins => ({
  type: GET_COIN_SUCCESS,
  payload: {coins},
});
export const getCoinMarketFailure = error => ({
  type: GET_COIN_FAIL,
  payload: {error},
});

export function getCoinMarket(
  currency = 'usd',
  orderBy = 'market_cap_desc',
  sparkline = true,
  priceChangePerc = '7d',
  perPage = 10,
  page = 1,
) {
  return dispatch => {
    dispatch(getCoinMarketBegin());

    let apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`;

    return axios({
      url: apiUrl,
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then(response => {
        console.log('Get coins');
        console.log(response);

        if (response.state == 200) {
          dispatch(getCoinMarketSuccess(response.data));
        } else {
          dispatch(getCoinMarketFailure(response.data));
        }
      })
      .catch(error => {
        dispatch(getCoinMarketFailure(error));
      });
  };
}
