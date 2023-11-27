import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SearchAppBar from '../component/SearchAppBar';
import axios from 'axios';

function Beat() {
    const navigate = useNavigate();
    const [songCounts, setSongCounts] = useState({});
    const { beat_type } = useParams();
    const userId = sessionStorage.getItem('id_customer');

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`/countSongBeat/${beat_type}`);
                const data = response.data;
                setSongCounts(data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching song count:', error);
            }
        })();
    }, [beat_type]);

    return (
        <>
            <SearchAppBar />
            <div className='d-flex flex-column align-items-center pt-2'>
                <div className='d-flex flex-column align-items-center pt-4'>
                    <h3 className="d-flex justify-content-center" style={{ color: '#0d6efd', fontWeight: 'bold' }}>Beat</h3>
                </div>
                <div className="d-grid" style={{ padding: '5px' }}>
                    <div className="list-grid">
                        <div className="item-grid item-1" onClick={() => navigate(`/songBeat/${userId}/ballad`)} style={{ cursor: 'pointer' }}>
                            <h3>Ballad</h3>
                            <h6>{songCounts.beat_type === 'Ballad' ? `${songCounts.songCount} bài` : 'Loading...'}</h6>
                        </div>
                        {/* Repeat similar code for other beat types */}
                        <div className="item-grid item-2">
                            <h3>Blues Tune</h3>
                            <h6>{songCounts.beat_type === 'bluesTune' ? `${songCounts.songCount} bài` : 'Loading...'}</h6>
                        </div>
                        <div className="item-grid item-3">
                            <h3>Disco Tune</h3>
                            <h6>{songCounts.beat_type === 'discoTune' ? `${songCounts.songCount} bài` : 'Loading...'}</h6>
                        </div>
                        <div className="item-grid item-4">
                            <h3>Slow Tune</h3>
                            <h6>{songCounts.beat_type === 'slowTune' ? `${songCounts.songCount} bài` : 'Loading...'}</h6>
                        </div>
                        <div className="item-grid item-5">
                            <h3>Bollero Tune</h3>
                            <h6>{songCounts.beat_type === 'bolleroTune' ? `${songCounts.songCount} bài` : 'Loading...'}</h6>
                        </div>
                        <div className="item-grid item-6">
                            <h3>Fox Tune</h3>
                            <h6>{songCounts.beat_type === 'foxTune' ? `${songCounts.songCount} bài` : 'Loading...'}</h6>
                        </div>
                        <div className="item-grid item-7">
                            <h3>Valse Tune</h3>
                            <h6>{songCounts.beat_type === 'valseTune' ? `${songCounts.songCount} bài` : 'Loading...'}</h6>
                        </div>
                        <div className="item-grid item-8">
                            <h3>Tango Tune</h3>
                            <h6>{songCounts.beat_type === 'tangoTune' ? `${songCounts.songCount} bài` : 'Loading...'}</h6>
                        </div>
                        <div className="item-grid item-9">
                            <h3>Pop Tune</h3>
                            <h6>{songCounts.beat_type === 'popTune' ? `${songCounts.songCount} bài` : 'Loading...'}</h6>
                        </div>
                        <div className="item-grid item-10">
                            <h3>Boston Tune</h3>
                            <h6>{songCounts.beat_type === 'bostonTune' ? `${songCounts.songCount} bài` : 'Loading...'}</h6>
                        </div>
                        <div className="item-grid item-11">
                            <h3>Waltz</h3>
                            <h6>{songCounts.beat_type === 'waltzTune' ? `${songCounts.songCount} bài` : 'Loading...'}</h6>
                        </div>
                        <div className="item-grid item-12">
                            <h3>Chachacha dance</h3>
                            <h6>{songCounts.beat_type === 'chachachadance' ? `${songCounts.songCount} bài` : 'Loading...'}</h6>
                        </div>
                        <div className="item-grid item-13">
                            <h3>Rock Tune</h3>
                            <h6>{songCounts.beat_type === 'rockTune' ? `${songCounts.songCount} bài` : 'Loading...'}</h6>
                        </div>
                        <div className="item-grid item-14">
                            <h3>Dhumba Dance</h3>
                            <h6>{songCounts.beat_type === 'dhumbadance' ? `${songCounts.songCount} bài` : 'Loading...'}</h6>
                        </div>
                        <div className="item-grid item-15">
                            <h3>Bossa Nova</h3>
                            <h6>{songCounts.beat_type === 'bossaNova' ? `${songCounts.songCount} bài` : 'Loading...'}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Beat;
