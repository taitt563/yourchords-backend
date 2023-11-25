
import axios from 'axios';
import { useState, useEffect } from 'react';
import SearchAppBar from '../component/SearchAppBar';
import { useParams, useNavigate } from 'react-router-dom';
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
import Tooltip from '@material-ui/core/Tooltip';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItem from '@mui/material/ListItem';
function ViewFeedbackCustomer() {
    const [data, setData] = useState({
        email: '',
        address: '',
        comment: '',
        username: '',
        image: '',
        date: '',
        date_feedback: '',
        date_reply: '',
        reply: '',
        rating: 5,
    });

    const [dataReply, setDataReply] = useState([]);
    const [value, setValue] = useState(5);
    const [hover, setHover] = useState(5);
    const [imageURL, setImageURL] = useState(null);
    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    useEffect(() => {
        axios.get(`${apiUrl}/viewFeedback/` + id)
            .then(res => {
                setData({
                    ...data,
                    email: res.data.Result[0].email,
                    address: res.data.Result[0].address,
                    comment: res.data.Result[0].comment,
                    username: res.data.Result[0].username,
                    username_ad: res.data.Result[0].username_ad,
                    status: res.data.Result[0].status,
                    image: res.data.Result[0].image,
                    image_ad: res.data.Result[0].image_ad,
                    email_ad: res.data.Result[0].email_ad,
                    date: res.data.Result[0].date,
                    date_reply: res.data.Result[0].date_reply,
                    date_feedback: res.data.Result[0].date_feedback,
                    reply: res.data.Result[0].reply,
                });
                if (res.data.Result.length > 0) {
                    const profileImages = res.data.Result.map(data => `${data.image}`);
                    setImageURL(profileImages);
                }

                setDataReply(res.data.Result);
            })
            .catch(err => console.log(err));
    }, []);

    const handleSubmit = () => {
        axios.put(`${apiUrl}/replyFeedbackCustomer/` + id, data)
            .then(() => {
                navigate(-1);
            })
            .catch(err => console.log(err));
    };

    const handleGetReply = () => {
        setOpen(true);
        axios.get(`${apiUrl}/viewFeedback/` + id)
            .then(res => {
                if (res.data.Status === "Success") {
                    setDataReply(res.data.Result);
                } else {
                    alert("Error");
                }
            })
            .catch(err => console.log(err));
    };

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

    const styles = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000,
        height: 700,
        borderRadius: 5,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };
    return (
        <>
            <SearchAppBar />
            <div className='d-flex flex-column align-items-center pt-2'>
                <div className='d-flex flex-column align-items-center pt-4'>
                    <h3 className="d-flex justify-content-center" style={{ color: '#0d6efd', fontWeight: 'bold' }}>Feedback</h3>
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
                                            <Box sx={styles}>
                                                <h4 className="d-flex justify-content-center">COMMENT</h4>
                                                <br />

                                                <p>Date: <b>{moment(data.date).format('YYYY-MM-DD')}</b></p>
                                                <div className="col-md-7 border-right">
                                                    <div className="py-6">
                                                        <textarea
                                                            cols="105"
                                                            rows="5"
                                                            style={{ resize: 'none', height: '300px' }}
                                                            onChange={e => setData({ ...data, comment: e.target.value })}
                                                            value={data.comment}
                                                            placeholder='Your reply...'
                                                        />
                                                        <br />
                                                        <div className="pd-bottom">
                                                            <b >How satisfied are you with our product/service ?</b>
                                                        </div>
                                                        <Rating
                                                            name="hover-feedback"
                                                            value={data.rating}
                                                            precision={0.5}
                                                            getLabelText={getLabelText}
                                                            onChange={(event, newValue) => setData({ ...data, rating: newValue }) && setValue(newValue)}

                                                            onChangeActive={(event, newHover) => {
                                                                setHover(newHover);
                                                            }}
                                                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                        />
                                                        {value !== null && (
                                                            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                                                        )}
                                                        <div className="mt-2">
                                                            <Button
                                                                variant={'contained'}
                                                                onClick={handleSubmit}
                                                                type="submit"
                                                                className="btn btn-primary"
                                                            >
                                                                SUBMIT
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>

                                            </Box>
                                        </Modal>
                                    </div>
                                    <CardHeader
                                        avatar={
                                            imageURL && data.image != "" ?
                                                <img style={{ width: '70px', height: '70px', borderRadius: '40px' }} src={`data:image/png;base64,${data.image}`} />
                                                :
                                                (
                                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                        U
                                                    </Avatar>
                                                )
                                        }

                                        action={
                                            data.status === 1 ?
                                                ""
                                                :
                                                <Button onClick={() => { handleGetReply(data.username) }} size="small" >EDIT COMMENT<TurnLeftIcon color='primary' /></Button>
                                        }

                                        title={<h4><b>{data.username}</b></h4>}

                                        subheader={"Today: " + moment(data.date).format('YYYY-MM-DD - HH:mm:ss')}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            <div  >
                                                <h6 >Email: {data.email}</h6>
                                                {dataReply.map((reply, index) => {
                                                    return <div key={index}>
                                                        <Box
                                                            sx={{
                                                                width: '1000px',
                                                                height: '100px',
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
                                            {data.reply.length > 0 ?


                                                (
                                                    <>

                                                        <div className='message-container' style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                                            <div className='message'>
                                                                <Avatar>
                                                                    {imageURL && data.image !== "" ? (
                                                                        <img
                                                                            style={{ width: '40px', height: '40px', borderRadius: '40px' }}
                                                                            src={`data:image/png;base64,${data.image}`}
                                                                        />
                                                                    ) : (
                                                                        <Avatar sx={{ bgcolor: 'red[500]' }} aria-label="recipe">
                                                                            U
                                                                        </Avatar>
                                                                    )}
                                                                </Avatar>
                                                                <Tooltip title={
                                                                    <p>{moment(data.date_feedback).format('YYYY-MM-DD - HH:mm:ss')}</p>

                                                                }
                                                                    arrow
                                                                    placement="right"
                                                                >
                                                                    <div className='message-content' style={{ marginLeft: '8px', maxWidth: '80%', background: '#1E90FF', borderRadius: '8px', padding: '10px' }}>
                                                                        <Typography variant="body1" style={{ textAlign: 'left', color: "#fff" }}>{data.comment}</Typography>

                                                                    </div>
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                        <div className='message-container' style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginTop: '20px' }}>
                                                            <div className='message'>
                                                                <div className='message-content' style={{ marginLeft: 'auto', maxWidth: '60%', background: '#1E90FF', borderRadius: '8px', padding: '10px' }}>
                                                                    <Tooltip title={
                                                                        <p>{moment(data.date_reply).format('YYYY-MM-DD - HH:mm:ss')}</p>

                                                                    }
                                                                        arrow
                                                                        placement="left"
                                                                    >
                                                                        <Typography variant="body1" style={{ textAlign: 'right', color: "#fff" }}>{data.reply}</Typography>

                                                                    </Tooltip>

                                                                </div>
                                                                <Tooltip title={
                                                                    <ListItem >
                                                                        <ListItemAvatar className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none" >
                                                                            <Avatar >
                                                                                {
                                                                                    imageURL && data.image_ad != "" ?
                                                                                        <img style={{ width: '40px', height: '40px', borderRadius: '40px' }} src={`data:image/png;base64,${data.image_ad}`} />
                                                                                        :
                                                                                        (
                                                                                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                                                                U
                                                                                            </Avatar>
                                                                                        )
                                                                                }
                                                                            </Avatar>
                                                                        </ListItemAvatar>
                                                                        <ListItemText
                                                                            primary={<b>{data.username_ad}</b>}
                                                                            secondary={<p className='text-white'>{data.email_ad}</p>}
                                                                        />
                                                                    </ListItem>
                                                                }
                                                                    arrow
                                                                    placement="top"
                                                                >
                                                                    <Avatar style={{ marginLeft: '10px' }}>
                                                                        {imageURL && data.image_ad !== "" ? (
                                                                            <img
                                                                                style={{ width: '40px', height: '40px', borderRadius: '40px' }}
                                                                                src={`data:image/png;base64,${data.image_ad}`}
                                                                            />
                                                                        ) : (
                                                                            <Avatar sx={{ bgcolor: 'red[500]' }} aria-label="recipe">
                                                                                U
                                                                            </Avatar>
                                                                        )}
                                                                    </Avatar>
                                                                </Tooltip>

                                                            </div>
                                                        </div>

                                                    </>

                                                )
                                                :
                                                (
                                                    <>
                                                        <div className='message-container' style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                                            <div className='message' >
                                                                <Avatar>
                                                                    {imageURL && data.image !== "" ? (
                                                                        <img
                                                                            style={{ width: '40px', height: '40px', borderRadius: '40px' }}
                                                                            src={`data:image/png;base64,${data.image}`}
                                                                            alt="User Avatar"
                                                                        />
                                                                    ) : (
                                                                        <Avatar sx={{ bgcolor: 'red[500]' }} aria-label="recipe">
                                                                            U
                                                                        </Avatar>
                                                                    )}
                                                                </Avatar>
                                                                <div className='message-content' style={{ marginLeft: '8px', maxWidth: '80%', background: '#1E90FF', borderRadius: '8px', padding: '8px' }}>
                                                                    <Tooltip title={
                                                                        <p>{moment(data.date_feedback).format('YYYY-MM-DD - HH:mm:ss')}</p>

                                                                    }
                                                                        arrow
                                                                        placement="right"
                                                                    >
                                                                        <Typography variant="body1" style={{ textAlign: 'right', color: "#fff" }}>{data.comment}</Typography>

                                                                    </Tooltip>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">

                                        </Typography>
                                    </CardContent>
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
export default ViewFeedbackCustomer