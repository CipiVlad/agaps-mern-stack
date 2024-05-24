import { Routes, Route } from 'react-router-dom'
import './App.css'
// import { Overview } from './pages/app/Overview'
// import HoleDetail from './pages/app/HoleDetail'
import Navbar from './components/Navbar'
// import AddCourseInfo from './pages/app/AddCourseInfo'
// import HoleCardStart from './components/HoleCardStart'
// import TotalSummary from './pages/app/TotalSummary'
// import EditHole from './pages/app/EditHole'
// import ContinueHole from './pages/app/ContinueHole'
// import UserList from './components/UserList'
import Home from './pages/app/Home'
import Overview from './pages/navigation/Overview'
import WelcomeScreen from './pages/auth/WelcomeScreen'
import LogIn from './pages/auth/LogIn'
import SignUp from './pages/auth/SignUp'
import RequireAuth from './features/auth/RequireAuth'
import Welcome from './features/auth/Welcome'
import GoodByeSite from './pages/app/GoodByeSite'
import ForgotPassword from './pages/app/ForgotPassword'
import ResetPassword from './pages/app/ResetPassword'
import SavedCourses from './pages/courses/SavedCourses'
import Settings from './pages/profile/Settings'
import UserProfile from './pages/profile/UserProfile'
import { useSelector } from 'react-redux'
import AllStats from './pages/stats/AllStats'

import ChooseGameMode from './pages/choose-game-mode/ChooseGameMode'
import SingleMode from './pages/single-mode/SingleMode'
import TeamMode from './pages/team-mode/TeamMode'
import TwoVSTwo from './pages/team-mode/twoVStwo/TwoVSTwo'
import SingleScramble from './pages/team-mode/singleScramble/SingleScramble'
import StrokePlay from './pages/team-mode/twoVStwo/StrokePlay'
import ComboPlay from './pages/team-mode/twoVStwo/ComboPlay'
import MatchPlay from './pages/team-mode/twoVStwo/MatchPlay'



function App() {

  const token = useSelector((state: any) => state?.auth?.token)
  console.log(token);

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
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/logout" element={<GoodByeSite />} />

        {/* protect routes */}
        <Route element={<RequireAuth />}>
          <Route path='/welcome-to-your-agaps' element={<Welcome />} />

          {/* top navbar */}
          {/* Settings */}
          <Route path="/overview" element={<Overview />} />
          <Route path="/settings/user-profile" element={<UserProfile />} />
          <Route path="/settings" element={<Settings />} />

          {/* courses */}
          <Route path="/saved-courses" element={<SavedCourses />} />

          {/* choose game mode */}
          <Route path="/choose-game-mode" element={<ChooseGameMode />} />
          <Route path="/single-mode" element={<SingleMode />} />
          <Route path="/team-mode" element={<TeamMode />} />
          <Route path="/team-mode/two-vs-two" element={<TwoVSTwo />} />

          <Route path="/team-mode/two-vs-two/match-play" element={<MatchPlay />} />
          <Route path="/team-mode/two-vs-two/stroke-play" element={<StrokePlay />} />
          <Route path="/team-mode/two-vs-two/combo-play" element={<ComboPlay />} />

          <Route path="/team-mode/single-scramble" element={<SingleScramble />} />

          {/* All stats */}
          <Route path="/stats/all-stats" element={<AllStats />} />


        </Route>


      </Routes>


    </div>
  )
}

export default App
