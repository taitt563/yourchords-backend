import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchAppBar from '../component/SearchAppBar';
import axios from 'axios';

function ManageBeat() {
    const navigate = useNavigate();
    const [beatGenres, setBeatGenres] = useState([]);
    const [beatSongCounts, setBeatSongCounts] = useState({});
    const token = sessionStorage.getItem('token');
    const userId = token.split(':')[0];
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    const beatGenresData = [
        { beat_id: 'Ballad', beat_name: 'Ballad' },
        { beat_id: 'BluesTune', beat_name: 'Blues Tune' },
        { beat_id: 'DiscoTune', beat_name: 'Disco Tune' },
        { beat_id: 'SlowTune', beat_name: 'Slow Tune' },
        { beat_id: 'BolleroTune', beat_name: 'Bollero Tune' },
        { beat_id: 'FoxTune', beat_name: 'Fox Tune' },
        { beat_id: 'ValseTune', beat_name: 'Valse Tune' },
        { beat_id: 'TangoTune', beat_name: 'Tango Tune' },
        { beat_id: 'PopTune', beat_name: 'Pop Tune' },
        { beat_id: 'BostonTune', beat_name: 'Boston Tune' },
        { beat_id: 'WaltzTune', beat_name: 'Waltz' },
        { beat_id: 'Chachachadance', beat_name: 'Chachacha Dance' },
        { beat_id: 'RockTune', beat_name: 'Rock Tune' },
        { beat_id: 'Dhumbadance', beat_name: 'Dhumba Dance' },
        { beat_id: 'BossaNova', beat_name: 'Bossa Nova' },
    ];

    const fetchData = async () => {
        try {
            const countRequests = beatGenresData.map((beat) =>
                axios.get(`${apiUrl}/countSongBeat/${beat.beat_id}`)
            );

            const countResponses = await Promise.all(countRequests);

            const updatedGenres = beatGenresData.map((beat, index) => ({
                ...beat,
                song_count: countResponses[index].data.songCount,
            }));

            const songCountsMap = {};
            updatedGenres.forEach((beat) => {
                songCountsMap[beat.beat_id] = beat.song_count;
            });

            setBeatGenres(updatedGenres);
            setBeatSongCounts(songCountsMap);
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
                        Manage Beat
                    </h3>
                </div>
                <div className="d-grid" style={{ padding: '5px' }}>
                    <div className="list-grid">
                        {beatGenres.map((beatGenre, index) => (
                            <div
                                key={index}
                                className={`item-grid item-${index + 1}`}
                                onClick={() => navigate(`/songBeatManager/${userId}/${beatGenre.beat_id.toLowerCase()}`)}
                                style={{ cursor: 'pointer', border: '1px solid #ccc' }}
                            >
                                <h3>{beatGenre.beat_name}</h3>
                                <h6 style={{ fontWeight: 'bold' }}>
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

export default ManageBeat;
