import React from 'react'
import { ItemsList } from './components/items/ItemsList'
import {Routes, Route} from 'react-router-dom'
import HomeLayout from './layout/HomeLayout'
import Login from './pages/Login'
import Homepage from './pages/Homepage'
import Register from './pages/Register'
import { Toaster } from 'react-hot-toast'
import AuthRoute from './routes/AuthRoute'
import PrivateRoute from './routes/PrivateRoute'

export default function App() {
  return (
    <div style={{ maxWidth: 720, margin: '40px auto', fontFamily: 'Inter, system-ui, Arial' }}>
      <Toaster />
      <Routes>
        <Route path='/' element={<HomeLayout />}>
          <Route index element={<PrivateRoute><Homepage /></PrivateRoute>} />
          <Route path='login' element={<AuthRoute><Login /></AuthRoute>} />
          <Route path='register' element={<AuthRoute><Register /></AuthRoute>} />
        </Route>
      </Routes>
    </div>
  )
}
