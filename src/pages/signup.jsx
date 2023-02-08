import "../style/signup.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthedUserThunk } from "../features/authedUser";
import { getCities } from "../api/data";
import { useForm } from "react-hook-form";

import logo from '../../src/Images/num1.png'; 
import logo1 from '../../src/Images/newlogo.png'; 
function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userType, error, user } = useSelector((store) => store.authedUser);
  if (user) navigate(`/${userType}/`);
  console.log(watch("userType"));
  const onSubmit = async (data) => {
    console.log(data);
    dispatch(
      setAuthedUserThunk({ userType: data.userType, create: true, data })
    );
    if (user) navigate(`/${data.userType}/`);
  };
  useEffect(() => {
    document.title = "Signup";
    const getCitiesHandeler = async () => {
      const result = await getCities();
      setCities(result);
    };
    getCitiesHandeler();
  }, []);
  return (
    <>
      {error && <p>{error}</p>}

      <div className="container">

      
        <div className="row">
      

       <div className="col-sm-6 col-md-5 col-lg-6">
       <img className="image-logo" src={logo1} alt="Logo" />
       <img className="image-left" src={logo} alt="Logo" />
    
       </div>

       <div className="col-sm-6 col-md-5 col-lg-6">
      <div className="grid-container from-sign">
          
        <form className="back-color" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="userType" className="title-top">
            انضم الينا
          </label>
         
    
          <br />
          <select className="select-patiant" {...register("userType")} id="userType">
            <option value="patient">مريض</option>
            <option value="doctor">دكتور</option>
            <option value="nurse">ممرض</option>
          </select>
          <br />
     
         <div className="flex-input">
          <input
            type="text"
            placeholder="الاسم كامل"
            {...register("name", { required: true })}
          />
          {/* {errors.name && <p>من فضلك ادخل الاسم </p>} */}
          <br />
          <input
            type="text"
            placeholder="رقم الهاتف"
            {...register("phone", { required: true })}
          />
          {/* {errors.phone && <p>من فضلك ادخل رقم الهاتف</p>} */}
          <br />
      
          <input
            placeholder="البريد الالكتروني"
            {...register("email", {
              required: true,
              pattern:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            })}
          />
          {/* {errors.email && <p>من فضلك ادخل البريد الالكتروني صحيح</p>} */}
          <br />
        

          <input
            type="password"
            placeholder="كلمه المرور"
            {...register("password", { required: true })}
          />
          {/* {errors.password && <p>من فضلك ادخل كلمه المرور</p>} */}
         
          {watch("userType") === "patient" && (      
            <>
              <input  className="marg-left"
                type={"date"}
                name="city"
                id="city"
                placeholder="تاريخ الملاد"
                {...register("birthDay", { required: true })}
                
              />
              
              {/* {errors.city && <p>من فضلك ادخل تاريخ الملاد </p>} */}
            </>
          )}
           <br />
          <input
            id="city"
            placeholder="المدينه"
            {...register("city", { required: true })}
          />
          <datalist id="cities">
            {cities?.map((city) => (
              <option
                key={city.id}
                value={city.value}
                checked={watch("userType") === city.value}
              />
            ))}
          </datalist>
          <br />
        
          {watch("userType") !== "patient" && (
            <>
              <br />

              <input
                placeholder="الوصف"
                {...register("description", { required: true })}
                
              />
              <br />
              <input
                placeholder="سعر الحجز"
                {...register("fees", { required: true })}
              />
              <br />
              {/* {errors.fees && <p>من فضلك ادخل سعر الحجز </p>} */}
            </>
          )}
          
          {watch("userType") === "doctor" && (
            <>
              <input
                placeholder="التخصص"
                {...register("specialization", { required: true })}
              />
              {/* {errors.specialization && <p>من فضلك ادخل التخصص </p>} */}
              <br />
              <input
                placeholder="العنوان"
                {...register("location", { required: true })}
              />
              {/* {errors.location && <p>من فضلك ادخل العنوان </p>} */}
              <br />
              <input
                placeholder="ايميل موظف الاستقبال"
                {...register("receptionEmail", { required: true })}
              />
              {/* {errors.receptionEmail && ( <p>من فضلك ادخل ايميل موظف الاستقبال </p> )} */}
              <br />
              <input
                placeholder="كلمه مرور موضف الاستقبال"
                {...register("receptionPassword", { required: true })}
              />
              {/* {errors.receptionPassword && ( <p>من فضلك ادخل كلمه مرور موضف الاستقبال </p> )} */}
            </>
          )}
     
            </div>
          <button className="login-bottom" onClick={handleSubmit(onSubmit)}>تسجيل الدخول</button>
          </form>
         </div>
       </div>
      </div>
     </div>
    </>
  );
}

export default SignUp;
