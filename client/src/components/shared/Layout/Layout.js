import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import NeedAlert from './NeedAlert'

const Layout = ({children}) => {
  return (
    <>

    <div className='header'>
        <Header/>
    </div>
    <div className="row g-0">
      <div className="col-md-2">
        <Sidebar/>
      </div>
      <div className='col-md-10'>
        <NeedAlert />
        {children}
      </div>
    </div>

    </>
  )
}

export default Layout