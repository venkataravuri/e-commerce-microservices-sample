// Product store
//
// Requiring the Dispatcher, Constants, and
// event emitter dependencies
import AppDispatcher from '../dispatcher/AppDispatcher';
import { AppConstants } from '../constants/AppConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

// Define the store as an empty array
let _store = {
  products: [],
  cart: {
    id: null,
    items: [],
    total: 0,
    currency: 'INR'
  }
};

// Define the public event listeners and getters that
// the views will use to listen for changes and retrieve
// the store
class ProductStoreClass extends EventEmitter {

  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }

  getProducts() {
    return _store;
  }

  getCart() {
    return _store;
  }

}

// Initialize the singleton to register with the
// dispatcher and export for React components
const ProductStore = new ProductStoreClass();

// Register each of the actions with the dispatcher
// by changing the store's data and emitting a
// change
AppDispatcher.register((payload) => {
  const action = payload.action;

  switch (action.actionType) {

  case AppConstants.ADD_TO_CART_RESPONSE:
    console.info("Added product to cart on backend: " + action.response.id);
    _store.cart = action.response;
        // Add the data defined in the TodoActions
        // which the View will pass as a payload
    ProductStore.emit(CHANGE_EVENT);
  break;

  case AppConstants.GET_PRODUCT_RECOMMENDATIONS_RESPONSE:

    console.info("Product recommendations api call results: " + action.response[0].name);
    // Add the new todo to the list
    _store.products = action.response;
    console.info("Product recommendations: " +  _store.products);
    ProductStore.emit(CHANGE_EVENT);
    break;

  default:
    return true;
  }
});

export default ProductStore;

