// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { useState, useEffect } from 'react';
function Home() {
    // const [data, setData] = useState({
    //     name: '',
    //     email: '',
    //     address: '',
    // })
    // const navigate = useNavigate()
    // const { id } = useParams();

    // useEffect(() => {
    //     axios.get('http://localhost:8081/getProfile/' + id)
    //         .then(res => {
    //             setData({
    //                 ...data,

    //                 name: res.data.Result[0].name,
    //                 email: res.data.Result[0].email,
    //                 address: res.data.Result[0].address,


    //             })
    //         })
    //         .catch(err => console.log(err));
    // }, [])

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     axios.put('http://localhost:8081/updateProfile/' + id, data)
    //         .then(res => {
    //             console.log(res)

    //             if (res.data.Status === "Success") {
    //                 navigate('/')

    //             }
    //         })
    //         .catch(err => console.log(err));
    // }

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     axios.put('http://localhost:8081/updateProfile/' + id, data)
    //         .then(res => {
    //             if (res.data.Status === "Success") {
    //                 navigate('/')
    //             }
    //         })
    //         .catch(err => console.log(err));
    // }

    return (
        <div className='d-flex flex-column align-items-center pt-4'>
            <h2>Home</h2>
            {/* <form className="row g-3 w-50" onSubmit={handleSubmit} >
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
                    <label className="form-label">Select Image</label>
                    <input type="file" className="form-control"
                        onChange={e => setData({ ...data, image: e.target.files[0] })} />
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Update</button>
                </div>
            </form> */}
        </div>
    )
}
export default Home;