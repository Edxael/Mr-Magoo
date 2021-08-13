import React from 'react'

import MainNavigation from './src/View/00-MainNavigation'

import { StoreContext } from 'storeon/react'
import { store } from './src/store/store'

export default function App (props) {
  return (
    <StoreContext.Provider value={store}>
      <MainNavigation />
    </StoreContext.Provider>
  )
}
