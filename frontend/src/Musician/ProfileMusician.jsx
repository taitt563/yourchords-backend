import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import SearchAppBar from '../component/SearchAppBar';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
// import Button from '@mui/material/Button';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
function ProfileMusician() {
    const [data, setData] = useState({
        name: '',
        email: '',
        address: '',
        // image: '',
    })
    // const [baseImage, setBaseImage] = useState("");

    const navigate = useNavigate()
    const { userId } = useParams();
    useEffect(() => {
        axios.get('http://localhost:8081/getProfile/' + userId)
            .then(res => {
                setData({
                    ...data,
                    name: res.data.Result[0].name,
                    email: res.data.Result[0].email,
                    address: res.data.Result[0].address,
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
                    navigate('/')
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
            <div className='d-flex flex-column align-items-center pt-4'>
                <h2>Profile</h2>
                <form className="row g-3 w-50" onSubmit={handleSubmit} >
                    <div className="col-12">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" placeholder='Enter Name' autoComplete='off'
                            onChange={e => setData({ ...data, name: e.target.value })} value={data.name} />
                    </div>
                    <div className="col-12">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" placeholder='Enter Email' autoComplete='off'
                            onChange={e => setData({ ...data, email: e.target.value })} value={data.email} />
                    </div>
                    <div className="col-12">
                        <label className="form-label">Address</label>
                        <input type="text" className="form-control" placeholder="Address" autoComplete='off'
                            onChange={e => setData({ ...data, address: e.target.value })} value={data.address} />
                    </div>
                    <div className="col-12 mb-3">
                        <label className="form-label">Select Image:</label>
                        <br />
                        {/* <input type="file"
                        onChange={e => setData({ ...data, image: e.target.files[0] })} /> */}

                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                            <input
                                type="file" onChange={e => setData({ ...data, image: e.target.files[0] })} />
                        </Button>

                    </div>
                    {/* <div className="col-12 mb-3">
                    <label className="form-label">Select Image</label>
                    <br />
                    <Button variant="contained" startIcon={<CloudUploadIcon />}>
                        <input
                            type="file" name='image' onChange={convertBase64} />
                    </Button>
                    <br />
                    <br />
                    {baseImage == "" || baseImage == null ?
                        ""
                        :
                        <img className="profile_image" width={100} height={100} src={baseImage} />}
                </div> */}
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Update</button>
                    </div>
                </form>
            </div>
        </>

    )
}
export default ProfileMusician;