import Dashboard from './Admin/Dashboard'
import Start from './Start'
import Login from './Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './SignIn'
import Profile from './Admin/Profile'
import Song from './Admin/Song'
import Feedback from './Admin/Feedback'
import CreateSong from './Admin/CreateSong'
import EditSong from './Admin/EditSong'
import ViewSong from './Admin/ViewSong'
import ManageAccount from './Admin/ManageAcount'
import ViewAccount from './Admin/ViewAccount'
/////MUSICIAN
import LoginChordManager from './ChordManager/LoginChordManager'
import DashboardChordManager from './ChordManager/DashboardChordManager'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* CUSTOMER ROLE */}
        <Route path='/' element={<Dashboard />}>
          <Route path='/profile/:id' element={<Profile />}></Route>
          <Route path='/song' element={<Song />}></Route>
          <Route path='/manageAccount' element={<ManageAccount />}></Route>
          <Route path='/createSong' element={<CreateSong />}></Route>
          <Route path='/feedback' element={<Feedback />}></Route>
          <Route path='/editSong/:id' element={<EditSong />}></Route>
          <Route path='/viewSong/:id' element={<ViewSong />}></Route>
          <Route path='/viewAccount/:id' element={<ViewAccount />}></Route>

        </Route>
        {/* MUSICIAN ROLE */}
        <Route path='/dashboardChordManager/:id' element={<DashboardChordManager />}>

        </Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signin' element={<SignIn />}></Route>
        <Route path='/start' element={<Start />}></Route>
        <Route path='/loginChordManager' element={<LoginChordManager />}></Route>




      </Routes>
    </BrowserRouter>
  )
}

export default App
