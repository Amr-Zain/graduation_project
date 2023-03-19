
import { useEffect, useState } from 'react';
import Header from '../components/header';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthedUserThunk } from '../features/authedUser';
import { useNavigate } from 'react-router-dom';
import { createUserSession } from '../api/data';
import { useForm } from 'react-hook-form';
import { LOGIN, SIGNUP } from '../constants/routes';
import { Link } from 'react-router-dom';
import '../style/signup.css'
import { Container, Row } from 'react-bootstrap';

function Longin() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { userType, error, user } = useSelector((store)=>store.authedUser);
    const dispatch = useDispatch();
    const onSubmit = async(data)=>{
        console.log(watch('email'))
        dispatch(setAuthedUserThunk({userType: data.userType, create:false, data:{ email: data.email, password: data.password}}));
    }
    useEffect(()=>{
        document.title = 'Login';
    })
    return (
        <>
            
            <div className='container'>
                <div className="row">
                <div className="col-sm-12 col-md-5 col-lg-6" style={{ display:'flex', alignItems: "center",jstifyContent:'center'}}>
                
                    <div className='login-signup-image login-image' style={{}} >
                    <img className="image-left" src={'./images/signup_login.png'} alt="Logo" />
                    </div>
                </div>
                    <div className="col-sm-12 col-md-7 col-lg-6 from-log" >
                        <div className="logo-container">
                            <img className="image-logo" style={{width:'5rem !important'}} src={'./images/logo.png'} alt="Logo" />
                        </div>
                        <form className="flex-input" onSubmit={handleSubmit(onSubmit)}>
                            {error && <p>{error}</p>}
                            <div className='select'>
                                <select className="select-patiant" {...register("userType")} id="userType">
                                    <option value="patient">Patient</option>
                                    <option value="doctor">Doctor</option>
                                    <option value="nurse">Nurse</option>
                                    <option value="receptionist">Receptionist</option>
                                </select>
                            </div>
                            <br/>
                            <input placeholder="E-mail" {...register('email', { required: true,pattern:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ })} />

                            <input type='password' placeholder="Password" {...register('password', { required: true })} />
                            
                            <button className="login-bottom"  onClick={handleSubmit(onSubmit)}>Log in</button>
                        </form>
                        <p className="to-login">
                        Don't have an account?       
                       <Link to={SIGNUP}>Sign up</Link> </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Longin;