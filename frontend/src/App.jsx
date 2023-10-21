import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Admin/Dashboard'
import Login from './Login'
import Home from './Admin/Home'
import Profile from './Admin/Profile'
import Song from './Admin/Song'
import ManageAccount from './Admin/ManageAcount'
import ManageFeedback from './Admin/ManageFeedback'
import ViewFeedback from './Admin/ViewFeedback'
import ViewSong from './Admin/ViewSong'
/////CHORDMANAGER
import LoginChordManager from './ChordManager/LoginChordManager'
import DashboardChordManager from './ChordManager/DashboardChordManager'
import SignUpChordManager from './ChordManager/SignUpChordManager'
import HomeChordManager from './ChordManager/HomeChordManager'
import VerifySong from './ChordManager/VerifySong'
import ViewSongChordManager from './ChordManager/ViewSongChordManager'
import ProfileChordManager from './ChordManager/ProfileChordManager'
import SongChordManager from './ChordManager/SongChordManager'
/////MUSICIAN
import LoginMusician from './Musician/LoginMusician'
import DashboardMusician from './Musician/DashboardMusician'
import SignUpMusician from './Musician/SignUpMusician'
import HomeMusician from './Musician/HomeMusician'
import SongMusician from './Musician/SongMusician'
import ViewSongMusician from './Musician/ViewSongMusician'
// import CreateSong from './Musician/CreateSong'
import EditSongMusician from './Musician/EditSongMusician'
import ProfileMusician from './Musician/ProfileMusician'
import ChordMusician from './Musician/ChordMusician'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/loginChordManager' element={<LoginChordManager />}></Route>
        <Route path='/signUpChordManager' element={<SignUpChordManager />}></Route>
        <Route path='/loginMusician' element={<LoginMusician />}></Route>
        <Route path='/signUpMusician' element={<SignUpMusician />}></Route>
        {/* ADMIN ROLE */}
        <Route path='/' element={<Dashboard />}>
          <Route path='/homeAdmin' element={<Home />}></Route>
          <Route path='/profile/:userId' element={<Profile />}></Route>
          <Route path='/song' element={<Song />}></Route>
          <Route path='/manageAccount' element={<ManageAccount />}></Route>
          <Route path='/viewSong/:song_title' element={<ViewSong />}></Route>
          <Route path='/manageFeedback' element={<ManageFeedback />}></Route>
          <Route path='/viewFeedback/:username' element={<ViewFeedback />}></Route>
        </Route>
        {/* CHORD MANAGER ROLE */}
        <Route path='/' element={<DashboardChordManager />}>
          <Route path='/homeChordManager' element={<HomeChordManager />}></Route>
          <Route path='/verifySong' element={<VerifySong />}></Route>
          <Route path='/viewSongChordManager/:song_title' element={<ViewSongChordManager />}></Route>
          <Route path='/profileChordManager/:userId' element={<ProfileChordManager />}></Route>
          <Route path='/songChordManager' element={<SongChordManager />}></Route>
        </Route>

        {/* MUSICIAN ROLE */}
        <Route path='/' element={<DashboardMusician />}>
          <Route path='/homeMusician' element={<HomeMusician />}></Route>
          <Route path='/songMusician' element={<SongMusician />}></Route>
          <Route path='/viewSongMusician/:song_title' element={<ViewSongMusician />}></Route>
          {/* <Route path='/createSong' element={<CreateSong />}></Route> */}
          <Route path='/editSongMusician/:song_title' element={<EditSongMusician />}></Route>
          <Route path='/profileMusician/:userId' element={<ProfileMusician />}></Route>
          <Route path='/chordMusician' element={<ChordMusician />}></Route>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
