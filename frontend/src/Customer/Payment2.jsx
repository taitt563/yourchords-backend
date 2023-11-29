import React from "react";
import "./Payment.css";
//bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import CardIcon from "./assets/card_icon2.png";

function Payment() {
  return (
    <div className="maincontainer">
      <div className="container">
        <div className="py-5 text-center">
          <h2>PAYMENT</h2>
        </div>
        <div className="row">
          <div className="col-md-4 order-md-2 mb-4" style={{backgroundColor: '#24b1ed',borderRadius: '10px',height:'350px'}}>
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Your cart</span>
            </h4>
            <ul className="list-group mb-3">
              <li className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h3 className="order-id">Order #</h3>
                </div>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h4 className="product">Product #1</h4>
                  <small className="text-description">Brief description</small>
                </div>
                <span className="price"></span>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h4 className="product">Product #2</h4>
                  <small className="text-description">Brief description</small>
                </div>
                <span className="price"></span>
              </li>

              <li className="list-group-item d-flex justify-content-between">
                <span>
                  <h5>Total (VND)</h5>
                </span>
                <strong className="totalPrice">1.000.000</strong>
              </li>
            </ul>
          </div>

          <div className="col-md-8 order-md-1">
            <h4 className="mb-3">Payment form</h4>
            <form className="paymentForm" noValidate>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstName">First name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder=""
                  />
                  <div className="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName">Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder=""
                  />
                  <div className="invalid-feedback">
                    Valid last name is required.
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="username">Username</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">@</span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Username"
                    required
                  />
                  <div className="invalid-feedback">
                    Your username is required.
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="you@example.com"
                />
                <div className="invalid-feedback">
                  Please enter a valid email address.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="1234 Calmette"
                  required
                />
                <div className="invalid-feedback">
                  Please enter your shipping address.
                </div>
              </div>

              <h4 className="mb-3">Payment options</h4>
              <div className="d-block my-3">
                <div className="custom-control custom-radio">
                  <input
                    id="credit"
                    name="paymentMethod"
                    type="radio"
                    className="custom-control-input"
                  />
                  <label className="custom-control-label" htmlFor="credit">
                    Credit card/Debit card
                  </label>
                </div>
                <div>
                  <img
                    src={CardIcon}
                    alt="harry potter"
                    style={{ width: "150px", height: "150px" }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="cc-name">Name on card</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-name"
                    placeholder=""
                    required
                  />
                  <small className="text-muted">
                    Full name as displayed on card
                  </small>
                  <div className="invalid-feedback">
                    Name on card is required
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="cc-number">Card number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-number"
                    placeholder="0000 - 0000 - 0000 - 0000"
                    required
                  />
                  <div className="invalid-feedback">
                    Card number is required
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <label htmlFor="cc-expiration">Expiration</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-expiration"
                    placeholder=""
                    required
                  />
                  <div className="invalid-feedback">
                    Expiration date required
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="cc-expiration">CVV</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-cvv"
                    placeholder=""
                    required
                  />
                  <div className="invalid-feedback">Security code required</div>
                </div>
              </div>
              <hr className="mb-4" />
              <button
                style={{
                  width: "120px",
                  height: "50px",
                  borderRadius: "10px",
                  border: "10px",
                  backgroundColor: "blue",
                  boxShadow: "-moz-initial",
                  color: "white",
                }}
              >
                Checkout
              </button>

              <button
                style={{
                  width: "120px",
                  height: "50px",
                  borderRadius: "10px",
                  border: "10px",
                  backgroundColor: "red",
                  boxShadow: "-moz-initial",
                  color: "white",
                  marginLeft: "10px",
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>

        <footer className="my-5 pt-5 text-muted text-center text-small"></footer>
      </div>
    </div>
  );
}

export default Payment;
