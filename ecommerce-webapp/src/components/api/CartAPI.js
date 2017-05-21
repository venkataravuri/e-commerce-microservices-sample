// Random User API logic
import { receiveAddToCartResponse, receiveCartResponse } from '../actions/ProductServerActions';
import { AppConstants } from '../constants/AppConstants';
import request from 'superagent';

export function addToCartApi(cartItem) {
  request.post('http://' + AppConstants.SERVER + ':' + AppConstants.CART_MICROSERVICE_PORT + '/cart/1234')
    .send(cartItem)
    .set('Accept', 'application/json')
    .end((err, response) => {
      if (err) return console.error(err);

      receiveAddToCartResponse(response.body);
    });
}

    export function getCartApi(id) {
  request.get('http://' + AppConstants.SERVER + ':' + AppConstants.CART_MICROSERVICE_PORT + '/cart/1234')
    .set('Accept', 'application/json')
    .end((err, response) => {
      if (err) return console.error(err);

      receiveCartResponse(response.body);
    });
}
