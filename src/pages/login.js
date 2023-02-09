
import { useEffect, useState } from 'react';
import Header from '../components/header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthedUserThunk } from '../features/authedUser';
import { useNavigate } from 'react-router-dom';
import { createUserSession } from '../api/data';
import { useForm } from 'react-hook-form';
import { LOGIN, SIGNUP } from '../constants/routes';
import { Link } from 'react-router-dom';
import '../style/signup.css'

function Longin() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { userType, error, user } = useSelector((store)=>store.authedUser);
    if(user)
            navigate(`/${userType}/`);
    const dispatch = useDispatch();
   
    const onSubmit = async(data)=>{
        console.log(watch('email'))
        dispatch(setAuthedUserThunk({userType: data.userType, create:false, data:{ email: data.email, password: data.password}}));
        if(user)
            navigate(`/${data.userType}/`);
    }
    useEffect(()=>{
        document.title = 'Login';
    })
    return (
        <>
                
            <div className='container'>
                <div className="row">
                <div className="col-sm-12 col-md-5 col-lg-6" style={{ display:'flex',alignItems:'start',flexDirection:'column'}}>
                <div className="logo-container">
                    <img className="image-logo" src={'./images/logo.png'} alt="Logo" />
                </div>
                    <div className='login-signup-image' style={{}} >
                    <img className="image-left" src={'./images/signup_login.png'} alt="Logo" />
                    </div>
                </div>
                    <div className="col-sm-12 col-md-7 col-lg-6" style={{display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',}}>
                        <div className="grid-container from-sign"></div>
                        <form className="flex-input" onSubmit={handleSubmit(onSubmit)}>
                            {error && <p>{error}</p>}
                            <div className='select'>
                                <select className="select-patiant" {...register("userType")} id="userType">
                                <option value="patient">مريض</option>
                                <option value="doctor">دكتور</option>
                                <option value="nurse">ممرض</option>
                                </select>
                            </div>
                            <br/>
                            <input placeholder="البريد الالكتروني" {...register('email', { required: true,pattern:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ })} />

                            <input type='password' placeholder="كلمه المرور" {...register('password', { required: true })} />
                            
                            <button className="login-bottom"  onClick={handleSubmit(onSubmit)}>تسجيل الدخول</button>
                        </form>
                        <p className="to-login">ليس لدي حساب ؟ <Link to={SIGNUP}>التسجيل </Link> </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Longin;