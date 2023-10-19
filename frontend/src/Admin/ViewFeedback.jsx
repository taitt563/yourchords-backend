
import axios from 'axios';
import { useState, useEffect } from 'react';
import SearchAppBar from '../component/SearchAppBar';
import { useParams, useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import moment from 'moment'
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import Modal from '@mui/material/Modal';

function ViewFeedback() {
    const [data, setData] = useState([])
    const [dataReply, setDataReply] = useState([]);
    const { username } = useParams();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:8081/viewFeedback/' + username)

            .then(res => {
                console.log(res.data.Result)

                setData({
                    ...data,
                    email: res.data.Result[0].email,
                    address: res.data.Result[0].address,
                    comment: res.data.Result[0].comment,
                    username: res.data.Result[0].username,
                    image: res.data.Result[0].image,
                    date: res.data.Result[0].date,
                    reply: res.data.Result[0].reply,
                })
                setDataReply(res.data.Result);


            })

            .catch(err => console.log(err));
    }, [])

    const handleSubmit = () => {
        axios.put('http://localhost:8081/replyFeedback/' + username, data)
            .then(
                navigate(-1)
            )
            .catch(err => console.log(err));
    }
    const handleGetReply = () => {
        setOpen(true);
        axios.get('http://localhost:8081/viewFeedback/' + username)
            .then(res => {
                if (res.data.Status === "Success") {
                    setDataReply(res.data.Result);
                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));
    }
    const labels = {
        0.5: 'Useless',
        1: 'Useless+',
        1.5: 'Poor',
        2: 'Poor+',
        2.5: 'Ok',
        3: 'Ok+',
        3.5: 'Good',
        4: 'Good+',
        4.5: 'Excellent',
        5: 'Excellent+',
    };
    function getLabelText(value) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;

    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return (
        <>
            <SearchAppBar />
            <div className='d-flex flex-column align-items-center pt-2'>
                <div className='d-flex flex-column align-items-center pt-4'>
                    <h3 className="d-flex justify-content-center">PROFILE</h3>
                </div>
                <div className='d-flex flex-column align-items-center pt-4'>
                    <div className="container">
                        <div className="px-1 py-5">
                            <div className="row">
                                <div className="card">
                                    <div>
                                        <Modal
                                            open={open}
                                            onClose={() => { setOpen(false) }}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={style}>
                                                <h4 className="d-flex justify-content-center">REPLY</h4>
                                                <Typography id="modal-modal-title" >
                                                    <br />
                                                    To: <b>{data.username}</b>

                                                </Typography>
                                                Email: <b>{data.email}</b>
                                                <p>Reply date: <b>{moment(data.date_reply).format('YYYY-MM-DD - HH:mm:ss')}</b></p>
                                                <div className="col-md-7 border-right pd-top">
                                                    <div className="py-6">
                                                        <textarea cols="34" rows="5" onChange={e => setData({ ...data, reply: e.target.value })} value={data.reply} placeholder='Your reply...'>{data.reply}
                                                        </textarea>
                                                        <div className="mt-5">
                                                            <Button variant={'contained'} onClick={handleSubmit} type="submit" className="btn btn-primary">SUBMIT</Button>
                                                        </div>
                                                    </div>
                                                </div>

                                            </Box>
                                        </Modal>
                                    </div>

                                    <CardHeader
                                        avatar={
                                            data.image != "" ?
                                                <img src={`http://localhost:8081/images/` + data.image} alt="" className='profile_image' />
                                                :
                                                (
                                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                        U
                                                    </Avatar>
                                                )

                                        }

                                        action={
                                            <Button onClick={() => { handleGetReply(data.username) }} size="small" >REPLY<TurnLeftIcon color='primary' /></Button>
                                        }
                                        title={<h4><b>{data.username}</b></h4>}

                                        subheader={"Date: " + moment(data.date).format('YYYY-MM-DD - HH:mm:ss')}
                                    />
                                    <div className="pd-left" >
                                        <h6 className="pd-left" >Email: {data.email}</h6>
                                        {dataReply.map((reply, index) => {
                                            return <div key={index}>
                                                <Box
                                                    sx={{
                                                        width: 700,
                                                        height: 100,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <Rating
                                                        name="hover-feedback"
                                                        value={reply.rating}
                                                        precision={0.5}
                                                        getLabelText={getLabelText}
                                                        readOnly
                                                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                    />

                                                </Box>
                                            </div>
                                        })}
                                    </div>

                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Comment:
                                            <h5>{data.comment}</h5>
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">

                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <hr />
                                        <div className="pd-bottom">
                                            <b className="pd-left" style={{ color: 'green' }}><CheckCircleIcon color='success' />Seen</b>
                                        </div>
                                    </CardActions>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <Button variant={'contained'} onClick={() => navigate(-1)} type="submit" className="btn btn-primary">Close</Button>
                    </div>
                </div>

            </div>

        </>
    )
}
export default ViewFeedback