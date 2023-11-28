// import { Component } from 'react';
// import axios from 'axios';
// import SearchAppBar from '../component/SearchAppBar';
// class Payment extends Component {
//     constructor() {
//         super();
//         this.state = {
//             amount: '',
//             cardNumber: '',
//             cardName: '',
//             expiration: '',
//             cvv: '',
//             paymentStatus: '',
//         };
//     }

//     handleChange = (e) => {
//         this.setState({ [e.target.name]: e.target.value });
//     }

//     handleSubmit = async (e) => {
//         e.preventDefault();

//         const vnp_TmnCode = 'YOUR_VNPAY_TMN_CODE';
//         const vnp_HashSecret = 'YOUR_VNPAY_HASH_SECRET';
//         const vnp_ReturnUrl = 'http://your-return-url.com';

//         const amount = this.state.amount;
//         const cardNumber = this.state.cardNumber;
//         const cardName = this.state.cardName;
//         const expiration = this.state.expiration;
//         const cvv = this.state.cvv;

//         const paymentData = {
//             vnp_TmnCode,
//             vnp_Amount: amount * 100, // Chuyển đổi sang đơn vị tiền tệ của VNPAY (VND).
//             vnp_Command: 'pay',
//             vnp_CreateDate: new Date().toISOString(),
//             vnp_CurrCode: 'VND',
//             vnp_OrderInfo: 'Payment for your order',
//             vnp_ReturnUrl,
//             vnp_TxnRef: new Date().getTime(),
//             vnp_Version: '2.0.0',
//             vnp_IpAddr: '127.0.0.1', // Địa chỉ IP của khách hàng
//             vnp_PaymentType: 'atm',
//             vnp_CardType: '02', // Thẻ nội địa
//             vnp_CardNumber: cardNumber,
//             vnp_CardHolder: cardName,
//             vnp_ExpireDate: expiration,
//             vnp_SecureHash: '',
//         };

//         // Tính chuỗi hash
//         const queryString = require('query-string');
//         const secureHash = this.generateSecureHash(paymentData, vnp_HashSecret);
//         paymentData.vnp_SecureHash = secureHash;

//         try {
//             // Gửi yêu cầu thanh toán đến VNPAY
//             const response = await axios.post('https://sandbox.vnpayment.vn/paymentv2/vpcpay.html', queryString.stringify(paymentData));

//             // Xử lý kết quả từ VNPAY tại đây
//             if (response.data && response.data.vnp_ResponseCode === '00') {
//                 this.setState({ paymentStatus: 'Thanh toán thành công' });
//             } else {
//                 this.setState({ paymentStatus: 'Thanh toán thất bại' });
//             }
//         } catch (error) {
//             this.setState({ paymentStatus: 'Lỗi kết nối đến VNPAY' });
//         }
//     }

//     generateSecureHash(data, secret) {
//         const crypto = require('crypto');
//         const sortedKeys = Object.keys(data).sort();
//         const sortedData = sortedKeys.map(key => `${key}=${data[key]}`).join('&');
//         return crypto.createHmac('SHA256', secret).update(sortedData).digest('hex');
//     }

//     render() {
//         return (
//             <>
//                 <SearchAppBar />
//                 <div className="App">
//                     <h1>Thanh Toán Đơn Giản</h1>
//                     <form onSubmit={this.handleSubmit}>
//                         <div>
//                             <label>Số tiền cần thanh toán:</label>
//                             <input type="number" name="amount" value={this.state.amount} onChange={this.handleChange} required />
//                         </div>
//                         <div>
//                             <label>Số thẻ tín dụng:</label>
//                             <input type="text" name="cardNumber" value={this.state.cardNumber} onChange={this.handleChange} required />
//                         </div>
//                         <div>
//                             <label>Tên trên thẻ:</label>
//                             <input type="text" name="cardName" value={this.state.cardName} onChange={this.handleChange} required />
//                         </div>
//                         <div>
//                             <label>Ngày hết hạn (MM/YY):</label>
//                             <input type="text" name="expiration" value={this.state.expiration} onChange={this.handleChange} required />
//                         </div>
//                         <div>
//                             <label>CVV:</label>
//                             <input type="text" name="cvv" value={this.state.cvv} onChange={this.handleChange} required />
//                         </div>
//                         <button type="submit">Thanh toán</button>
//                     </form>
//                     <div>
//                         {this.state.paymentStatus && <p>{this.state.paymentStatus}</p>}
//                     </div>
//                 </div>
//             </>
//         );
//     }
// }

// export default Payment;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import React from 'react';
// import './Payment.css';
//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';


class Payment extends React.Component {
    render() {
        return (
            <div className="maincontainer">
                <div className="container">
                    <div className="py-5 text-center">
                        <h2>PAYMENT</h2>
                    </div>
                    <div className="row">
                        <div className="col-md-4 order-md-2 mb-4">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-muted">Your cart</span>
                                <span className="badge badge-secondary badge-pill">3</span>
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
                                    <h4>Total (VND) </h4>
                                    <span className="totalPrice">2.000.000</span>
                                </li>

                            </ul>
                        </div>

                        <div className="col-md-8 order-md-1">
                            <h4 className="mb-3">Payment form</h4>
                            <form className="needs-validation" noValidate>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="firstName">First name</label>
                                        <input type="text" className="form-control" id="firstName" placeholder="" />
                                        <div className="invalid-feedback">
                                            Valid first name is required.
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="lastName">Last name</label>
                                        <input type="text" className="form-control" id="lastName" placeholder="" />
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
                                        <input type="text" className="form-control" id="username" placeholder="Username" required />
                                        <div className="invalid-feedback">
                                            Your username is required.
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="you@example.com" />
                                    <div className="invalid-feedback">
                                        Please enter a valid email address for shipping updates.
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="address">Address</label>
                                    <input type="text" className="form-control" id="address" placeholder="1234 Calmette" required />
                                    <div className="invalid-feedback">
                                        Please enter your shipping address.
                                    </div>
                                </div>

                                <h4 className="mb-3">Payment options</h4>
                                <div className="d-block my-3">
                                    <div className="custom-control custom-radio">
                                        <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" />
                                        <label className="custom-control-label" htmlFor="credit">Credit card</label>
                                    </div>
                                    <div className="custom-control custom-radio">
                                        <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" required />
                                        <label className="custom-control-label" htmlFor="debit">Debit card</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="cc-name">Name on card</label>
                                        <input type="text" className="form-control" id="cc-name" placeholder="" required />
                                        <small className="text-muted">Full name as displayed on card</small>
                                        <div className="invalid-feedback">
                                            Name on card is required
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="cc-number">Card number</label>
                                        <input type="text" className="form-control" id="cc-number" placeholder="" required />
                                        <div className="invalid-feedback">
                                            Card number is required
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3 mb-3">
                                        <label htmlFor="cc-expiration">Expiration</label>
                                        <input type="text" className="form-control" id="cc-expiration" placeholder="" required />
                                        <div className="invalid-feedback">
                                            Expiration date required
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label htmlFor="cc-expiration">CVV</label>
                                        <input type="text" className="form-control" id="cc-cvv" placeholder="" required />
                                        <div className="invalid-feedback">
                                            Security code required
                                        </div>
                                    </div>
                                </div>
                                <hr className="mb-4" />
                                <button class="btn btn-primary btn-lg btn-block" type="button">CHECKOUT</button>
                            </form>
                        </div>
                    </div>

                    <footer className="my-5 pt-5 text-muted text-center text-small">

                    </footer>
                </div>

            </div>

        )
    };
}

export default Payment;
