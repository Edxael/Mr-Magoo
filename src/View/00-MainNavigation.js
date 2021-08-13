import React from 'react'
import UnSecureNav from './01-UnsecuredViews/00-UnSecureNav'
import SecureNav from './02-SecuredViews/00-SecureNav'
import { useStoreon } from 'storeon/react'

const MainNavigation = () => {
  const { auth } = useStoreon('auth')

  if (auth.isAuthenticated) {
    return (
      <SecureNav />
    )
  } else {
    return (
      <UnSecureNav />
    )
  }
}

export default MainNavigation
