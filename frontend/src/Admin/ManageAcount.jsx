import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import LockOpenIcon from '@mui/icons-material/LockOpen';
function ManageAccount() {
    const [toggleState, setToggleState] = useState(1);
    const toggleTab = (index) => {
        setToggleState(index);
    };
    const [data, setData] = useState([])

    axios.defaults.withCredentials = true;




    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:8081/getAccount')
            .then(res => {
                if (res.data.Status === "Success") {
                    setData(res.data.Result);
                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));
    }, [])

    const handleDelete = (id) => {
        axios.delete('http://localhost:8081/deleteAccount/' + id)
            .then(res => {
                if (res.data.Status === "Success") {
                    window.location.reload(true);
                }
            })
            .catch(err => console.log(err));
    }
    const handleBanAccount = (id) => {
        axios.put('http://localhost:8081/banAccount/' + id)
            .then(res => {
                if (res.data.Status === "Success") {
                    window.location.reload(true);
                }
            })
            .catch(err => console.log(err));
    }
    const handleUnBanAccount = (id) => {
        axios.put('http://localhost:8081/unBanAccount/' + id)
            .then(res => {
                if (res.data.Status === "Success") {
                    window.location.reload(true);
                }
            })
            .catch(err => console.log(err));
    }
    return (

        <>
            <div className="bloc-tabs">
                <button className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(1)}>
                    <b>User</b>
                </button>
                <button className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(2)}>
                    <b>Admin</b>
                </button>
                <button className={toggleState === 3 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(3)}>
                    <b>Chord Manager</b>
                </button>
                <button className={toggleState === 4 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(4)}>
                    <b>Musician</b>
                </button>
            </div>
            <div className="content-tabs">
                <div
                    className={toggleState === 1 ? "content active-content" : "content"}>
                    {/* Manage account user */}
                    <div className="px-2 py-5">
                        <div>
                            <h3 className="p-2 d-flex justify-content-center">User Account Management</h3>
                        </div>
                        <div className='mt-4'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Username</th>
                                        <th>Role</th>
                                        <th>Active</th>
                                        <th>Option</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((userAccount, index) => {
                                        if (userAccount.role === "user") {
                                            return <tr key={index}>
                                                <td>{userAccount.id}</td>
                                                <td>{userAccount.username}</td>
                                                <td>{userAccount.role}</td>
                                                <td>{userAccount.ban}</td>
                                                <td>
                                                    <Link to={`/viewAccount/` + userAccount.id} className='btn btn-success btn-sm me-2'><RemoveRedEyeIcon /></Link>
                                                    {userAccount.ban == "Enable" ?
                                                        <button onClick={e => handleBanAccount(userAccount.id)} className='btn btn-sm btn-warning me-2'>
                                                            <BlockIcon />
                                                        </button>
                                                        :
                                                        <button onClick={e => handleUnBanAccount(userAccount.id)} className='btn btn-sm btn-primary me-2'>
                                                            <LockOpenIcon />
                                                        </button>
                                                    }

                                                    <button onClick={e => handleDelete(userAccount.id)} className='btn btn-sm btn-danger me-2'>
                                                        <DeleteIcon />
                                                    </button>

                                                </td>
                                            </tr>
                                        }
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div
                    className={toggleState === 2 ? "content active-content" : "content"}>
                    {/* Manage account admin */}
                    <div className="px-2 py-5">
                        <div>
                            <h3 className="p-2 d-flex justify-content-center">Admin Account Management</h3>
                        </div>
                        <div className='mt-4'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Username</th>
                                        <th>Role</th>
                                        <th>Active</th>
                                        <th>Option</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((userAccount, index) => {
                                        if (userAccount.role === "admin") {
                                            return <tr key={index}>
                                                <td>{userAccount.id}</td>
                                                <td>{userAccount.username}</td>
                                                <td>{userAccount.role}</td>
                                                <td>{userAccount.ban}</td>

                                                <td>
                                                    <Link to={`/viewAccount/` + userAccount.id} className='btn btn-success btn-sm me-2'><RemoveRedEyeIcon /></Link>
                                                    {userAccount.ban == "Enable" ?
                                                        <button onClick={e => handleBanAccount(userAccount.id)} className='btn btn-sm btn-warning me-2'>
                                                            <BlockIcon />
                                                        </button>
                                                        :
                                                        <button onClick={e => handleUnBanAccount(userAccount.id)} className='btn btn-sm btn-primary me-2'>
                                                            <LockOpenIcon />
                                                        </button>
                                                    }

                                                    <button onClick={e => handleDelete(userAccount.id)} className='btn btn-sm btn-danger me-2'><DeleteIcon /></button>

                                                </td>
                                            </tr>
                                        }
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div
                    className={toggleState === 3 ? "content active-content" : "content"}>
                    {/* Manage account Chord manager */}
                    <div className="px-2 py-5">
                        <div>
                            <h3 className="p-2 d-flex justify-content-center">Chord Manager Account Management</h3>
                        </div>
                        <div className='mt-4'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Username</th>
                                        <th>Role</th>
                                        <th>Active</th>
                                        <th>Option</th>


                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((userAccount, index) => {
                                        if (userAccount.role === "chord") {
                                            return <tr key={index}>
                                                <td>{userAccount.id}</td>
                                                <td>{userAccount.username}</td>
                                                <td>{userAccount.role}</td>
                                                <td>{userAccount.ban}</td>

                                                <td>
                                                    <Link to={`/viewAccount/` + userAccount.id} className='btn btn-success btn-sm me-2'><RemoveRedEyeIcon /></Link>
                                                    {userAccount.ban == "Enable" ?
                                                        <button onClick={e => handleBanAccount(userAccount.id)} className='btn btn-sm btn-warning me-2'>
                                                            <BlockIcon />
                                                        </button>
                                                        :
                                                        <button onClick={e => handleUnBanAccount(userAccount.id)} className='btn btn-sm btn-primary me-2'>
                                                            <LockOpenIcon />
                                                        </button>
                                                    }

                                                    <button onClick={e => handleDelete(userAccount.id)} className='btn btn-sm btn-danger me-2'><DeleteIcon /></button>

                                                </td>
                                            </tr>
                                        }
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div
                    className={toggleState === 4 ? "content active-content" : "content"}>
                    {/* Manage account musician */}
                    <div className="px-2 py-5">
                        <div>
                            <h3 className="p-2 d-flex justify-content-center">Musician Account Management</h3>
                        </div>
                        <div className='mt-4'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Username</th>
                                        <th>Role</th>
                                        <th>Active</th>
                                        <th>Option</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((userAccount, index) => {
                                        if (userAccount.role === "musician") {

                                            return <tr key={index}>
                                                <td>{userAccount.id}</td>
                                                <td>{userAccount.username}</td>
                                                <td>{userAccount.role}</td>
                                                <td>{userAccount.ban}</td>

                                                <td>
                                                    <Link to={`/viewAccount/` + userAccount.id} className='btn btn-success btn-sm me-2'><RemoveRedEyeIcon /></Link>
                                                    {userAccount.ban == "Enable" ?
                                                        <button onClick={e => handleBanAccount(userAccount.id)} className='btn btn-sm btn-warning me-2'>
                                                            <BlockIcon />
                                                        </button>
                                                        :
                                                        <button onClick={e => handleUnBanAccount(userAccount.id)} className='btn btn-sm btn-primary me-2'>
                                                            <LockOpenIcon />
                                                        </button>
                                                    }
                                                    <button onClick={e => handleDelete(userAccount.id)} className='btn btn-sm btn-danger me-2'><DeleteIcon /></button>

                                                </td>
                                            </tr>
                                        }
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
export default ManageAccount;