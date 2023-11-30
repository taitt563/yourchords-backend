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
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function ProfileCustomer() {
    const [data, setData] = useState({
        name: '',
        email: '',
        address: '',
        surname: '',
        image: null,
        username: '',
        phoneNumber: '',
        job: '',
    })

    // const [baseImage, setBaseImage] = useState("");
    const [open, setOpen] = useState(false);
    const [dataProfile, setDataProfile] = useState([]);
    const { userId } = useParams();
    const [imageURL, setImageURL] = useState(null);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000,
        height: 700,
        borderRadius: 5,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    useEffect(() => {
        axios.get(`${apiUrl}/getProfile/` + userId)
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
                if (res.data.Result.length > 0) {
                    const profileImages = res.data.Result.map(data => `${data.image}`);
                    setImageURL(profileImages);
                }
            })
            .catch(err => console.log(err));
    }, [])
    const handleProfile = () => {
        setOpen(true);
        axios.get(`${apiUrl}/getAccount/` + userId)
            .then(res => {
                if (res.data.Status === "Success") {
                    setDataProfile(res.data.Result);
                    if (res.data.Result.length > 0) {
                        const profileImages = res.data.Result.map(editAccount => `${editAccount.image}`);
                        setImageURL(profileImages);
                    }

                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        axios.put(`${apiUrl}/updateProfile/` + userId, data)
            .then(res => {
                if (res.data.Status === "Success") {
                    window.location.reload(true);
                }
            })
            .catch(err => console.log(err));
    }

    const convertImageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onloadend = () => {
                resolve(reader.result.split(',')[1]);
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsDataURL(file);
        });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];

        try {
            const base64Image = await convertImageToBase64(file);
            const imageSource = `${base64Image}`;
            setData({ ...data, image: imageSource, imageSource });
        } catch (error) {
            console.error('Error converting image to Base64:', error);
        }
    };
    return (
        <>
            <SearchAppBar />

            <div className="profile-container">
                <div className="profile-content">
                    <div className="profile-header">

                        <h3 className="profile-header" style={{ color: '#0d6efd' }}><b>Account Settings</b></h3>

                    </div>
                    <hr style={{ width: '95%' }} />
                    <div className="profile-image">
                        {imageURL && (
                            data.image !== "" ?

                                <img className="profile-avatar" src={`data:image/png;base64,${data.image}`} />


                                :
                                <AccountCircleIcon fontSize="large" />
                        )
                        }
                        <p>{data.email}</p>

                    </div>
                    <div className="mt-2">
                        <h3><b>Profile</b></h3>
                    </div>
                    <div className="mt-4" style={{ display: 'flex', flexDirection: 'row', paddingTop: '50px' }}>
                        <div className="col-md-6"><b>Name: </b><p>{data.name}</p></div>
                        {data.surname ?
                            <div className="col-md-6"><b>Sur name: </b><p>{data.surname}</p></div>
                            :
                            <div className="col-md-6"><b>Sur name: </b><p>None</p></div>

                        }
                    </div>
                    <div className="mt-4" style={{ display: 'flex', flexDirection: 'row' }}>
                        <div className="col-md-6"><b>Email: </b>
                            <p>{data.email}</p>
                        </div>
                        <div className="col-md-6"><b>Active: </b>
                            {data.ban == "Enable" ?
                                <p style={{ color: 'green' }}><b>{data.ban}</b></p>
                                :
                                <p style={{ color: 'red' }}><b>{data.ban}</b></p>
                            }
                        </div>
                    </div>
                    <div className="mt-4" style={{ display: 'flex', flexDirection: 'row' }}>
                        {data.username !== "" ?
                            <div className="col-md-6"><b>Username:</b><p>{data.username}</p></div>
                            :
                            <div className="col-md-6"><b>Username:</b><p>None</p></div>
                        }
                        <div className="col-md-6"><b>Role: </b><p>{data.role}</p></div>
                    </div>


                    <div className="mt-4" style={{ display: 'flex', flexDirection: 'row' }} >
                        {data.phoneNumber !== "" ?
                            <div className="col-md-6"><b>Phone number: </b><p>{data.phoneNumber}</p></div>
                            : <div className="col-md-6"><b>Phone number: </b><p>None</p></div>
                        }
                        {data.address !== "" ?
                            <div className="col-md-6"><b>Address Line: </b><p>{data.address}</p></div>
                            :
                            <div className="col-md-6"><b>Address Line: </b><p>None</p></div>
                        }

                    </div>
                    <div className="mt-4" style={{ display: 'flex', flexDirection: 'row' }}>
                        <div className="col-md-6"><b>Address Line: </b><p>{data.address}</p></div>
                        <div className="col-md-6">
                            <b className="bi bi-calendar-day text-primary fs-5 pd-right"></b>
                            <b>Register date: </b><p>{moment(data.registration_time).format('YYYY/MM/DD - HH:mm:ss')}</p></div>
                    </div>

                    <div className="mt-4" style={{ display: 'flex', flexDirection: 'row' }} >
                        {data.job !== "" ?
                            <div className="col-md-6"><b>Job: </b><p>{data.job}</p></div>
                            :
                            <div className="col-md-6"><b>Job: </b><p>None</p></div>

                        }
                    </div>

                    <div className="mt-4 pd-bottom">
                        <Button variant='contained' onClick={() => { handleProfile(data.userId) }}><ModeEditIcon className='pd-right' fontSize='medium' /> Edit
                        </Button>
                    </div>

                </div>

                <Modal
                    open={open}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} >
                        {dataProfile.map((editAccount, index) => {
                            return <div key={index}>
                                <Typography id="modal-modal-title" variant="h6" component="h2" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ flex: '1 1 auto' }}>Profile - <b>{editAccount.name}</b></span>

                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setOpen(false)}></button>

                                </Typography>
                                <div className=" bg-white mt-6 mb-5">
                                    <div className="row">
                                        <div className="col-md-4 border-right">
                                            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                                    {editAccount.image != "" ?
                                                        <img className="profile-avatar" src={`data:image/png;base64,${editAccount.image}`} width="150px" />
                                                        :
                                                        <AccountCircleIcon fontSize="large" />
                                                    }
                                                </div>
                                                <span className="text-black-50">{editAccount.email}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-7 border-right">
                                            <div className="py-6">
                                                <div className="row mt-4">
                                                    <div className="col-md-6"><b>Name: </b><input className="form-control" onChange={e => setData({ ...data, name: e.target.value })} value={data.name} placeholder='Enter your name' /></div>
                                                    <div className="col-md-6"><b>Sur name: </b><input className="form-control" onChange={e => setData({ ...data, surname: e.target.value })} value={data.surname} placeholder='Enter your surname' /></div>
                                                </div>
                                                <div className="row mt-4">
                                                    <div className="col-md-6"><b>Active: </b>
                                                        {editAccount.ban == "Enable" ?
                                                            <p style={{ color: 'green' }}><b>{editAccount.ban}</b></p>
                                                            :
                                                            <p style={{ color: 'red' }}><b>{editAccount.ban}</b></p>
                                                        }
                                                    </div>
                                                    <div className="col-md-6">
                                                        <b className="bi bi-calendar-day text-primary fs-5 pd-right"></b>
                                                        <b>Register date: </b><p>{moment(editAccount.registration_time).format('YYYY/MM/DD - HH:mm:ss')}</p></div>
                                                    <div className="col-md-6"><b>Username: </b><p>{editAccount.username}</p></div>
                                                    <div className="col-md-6"><b>Role: </b><p>{editAccount.role}</p></div>
                                                    <div className="col-md-12">Phone number: <input className="form-control" type="number" onChange={e => setData({ ...data, phoneNumber: e.target.value })} value={data.phoneNumber} placeholder='Enter your phone number' /></div>
                                                    <div className="col-md-12">Address Line: <input className="form-control" onChange={e => setData({ ...data, address: e.target.value })} value={data.address} placeholder='Enter your address' /></div>
                                                    <div className="col-md-12">Email: <input className="form-control" type="email" onChange={e => setData({ ...data, email: e.target.value })} value={data.email} placeholder='Enter your email' /></div>
                                                </div>
                                                <div className="row mt-2">
                                                    <div className="col-md-12">Job: <input className="form-control" onChange={e => setData({ ...data, job: e.target.value })} value={data.job} placeholder='Your job...' /></div>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="col-md-6">Upload Image:
                                                    </div>

                                                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                                        <input type="file" name="image" onChange={handleImageChange} />
                                                    </Button>
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
        </>
    )
}
export default ProfileCustomer;