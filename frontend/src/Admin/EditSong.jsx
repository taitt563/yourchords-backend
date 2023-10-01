
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import SearchAppBar from '../component/SearchAppBar';
function EditSong() {
    const [data, setData] = useState({
        name: '',
        image: '',
    })
    const navigate = useNavigate()

    const { id } = useParams();
    let time = new Date();
    let displaytodaysdate = time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate();

    useEffect(() => {
        axios.get('http://localhost:8081/get/' + id)
            .then(res => {
                setData({
                    ...data,
                    name: res.data.Result[0].name,
                })
            })
            .catch(err => console.log(err));
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.put('http://localhost:8081/updateSong/' + id, data)

            .then(res => {
                if (res.data.Status === "Success") {
                    navigate('/')
                }
            })
            .catch(err => console.log(err));
    }
    return (
        <>
            <SearchAppBar />
            <div className='d-flex flex-column align-items-center pt-4'>
                <h2>Song</h2>
                <form className="row g-3 w-50" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
                            onChange={e => setData({ ...data, name: e.target.value })} value={data.name} />
                    </div>
                    <div className="col-12">
                        <label className="form-label">Date:</label>
                        <br />
                        <input type="text" className="form-control" value={displaytodaysdate}
                        />
                    </div>
                    <div className="col-12 mb-3">
                        <label className="form-label">Select Image</label>
                        <input type="file" className="form-control" id="inputGroupFile01"
                            onChange={e => setData({ ...data, image: e.target.files[0] })} />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Update</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default EditSong;