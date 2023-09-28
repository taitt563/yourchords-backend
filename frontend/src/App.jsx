import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Admin/Dashboard'
import LoginStart from './LoginStart'
import Login from './Login'
import Home from './Admin/Home'
import Profile from './Admin/Profile'
import Song from './Admin/Song'
import Feedback from './Admin/Feedback'
import CreateSong from './Admin/CreateSong'
import EditSong from './Admin/EditSong'
import ViewSong from './Admin/ViewSong'
import ManageAccount from './Admin/ManageAcount'
import ViewAccount from './Admin/ViewAccount'
import ManageFeedback from './Admin/ManageFeedback'
import DashboardProfile from './component/DashboardProfile'
/////MUSICIAN
import LoginChordManager from './ChordManager/LoginChordManager'
import DashboardChordManager from './ChordManager/DashboardChordManager'
import SignInChordManager from './ChordManager/SignInChordManager'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ADMIN ROLE */}
        <Route path='/' element={<Dashboard />}>
          <Route path='/homeAdmin' element={<Home />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/song' element={<Song />}></Route>
          <Route path='/manageAccount' element={<ManageAccount />}></Route>
          <Route path='/createSong' element={<CreateSong />}></Route>
          <Route path='/feedback' element={<Feedback />}></Route>
          <Route path='/editSong/:id' element={<EditSong />}></Route>
          <Route path='/viewSong/:id' element={<ViewSong />}></Route>
          <Route path='/viewAccount/:id' element={<ViewAccount />}></Route>
          <Route path='/manageFeedback' element={<ManageFeedback />}></Route>
          <Route path='/:id' element={<DashboardProfile />}></Route>

        </Route>
        {/* CHORD MANAGER ROLE */}
        <Route path='/dashboardChordManager' element={<DashboardChordManager />}>

        </Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/loginChordManager' element={<LoginChordManager />}></Route>
        <Route path='/signInChordManager' element={<SignInChordManager />}></Route>
        <Route path='/logInstart' element={<LoginStart />}></Route>





      </Routes>
    </BrowserRouter>
  )
}

export default App
