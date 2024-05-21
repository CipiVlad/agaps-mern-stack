import { Routes, Route } from 'react-router-dom'
import './App.css'
// import { Overview } from './pages/app/Overview'
// import HoleDetail from './pages/app/HoleDetail'
// import Navbar from './components/Navbar'
// import AddCourseInfo from './pages/app/AddCourseInfo'
// import HoleCardStart from './components/HoleCardStart'
// import TotalSummary from './pages/app/TotalSummary'
// import EditHole from './pages/app/EditHole'
// import ContinueHole from './pages/app/ContinueHole'
// import UserList from './components/UserList'
import Home from './pages/app/Home'
import Overview from './pages/navigation/Overview'
import SingleMode from './pages/single-mode/SingleMode'
import TeamMode from './pages/team-mode/TeamMode'
import TwoVSTwo from './pages/team-mode/twoVStwo/TwoVSTwo'
import SingleScramble from './pages/team-mode/singleScramble/SingleScramble'
import WelcomeScreen from './pages/auth/WelcomeScreen'
import LogIn from './pages/auth/LogIn'
import SignUp from './pages/auth/SignUp'
import RequireAuth from './features/auth/RequireAuth'
import Welcome from './features/auth/Welcome'



function App() {
  return (
    <div className="App">
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/add-round" element={<AddCourseInfo />} />
        <Route path="/details/:id" element={<HoleDetail />} />
        <Route path="/hole-card/:id" element={<HoleCardStart />} />
        <Route path="/edit/:id" element={< EditHole />} />
        <Route path="/continue/:id" element={<ContinueHole />} />
        <Route path="/stats" element={<TotalSummary />} />
      </Routes>
      <Navbar /> */}

      <Routes>
        {/* public routes */}
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* protect routes */}
        <Route element={<RequireAuth />}>
          <Route path='/welcome-to-your-agaps' element={<Welcome />} />
          <Route path="/overview" element={<Overview />} />
        </Route>

        {/* <Route path="/" element={<UserList />} /> */}
        {/* <Route path="/" element={<Home />} />
        <Route path="/single-mode" element={<SingleMode />} />
        <Route path="/team-mode" element={<TeamMode />} />
        <Route path="/team-mode/two-vs-two" element={<TwoVSTwo />} />
        <Route path="/team-mode/single-scramble" element={<SingleScramble />} /> */}
      </Routes>

    </div>
  )
}

export default App
