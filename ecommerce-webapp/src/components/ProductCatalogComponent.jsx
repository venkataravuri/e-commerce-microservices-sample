import React from 'react';
import ProductComponent from './ProductComponent.jsx';
import { getProductRecommendations } from './actions/ProductActions.js';
import ProductStore from './stores/ProductStore.js';

class ProductCatalogComponent extends React.Component {

    constructor(props) {
      super(props);
      this._onChange = this._onChange.bind(this);
      getProductRecommendations();
      this.state = ProductStore.getProducts();
    }

    componentDidMount() {
      ProductStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
      ProductStore.removeChangeListener(this._onChange);
    }

    _onChange() {
      console.info("list: " + ProductStore.getProducts())
      this.setState(ProductStore.getProducts());
    }

  _getProductRecommendations() {
    getProductRecommendations();
  }

  render() {

            var products = this.state.products.map(function(product) {
                return (
                  <li key={product.name}>
                    <ProductComponent data={product} />
                  </li>
                )
            });

    return (
                <div>
                              <ul className="clearfix">
                                {products}
                              </ul>
                  </div>

    );
  }

}

export default ProductCatalogComponent;