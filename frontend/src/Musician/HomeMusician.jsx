// import { useParams } from 'react-router-dom';
// import axios from 'axios';
import SearchAppBar from "../component/SearchAppBar";

// import { useState, useEffect } from 'react';
function HomeMusician() {

    // const [data, setData] = useState([]);

    // const { userId } = useParams();

    // useEffect(() => {
    //     const userId = localStorage.getItem('id');
    //     axios.get('http://localhost:8081/getProfile/' + userId)
    //         .then(res => {
    //             if (res.data.Status === "Success") {
    //                 setData(res.data.Result);

    //             } else {
    //                 alert("Error")
    //             }
    //         })
    //         .catch(err => console.log(err));
    // }, [userId])
    return (
        <>
            <SearchAppBar />
            <div className="px-2 py-5">
                <p>Home Musician</p>
            </div>
        </>

    )
}
export default HomeMusician;