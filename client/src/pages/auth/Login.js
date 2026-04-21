import React from 'react'
import Form from '../../components/shared/Form/Form'
import {useSelector} from 'react-redux'
import {DNA} from 'react-loader-spinner'
import toast from 'react-hot-toast'

const Login = () => {
  const {loading,error} = useSelector(state => state.auth)
  return (
    <>
      {error && <span>{toast.error(error)}</span>}
      <div className='auth-container'>
        <div className="auth-image d-none d-md-block" style={{ backgroundImage: "url('/assets/bg.png')" }}>
            <div style={{ position: 'absolute', bottom: '10%', left: '10%', zIndex: 10 }}>
                <h1 className='text-white display-4 fw-bold' style={{ textShadow: '0 4px 15px rgba(0,0,0,0.5)' }}>RED GOLD</h1>
                <p className='text-white lead' style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>The most premium blood bank management system.</p>
            </div>
        </div>
        
        <div className="auth-form-wrapper">
            <div className="auth-glass-box glass-panel">
                {loading ?  (
                    <div className="d-flex w-100 h-100 align-items-center justify-content-center">
                        <DNA visible={true} height="150" width="150" ariaLabel="dna-loading" wrapperClass="dna-wrapper" />
                    </div> 
                ):(
                    <Form formTitle={"Welcome Back"} submitBtn={"Sign In"} formType={'login'} />
                )}
            </div>
        </div>
      </div>
    </>
  )
}

export default Login