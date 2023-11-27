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
import CreateSong from './Admin/CreateSong'
/////CHORDMANAGER
import DashboardChordManager from './ChordManager/DashboardChordManager'
import VerifySong from './ChordManager/VerifySong'
import ViewSongChordManager from './ChordManager/ViewSongChordManager'
import ProfileChordManager from './ChordManager/ProfileChordManager'
import SongChordManager from './ChordManager/SongChordManager'
/////MUSICIAN
import DashboardMusician from './Musician/DashboardMusician'
import ChordMissMusician from './Musician/ChordMissMusician'
import ViewSongMusician from './Musician/ViewSongMusician'
import EditSongMusician from './Musician/EditSongMusician'
import ProfileMusician from './Musician/ProfileMusician'
import ChordMusician from './Musician/ChordMusician'
import ManageBeat from './Musician/ManageBeat'
import TransactionHistory from './Musician/TransactionHistory'
import OrderMusician from './Musician/OrderMusician'
import CreateChord from './Musician/CreateChord'
import SongMusician from './Musician/SongMusician'
import RejectSong from './Musician/RejectSong'
/////CUSTOMER
import DashboardCustomer from './Customer/DashboardCustomer'
import SongCustomer from './Customer/SongCustomer'
import ViewSongCustomer from './Customer/ViewSongCustomer'
import Payment from './Customer/Payment'
import ProfileCustomer from './Customer/ProfileCustomer'
import Playlist from './Customer/Playlist'
import CreatePlaylist from './Customer/CreatePlaylist'
import ViewPlaylist from './Customer/ViewPlaylist'
import Chord from './Customer/Chord'
import SearchChord from './Customer/SearchChord'
import Feedback from './Customer/Feedback'
import ViewFeedbackCustomer from './Customer/ViewFeedbackCustomer'
import Beat from './Customer/Beat'
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
          <Route path='/manageFeedback/:userId' element={<ManageFeedback />}></Route>
          <Route path='/viewFeedback/:id' element={<ViewFeedback />}></Route>
          <Route path='/createSong' element={<CreateSong />}></Route>
        </Route>
        <Route path='/viewSong/:id' element={<ViewSong />}></Route>

        {/* CHORD MANAGER ROLE */}
        <Route path='/' element={<DashboardChordManager />}>
          <Route path='/verifySong' element={<VerifySong />}></Route>
          <Route path='/profileChordManager/:userId' element={<ProfileChordManager />}></Route>
          <Route path='/songChordManager' element={<SongChordManager />}></Route>
        </Route>
        <Route path='/viewSongChordManager/:id' element={<ViewSongChordManager />}></Route>


        {/* MUSICIAN ROLE */}
        <Route path='/' element={<DashboardMusician />}>
          <Route path='/chordMissMusician' element={<ChordMissMusician />}></Route>
          <Route path='/editSongMusician/:id' element={<EditSongMusician />}></Route>
          <Route path='/profileMusician/:userId' element={<ProfileMusician />}></Route>
          <Route path='/chordMusician' element={<ChordMusician />}></Route>
          <Route path='/manageBeat' element={<ManageBeat />}></Route>
          <Route path='/transactionHistory' element={<TransactionHistory />}></Route>
          <Route path='/orderMusician' element={<OrderMusician />}></Route>
          <Route path='/createChord' element={<CreateChord />}></Route>
          <Route path='/songMusician' element={<SongMusician />}></Route>
          <Route path='/rejectSong' element={<RejectSong />}></Route>

        </Route>
        <Route path='/viewSongMusician/:id' element={<ViewSongMusician />}></Route>

        {/* CUSTOMER ROLE */}
        <Route path='/' element={<DashboardCustomer />}>
          <Route path='/songCustomer/:userId' element={<SongCustomer />}></Route>
          <Route path='/payment' element={<Payment />}></Route>
          <Route path='/profileCustomer/:userId' element={<ProfileCustomer />}></Route>
          <Route path='/createPlaylist/:userId' element={<CreatePlaylist />}></Route>
          <Route path='/playlist/:userId' element={<Playlist />}></Route>
          <Route path='/viewPlaylist/:id' element={<ViewPlaylist />}></Route>
          <Route path='/feedback/:userId' element={<Feedback />}></Route>
          <Route path='/viewFeedbackCustomer/:id' element={<ViewFeedbackCustomer />}></Route>
          <Route path='/beat' element={<Beat />}></Route>
        </Route>
        <Route path='/chord' element={<Chord />}></Route>
        <Route path='/searchChord' element={<SearchChord />}></Route>
        <Route path='/viewSongCustomer/:id' element={<ViewSongCustomer />}></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
