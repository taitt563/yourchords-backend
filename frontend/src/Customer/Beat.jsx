import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchAppBar from '../component/SearchAppBar';
import axios from 'axios';

function Beat() {
    const navigate = useNavigate();
    const [beatGenres, setBeatGenres] = useState([]);
    const [beatSongCounts, setBeatSongCounts] = useState({});
    const userId = sessionStorage.getItem('id_customer');
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    const fetchData = async () => {
        try {
            const beatResponse = await axios.get(`${apiUrl}/getBeatGenres`);

            if (beatResponse.data.Status === "Success") {
                const fetchedGenres = beatResponse.data.Result;

                const countRequests = fetchedGenres.map((beat) =>
                    axios.get(`${apiUrl}/countSongBeat/${beat.beat_id}`)
                );

                const countResponses = await Promise.all(countRequests);

                const updatedGenres = fetchedGenres.map((beat, index) => ({
                    ...beat,
                    song_count: countResponses[index].data.songCount,
                }));

                const songCountsMap = {};
                updatedGenres.forEach((beat) => {
                    songCountsMap[beat.beat_id] = beat.song_count;
                });

                setBeatGenres(updatedGenres);
                setBeatSongCounts(songCountsMap);
            } else {
                alert("Error");
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <SearchAppBar />
            <div className="d-flex flex-column align-items-center pt-2">
                <div className="d-flex flex-column align-items-center pt-4">
                    <h3 className="d-flex justify-content-center" style={{ color: '#0d6efd', fontWeight: 'bold' }}>
                        Beat
                    </h3>
                </div>
                <div className="d-grid" style={{ padding: '5px' }}>
                    <div className="list-grid">
                        {beatGenres.map((beatGenre, index) => (
                            <div
                                key={index}
                                className={`item-grid item-${index + 1}`}
                                onClick={() => navigate(`/songBeat/${userId}/${beatGenre.beat_id}`)}
                                style={{ cursor: 'pointer' }}
                            >
                                <h3>{beatGenre.beat_id}</h3>
                                <h6>
                                    {beatSongCounts[beatGenre.beat_id] !== undefined
                                        ? `${beatSongCounts[beatGenre.beat_id]} bài`
                                        : '0 bài'}
                                </h6>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Beat;
