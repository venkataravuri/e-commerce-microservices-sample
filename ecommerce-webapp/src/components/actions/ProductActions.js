// Product actions
import AppDispatcher from '../dispatcher/AppDispatcher';
import { AppConstants } from '../constants/AppConstants';
import { getProductRecommendationsApi } from '../api/ProductCatalogAPI';
import { addToCartApi } from '../api/CartAPI';
import { getCartApi } from '../api/CartAPI';


export function addToCart(cartItem) {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.ADD_TO_CART,
    cartItem: cartItem
  });

  addToCartApi(cartItem);
}

export function getCart(id) {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.GET_CART,
    id: id
  });

  getCartApi(id);
}

export function getProductRecommendations() {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.GET_PRODUCT_RECOMMENDATIONS,
  });

  getProductRecommendationsApi();
}

