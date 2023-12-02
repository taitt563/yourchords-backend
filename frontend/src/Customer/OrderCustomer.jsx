import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchAppBar from '../component/SearchAppBar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

function OrderCustomer() {
  const [title, setTitle] = useState('');
  const [lyric, setLyric] = useState('');
  const [artist, setArtist] = useState('');
  const [duration, setDuration] = useState(null);
  const [genre, setGenre] = useState('');
  const [link, setLink] = useState('');
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const token = sessionStorage.getItem('token');
  const userId = token.split(':')[0];

  const handleConfirmOrder = async (event) => {
    event.preventDefault();
    const form = event.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const formData = {
      song_name: title,
      lyric: lyric,
      artist_name: artist,
      duration: duration,
      genre: genre,
      audio_link: link,
    };


    try {
      const response = await axios.post(`${apiUrl}/order/${userId}`, formData);

      if (response.data.Status === 'Success') {
        window.location.reload(true)
      }
    } catch (error) {
      console.error('Error confirming order:', error.message);
    }
  };
  const handleDurationChange = (date) => {
    const currentDate = new Date();
    const selectedDate = new Date(date);
    const timeDifference = selectedDate - currentDate;

    if (timeDifference >= 24 * 60 * 60 * 1000) {
      setDuration(date);
    } else {
      console.error('Selected duration must be at least 24 hours from the current date and time.');
    }
  };


  return (
    <>
      <SearchAppBar />
      <div className="container">
        <div className="py-4 text-center">
          <h2 style={{ color: '#0d6efd', fontWeight: 'bold' }}>Order</h2>
        </div>
        <div className="row">
          <div className="col-md-4 order-md-2 mb-4" style={{ backgroundColor: "#EFFBEF", height: '270px', width: '420px' }}>
            <h4 className="text-center mb-3">
              <span>Notes</span>
            </h4>
            <ul className="list-group mb-3">
              <div className='notes' style={{ marginLeft: '50px' }}>
                <li>Posts are not duplicated</li>
                <li>Write the full name of the song</li>
                <li>Type in English or Vietnamese with accents</li>
                <li>Enter full lyrics and chords. </li>
                <li>Do not post songs with reactionary or sensitive content that violate Vietnamese customs and traditions.</li>
              </div>
            </ul>
          </div>

          <div className="col-md-8 order-md-1">
            <form className="needs-validation" noValidate onSubmit={handleConfirmOrder}>
              <div className="row">
                <div className="mb-3">
                  <label htmlFor="title">Song title</label>
                  <input type="text" className="form-control" id="title" placeholder="I see fire" value={title} onChange={(e) => setTitle(e.target.value)} required />
                  <div className="invalid-feedback">
                    Song title is required.
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="lyric">Lyric</label>
                <div className="input-group">
                  <textarea id='lyric' rows={15} cols={100} value={lyric} onChange={(e) => setLyric(e.target.value)} style={{ borderRadius: '10px' }} required></textarea>
                  <div className="invalid-feedback">
                    Lyric is required.
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="artist">Artist</label>
                <input type="text" className="form-control" id="artist" placeholder="Ed sheeran" value={artist} onChange={(e) => setArtist(e.target.value)} required />
                <div className="invalid-feedback">
                  Please enter artist!
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="duration" className="form-label">Duration ( at least 24 hours from the current date)</label>
                <div className="input-group">
                  <DatePicker
                    id="duration"
                    selected={duration}
                    onChange={handleDurationChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="yyyy-MM-dd HH:mm:ss"
                    className="form-control"
                    minDate={new Date()}
                    required
                  />
                  <div >
                    <span className="input-group-text bg-primary  text-white">
                      <i className="bi-calendar-day"></i>
                    </span>
                  </div>
                  <div className="invalid-feedback">
                    Please enter duration!
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="cc-genre">Genre</label>
                  <select className="form-control" id="cc-genre" value={genre} onChange={(e) => setGenre(e.target.value)} required>
                    <option value="">Select Genre</option>
                    <option value="acoustic">Acoustic</option>
                    <option value="rock">Rock</option>
                    <option value="jazz">Jazz</option>
                    <option value="ballad">Ballad</option>
                    <option value="pop">Pop</option>
                    <option value="rb">R&b</option>
                  </select>
                  <div className="invalid-feedback">
                    Please enter genre!
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="cc-link">Link</label>
                  <input type="text" className="form-control" id="cc-link" placeholder="" value={link} onChange={(e) => setLink(e.target.value)} required />
                  <div className="invalid-feedback">
                    Link is required!
                  </div>
                </div>
              </div>
              <hr className="mb-4" />
              <button className="btn btn-primary btn-lg btn-block" type="submit">Confirm order</button>
            </form>
          </div>
        </div>

        <footer className="my-5 pt-5 text-muted text-center text-small">

        </footer>
      </div>
    </>
  )
}

export default OrderCustomer;
