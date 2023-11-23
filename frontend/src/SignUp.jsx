import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AppBarLogin from './component/AppBarLogin';
function SignUp() {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const [values, setValues] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
        address: '',
        role: 'user',
    });
    const [isAccountExisted, setIsAccountExisted] = useState(false);
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const handleSignin = (event) => {
        event.preventDefault();
        axios.post(`${apiUrl}/signUp`, values)
            .then(res => {
                if (res.data.Status === 'Success') {
                    navigate("/login");
                } else {
                    setIsAccountExisted(true);
                    setTimeout(() => {
                        setIsAccountExisted(false);
                    }, 3500);
                }
            });
    }
    // const handleSignin = async (event) => {
    //     event.preventDefault();

    //     try {
    //         // Send signup request
    //         const signUpResponse = await axios.post(`${apiUrl}/signUp`, values);

    //         if (signUpResponse.data.Status === 'Success') {
    //             // Truyền địa chỉ email vào hàm navigate
    //             navigate("/login", { state: { email: values.email } });

    //             // Sử dụng địa chỉ email từ người dùng khi gửi email thông báo
    //             const mailOptions = {
    //                 from: values.email,
    //                 to: values.email,
    //                 subject: 'Đăng ký thành công',
    //                 text: 'Chúc mừng! Bạn đã đăng ký thành công.'
    //             };

    //             // Gửi email thông báo
    //             const sendEmailResponse = await axios.post(`${apiUrl}/sendEmail`, mailOptions);
    //             console.log('Email sent successfully:', sendEmailResponse.data);
    //         } else {
    //             setIsAccountExisted(true);
    //             setTimeout(() => {
    //                 setIsAccountExisted(false);
    //             }, 3500);
    //         }
    //     } catch (error) {
    //         console.error('Error during signup:', error);
    //     }
    // };
    return (
        <>
            <AppBarLogin />
            <div className="body-login">
                <div className="container-login">
                    <div className="form-container sign-in">
                        <form onSubmit={handleSignin}>
                            <h1>Create Account</h1>
                            {isAccountExisted && (
                                <Stack sx={{ width: '100%' }} spacing={2} >
                                    <Alert severity="warning">Username already exists, please try again !</Alert>
                                </Stack>
                            )}

                            <span>or use your email for registration</span>
                            <input type="text" placeholder="Enter your name" onChange={e => setValues({ ...values, name: e.target.value })} required />
                            <input type="text" placeholder="Username" onChange={e => setValues({ ...values, username: e.target.value })} required />
                            <input type="password" placeholder="Password" onChange={e => setValues({ ...values, password: e.target.value })} required />
                            <input type="text" placeholder="Enter your email" onChange={e => setValues({ ...values, email: e.target.value })} required />
                            <input type="text" placeholder="Enter your address" onChange={e => setValues({ ...values, address: e.target.value })} required />
                            <button>Sign Up</button>
                        </form>
                    </div>
                    <div className="toggle-container">
                        <div className="toggle">
                            <div className="toggle-panel toggle-right">
                                <h1>Welcome Back!</h1>
                                <p>Enter your personal details to use all of site features</p>
                                <button className="hidden" id="login" onClick={() => navigate("/login")}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp;
