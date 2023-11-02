import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AppBarLogin from '../component/AppBarLogin';

function SignUpCustomer() {
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

    const handleSignin = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/signUp', values)
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

export default SignUpCustomer;
