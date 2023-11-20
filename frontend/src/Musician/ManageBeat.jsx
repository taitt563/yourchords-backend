import SearchAppBar from '../component/SearchAppBar';
// import Button from '@mui/material/Button';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react';



function ManageBeat() {
    const [randomValue, setRandomValue] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('YOUR_API_ENDPOINT');
                const data = await response.json();
                setRandomValue(data.randomValue);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <>
            <SearchAppBar />
            <div className='d-flex flex-column align-items-center pt-2'>
                <div className='d-flex flex-column align-items-center pt-4'>
                    <h3 className="d-flex justify-content-center">MANAGE BEAT</h3>
                </div>
                <div className="d-grid">
                    <Link to="/ListSong" className="item-grid">
                        <h3>Go to ListSong</h3>
                        <h6>20135 bài</h6>
                    </Link>
                </div>
            </div>
        </>
    )
}
export default ManageBeat;