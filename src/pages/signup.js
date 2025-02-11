import "../style/signup.css";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthedUserThunk } from "../features/authedUser";
import { Controller, useForm } from "react-hook-form";
import { LOGIN } from "../constants/routes";
import "react-datalist-input/dist/styles.css";
import { getCitiesAndSpecializations } from "../features/cities-specializations";
import Input from "../components/signup/input";
import Select from "react-select";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userType: "patient"
    }
  });

  
  const dispatch = useDispatch();
  const { cities, specializations } = useSelector((store) => store.citiesAndSpecializations);
  const { user, error, isLoading } = useSelector((store) => store.authedUser);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      await dispatch(
        setAuthedUserThunk({
          create: true,
          user: { ...data },
        })
      );
    } catch (error) {
      console.error("Signup failed: ", error);
    }
  };

  useEffect(() => {
    document.title = "Signup";
    console.log(user)
    if(user.userType) navigate(`/${user.userType}`)
    if (cities.length === 0 || specializations.length === 0) {
      dispatch(getCitiesAndSpecializations());
    }
  }, [user]);

  // Convert cities and specializations to required format for DatalistInput
  const cityItems = cities.map(city => ({ id: city, value: city }));
  const specializationItems = specializations.map(spec => ({ id: spec, value: spec }));

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-5 col-lg-6">
          <div className="login-signup-image">
            <img
              className="image-left"
              src="/images/signup_login.png"
              alt="Signup Illustration"
            />
          </div>
        </div>

        <div className="col-sm-12 col-md-7 col-lg-6">
          <div className="grid-container from-sign">
            <div className="logo-container">
              <img
                className="image-logo"
                src="/images/logo.png"
                alt="App Logo"
              />
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)}>
              {error&& <div>{error}</div>}
              <div className="flex-input">
                <div>
                  <Controller
                    name="userType"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                      {...field}
                      placeholder='User Type'
                      options={[{label:'Patient', value:'patient'},{label:'Doctor',value:'doctor'},{label:'Nurse',value:'nurse'}]}
                      />
                    )}
                    />
                </div>
                <Input
                  type="text"
                  placeholder="Full Name"
                  register={register("name", { 
                    required: "Full name is required",
                    pattern: {
                      value: /^[A-Za-z]+(?: [A-Za-z]+)+$/,
                      message: "Please enter at least two names separated by space"
                    },
                    setValueAs: value => value.replace(/\s+/g, ' ').trim() 
                  })}
                  error={errors.name}
                />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  register={register("phone", { 
                    required: "Phone is required",
                    pattern: {
                      value: /^01[0-9]{9}$/,
                      message: "Invalid phone number"
                    }
                  })}
                  error={errors.phone}
                />
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
                <div>
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder='Choose City'
                        rules={{ required: true }}
                        options={cities}
                      />
                    )}
                    />
                  {errors.city && <span className="error">{errors.city.message}</span>}
                </div>
                  <Input
                    type="date"
                    placeholder="Birthday"
                    register={register("birthDay", { 
                      required: "Birthday is required" 
                    })}
                    error={errors.birthDay}
                  />
                <button disabled={isLoading} type="submit" className="login-bottom">
                  {isLoading?'Loaing...':'Sign Up'}
                </button>
              </div>
            </form>

            <p className="to-login">
              Have an account? <Link to={'/'+LOGIN}>Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}