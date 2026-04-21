import React from 'react'
import { MdOutlineBloodtype } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAlt } from "react-icons/fa";
import { useSelector } from 'react-redux';
import {Link, useLocation} from 'react-router-dom'

const Header = () => {
    const {user} = useSelector(state=> state.auth);
    const location = useLocation();
    
    const handleLogout=()=>{
        localStorage.clear();
        alert('Logout Successful !')
        window.location.reload();
    }
    
    return (
    <>
        <nav className='navbar navbar-expand-lg navbar-glass py-3 px-4'>
            <div className="container-fluid">
                <div className="navbar-brand h1 d-flex align-items-center m-0">
                    <MdOutlineBloodtype color='#E63946' size={36} className='me-2'/>
                    <span className='fw-bold text-white' style={{ letterSpacing: '1px' }}>BLOOD</span>
                    <span style={{ color: '#E63946', fontWeight: '300', marginLeft: '4px' }}>BANK</span>
                </div>
                
                <div className="d-flex align-items-center ms-auto">
                    <ul className='navbar-nav flex-row align-items-center'>
                        <li className="nav-item mx-3 d-none d-md-block">
                            <div className='d-flex align-items-center' style={{ background: 'rgba(255,255,255,0.05)', padding: '6px 16px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <FaUserAlt className="me-2 text-muted" size={14}/> 
                                <span className='text-white me-2' style={{ fontSize: '0.95rem' }}>{user?.name || user?.hospitalName || user?.organisationName}</span>
                                <span className="badge" style={{ background: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: '600' }}>{user?.role?.toUpperCase()}</span>
                            </div>
                        </li>
                        {
                            (location.pathname === '/' || location.pathname === '/donar' || location.pathname === '/hospital') ? (
                                <li className='nav-item mx-2'>
                                    <Link to='/analytics' className='nav-link text-white glass-link px-3'>
                                        Analytics
                                    </Link>
                                </li>
                            ):(
                                <li className='nav-item mx-2'>
                                    <Link to='/' className='nav-link text-white glass-link px-3'>
                                        Home
                                    </Link>
                                </li>
                            )
                        }
                        <li className="nav-item ms-3">
                            <button className='btn btn-primary-glass d-flex align-items-center px-4 py-2' onClick={handleLogout} style={{ borderRadius: '25px', padding: '0.5rem 1.5rem', width: 'auto' }}> 
                                <HiOutlineLogout className='me-2' size={18} /> Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Header