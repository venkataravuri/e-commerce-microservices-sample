// Random User API logic
import { receiveProductRecommendations } from '../actions/ProductServerActions';
import { AppConstants } from '../constants/AppConstants';
import request from 'superagent';

export function getProductRecommendationsApi() {
  request.get('http://' + AppConstants.SERVER + ':' + AppConstants.PRODUCT_MICROSERVICE_PORT + '/products/recommendations')
    .set('Accept', 'application/json')
    .end((err, response) => {
      if (err) return console.error(err);

      receiveProductRecommendations(response.body);
    });
}

