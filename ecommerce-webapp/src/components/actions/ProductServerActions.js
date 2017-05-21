// Product Server actions
import AppDispatcher from '../dispatcher/AppDispatcher';
import { AppConstants } from '../constants/AppConstants';


export function receiveProductRecommendations(response) {
  AppDispatcher.handleServerAction({
    actionType: AppConstants.GET_PRODUCT_RECOMMENDATIONS_RESPONSE,
    response: response,
  });
}

export function receiveCartResponse(response) {
  AppDispatcher.handleServerAction({
    actionType: AppConstants.GET_CART_RESPONSE,
    response: response,
  });
}

export function receiveAddToCartResponse(response) {
  AppDispatcher.handleServerAction({
    actionType: AppConstants.ADD_TO_CART_RESPONSE,
    response: response,
  });
}


