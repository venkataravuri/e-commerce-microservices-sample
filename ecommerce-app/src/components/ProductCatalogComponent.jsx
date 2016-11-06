import React from 'react';
import ProductComponent from './ProductComponent.jsx';

class ProductCatalogComponent extends React.Component {

  constructor(props) {
    super(props);
    console.info("data: " + this.props.data)
  }

  render() {

            var products = this.props.data.map(function(product) {
                return (
                  <li key={product.id}>
                    <ProductComponent data={product} />
                  </li>
                )
            });

    return (
          <ul className="clearfix">
            {products}
          </ul>
    );
  }

}

export default ProductCatalogComponent;