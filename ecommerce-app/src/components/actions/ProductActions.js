// Product actions
import AppDispatcher from '../dispatcher/AppDispatcher';
import { AppConstants } from '../constants/AppConstants';
import { getProductRecommendationsApi } from '../api/ProductCatalogAPI';


export function addToCart(product) {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.ADD_TO_CART,
    product: product
  });
}


export function getProductRecommendations() {
  AppDispatcher.handleViewAction({
    actionType: AppConstants.GET_PRODUCT_RECOMMENDATIONS,
  });

  getProductRecommendationsApi();
}

