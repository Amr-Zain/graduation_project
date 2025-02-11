
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthedUserThunk } from '../features/authedUser';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { SIGNUP } from '../constants/routes';
import { Link } from 'react-router-dom';
import '../style/signup.css'
import Select from 'react-select';
import Input from '../components/signup/input';

function Login() {
    const { register, control, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { error, isLoading, user } = useSelector((store)=>store.authedUser);
    const dispatch = useDispatch();
    const onSubmit = async(data)=>{
        console.log(data)
        dispatch(setAuthedUserThunk({ create:false, user:data}));
    }
    useEffect(()=>{
        document.title = 'Login';
        //get cookies or jwt if exist 
        if(user.userType) navigate('/'+user.userType);
    },[user])
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
                            <div>
                                <Controller
                                name="userType"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Select
                                    {...field}
                                    placeholder='User Type'
                                    options={[
                                        {label:'Patient', value:'patient'},
                                        {label:'Doctor',value:'doctor'},
                                        {label:'Nurse',value:'nurse'},
                                        {label:'Receptionist', value:'receptionist'}
                                    ]}
                                />
                                )}
                                />
                            </div>
                            <br/>
                            <Input
                                type="email"
                                placeholder="Email"
                                register={register("email", { 
                                    required: "Email is required",
                                    pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                    }
                            })}
                            error={errors.email}
                            />
                            <Input
                                type="password"
                                placeholder="Password"
                                register={register("password", { 
                                    required: "Password is required",
                                    minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters"
                                    }
                                })}
                                error={errors.password}
                            />
                            <button className="login-bottom"  onClick={handleSubmit(onSubmit)}>{isLoading?'Loanding...':'Login'}</button>
                        </form>
                        <p className="to-login">
                        Don't have an account?       
                        <Link to={'/'+SIGNUP}>Sign up</Link> </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;