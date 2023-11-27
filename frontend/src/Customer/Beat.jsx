import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchAppBar from '../component/SearchAppBar';
import axios from 'axios';

function Beat() {
    const navigate = useNavigate();
    const [songCounts, setSongCounts] = useState({});
    const userId = sessionStorage.getItem('id_customer');

    const beat_typeValues = {
        'Ballad': 'Ballad',
        'BluesTune': 'Blues Tune',
        'discoTune': 'Disco Tune',
        'slowTune': 'Slow Tune',
        'bolleroTune': 'Bollero Tune',
        'foxTune': 'Fox Tune',
        'valseTune': 'Valse Tune',
        'tangoTune': 'Tango Tune',
        'popTune': 'Pop Tune',
        'bostonTune': 'Boston Tune',
        'waltzTune': 'Waltz',
        'chachachadance': 'Chachacha Dance',
        'rockTune': 'Rock Tune',
        'dhumbadance': 'Dhumba Dance',
        'bossaNova': 'Bossa Nova',
    };

    const fetchData = async () => {
        try {
            const beatTypes = Object.keys(beat_typeValues);
            const requests = beatTypes.map((beat_type) => axios.get(`/countSongBeat/${beat_type}`));

            const responses = await Promise.all(requests);
            const countsMap = {};
            responses.forEach((response, index) => {
                const beatType = beatTypes[index];
                // Check if the response structure is as expected
                if (response.data && response.data.songCount !== undefined) {
                    countsMap[beatType] = response.data.songCount;
                } else {
                    console.error(`Invalid response structure for ${beatType}`);
                }
            });

            setSongCounts(countsMap);
        } catch (error) {
            console.error('Error fetching song counts:', error);
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
                        {Object.keys(beat_typeValues).map((beat_type, index) => (
                            <div
                                key={index}
                                className={`item-grid item-${index + 1}`}
                                onClick={() => navigate(`/songBeat/${userId}/${beat_type}`)}
                                style={{ cursor: 'pointer' }}
                            >
                                <h3>{beat_typeValues[beat_type]}</h3>
                                <h6>
                                    {songCounts[beat_type] !== undefined ? `${songCounts[beat_type]} bài` : '0 bài'}
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
