// import { useState } from 'react'
// import '../../src/style.css'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// function LoginChordManager() {

//     const [values, setValues] = useState({
//         username: '',
//         password: ''
//     })
//     axios.defaults.withCredentials = true;
//     const navigate = useNavigate()
//     axios.defaults.withCredentials = true;
//     const [error, setError] = useState('')

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         axios.post('http://localhost:8081/loginChordManager', values)
//             .then(res => {
//                 if (res.data.Status === 'Success') {
//                     navigate("/dashboardChordManager");
//                 } else {
//                     setError(res.data.Error);
//                 }
//             })
//             .catch(err => console.log(err));
//     }

//     const handleSignin = (event) => {
//         event.preventDefault();
//         navigate("/signInChordManager");
//     }
//     return (
//         <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
//             <div className='bg-light p-3 rounded w-25 border'>
//                 <div className='text-danger'>
//                     {error && error}
//                 </div>

//                 <h2 className='p-2 d-flex justify-content-center'>Login</h2>
//                 <form onSubmit={handleSubmit}>

//                     <div className='mb-3'>

//                         <label htmlFor="username"><strong>Username</strong></label>
//                         <br />
//                         <input type="username" placeholder='Enter username' name='username' className='form-control rounded-0'
//                             onChange={e => setValues({ ...values, username: e.target.value })} autoComplete='off'
//                         />
//                     </div>
//                     <div className='mb-3'>
//                         <label htmlFor="password"><strong>Password</strong></label>
//                         <br />
//                         <input type="password" placeholder='Enter Password' name='password'
//                             onChange={e => setValues({ ...values, password: e.target.value })} className='form-control rounded-0' />
//                     </div>
//                     <button type='submit' className='btn btn-success border w-100 rounded-0'> Log in</button>
//                     <FormGroup>
//                         <FormControlLabel required control={<Checkbox />} label="You are agree to our terms and policies" />
//                     </FormGroup>
//                 </form>
//                 <form onSubmit={handleSignin}>
//                     <button className='btn btn-default border w-100 bg-light rounded-0'> Create Account</button>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default LoginChordManagerimport './style.css'
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function LoginChordManagerimport() {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const [values, setValues] = useState({
        username: '',
        password: ''
    })
    const [error, setError] = useState('')
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/loginChordManager', values)
            .then(res => {
                if (res.data.Status === 'Success') {
                    localStorage.setItem('id', values.username);
                    navigate("/dashboardChordManager");
                } else {
                    setError(res.data.Error);
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='bg-light p-3 rounded w-25 border'>
                <div className='text-danger'>
                    {error && error}
                </div>
                <h2 className='p-2 d-flex justify-content-center'>Login</h2>
                <form onSubmit={handleSubmit}>

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
                    <FormGroup>
                        <FormControlLabel required control={<Checkbox />} label="You are agree to our terms and policies" />
                    </FormGroup>
                    <button type='submit' className='btn btn-success border w-100 rounded-0'> Log in</button>
                </form>

            </div>
        </div>
    )
}
export default LoginChordManagerimport;