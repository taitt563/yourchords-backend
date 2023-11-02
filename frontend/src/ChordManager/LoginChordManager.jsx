// import { useState } from 'react';
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';
// import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';
// import AppBarLogin from '../component/AppBarLogin';

// function LoginChordManager() {
//     const navigate = useNavigate();
//     axios.defaults.withCredentials = true;
//     const [values, setValues] = useState({
//         username: '',
//         password: ''
//     })
//     const [isLoginFailed, setIsLoginFailed] = useState(false);
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         axios.post('http://localhost:8081/loginChordManager', values)
//             .then(res => {
//                 if (res.data.Status === 'Success') {
//                     sessionStorage.setItem('id_chordManager', values.username);
//                     navigate("/verifySong");
//                 } else {
//                     setIsLoginFailed(true);
//                     setTimeout(() => {
//                         setIsLoginFailed(false);
//                     }, 3000);
//                 }
//             })
//             .catch(err => console.log(err));
//     }

//     return (
//         <>
//             <AppBarLogin />
//             <div className="body-login">
//                 <div className="container-login" id="container">
//                     <div className="form-container sign-in">
//                         <form onSubmit={handleSubmit}>
//                             <h1>Login</h1>
//                             {isLoginFailed && (
//                                 <Stack sx={{ width: '100%' }} spacing={2} >
//                                     <Alert severity="error">Wrong username or password !</Alert>
//                                 </Stack>
//                             )}
//                             <div className="social-icons">
//                             </div>
//                             <span>or use your email password</span>
//                             <input type="text" placeholder="Username" onChange={e => setValues({ ...values, username: e.target.value })} />
//                             <input type="password" placeholder="Password" onChange={e => setValues({ ...values, password: e.target.value })} />
//                             <button>Sign In</button>
//                         </form>
//                     </div>
//                     <div className="toggle-container">
//                         <div className="toggle">
//                             <div className="toggle-panel toggle-right">
//                                 <h1>Hello, Friend!</h1>
//                                 <p>Register with your personal details to use all of site features</p>
//                                 <button className="hidden" id="login" onClick={() => navigate("/signUpChordManager")}>Sign Up</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }


// export default LoginChordManager;