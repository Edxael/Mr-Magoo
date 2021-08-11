import React from 'react';
import UnSecureNav from './01-UnsecuredViews/00-UnSecureNav'
import SecureNav from './02-SecuredViews/00-SecureNav'

const MainNavigation = () => {
    let isUserLoggedIn = false;
    if (isUserLoggedIn){
       return (
        <SecureNav/>
      );
    } else {
        return (
        <UnSecureNav />
    );
    }
}

export default MainNavigation;