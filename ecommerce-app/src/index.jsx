import React from 'react';
import {render} from 'react-dom';
import AwesomeComponent from './components/AwesomeComponent.jsx';
import ProductCatalogComponent from './components/ProductCatalogComponent.jsx';
import products from './data/products';

render(<ProductCatalogComponent data={products} />, document.getElementById('product-catalog'));
