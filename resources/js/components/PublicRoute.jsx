import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export default function PublicRoute() {
    const user = useSelector(state => state.user)
    return user ? <Navigate to={'/dashboard'} /> : <Outlet />;
}
