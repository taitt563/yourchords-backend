import 'bootstrap-icons/font/bootstrap-icons.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
function ProfileAdmin() {
    const [data, setData] = useState({
        username: '',
        password: ''
    })

    let showDate = new Date();
    let displaytodaysdate = showDate.getFullYear() + '-' + (showDate.getMonth() + 1) + '-' + showDate.getDate();

    useEffect(() => {
        axios.get('http://localhost:8081/getProfile')
            .then(res => {
                if (res.data.Status === "Success") {
                    setData(res.data.Result);

                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <>

            <ListItem >
                <ListItemAvatar className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
                    <Avatar>
                        {
                            <img src={`http://localhost:8081/images/` + data.image} alt="" className='profile_image' />
                        }
                    </Avatar>
                </ListItemAvatar>
                <ListItemText className="font" primary={<b>{data.name}</b>} secondary={"Email: " + data.email} />
            </ListItem>
            <br />
            <span type="text" className='fs-100  font pd-left'>Date current: <b>{displaytodaysdate}</b></span>

        </>
    )
}

export default ProfileAdmin