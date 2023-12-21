import './style.css';
import { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AppBarLogin from './component/AppBarLogin';
function Login() {
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const [values, setValues] = useState({
        username: '',
        password: ''
    })
    const [isLoginFailed, setIsLoginFailed] = useState(false);
    const [isLoginPending, setIsLoginPending] = useState(false);
    const [isLoginDisable, setIsLoginDisable] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);
    const [resetPasswordNotSuccess, setResetPasswordNotSuccess] = useState(false);
    const [confirmPasswordNotMatch, setConfirmPasswordNotMatch] = useState(false);

    const [username, setUsername] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${apiUrl}/login`, values)
            .then(res => {
                if (res.data.Status === 'Success') {
                    const token = res.data.token;
                    const userId = `${values.username}:${token}`;
                    sessionStorage.setItem('token', userId);
                    if (res.data.Role === 'admin') {
                        navigate("/manageAccount");
                    } else if (res.data.Role === 'chord') {
                        navigate("/songChordManager");
                    } else if (res.data.Role === 'user') {
                        navigate("/songCustomer/" + values.username);
                    } else if (res.data.Role === 'musician') {
                        navigate("/chordMusician");
                    }
                }
                if (res.data.Status === 'Error') {
                    setIsLoginFailed(true);
                    setTimeout(() => {
                        setIsLoginFailed(false);
                    }, 2000)
                }
                if (res.data.ban === 'Pending') {
                    setIsLoginPending(true);
                    setTimeout(() => {
                        setIsLoginPending(false);
                    }, 2000);
                }
                else if (res.data.ban === 'Disable') {
                    setIsLoginDisable(true);
                    setTimeout(() => {
                        setIsLoginDisable(false);
                    }, 2000);
                }
            })
            .catch(err => console.log(err));
    }
    const handleResetPassword = (event) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            setConfirmPasswordNotMatch(true);
            setTimeout(() => {
                setConfirmPasswordNotMatch(false);
            }, 2000);
            return;
        }

        axios.post(`${apiUrl}/reset-password`, {
            username: username,
            currentPassword: currentPassword,
            newPassword: newPassword,
        })
            .then((res) => {
                if (res.data.Status === 'Success') {
                    setResetPasswordSuccess(true);
                    setShowResetPassword(false);
                } else {
                    setResetPasswordNotSuccess(true);
                    setTimeout(() => {
                        setResetPasswordNotSuccess(false);
                    }, 2000);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };


    return (
        <>
            <AppBarLogin />
            <div className="body-login">
                <div className="container-login">
                    <div className="form-container sign-in">
                        <form onSubmit={handleSubmit}>
                            {isLoginFailed && (
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    <Alert severity="error">Wrong username or password !</Alert>
                                </Stack>
                            )}
                            {isLoginPending && (
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    <Alert severity="info">Your account status is currently pending. The admin will review your account after 3 days!</Alert>
                                </Stack>
                            )}
                            {isLoginDisable && (
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    <Alert severity="error">Your account has been disabled by the administrator !</Alert>
                                </Stack>
                            )}
                            {resetPasswordSuccess && (
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    <Alert severity="success">Your password has been reseted !</Alert>
                                </Stack>
                            )}
                            {resetPasswordNotSuccess && (
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    <Alert severity="error">Your password reset not success. Please try again !</Alert>
                                </Stack>
                            )}
                            {confirmPasswordNotMatch && (
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    <Alert severity="error">New password and confirm password do not match. Please try again !</Alert>
                                </Stack>
                            )}
                            {showResetPassword ? (
                                <div>
                                    <h1 style={{ textAlign: 'center' }}>Reset Password</h1>
                                    <input
                                        type="text"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Enter your current password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Enter your new password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Confirm your new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <button onClick={handleResetPassword}>Reset Password</button>

                                    <button
                                        style={{ marginLeft: '10px' }}
                                        onClick={() => setShowResetPassword(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <>

                                    <h1>Login</h1>
                                    <input type="text" placeholder="Username" onChange={e => setValues({ ...values, username: e.target.value })} required />
                                    <input type="password" placeholder="Password" onChange={e => setValues({ ...values, password: e.target.value })} required />
                                    <div
                                        style={{
                                            textAlign: 'right',
                                            marginTop: '10px', // Adjust the margin as needed
                                            paddingLeft: '300px', // Add padding to the right
                                        }}
                                    >
                                        <Link className='font' onClick={() => setShowResetPassword(true)}>Change Password</Link>
                                    </div>
                                    <button>Sign In</button>
                                </>
                            )}
                        </form>
                    </div>
                    <div className="toggle-container">
                        <div className="toggle">
                            <div className="toggle-panel toggle-right">
                                <h1>Welcome Back!</h1>
                                <p>Enter your personal details to use all of site features</p>
                                <button
                                    className="hidden"
                                    id="login"
                                    onClick={() => navigate("/signUp")}
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <script src="script.js"></script>
            </div>
        </>
    )
}


export default Login;