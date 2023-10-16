import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import SearchAppBar from '../component/SearchAppBar';
// import Button from '@mui/material/Button';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Modal from '@mui/material/Modal';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import moment from 'moment'
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

function ProfileChordManager() {
    const [data, setData] = useState({
        name: '',
        email: '',
        address: '',
        surname: '',
        image: '',
        username: '',
        phoneNumber: '',
        job: '',
    })

    // const [baseImage, setBaseImage] = useState("");
    const [open, setOpen] = useState(false);
    const [dataProfile, setDataProfile] = useState([]);
    const { userId } = useParams();
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        height: 700,

        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    useEffect(() => {
        axios.get('http://localhost:8081/getProfile/' + userId)
            .then(res => {
                setData({
                    ...data,
                    name: res.data.Result[0].name,
                    email: res.data.Result[0].email,
                    address: res.data.Result[0].address,
                    role: res.data.Result[0].role,
                    username: res.data.Result[0].username,
                    ban: res.data.Result[0].ban,
                    surname: res.data.Result[0].surname,
                    phoneNumber: res.data.Result[0].phoneNumber,
                    job: res.data.Result[0].job,
                    image: res.data.Result[0].image,
                    registration_time: res.data.Result[0].registration_time,
                })

            })
            .catch(err => console.log(err));
    }, [])
    const handleProfile = () => {
        setOpen(true);
        axios.get('http://localhost:8081/getAccount/' + userId)
            .then(res => {
                if (res.data.Status === "Success") {
                    setDataProfile(res.data.Result);
                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        axios.put('http://localhost:8081/updateProfile/' + userId, data)
            .then(res => {
                if (res.data.Status === "Success") {
                    window.location.reload(true);
                }
            })
            .catch(err => console.log(err));
    }
    // const convertBase64 = (e) => {
    //     console.log(e)
    //     var reader = new FileReader();
    //     reader.readAsDataURL(e.target.files[0]);
    //     reader.onload = () => {
    //         setBaseImage(reader.result);
    //     };
    //     reader.onerror = error => {
    //         console.log("Error: ", error)
    //     };
    // };
    return (
        <>
            <SearchAppBar />
            <div className='d-flex flex-column align-items-center pt-2'>
                <h3 className="d-flex justify-content-center">PROFILE</h3>
                <form className="row g-3 w-50">
                    <div className="container rounded bg-white mt-5 mb-5">
                        <div className="row">

                            <div className="col-md-4 border-right">
                                <div className="d-flex flex-column align-items-center text-center p-3 py-5">

                                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                        {data.image != "" ?
                                            <img className="rounded-circle mt-6 border" src={`http://localhost:8081/images/` + data.image} width="150px" />
                                            :
                                            <AccountCircleIcon fontSize="large" />
                                        }
                                    </div>
                                    <span className="text-black-50">{data.email}</span>

                                </div>
                            </div>
                            <div className="col-md-7 border-right">
                                <div className="py-5">
                                    <div className="row mt-2">

                                        <div className="col-md-6"><label><b>Name: </b></label><input className="form-control" value={data.name} readOnly /></div>
                                        <div className="col-md-6"><label><b>Sur name: </b></label><input className="form-control" value={data.surname} readOnly /></div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-md-6"><label><b>Active: </b></label>
                                            {data.ban == "Enable" ?
                                                <p style={{ color: 'green' }}><b>{data.ban}</b></p>
                                                :
                                                <p style={{ color: 'red' }}><b>{data.ban}</b></p>
                                            }


                                        </div>
                                        <div className="col-md-6"><label><b>Register date: </b></label><p>{moment(data.registration_time).format('YYYY/MM/DD - HH:mm:ss')}</p></div>
                                        <div className="col-md-6"><label><b>Username:</b></label><p>{data.username}</p></div>

                                        <div className="col-md-6"><label><b>Role: </b></label><p>{data.role}</p></div>
                                        <div className="col-md-12"><label>Phone number: </label><input className="form-control" value={data.phoneNumber} readOnly /></div>
                                        <div className="col-md-12"><label>Address Line: </label><input className="form-control" value={data.address} readOnly /></div>
                                        <div className="col-md-12"><label>Email: </label><input className="form-control" value={data.email} readOnly /></div>

                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-md-12"><label>Job: </label><input className="form-control" value={data.job} readOnly /></div>
                                    </div>
                                </div>
                                <Button variant={'outlined'} onClick={() => { handleProfile(data.userId) }}><ModeEditIcon className='pd-right' fontSize='large' />  Edit
                                </Button>

                            </div>
                            <Modal
                                open={open}
                                onClose={() => { setOpen(false) }}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style} >
                                    {dataProfile.map((editAccount, index) => {
                                        return <div key={index}>
                                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                                Profile - <b>{editAccount.name}</b>
                                            </Typography>
                                            <div className="container rounded bg-white mt-6 mb-5">
                                                <div className="row">
                                                    <div className="col-md-4 border-right">
                                                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">

                                                            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                                                {editAccount.image != "" ?
                                                                    <img className="rounded-circle mt-6 border" src={`http://localhost:8081/images/` + editAccount.image} width="150px" />
                                                                    :
                                                                    <AccountCircleIcon fontSize="large" />
                                                                }
                                                            </div>
                                                            <span className="text-black-50">{editAccount.email}</span>

                                                        </div>
                                                    </div>
                                                    <div className="col-md-7 border-right">
                                                        <div className="py-5">
                                                            <div className="row mt-2">

                                                                <div className="col-md-6"><label><b>Name: </b></label><input className="form-control" onChange={e => setData({ ...data, name: e.target.value })} value={data.name} placeholder='Enter your name' /></div>
                                                                <div className="col-md-6"><label><b>Sur name: </b></label><input className="form-control" onChange={e => setData({ ...data, surname: e.target.value })} value={data.surname} placeholder='Enter your surname' /></div>
                                                            </div>
                                                            <div className="row mt-4">
                                                                <div className="col-md-6"><label><b>Active: </b></label>
                                                                    {editAccount.ban == "Enable" ?
                                                                        <p style={{ color: 'green' }}><b>{editAccount.ban}</b></p>
                                                                        :
                                                                        <p style={{ color: 'red' }}><b>{editAccount.ban}</b></p>
                                                                    }

                                                                </div>
                                                                <div className="col-md-6"><label><b>Register date: </b></label><p>{moment(editAccount.registration_time).format('YYYY/MM/DD - HH:mm:ss')}</p></div>
                                                                <div className="col-md-6"><label><b>Username: </b></label><p>{editAccount.username}</p></div>

                                                                <div className="col-md-6"><label><b>Role: </b></label><p>{editAccount.role}</p></div>
                                                                <div className="col-md-12"><label>Phone number: </label><input className="form-control" type="number" onChange={e => setData({ ...data, phoneNumber: e.target.value })} value={data.phoneNumber} placeholder='Enter your phone number' /></div>
                                                                <div className="col-md-12"><label>Address Line: </label><input className="form-control" onChange={e => setData({ ...data, address: e.target.value })} value={data.address} placeholder='Enter your address' /></div>
                                                                <div className="col-md-12"><label>Email: </label><input className="form-control" type='email' onChange={e => setData({ ...data, email: e.target.value })} value={data.email} placeholder='Enter your email' /></div>

                                                            </div>
                                                            <div className="row mt-2">
                                                                <div className="col-md-12"><label>Job: </label><input className="form-control" onChange={e => setData({ ...data, job: e.target.value })} value={data.job} placeholder='Your job...' /></div>
                                                            </div>
                                                            <div className="mt-3">
                                                                <Button variant="contained" onClick={handleSubmit} className='btn btn-success'>UPDATE
                                                                </Button>
                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    })}
                                </Box>
                            </Modal>

                        </div>
                    </div>
                </form>
            </div>
        </>

    )
}
export default ProfileChordManager;