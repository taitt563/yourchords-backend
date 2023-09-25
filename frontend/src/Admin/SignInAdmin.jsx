import '../../src/style.css'
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function SignInAdmin() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: '',
        password: '',
    })
    const handleSignin = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/signInAdmin', values)
        navigate("/login");
    }
    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='bg-light p-3 rounded w-25 border'>
                <h2>Register Account</h2>
                <form onSubmit={handleSignin}>
                    <div className='mb-3'>
                        <label htmlFor="username"><strong>Username</strong></label>
                        <br />
                        <input type="username" placeholder='Enter username' name='username' className='form-control rounded-0'
                            onChange={e => setValues({ ...values, username: e.target.value })} autoComplete='off'
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <br />
                        <input type="password" placeholder='Enter Password' name='password'
                            onChange={e => setValues({ ...values, password: e.target.value })} className='form-control rounded-0' />
                    </div>
                    <button type='submit' className='btn btn-success border w-100 rounded-0'> Register</button>
                </form>
            </div>
        </div>
    )
}

export default SignInAdmin;