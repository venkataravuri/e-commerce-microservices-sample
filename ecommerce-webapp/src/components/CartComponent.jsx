import React from 'react';
import { addToCart } from './actions/ProductActions.js';
import ProductStore from './stores/ProductStore.js';

class CartComponent extends React.Component {

  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
    this.state = ProductStore.getCart();
  }

    componentDidMount() {
      ProductStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
      ProductStore.removeChangeListener(this._onChange);
    }

    _onChange() {
      this.setState(ProductStore.getCart());
    }

    render() {

        var items = this.state.cart.items.map(function(item) {
            return (
              <li key={item.id} className="cart-item">
                <span className="cart-item__name">{item.name}</span>
                <span className="cart-item__price">{item.price} {item.currency}</span>
              </li>
            )
        });

        var body = (
          <ul>
            {items}
          </ul>
        );

        var empty = <div className="alert alert-info">Cart is empty</div>;

        return (
          <div className="panel panel-default">
            <div className="panel-body">
              {body}
              <div className="cart__total">Total: {this.state.cart.total} {this.state.cart.currency}</div>
            </div>
          </div>
        );
    }
}

export default CartComponent;