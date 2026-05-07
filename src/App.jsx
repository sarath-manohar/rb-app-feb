
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './Components/Footer'
import Header from './Components/Header'
import LandingPage from './Pages/LandingPage'
import Resume from './Pages/Resume'
import Form from './Pages/Form'
import History from './Pages/History'
import Pnf from './Pages/Pnf'



function App() {


  return (
    <>
      <Header />
      <Routes>
        <Route path='' element={<LandingPage />} />
        <Route path='resume-generator' element={<Resume />} />
        <Route path='form' element={<Form />} />
        <Route path='history' element={<History />} />
        {/* requesting invalid url redirecting to pnf */}
        <Route path='/*' element={<Pnf />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
