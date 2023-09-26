import React, { useState } from "react";
import { useCart } from "react-use-cart";
import { useNavigate } from "react-router-dom";
import Checkout from "../components/Checkout";

const Cart = () => {
  const [checkout, setCheckout] = useState(false);
  const { isEmpty, items, cartTotal, removeItem } = useCart();
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();

  if (checkout) {
    return (
      <div className="container">
        <h4>payment page</h4>
        <Checkout /> <br />
        <button className="btn red" onClick={() => setCheckout(false)}>
          Cancel
        </button>
      </div>
    );
  }
  if (isEmpty) return <h1>Your cart is empty</h1>;
  if (items) console.log(items);

  return (
    <div>
      <div className="container row">
        <ul className="collection col m8">
          {items.map((item) => {
            return (
              <li className="collection-item avatar">
                <img src={`${item.img}`} className="circle" alt="circle" />
                <span className="title truncate">{item.name}</span>
                <p className="green-text">
                  Price - ₹ {item.price} x {item.quantity} = ₹{item.itemTotal}
                </p>
                <i
                  onClick={() => removeItem(item.id)}
                  className="secondary-content material-icons red-text"
                >
                  remove_circle
                </i>
              </li>
            );
          })}
        </ul>
        <div
          className="col m3 offset-m1"
          style={{ position: "sticky", top: "2px" }}
        >
          <h3>Total Price</h3>
          <h3>₹ {cartTotal}</h3>
          {jwt ? (
            <button className="btn blue" onClick={() => setCheckout(true)}>
              checkout
            </button>
          ) : (
            <div
              className="card-panel red white-text"
              onClick={() => navigate("/login")}
            >
              Please login to checkout
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
