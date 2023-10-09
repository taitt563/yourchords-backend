
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import SearchAppBar from '../component/SearchAppBar';
function EditSongMusician() {
    const [data, setData] = useState({
        song_title: '',
        lyrics: '',
        link: '',
    })
    const navigate = useNavigate()

    const { song_title } = useParams();
    let time = new Date();
    let displaytodaysdate = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();

    useEffect(() => {
        axios.get('http://localhost:8081/getSong/' + song_title)
            .then(res => {
                setData({
                    ...data,
                    song_title: res.data.Result[0].song_title,
                    lyrics: res.data.Result[0].lyrics,
                    link: res.data.Result[0].link,


                })
            })
            .catch(err => console.log(err));
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.put('http://localhost:8081/updateSong/' + song_title, data)

            .then(res => {
                if (res.data.Status === "Success") {
                    navigate('/songMusician')
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
                            onChange={e => setData({ ...data, song_title: e.target.value })} value={data.song_title} />
                    </div>
                    <div className="col-12">
                        <label className="form-label">Lyrics: </label>
                        <input type="text" className="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
                            onChange={e => setData({ ...data, lyrics: e.target.value })} value={data.lyrics} />
                    </div>
                    <div className="col-12">
                        <label className="form-label">Link: </label>
                        <input type="text" className="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
                            onChange={e => setData({ ...data, link: e.target.value })} value={data.link} />
                    </div>
                    <div className="col-12">
                        <label className="form-label">Date:</label>
                        <br />
                        <input type="text" className="form-control" value={displaytodaysdate}
                        />
                    </div>
                    {/* <div className="col-12 mb-3">
                        <label className="form-label">Select Image</label>
                        <input type="file" className="form-control" id="inputGroupFile01"
                            onChange={e => setData({ ...data, image: e.target.files[0] })} />
                    </div> */}
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Update</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default EditSongMusician;