  import "../style/signup.css";

  import { createRef, useEffect, useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import { setAuthedUserThunk } from "../features/authedUser";
  import { getCities } from "../api/data";
  import { useForm } from "react-hook-form";
  import { LOGIN } from "../constants/routes";
  import DatalistInput from "react-datalist-input";
  import "react-datalist-input/dist/styles.css";
  function SignUp() {
  const {
  register,
  handleSubmit,
  watch,
  formState: { errors },
  } = useForm();

  const [citiesSelect, setcitiesSelect] = useState({
  cities: [],
  selected: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userType, error, user } = useSelector((store) => store.authedUser);
  //if (user) navigate(`/${userType}/`);
  //console.log(watch("userType"));
  const selectRef = createRef();
  const onSubmit = async (data) => {
  if (!citiesSelect.selected) {
    console.log(selectRef.current.childNodes[0]);
    selectRef.current.childNodes[0].focus();
    return;
  }
  console.log({ ...data, city: citiesSelect.selected });
  dispatch(
    setAuthedUserThunk({
      userType: data.userType,
      create: true,
      data: { ...data, city: citiesSelect.selected.value },
    })
  );
  if (user) navigate(`/${data.userType}/`);
  };
  useEffect(() => {
  document.title = "Signup";
  const getCitiesHandeler = async () => {
    const result = await getCities();
    setcitiesSelect((prv) => ({ ...result, cities: result }));
  };
  getCitiesHandeler();
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
          {/* <div className="logo-container">
            <img
              className="image-logo"
              src={"./images/logo.png"}
              alt="Logo"
            />
          </div> */}
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
            {/* <p className="title-top">
        انضم الينا
      </p> */}
            <div className="logo-container">
              <img
                className="image-logo"
                src={"./images/logo.png"}
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
                  ref={selectRef}
                  onSelect={(item) => {
                    setcitiesSelect((prv) => ({ ...prv, selected: item }));
                  }}
                  items={citiesSelect.cities}
                />
                {watch("userType") === "patient" && (
                  <>
                    <input
                      className="marg-left"
                      type={"date"}
                      name="city"
                      id="city"
                      placeholder="date"
                      {...register("birthDay", { required: true })}
                    />

                  </>
                )}
                {watch("userType") !== "patient" && (
                  <>
                    <br />

                    <input
                      placeholder="description"
                      {...register("description", { required: true })}
                    />
                    <br />
                    <input
                      placeholder="Reservation Price"
                      {...register("fees", { required: true })}
                    />
                    <br />
                    {/* {errors.fees && <p>من فضلك ادخل سعر الحجز </p>} */}
                  </>
                )}

                {watch("userType") === "doctor" && (
                  <>
                    <input
                      placeholder="Specialization"
                      {...register("specialization", { required: true })}
                    />
                    {/* {errors.specialization && <p>من فضلك ادخل التخصص </p>} */}
                    <br />
                    <input
                      placeholder="Address"
                      {...register("location", { required: true })}
                    />
                    {/* {errors.location && <p>من فضلك ادخل العنوان </p>} */}
                    <br />
                    <input
                      placeholder="Receptionist Email"
                      {...register("receptionEmail", { required: true })}
                    />
                    {/* {errors.receptionEmail && ( <p>من فضلك ادخل ايميل موظف الاستقبال </p> )} */}
                    <br />
                    <input
                      placeholder="Receptionist password"
                      {...register("receptionPassword", { required: true })}
                    />
                    {/* {errors.receptionPassword && ( <p>من فضلك ادخل كلمه مرور موضف الاستقبال </p> )} */}
                  </>
                )}

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

  export default SignUp;
