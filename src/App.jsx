
import { useState, useEffect } from 'react'
import './App.css'
import authService from './appWrite/authService';
//******* user ki state change karenge to store me request bhejne ke lie dispatch to lagega hi  */
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice';
import { Header, Footer } from "./components/index.js"
import { Outlet } from 'react-router-dom';

function App() {
  //******* database aur appwrite api ko call karte waqt jo delay hoga usko hum loading me show  karwayenge  */
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();

  //******** app load hote hi hum authService se getCurrentUser ko call kareneg agar user hai to user return kar dega nahi to error de dega  */
  useEffect(
    () => {
      authService.getCurrentUser()
        .then((userData) => {
          if (userData) {
            dispatch(login({ userData }))
          } else {
            dispatch(logout())
          }
        })
        .finally(() => setLoading(false))
    }, []
  )

  //****** agar state loading me hai to hum null ya fir loading ka logo dikha sakte hai nahi to component render karwa denge  */
  return !loading ? (
    <div className=' min-h-screen flex flex-wrap content-center   justify-center text-white' >
      <h1 className=' text-5xl'>Hi state is set </h1>
      <div className=' w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>

  ) : null
}

export default App
