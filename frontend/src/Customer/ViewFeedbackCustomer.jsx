
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
                                                <Typography id="modal-modal-title" >
                                                    <br />
                                                    To: <b>{data.username_ad}</b>
                                                </Typography>
                                                Email: <b>{data.email_ad}</b>
                                                <p>Date: <b>{moment(data.date).format('YYYY-MM-DD')}</b></p>
                                                <div className="col-md-7 border-right pd-top">
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
                                                <img className="profile-avatar" src={`data:image/png;base64,${data.image}`} />
                                                :
                                                (
                                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                        U
                                                    </Avatar>
                                                )
                                        }
                                        action={
                                            <Button onClick={() => { handleGetReply(data.username) }} size="small" >EDIT COMMENT<TurnLeftIcon color='primary' /></Button>
                                        }
                                        title={<h4><b>{data.username}</b></h4>}

                                        subheader={"Date: " + moment(data.date).format('YYYY-MM-DD - HH:mm:ss')}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            <div  >
                                                <h6 >Email: {data.email}</h6>
                                                {dataReply.map((reply, index) => {
                                                    return <div key={index}>
                                                        <Box
                                                            sx={{
                                                                width: '100px',
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
                                                        <ListItem className='card-header-container' style={{ width: 'fit-content' }} >
                                                            <ListItemAvatar >
                                                                <Avatar >
                                                                    {
                                                                        imageURL && data.image_ad != "" ?
                                                                            <img style={{ width: '40px', height: '40px', borderRadius: '40px' }} src={`data:image/png;base64,${data.image}`} />
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
                                                                primary={data.comment}
                                                                secondary={<label style={{ fontSize: '10px' }}>{moment(data.date_feedback).format('YYYY-MM-DD - HH:mm:ss')}</label>}
                                                            />
                                                        </ListItem>

                                                        <ListItem className='card-header-container' style={{ width: 'fit-content' }} >
                                                            <ListItemAvatar >
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
                                                                primary={data.reply}
                                                                secondary={<label style={{ fontSize: '10px' }}>{moment(data.date_reply).format('YYYY-MM-DD - HH:mm:ss')}</label>}
                                                            />
                                                        </ListItem>

                                                    </>
                                                )
                                                :
                                                (
                                                    <>
                                                        <CardHeader
                                                            avatar={
                                                                imageURL && data.image != "" ?
                                                                    <img style={{ width: '40px', height: '40px', borderRadius: '40px' }} src={`data:image/png;base64,${data.image}`} />
                                                                    :
                                                                    (
                                                                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                                            U
                                                                        </Avatar>
                                                                    )
                                                            }
                                                            title={<b>{data.comment}</b>}
                                                            subheader={"Date: " + moment(data.date_feedback).format('YYYY-MM-DD - HH:mm:ss')}
                                                        />
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
            </div >

        </>
    )
}
export default ViewFeedbackCustomer