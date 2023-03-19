import "../style/signup.css";

import { createRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthedUserThunk } from "../features/authedUser";
import { useForm } from "react-hook-form";
import { LOGIN } from "../constants/routes";
import DatalistInput from "react-datalist-input";
import "react-datalist-input/dist/styles.css";
import { getCitiesAndSpecializations } from "../features/cities-specializations";
export default function SignUp() {
    const {
    register,
    handleSubmit,
    watch,
    } = useForm();
    const [city_Specialization, setCity_Specialization] = useState({city:'',specialization:''});
    const dispatch = useDispatch();
    const {  cities, specializations } = useSelector((store) => store.citiesAndSpecializations);
    const cityRef = createRef();
    const specializationRef = createRef();
    console.log(cities)
    console.log(specializations)
    const onSubmit = async (data) => {
      if (!city_Specialization.city) {
        console.log(cityRef.current.childNodes[0]);
        cityRef.current.childNodes[0].focus();
        return;
      }
      if (!city_Specialization.specialization) {
        console.log(specializationRef.current.childNodes[0]);
        specializationRef.current.childNodes[0].focus();
        return;
      }
      dispatch(
        setAuthedUserThunk({
          userType: data.userType,
          create: true,
          data: { ...data, ...city_Specialization },
        })
    )}
    useEffect(() => {
      document.title = "Signup";
      if(cities.length === 0 && specializations.length === 0 ) dispatch(getCitiesAndSpecializations());
      else if(cities.length === 0 )dispatch(getCitiesAndSpecializations('cities'));
      else if(specializations.length === 0 )dispatch(getCitiesAndSpecializations('specializations'));
    }, []);
    return (
    <>
      <div
        className="container"
        style={{
          marginTop:
            watch("userType") === "doctor"
              ? "8.5rem"
              : watch("userType") === "nurse"
                ? "6.7rem"
                : "2rem",
        }}
      >
        <div className="row">
          <div
            className="col-sm-12 col-md-5 col-lg-6"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: 'center'
            }}
          >
            <div className="login-signup-image" style={{}}>
              <img
                className="image-left"
                src={"./images/signup_login.png"}
                alt="Logo"
              />
            </div>
          </div>

          <div className="col-sm-12 col-md-7 col-lg-6">
            <div className="grid-container from-sign">
              <div className="logo-container">
                <img
                  className="image-logo"
                  src={"./images/logo.png"}
                  style={{width:'7.5rem !important'}}
                  alt="Logo"
                />
              </div>
              <form className="" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex-input">
                  <div className="select">
                    <select
                      className="select-patiant"
                      {...register("userType")}
                      id="userType"
                    >
                      <option value="patient">Patient</option>
                      <option value="doctor">Doctor </option>
                      <option value="nurse">Nurse</option>
                    </select>
                  </div>
                  <br />
                  <input
                    type="text"
                    placeholder="Full Name"
                    {...register("name", { required: true })}
                  />
                  <br />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    {...register("phone", { required: true })}
                  />
                  <br />
                  <input
                    placeholder="E-mail"
                    {...register("email", {
                      required: true,
                      pattern:
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    })}
                  />
                  <br />

                  <input
                    type="password"
                    placeholder="Password"
                    {...register("password", { required: true })}
                  />
                  <DatalistInput
                    id="city"
                    name="city"
                    placeholder="City"
                    value ={city_Specialization.specialization}
                    ref={cityRef}
                    onSelect={(item) => {
                      setCity_Specialization((prv) => ({...prv, city: item.value}));
                    }}
                    items={cities}
                  />
                  {watch("userType") === "patient" && (
                    <>
                      <input
                        className="marg-left"
                        type={"date"}
                        placeholder="date"
                        {...register("birthDay", { required: true })}
                      />

                    </>
                  )}
                  {/* {watch("userType") !== "patient" && (
                    <>
                      <br />

                      <input
                        placeholder="description"
                        {...register("description", { required: true })}
                      />
                      <br />
                      <input
                        placeholder="fees"
                        {...register("fees", { required: true })}
                      />
                      <br />
                    </>
                  )}
                  {watch("userType") === "doctor" && (
                    <>
                      <DatalistInput
                        id="Specialization"
                        name="Specialization"
                        placeholder="Specialization"
                        ref={specializationRef}
                        value ={city_Specialization.specialization}
                        onSelect={(item) => {
                          setCity_Specialization((prv) => ({...prv, specialization:item.value}));
                        }}
                        items={specializations}
                      />
                      <br />
                      <input
                        placeholder="Address"
                        {...register("location", { required: true })}
                      />
                      <br />
                      <input
                        placeholder="Receptionist Email"
                        {...register("receptionEmail", { required: true })}
                      />
                      <br />
                      <input
                        placeholder="Receptionist password"
                        {...register("receptionPassword", { required: true })}
                      />
                    </>
                  )} */}
                  <button
                    className="login-bottom"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
            <p className="to-login">
            Have an account? <Link to={LOGIN}>Log in</Link>{" "}
            </p>
          </div>
          <div></div>
        </div>
      </div>
    </>
    );
  }


