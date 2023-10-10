// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { useState, useEffect } from 'react';
// import SearchAppBar from '../component/SearchAppBar';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import Button from '@mui/material/Button';
// // import Button from '@mui/material/Button';
// // import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// function ProfileMusician() {
//     const [data, setData] = useState({
//         name: '',
//         email: '',
//         address: '',
//         // image: '',
//     })
//     // const [baseImage, setBaseImage] = useState("");

//     const navigate = useNavigate()
//     const { userId } = useParams();
//     useEffect(() => {
//         axios.get('http://localhost:8081/getProfile/' + userId)
//             .then(res => {
//                 setData({
//                     ...data,
//                     name: res.data.Result[0].name,
//                     email: res.data.Result[0].email,
//                     address: res.data.Result[0].address,
//                     // image: baseImage,
//                 })

//             })
//             .catch(err => console.log(err));
//     }, [])

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         axios.put('http://localhost:8081/updateProfile/' + userId, data)
//             .then(res => {
//                 if (res.data.Status === "Success") {
//                     navigate('/profileMusician/' + userId);
//                     window.location.reload(true);
//                 }
//             })
//             .catch(err => console.log(err));
//     }

//     // const convertBase64 = (e) => {
//     //     console.log(e)
//     //     var reader = new FileReader();
//     //     reader.readAsDataURL(e.target.files[0]);
//     //     reader.onload = () => {
//     //         setBaseImage(reader.result);
//     //     };
//     //     reader.onerror = error => {
//     //         console.log("Error: ", error)
//     //     };
//     // };
//     return (
//         <>
//             <SearchAppBar />
//             <div className='d-flex flex-column align-items-center pt-4'>

//                 <h2>Profile</h2>
//                 <form className="row g-3 w-50" onSubmit={handleSubmit} >
//                     <div className="col-12">
//                         <label className="form-label">Name</label>
//                         <input type="text" className="form-control" placeholder='Enter Name' autoComplete='off'
//                             onChange={e => setData({ ...data, name: e.target.value })} value={data.name} />
//                     </div>
//                     <div className="col-12">
//                         <label className="form-label">Email</label>
//                         <input type="email" className="form-control" placeholder='Enter Email' autoComplete='off'
//                             onChange={e => setData({ ...data, email: e.target.value })} value={data.email} />
//                     </div>
//                     <div className="col-12">
//                         <label className="form-label">Address</label>
//                         <input type="text" className="form-control" placeholder="Address" autoComplete='off'
//                             onChange={e => setData({ ...data, address: e.target.value })} value={data.address} />
//                     </div>
//                     <div className="col-12 mb-3">
//                         <label className="form-label">Select Image:</label>
//                         <br />
//                         {/* <input type="file"
//                         onChange={e => setData({ ...data, image: e.target.files[0] })} /> */}

//                         <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
//                             <input
//                                 type="file" onChange={e => setData({ ...data, image: e.target.files[0] })} />
//                         </Button>

//                     </div>
//                     {/* <div className="col-12 mb-3">
//                     <label className="form-label">Select Image</label>
//                     <br />
//                     <Button variant="contained" startIcon={<CloudUploadIcon />}>
//                         <input
//                             type="file" name='image' onChange={convertBase64} />
//                     </Button>
//                     <br />
//                     <br />
//                     {baseImage == "" || baseImage == null ?
//                         ""
//                         :
//                         <img className="profile_image" width={100} height={100} src={baseImage} />}
//                 </div> */}
//                     <div className="col-12">
//                         <button type="submit" className="btn btn-primary">Update</button>
//                     </div>
//                 </form>
//             </div>
//         </>

//     )
// }
// export default ProfileMusician;


import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import SearchAppBar from '../component/SearchAppBar';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import Button from '@mui/material/Button';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
function ProfileMusician() {
    const [data, setData] = useState({
        name: '',
        surname: '',
        email: '',
        address: '',
        image: '',
    })
    // const [baseImage, setBaseImage] = useState("");
    console.log(data)
    const navigate = useNavigate()
    const { userId } = useParams();
    useEffect(() => {
        axios.get('http://localhost:8081/getProfile/' + userId)
            .then(res => {
                setData({
                    ...data,
                    name: res.data.Result[0].name,
                    surname: res.data.Result[0].surname,
                    email: res.data.Result[0].email,
                    address: res.data.Result[0].address,
                    image: res.data.Result[0].image,

                    // image: baseImage,
                })

            })
            .catch(err => console.log(err));
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        axios.put('http://localhost:8081/updateProfile/' + userId, data)
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate('/profileMusician/' + userId);
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
            <div className="container rounded bg-white mt-5 mb-5">
                <div className="row">
                    <div className="col-md-3 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            {/* <Avatar>
                                {
                                    <img src={`http://localhost:8081/images/` + data.image} className='profile_image_update' />
                                }
                            </Avatar> */}

                            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                <img className="rounded-circle mt-5 border" src={`http://localhost:8081/images/` + data.image} width="150px" />

                            </div>
                            <span className="text-black-50">{data.email}</span>

                        </div>
                    </div>
                    <div className="col-md-5 border-right">
                        <div className="p-3 py-4">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-right">Profile Settings</h4>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6"><label className="labels">Name</label><input type="text" className="form-control" placeholder="first name" onChange={e => setData({ ...data, name: e.target.value })} value={data.name} /></div>
                                <div className="col-md-6"><label className="labels">Surname</label><input type="text" className="form-control" onChange={e => setData({ ...data, surname: e.target.value })} value={data.surname} placeholder="surname" /></div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12"><label className="labels">Mobile Number</label><input type="text" className="form-control" placeholder="enter phone number" /></div>
                                <div className="col-md-12"><label className="labels">Address Line 1</label><input type="text" className="form-control" placeholder="enter address line 1" /></div>
                                <div className="col-md-12"><label className="labels">Address Line 2</label><input type="text" className="form-control" placeholder="enter address line 2" /></div>
                                <div className="col-md-12"><label className="labels">Postcode</label><input type="text" className="form-control" placeholder="enter address line 2" /></div>
                                <div className="col-md-12"><label className="labels">State</label><input type="text" className="form-control" placeholder="enter address line 2" /></div>
                                <div className="col-md-12"><label className="labels">Area</label><input type="text" className="form-control" placeholder="enter address line 2" /></div>
                                <div className="col-md-12"><label className="labels">Email</label><input type="text" className="form-control" onChange={e => setData({ ...data, email: e.target.value })} value={data.email} placeholder="email" /></div>
                                <div className="col-md-12"><label className="labels">Education</label><input type="text" className="form-control" placeholder="education" /></div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-6"><label className="labels">Country</label><input type="text" className="form-control" placeholder="country" /></div>
                                <div className="col-md-6"><label className="labels">State/Region</label><input type="text" className="form-control" placeholder="state" /></div>
                            </div>
                            <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button" onClick={handleSubmit} >Save Profile</button></div>
                        </div>
                    </div>

                </div>
            </div>
        </>

    )
}

export default ProfileMusician;