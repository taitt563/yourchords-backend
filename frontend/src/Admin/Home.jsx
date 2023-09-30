import { useParams } from 'react-router-dom';
import axios from 'axios';

import SearchAppBar from "../component/SearchAppBar";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CampaignIcon from '@mui/icons-material/Campaign';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ModeIcon from '@mui/icons-material/Mode';

import { useState, useEffect } from 'react';
function Home() {

    const [data, setData] = useState([]);

    const { userId } = useParams();

    useEffect(() => {
        const userId = localStorage.getItem('id');
        axios.get('http://localhost:8081/getProfile/' + userId)
            .then(res => {
                if (res.data.Status === "Success") {
                    setData(res.data.Result);

                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));
    }, [userId])

    return (
        <>
            <SearchAppBar />
            <div className='d-flex flex-column align-items-center pt-4'>

                <div className="container">
                    <div className="px-2 py-5">
                        <div className="alert alert-success">
                            <strong><span><CampaignIcon sx={{ fontSize: 30 }} /></span></strong> <strong>&nbsp;&nbsp;Welcome to your Admin Dashboard!!</strong>.
                        </div>
                        <div className="row">
                            <div className="col-lg-3 col-sm-6">
                                <div className="card">

                                    <div className="row">
                                        <div className="col-xs-5">
                                            <div className="pd-left">
                                                <ManageAccountsIcon color="primary" sx={{ fontSize: 50 }} />
                                            </div>
                                        </div>
                                        <div className="col-xs-7">
                                            <div className="numbers pd-right">
                                                <p><strong>Account</strong></p>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="/manageAccount">
                                        <div className="footer">
                                            <hr />
                                            <div className="stats">
                                                <i className="pd-left"><ArrowForwardIcon /></i>
                                                View
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="card">

                                    <div className="row">
                                        <div className="col-xs-5">
                                            <div className="pd-left">
                                                <QueueMusicIcon color="primary" sx={{ fontSize: 50 }} />
                                            </div>
                                        </div>
                                        <div className="col-xs-7">
                                            <div className="numbers pd-right">
                                                <p><strong>Song</strong></p>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="/Song">
                                        <div className="footer">
                                            <hr />
                                            <div className="stats">
                                                <i className="pd-left"><ArrowForwardIcon /></i>
                                                View
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="card">

                                    <div className="row">
                                        <div className="col-xs-5">
                                            <div className="pd-left">
                                                <ThumbUpAltIcon color="primary" sx={{ fontSize: 50 }} />
                                            </div>
                                        </div>
                                        <div className="col-xs-7">
                                            <div className="numbers pd-right">
                                                <p><strong>Feedback</strong></p>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="/manageFeedback">
                                        <div className="footer">
                                            <hr />
                                            <div className="stats">
                                                <i className="pd-left"><ArrowForwardIcon /></i>
                                                View
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            <div className="col-lg-3 col-sm-6">
                                <div className="card">
                                    {data.map((profile, index) => {
                                        return <div key={index}>
                                            <div className="row">
                                                <div className="col-xs-5">
                                                    <div className="pd-left">
                                                        <ModeIcon color="primary" sx={{ fontSize: 50 }} />
                                                    </div>
                                                </div>
                                                <div className="col-xs-7">
                                                    <div className="numbers pd-right">
                                                        <p><strong>Profile</strong></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <a href={`/profile/` + profile.userId}>
                                                <div className="footer">
                                                    <hr />
                                                    <div className="stats">
                                                        <i className="pd-left"><ArrowForwardIcon /></i>
                                                        View
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
export default Home;