import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './SignUp'
import Login from './Login'
/////ADMIN
import Dashboard from './Admin/Dashboard'
import Profile from './Admin/Profile'
import Song from './Admin/Song'
import ManageAccount from './Admin/ManageAcount'
import ManageFeedback from './Admin/ManageFeedback'
import ViewFeedback from './Admin/ViewFeedback'
import ViewSong from './Admin/ViewSong'
import RequestAccount from './Admin/RequestAccount'
/////CHORDMANAGER
// import LoginChordManager from './ChordManager/LoginChordManager'
import DashboardChordManager from './ChordManager/DashboardChordManager'
// import SignUpChordManager from './ChordManager/SignUpChordManager'
import VerifySong from './ChordManager/VerifySong'
import ViewSongChordManager from './ChordManager/ViewSongChordManager'
import ProfileChordManager from './ChordManager/ProfileChordManager'
import SongChordManager from './ChordManager/SongChordManager'
/////MUSICIAN
// import LoginMusician from './Musician/LoginMusician'
import DashboardMusician from './Musician/DashboardMusician'
// import SignUpMusician from './Musician/SignUpMusician'
import ChordMissMusician from './Musician/ChordMissMusician'
import ViewSongMusician from './Musician/ViewSongMusician'
import CreateSong from './Musician/CreateSong'
import EditSongMusician from './Musician/EditSongMusician'
import ProfileMusician from './Musician/ProfileMusician'
import ChordMusician from './Musician/ChordMusician'
import ManageBeat from './Musician/ManageBeat'
import TransactionHistory from './Musician/TransactionHistory'
import OrderMusician from './Musician/OrderMusician'
/////CUSTOMER
// import LoginCustomer from './Customer/LoginCustomer'
import DashboardCustomer from './Customer/DashboardCustomer'
import SongCustomer from './Customer/SongCustomer'
import ViewSongCustomer from './Customer/ViewSongCustomer'
import Payment from './Customer/Payment'
import ProfileCustomer from './Customer/ProfileCustomer'
import Playlist from './Customer/Playlist'
import CreatePlaylist from './Customer/CreatePlaylist'
import ViewPlaylist from './Customer/ViewPlaylist'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signUp' element={<SignUp />}></Route>

        <Route path='/' element={<Dashboard />}>
          <Route path='/profile/:userId' element={<Profile />}></Route>
          <Route path='/song' element={<Song />}></Route>
          <Route path='/manageAccount' element={<ManageAccount />}></Route>
          <Route path='/requestAccount' element={<RequestAccount />}></Route>
          <Route path='/viewSong/:id' element={<ViewSong />}></Route>
          <Route path='/manageFeedback' element={<ManageFeedback />}></Route>
          <Route path='/viewFeedback/:username' element={<ViewFeedback />}></Route>
        </Route>
        {/* CHORD MANAGER ROLE */}
        <Route path='/' element={<DashboardChordManager />}>
          <Route path='/verifySong' element={<VerifySong />}></Route>
          <Route path='/viewSongChordManager/:id' element={<ViewSongChordManager />}></Route>
          <Route path='/profileChordManager/:userId' element={<ProfileChordManager />}></Route>
          <Route path='/songChordManager' element={<SongChordManager />}></Route>
        </Route>

        {/* MUSICIAN ROLE */}
        <Route path='/' element={<DashboardMusician />}>
          <Route path='/chordMissMusician' element={<ChordMissMusician />}></Route>
          <Route path='/viewSongMusician/:id' element={<ViewSongMusician />}></Route>
          <Route path='/createSong' element={<CreateSong />}></Route>
          <Route path='/editSongMusician/:id' element={<EditSongMusician />}></Route>
          <Route path='/profileMusician/:userId' element={<ProfileMusician />}></Route>
          <Route path='/chordMusician' element={<ChordMusician />}></Route>
          <Route path='/manageBeat' element={<ManageBeat />}></Route>
          <Route path='/transactionHistory' element={<TransactionHistory />}></Route>
          <Route path='/orderMusician' element={<OrderMusician />}></Route>

        </Route>
        {/* CUSTOMER ROLE */}
        <Route path='/' element={<DashboardCustomer />}>
          <Route path='/songCustomer/:userId' element={<SongCustomer />}></Route>
          <Route path='/viewSongCustomer/:id' element={<ViewSongCustomer />}></Route>
          <Route path='/payment' element={<Payment />}></Route>
          <Route path='/profileCustomer/:userId' element={<ProfileCustomer />}></Route>
          <Route path='/createPlaylist/:userId' element={<CreatePlaylist />}></Route>
          <Route path='/playlist/:userId' element={<Playlist />}></Route>
          <Route path='/viewPlaylist/:id' element={<ViewPlaylist />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
