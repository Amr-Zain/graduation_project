import { doctors, specializations, nurses, patients, patientsData, medicines,
    donationRequests, bookedAppointments, receptionists, shechedule, cities, popular_doctors, diagnosis } from './api'

//sill
import { formate, formateWithDate, formateDonationRequest} from './formater'


export const createUserSession = async( { email, password, userType } )=>{
    console.log('create user session')
    if(userType ==='doctor'){
        const user = doctors.find((d)=>d.email ===email);
        return new Promise((res)=>{
            if(!user)throw new Error('البريد الالكتروني  غير مسجل')
            if(user.password != password )throw new Error('خطأ في كلمه المرور');
            setTimeout(() => {
                res({ token:'token', refreshToken: 'refresh', user });
            }, 100);
        }); 
    }else if(userType ==='patient'){
        const user = patients.find((d)=>d.email ===email);
        return new Promise((res,rej)=>{
            if(!user)throw new Error('البريد الالكتروني  غير مسجل')
            if(user.password !== password )throw new Error('خطأ في كلمه المرور');
            setTimeout(() => {
                res({ token:'token', refreshToken: 'refresh', user });
            }, 100);
        }); 
    }
    else if(userType ==='nurse'){
        const user = nurses.find((d)=>d.email ===email);
        return new Promise((res)=>{
            if(!user)throw new Error('البريد الالكتروني  غير مسجل')
            if(user.password !== password )throw new Error('خطأ في كلمه المرور');
            setTimeout(() => {
                res({ token:'token', refreshToken: 'refresh', user });
            }, 100);
        }); 
    }else {
        const user = receptionists.find((d)=>d.email ===email);
        return new Promise((res)=>{
            if(!user)throw new Error('البريد الالكتروني  غير مسجل')
            if(user.password !== password )throw new Error('خطأ في كلمه المرور');
            setTimeout(() => {
                res({ token:'token', refreshToken: 'refresh', user });
            }, 100);
        }); 
    }
    
}
export const deleteUserSession = ( { token, refreshToken } )=>{
    return new Promise((res)=>{
        setTimeout(() => {
            res({messege: 'ok'})
        }, 100);
    });
    
}
export const getCities = async()=>{
    return new Promise((res)=>{
        setTimeout(() => {
            res(cities)
        }, 1000);
    });
}
export const getSpecializations = async()=>{
    return new Promise((res)=>{
        setTimeout(() => {
            res(specializations)
        }, 1000);
    });
}
export const popularDoctors= async ()=>{
    return new Promise((res)=>{
        setTimeout(() => {
            res(popular_doctors)
        }, 1000);
    });
    
}
export const getPopulerNurses= async ()=>{
    return new Promise((res)=>{

        const pupulerNserses = nurses.map(nurse=>({ id:nurse.id, imageURL:nurse.imageURL,
            name:nurse.name, rating: nurse.rating, specialization: null}))
        setTimeout(() => {
            res(pupulerNserses)
        }, 1000);
    });
    
}
export const search = async ({searchFor, city, specialization, 
            bloodType, name, sort,gender, pageNumber, limit, availability})=>{
    console.log({limit, pageNumber})
    if(searchFor === 'doctor'){
        const doctorsList = doctors.slice(pageNumber*limit, pageNumber*limit+limit )
        return new Promise((res)=>{
            setTimeout(() => {
                res({  data:doctorsList, count: doctors.length })
            }, 1000);
        });
    }else if( searchFor === 'nurse' ){
        const nursesList = nurses.slice(pageNumber*10, pageNumber*10+10 )
        return new Promise((res)=>{
            setTimeout(() => {
                res({ data: nursesList , count:22 })
            }, 1000); 
        });
    }
    else if(searchFor === 'blood donator'){
        const requestList = donationRequests.slice(pageNumber*limit, pageNumber*limit + limit )
        return new Promise((res)=>{
            setTimeout(() => {
                res({data:requestList, count:22 })
            }, 1000);
        });
    }else { //donation request
        const doctorsList = doctors.slice(pageNumber*limit, pageNumber*limit + limit )
        return new Promise((res)=>{
            setTimeout(() => {
                res({data: doctorsList,limit, pageNumber: pageNumber, count:22 })
            }, 1000);
        });
    }

}

export const getDiagnosisPref = ({ selectedCategories, date})=>{
    console.log(date)
    return new Promise((res)=>{
        setTimeout(() => {
            res( diagnosis.filter(dia=>selectedCategories?.includes(dia.specializations)) )
        }, 1000);
    });
}
export const getDiagnosis = (id)=>{
    return new Promise((res)=>{
        setTimeout(() => {
            res( diagnosis.filter(dia=>dia.id === id)[0] )
        }, 1000);
    });
}

export const getMedicines = ()=>{
    return new Promise((res)=>{
        setTimeout(() => {
            res( medicines )
        }, 1000);
    });
}
export const getPatientDiagnosisCategoy = ()=>{
    return new Promise((res)=>{
        setTimeout(() => {
            res( specializations )
        }, 1000);
    });
}
export const appointments = async ({ id })=>{
    //const patient = patients.find(p=>p.id ===id)
    const apppointmets = bookedAppointments.filter(app=>app.patientId === id)
    const result = apppointmets.map(app=>{
        const doctor = doctors.find(doctor=>app.doctorId == doctor.id);
        if(doctor)return {  ...app, 
                        doctorName: doctor.name, 
                        doctorSpecialization:specializations.find(sp=>sp.id ===doctor.specialization).value, 
                        fees:doctor.fees, 
                        doctorLocation: doctor.location,
                        doctorImg: doctor.imageURL,
                        docotorRating: doctor.rating,
                        from:'8AM',
                        to:'3PM'}
    })
    return new Promise((res)=>{
        setTimeout(() => {
            res(result)
        }, 1000);
    });
}
export const createUser = async( { userType, user} )=>{
    if(userType ==='doctor'){
        
        const doctor = formate(user);
        return new Promise((res)=>{
            setTimeout(() => {
                res({ token:'token', refreshToken: 'refresh', user:doctor });
            }, 1000);
        });  
    }else if(userType ==='patient'){
        const patient = formate(user);
        return new Promise((res)=>{
            setTimeout(() => {
                res({ token:'token', refreshToken: 'refresh', user:patient });
            }, 1000);
        });  
    }
    else if(userType ==='nurse'){
        const nurse = formate(user);
        return new Promise((res)=>{
            setTimeout(() => {
                res({ token:'token', refreshToken: 'refresh', user:nurse });
            }, 1000);
        });  
    }else {
        const receptionist = formate(user);
        return new Promise((res)=>{
            setTimeout(() => {
                res({ token:'token', refreshToken: 'refresh', user: receptionist });
            }, 1000);
        });  
    }

}
export const getPatientInfo = async( { id })=>{
    return new Promise((res)=>{
        setTimeout(() => {
            res({
                id:'sdfasfsf',
                image:'/images/avatars/karl.jpg',
                name:'Mohamed Ahmed',
                age:22
            })
        }, 1000);
    });
    
}
export const saveDiagnosis = ( { patientId, docotorId, description, medicines } )=>{
    const diagnosis = formateWithDate({ patientId, docotorId, description, medicines });
    patientsData[patientId] = [...patientsData[patientId], diagnosis];
    return diagnosis;
}

export const getPatientData = ( { patientId } )=>{
    return  patientsData[patientId];
}
export const PatientSearsh = ( { userType, governorate, city, name , price, raing  } )=>{
    
}
export const getUser = ( { userId, userType } )=>{
    if(userType ==='doctor'){
        return doctors.find((d)=>d.id ===userId);
    }else if(userType ==='patient'){
        return patients.find((d)=>d.id ===userId);
    }
    else if(userType ==='nurse'){
        return nurses.find((d)=>d.id ===userId);
    }else {
        return receptionists.find((d)=>d.id ===userId);
    }
}
export const setDonationRequest = ( { patientId, governorate, city, bloodType, requiredDonaters } )=>{
    const request = formateDonationRequest( { patientId, governorate, city, bloodType, requiredDonaters } );
    donationRequests.push(request);
    return request;
}
export const removeDonationRequest = ( { requestId } )=>{
    donationRequests = donationRequests.filter(r=>r.id != requestId);
}
export const updateDonatorsOfRequest = ( { donaterId, requestId } )=>{
    //if exist remove and add if not
    if(donationRequests.find(r =>r.id = requestId).donators.includes(donaterId)){
        donationRequests = donationRequests.map(r=>{
            if(r.id === requestId)
                return {...r, donators: r.donators.filter(d=>d !== donaterId)}
            else return r;
        });
    }else{
        donationRequests = donationRequests.map(r=>{
            if(r.id === requestId)
                return {...r, donators: [...r.donators, donaterId ]}
            else return r;
        })
    }

}
export const setAppointment = ( { doctorId, patientId, bookingDate } )=>{ //doctor of nure
    const appointment = formate({ doctorId, patientId, bookingDate })
    bookedAppointments.push(appointment);
    return appointment;
}
export const getDoctorQueue = ( { docotorId, date } )=>{
    return bookedAppointments.filter(app=>{
        if(app.doctorId === docotorId && app.date === date)
            return app;
    })

}
export const getAppointment = ({ patientId, doctorId}) =>{
    return bookedAppointments.find(app=>app.patientId === patientId && app.doctorId === doctorId)
}
