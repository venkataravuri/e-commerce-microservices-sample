import React from 'react';

class ProductComponent extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
        // assign to props
        var data = this.props.data;

        return (
          <div className="thumbnail">
            <img src={data.image} alt="product image" />
            <div className="caption clearfix">
              <h3><a href={data.url}>{data.name}</a></h3>
              <div className="product__price">{data.price} {data.currency}</div>
              <div className="product__button-wrap">
                <button className="btn btn-primary">Add to cart
                </button>
              </div>
            </div>
          </div>
        );
  }

}

export default ProductComponent;
