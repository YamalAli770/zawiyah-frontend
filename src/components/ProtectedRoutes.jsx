import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useStore } from '../store'
import Login from './Login'

const ProtectedRoutes = () => {
  const auth = useStore(state => state.auth);
  return (
    auth ? <Outlet /> : <Navigate to="/login" replace />
  )
}

export default ProtectedRoutes