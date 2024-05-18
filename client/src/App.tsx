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
        {/* <Route path="/" element={<UserList />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/single-mode" element={<SingleMode />} />
        <Route path="/team-mode" element={<TeamMode />} />
        <Route path="/team-mode/two-vs-two" element={<TwoVSTwo />} />
        <Route path="/team-mode/single-scramble" element={<SingleScramble />} />
      </Routes>

    </div>
  )
}

export default App
