import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import SignUp from './pages/SignUp'
import LogIn from   './pages/LogIn'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/Protectedroute'
import Forgetpassword from './pages/Forgetpassword'
import NewPassword from './pages/NewPassword'
import Verifyotp from './pages/VerifyOTP'
import Home from './pages/Home'


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
          <Route path='/new-password' element={<NewPassword/>} />
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
