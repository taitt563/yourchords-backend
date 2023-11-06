import { BrowserRouter, Routes, Route } from 'react-router-dom'
/////ADMIN
import Dashboard from './Admin/Dashboard'
import Login from './Login'
// import Home from './Admin/Home'
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
// import HomeChordManager from './ChordManager/HomeChordManager'
import VerifySong from './ChordManager/VerifySong'
import ViewSongChordManager from './ChordManager/ViewSongChordManager'
import ProfileChordManager from './ChordManager/ProfileChordManager'
import SongChordManager from './ChordManager/SongChordManager'
/////MUSICIAN
import LoginMusician from './Musician/LoginMusician'
import DashboardMusician from './Musician/DashboardMusician'
import SignUpMusician from './Musician/SignUpMusician'
// import HomeMusician from './Musician/HomeMusician'
import SongMusician from './Musician/SongMusician'
import ViewSongMusician from './Musician/ViewSongMusician'
import CreateSong from './Musician/CreateSong'
import EditSongMusician from './Musician/EditSongMusician'
import ProfileMusician from './Musician/ProfileMusician'
import ChordMusician from './Musician/ChordMusician'
import ManageBeat from './Musician/ManageBeat'
import TransactionHistory from './Musician/TransactionHistory'
import OrderMusician from './Musician/OrderMusician'
/////CUSTOMER
import LoginCustomer from './Customer/LoginCustomer'
import DashboardCustomer from './Customer/DashboardCustomer'
import SignUpCustomer from './Customer/SignUpCustomer'
import SongCustomer from './Customer/SongCustomer'
import ViewSongCustomer from './Customer/ViewSongCustomer'
import Payment from './Customer/Payment'
import ProfileCustomer from './Customer/ProfileCustomer'
import Playlist from './Customer/Playlist'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/loginAdmin' element={<Login />}></Route>
        <Route path='/login' element={<LoginCustomer />}></Route>
        <Route path='/signUp' element={<SignUpCustomer />}></Route>
        <Route path='/loginChordManager' element={<LoginChordManager />}></Route>
        <Route path='/signUpChordManager' element={<SignUpChordManager />}></Route>
        <Route path='/loginMusician' element={<LoginMusician />}></Route>
        <Route path='/signUpMusician' element={<SignUpMusician />}></Route>
        {/* ADMIN ROLE */}
        <Route path='/' element={<Dashboard />}>
          {/* <Route path='/homeAdmin' element={<Home />}></Route> */}
          <Route path='/profile/:userId' element={<Profile />}></Route>
          <Route path='/song' element={<Song />}></Route>
          <Route path='/manageAccount' element={<ManageAccount />}></Route>
          <Route path='/viewSong/:song_title' element={<ViewSong />}></Route>
          <Route path='/manageFeedback' element={<ManageFeedback />}></Route>
          <Route path='/viewFeedback/:username' element={<ViewFeedback />}></Route>
        </Route>
        {/* CHORD MANAGER ROLE */}
        <Route path='/' element={<DashboardChordManager />}>
          {/* <Route path='/homeChordManager' element={<HomeChordManager />}></Route> */}
          <Route path='/verifySong' element={<VerifySong />}></Route>
          <Route path='/viewSongChordManager/:song_title' element={<ViewSongChordManager />}></Route>
          <Route path='/profileChordManager/:userId' element={<ProfileChordManager />}></Route>
          <Route path='/songChordManager' element={<SongChordManager />}></Route>
        </Route>

        {/* MUSICIAN ROLE */}
        <Route path='/' element={<DashboardMusician />}>
          {/* <Route path='/homeMusician' element={<HomeMusician />}></Route> */}
          <Route path='/songMusician' element={<SongMusician />}></Route>
          <Route path='/viewSongMusician/:song_title' element={<ViewSongMusician />}></Route>
          <Route path='/createSong' element={<CreateSong />}></Route>
          <Route path='/editSongMusician/:song_title' element={<EditSongMusician />}></Route>
          <Route path='/profileMusician/:userId' element={<ProfileMusician />}></Route>
          <Route path='/chordMusician' element={<ChordMusician />}></Route>
          <Route path='/manageBeat' element={<ManageBeat />}></Route>
          <Route path='/transactionHistory' element={<TransactionHistory />}></Route>
          <Route path='/orderMusician' element={<OrderMusician />}></Route>

        </Route>
        {/* CUSTOMER ROLE */}
        <Route path='/' element={<DashboardCustomer />}>
          <Route path='/songCustomer' element={<SongCustomer />}></Route>
          <Route path='/viewSongCustomer/:song_title' element={<ViewSongCustomer />}></Route>
          <Route path='/payment' element={<Payment />}></Route>
          <Route path='/profileCustomer/:userId' element={<ProfileCustomer />}></Route>
          <Route path='/playlist' element={<Playlist />}></Route>


        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
