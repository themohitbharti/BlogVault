import { useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/footer'
import { useEffect } from 'react'
import { login  , logout} from './store/authSlice'
import authService from './appwrite/auth'
import { useDispatch } from 'react-redux'

function App() {
  const [isLoading,setIsLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
        if(userData){
          dispatch(login(userData))
        }else{
          dispatch(logout())
        }
    })
    .finally(() => setIsLoading(false))
  },[])

  return !isLoading ? (
    <>
      <div className='min-h-screen flex justify-center content-between items-center bg-gray-400'>
      <div className='text-center'>
        <Header />
        <Footer />
      </div>
    </div>
    </>
  ) : null
}

export default App
