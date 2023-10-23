import { Component } from 'react';
import axios from 'axios';
import SearchAppBar from '../component/SearchAppBar';
class Payment extends Component {
    constructor() {
        super();
        this.state = {
            amount: '',
            cardNumber: '',
            cardName: '',
            expiration: '',
            cvv: '',
            paymentStatus: '',
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const vnp_TmnCode = 'YOUR_VNPAY_TMN_CODE';
        const vnp_HashSecret = 'YOUR_VNPAY_HASH_SECRET';
        const vnp_ReturnUrl = 'http://your-return-url.com';

        const amount = this.state.amount;
        const cardNumber = this.state.cardNumber;
        const cardName = this.state.cardName;
        const expiration = this.state.expiration;
        const cvv = this.state.cvv;

        const paymentData = {
            vnp_TmnCode,
            vnp_Amount: amount * 100, // Chuyển đổi sang đơn vị tiền tệ của VNPAY (VND).
            vnp_Command: 'pay',
            vnp_CreateDate: new Date().toISOString(),
            vnp_CurrCode: 'VND',
            vnp_OrderInfo: 'Payment for your order',
            vnp_ReturnUrl,
            vnp_TxnRef: new Date().getTime(),
            vnp_Version: '2.0.0',
            vnp_IpAddr: '127.0.0.1', // Địa chỉ IP của khách hàng
            vnp_PaymentType: 'atm',
            vnp_CardType: '02', // Thẻ nội địa
            vnp_CardNumber: cardNumber,
            vnp_CardHolder: cardName,
            vnp_ExpireDate: expiration,
            vnp_SecureHash: '',
        };

        // Tính chuỗi hash
        const queryString = require('query-string');
        const secureHash = this.generateSecureHash(paymentData, vnp_HashSecret);
        paymentData.vnp_SecureHash = secureHash;

        try {
            // Gửi yêu cầu thanh toán đến VNPAY
            const response = await axios.post('https://sandbox.vnpayment.vn/paymentv2/vpcpay.html', queryString.stringify(paymentData));

            // Xử lý kết quả từ VNPAY tại đây
            if (response.data && response.data.vnp_ResponseCode === '00') {
                this.setState({ paymentStatus: 'Thanh toán thành công' });
            } else {
                this.setState({ paymentStatus: 'Thanh toán thất bại' });
            }
        } catch (error) {
            this.setState({ paymentStatus: 'Lỗi kết nối đến VNPAY' });
        }
    }

    generateSecureHash(data, secret) {
        const crypto = require('crypto');
        const sortedKeys = Object.keys(data).sort();
        const sortedData = sortedKeys.map(key => `${key}=${data[key]}`).join('&');
        return crypto.createHmac('SHA256', secret).update(sortedData).digest('hex');
    }

    render() {
        return (
            <>
                <SearchAppBar />
                <div className="App">
                    <h1>Thanh Toán Đơn Giản</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label>Số tiền cần thanh toán:</label>
                            <input type="number" name="amount" value={this.state.amount} onChange={this.handleChange} required />
                        </div>
                        <div>
                            <label>Số thẻ tín dụng:</label>
                            <input type="text" name="cardNumber" value={this.state.cardNumber} onChange={this.handleChange} required />
                        </div>
                        <div>
                            <label>Tên trên thẻ:</label>
                            <input type="text" name="cardName" value={this.state.cardName} onChange={this.handleChange} required />
                        </div>
                        <div>
                            <label>Ngày hết hạn (MM/YY):</label>
                            <input type="text" name="expiration" value={this.state.expiration} onChange={this.handleChange} required />
                        </div>
                        <div>
                            <label>CVV:</label>
                            <input type="text" name="cvv" value={this.state.cvv} onChange={this.handleChange} required />
                        </div>
                        <button type="submit">Thanh toán</button>
                    </form>
                    <div>
                        {this.state.paymentStatus && <p>{this.state.paymentStatus}</p>}
                    </div>
                </div>
            </>
        );
    }
}

export default Payment;