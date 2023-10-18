import { useParams } from 'react-router-dom';
import axios from 'axios';
// import SearchAppBar from "../component/SearchAppBar";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CampaignIcon from '@mui/icons-material/Campaign';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ModeIcon from '@mui/icons-material/Mode';
import { useState, useEffect } from 'react';
import { Link } from '@mui/material';
import SearchAppBar from '../component/SearchAppBar';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
function Home() {

    const [data, setData] = useState([]);

    const { userId } = useParams();
    //admin
    const [adminCount, setAdminCount] = useState();
    const [adminActiveCount, setAdminActiveCount] = useState();
    const [adminDisableCount, setAdminDisableCount] = useState();
    //chord
    const [chordManagerCount, setChordManagerCount] = useState();
    const [chordManagerActive, setChordManagerActive] = useState();
    const [chordManagerDisable, setChordManagerDisable] = useState();
    //musician
    const [musicianCount, setMusicianCount] = useState();
    const [musicianActive, setMusicianActive] = useState();
    const [musicianDisable, setMusicianDisable] = useState();
    //musician
    const [customerCount, setCustomerCount] = useState();
    const [customerActive, setCustomerActive] = useState();
    const [customerDisable, setCustomerDisable] = useState();

    useEffect(() => {
        const userId = localStorage.getItem('id_admin');
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
    useEffect(() => {
        //adminCount
        axios.get('http://localhost:8081/adminCount')
            .then(res => {
                setAdminCount(res.data[0].admin)
            }).catch(err => console.log(err));
        axios.get('http://localhost:8081/adminCountActive')
            .then(res => {
                setAdminActiveCount(res.data[0].adminActive)
            }).catch(err => console.log(err));
        axios.get('http://localhost:8081/adminCountDisable')
            .then(res => {
                setAdminDisableCount(res.data[0].adminDisable)
            }).catch(err => console.log(err));
        //chordManagerCount
        axios.get('http://localhost:8081/chordManagerCount')
            .then(res => {
                setChordManagerCount(res.data[0].chordManager)
            }).catch(err => console.log(err));
        axios.get('http://localhost:8081/chordManagerCountActive')
            .then(res => {
                setChordManagerActive(res.data[0].chordManagerActive)
            }).catch(err => console.log(err));
        axios.get('http://localhost:8081/chordManagerCountDisable')
            .then(res => {
                setChordManagerDisable(res.data[0].chordManagerDisable)
            }).catch(err => console.log(err));
        //musicianCount
        axios.get('http://localhost:8081/musicianCount')
            .then(res => {
                setMusicianCount(res.data[0].musician)
            }).catch(err => console.log(err));
        axios.get('http://localhost:8081/musicianCountActive')
            .then(res => {
                setMusicianActive(res.data[0].musicianActive)
            }).catch(err => console.log(err));
        axios.get('http://localhost:8081/musicianCountDisable')
            .then(res => {
                setMusicianDisable(res.data[0].musicianDisable)
            }).catch(err => console.log(err));
        //customerCount
        axios.get('http://localhost:8081/customerCount')
            .then(res => {
                setCustomerCount(res.data[0].customer)
            }).catch(err => console.log(err));
        axios.get('http://localhost:8081/customerCountActive')
            .then(res => {
                setCustomerActive(res.data[0].customerActive)
            }).catch(err => console.log(err));
        axios.get('http://localhost:8081/customerCountDisable')
            .then(res => {
                setCustomerDisable(res.data[0].customerDisable)
            }).catch(err => console.log(err));
    }, [])
    const Root = styled('div')(({ theme }) => ({
        width: '100%',
        ...theme.typography.body2,
        '& > :not(style) ~ :not(style)': {
            marginTop: theme.spacing(2),
        },
    }));
    return (
        <>
            <SearchAppBar />
            <div className='px-3 py-4'>
                <strong><p><CampaignIcon sx={{ fontSize: 30 }} /></p></strong> <strong>&nbsp;&nbsp;Welcome to your Admin Dashboard!!</strong>.
            </div>
            <main>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3 mb-3">
                            <div className="card text-white h-100">
                                <div className="card-body py-4">
                                    <ManageAccountsIcon color="primary" sx={{ fontSize: 50 }} />
                                    <div className="col-xs-7">
                                        <div className="numbers pd-right fontDashboard">
                                            <p><strong>Account</strong></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer d-flex">
                                    <Link underline='none' href="/manageAccount">
                                        <div className="stats">
                                            <i><ArrowForwardIcon /></i>
                                            View Details
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="card  text-white h-100">
                                <div className="card-body py-4">
                                    <QueueMusicIcon color="primary" sx={{ fontSize: 50 }} />
                                    <div className="col-xs-7">
                                        <div className="numbers pd-right fontDashboard">
                                            <p><strong>Song</strong></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer d-flex">
                                    <Link underline='none' href="/Song">
                                        <div className="stats">
                                            <i><ArrowForwardIcon /></i>
                                            View Details
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="card  text-white h-100">
                                <div className="card-body py-4">
                                    <ThumbUpAltIcon color="primary" sx={{ fontSize: 50 }} />
                                    <div className="col-xs-7">
                                        <div className="numbers pd-right fontDashboard">
                                            <p><strong>Feedback</strong></p>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-footer d-flex">
                                    <Link underline='none' href="/manageFeedback">
                                        <div className="stats">
                                            <i><ArrowForwardIcon /></i>
                                            View Details
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">

                            <div className="card  text-white h-100">
                                <div className="card-body py-4">
                                    <ModeIcon color="primary" sx={{ fontSize: 50 }} />
                                    <div className="col-xs-7">
                                        <div className="numbers pd-right fontDashboard">
                                            <p><strong>Profile</strong></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer d-flex">
                                    {data.map((profile, index) => {
                                        return <div key={index}>
                                            <Link underline='none' href={`/profile/` + profile.userId}>
                                                <div className="stats">
                                                    <i><ArrowForwardIcon /></i>
                                                    View Details
                                                </div>
                                            </Link>
                                        </div>
                                    })}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <div>
                {/* <div className='p-3 d-flex justify-content-around mt-2'>
                    <div className="col-3 pd-right">
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
                    <div className="col-3 pd-right">
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
                    <div className="col-3 pd-right">
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
                    <div className="col-3 pd-right">
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
                </div> */}

                <div>
                    <div className='p-3 d-flex justify-content-around mt-3'>
                        <Root>
                            <Divider>
                                <Chip label="ACCOUNT" color='primary' />
                            </Divider>

                        </Root>
                    </div>
                    <div className='p-3 d-flex justify-content-around mt-3'>

                        <div className='px-3 pt-2 pb-3  shadow-sm w-25'>
                            <div className='text-center'>
                                <h4><b>ADMIN</b></h4>
                            </div>
                            <hr />
                            <div>
                                <label className="form-label">Total: <h2><b>{adminCount}</b></h2></label>
                            </div>
                            <div>
                                <h5>Total account active: {adminActiveCount}</h5>
                            </div>
                            <div>
                                <h5>Total account disabled: {adminDisableCount}</h5>
                            </div>
                        </div>
                        <div className='px-3 pt-2 pb-3  shadow-sm w-25'>
                            <div className='text-center'>
                                <h4><b>CHORD MANAGER</b></h4>
                            </div>
                            <hr />
                            <div>
                                <label className="form-label">Total: <h2><b>{chordManagerCount}</b></h2></label>
                            </div>
                            <div>
                                <h5>Total account active: {chordManagerActive}</h5>
                            </div>
                            <div>
                                <h5>Total account disabled: {chordManagerDisable}</h5>
                            </div>
                        </div>
                        <div className='px-3 pt-2 pb-3  shadow-sm w-25'>
                            <div className='text-center'>
                                <h4><b>MUSICIAN</b></h4>
                            </div>
                            <hr />
                            <div>
                                <label className="form-label">Total: <h2><b>{musicianCount}</b></h2></label>
                            </div>
                            <div>
                                <h5>Total account disabled: {musicianActive}</h5>
                            </div>
                            <div>
                                <h5>Total account disabled: {musicianDisable}</h5>
                            </div>
                        </div>
                        <div className='px-3 pt-2 pb-3  shadow-sm w-25'>
                            <div className='text-center'>
                                <h4><b>USER</b></h4>
                            </div>
                            <hr />
                            <div>
                                <label className="form-label">Total: <h2><b>{customerCount}</b></h2></label>
                            </div>
                            <div>
                                <h5>Total account active: {customerActive}</h5>
                            </div>
                            <div>
                                <h5>Total account disabled: {customerDisable}</h5>
                            </div>
                        </div>
                    </div>
                    {/* List of admin  */}
                    {/* <div className='mt-4 px-5 pt-3'>
                    <h3>List of Admins</h3>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Admin</td>
                                <td>Admin</td>
                            </tr>
                        </tbody>
                    </table>
                </div> */}
                </div>
            </div>
        </>

    )
}
export default Home;