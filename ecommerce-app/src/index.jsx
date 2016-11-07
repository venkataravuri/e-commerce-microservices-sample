import React from 'react';
import {render} from 'react-dom';
import ProductCatalogComponent from './components/ProductCatalogComponent.jsx';
import products from './data/products';
import ProductStore from './components/stores/ProductStore.js';
import { getProductRecommendations } from './components/actions/ProductActions.js';
import CartComponent from './components/CartComponent.jsx';


render(<ProductCatalogComponent />, document.getElementById('product-catalog'));
render(<CartComponent />, document.getElementById('cart'));