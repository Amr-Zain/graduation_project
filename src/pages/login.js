
import { useEffect, useState } from 'react';
import Header from '../components/header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthedUserThunk } from '../features/authedUser';
import { useNavigate } from 'react-router-dom';
import { createUserSession } from '../api/data';
import { useForm } from 'react-hook-form';

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
            <form onSubmit={handleSubmit(onSubmit)}>
                {error && <p>{error}</p>}
                <label htmlFor="userType">تسجيل ك</label><br/>
                <select {...register("userType")}>
                    <option value="patient">مريض</option>
                    <option value="doctor">دكتور</option>
                    <option value="nurse">ممرض</option>
                    <option value="receptionsist">استقبال</option>
                </select>
                <br/>
                <input placeholder="البريد الالكتروني" {...register('email', { required: true,pattern:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ })} />
                {errors.email && <p>من فضلك ادخل الايميل</p>}

                <input type='password' placeholder="كلمه المرور" {...register('password', { required: true })} />
                {errors.password && <p>من فضلك ادخل كلمه المرور</p>}
                
                <button onClick={handleSubmit(onSubmit)}>تسجيل الدخول</button>
            </form>
        </>
    );
}

export default Longin;