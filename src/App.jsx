import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import SignUp from './pages/SignUp.jsx'
import LogIn from   './pages/LogIn.jsx'

import Dashboard from './pages/Dashboard.jsx'
import Navbar from './components/Navbar.jsx'
import ProtectedRoute from './components/Protectedroute.jsx'
import Forgetpassword from './pages/Forgetpassword.jsx'
import Newpassword from './pages/Newpassword.jsx'
import Verifyotp from './pages/Verifyotp.jsx'
import Home from './pages/Home.jsx'


function App() {
  return(
    <BrowserRouter>
        <Navbar/>
        <Toaster position='top-center' reverseOrder={false}/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<LogIn/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/forgot-password' element={<Forgetpassword/>} />
          <Route path='/verify-otp' element={<Verifyotp/>} />
          <Route path='/new-password' element={<Newpassword/>} />
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          } />
        </Routes>
    </BrowserRouter>
  )
  
}

export default App
