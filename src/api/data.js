import { doctors, specializations, nurses, patients, patientsData, medicines,
    donationRequests, bookedAppointments, receptionists, shechedule, doctorApp, cities, popular_doctors, diagnosis } from './api'

//sill
import { formate, formateWithDate, formateDonationRequest} from './formater'


export const createUserSession = async( { email, password, userType } )=>{
    userType = userType.value;
    localStorage.setItem('token','token');
    localStorage.setItem('refreshToken', 'refreshToken');
    localStorage.setItem('user', JSON.stringify({...patients[0], userType}));
    if(userType ==='doctor'){
        return  new Promise((res)=>{
            setTimeout(() => {
                res({ user:{...doctors[0], userType} });
            }, 1000);
        }); 
       /*  const user = doctors.find((d)=>d.email ===email);
        return new Promise((res)=>{
            if(!user)throw new Error('البريد الالكتروني  غير مسجل')
            if(user.password != password )throw new Error('خطأ في كلمه المرور');
            setTimeout(() => {
                res({accessToken:'token', refreshToken: 'refresh', user });
            }, 100);
        });  */
    }else if(userType ==='patient'){
        return  new Promise((res)=>{
            setTimeout(() => {
                res({user:{...patients[0], userType} });
            }, 1000);
        }); 
        /* const user = patients.find((d)=>d.email ===email);
        return new Promise((res,rej)=>{
            if(!user)throw new Error('البريد الالكتروني  غير مسجل')
            if(user.password !== password )throw new Error('خطأ في كلمه المرور');
            setTimeout(() => {
                res({accessToken:'token', refreshToken: 'refresh', user });
            }, 100);
        });  */
    }
    else if(userType ==='nurse'){
        return  new Promise((res)=>{
            setTimeout(() => {
                res({ user:{...nurses[0], userType} });
            }, 1000);
        }); 
       /*  const user = nurses.find((d)=>d.email ===email);
        return new Promise((res)=>{
            if(!user)throw new Error('البريد الالكتروني  غير مسجل')
            if(user.password !== password )throw new Error('خطأ في كلمه المرور');
            setTimeout(() => {
                res({accessToken:'token', refreshToken: 'refresh', user });
            }, 100);
        });  */
    }else {
        return  new Promise((res)=>{
            setTimeout(() => {
                res({ user:{...receptionists[0], userType} });
            }, 1000);
        }); 
        /* const user = receptionists.find((d)=>d.email ===email);
        return new Promise((res)=>{
            if(!user)throw new Error('البريد الالكتروني  غير مسجل')
            if(user.password !== password )throw new Error('خطأ في كلمه المرور');
            setTimeout(() => {
                res({accessToken:'token', refreshToken: 'refresh', user });
            }, 100);
        });  */
    }
    
}
export const getUser = async ({ token, refreshToken })=>{
    return  new Promise((res)=>{
        setTimeout(() => {
            localStorage.setItem('user', JSON.stringify({...patients[0], userType:'patient'}));
            res({ user:{...patients[0], userType:'patient'} });
        }, 1000);
    }); 
}
export const deleteUserSession = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    return new Promise((res)=>{
        setTimeout(() => {
            res({messege: ''})
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
export const getPopularDoctors= async ()=>{
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
export const search = async ({ searchQueries,searchFor, city, specialization, 
    bloodType, name, sort,gender, page, limit, availability })=>{
    if(searchFor === 'doctor'){
        const doctorsList = doctors.slice(page*limit, page*limit+limit );
        return new Promise((res)=>{
            setTimeout(() => {
                res({  data:doctorsList, count: doctors.length })
            }, 1000);
        });
    }else if( searchFor === 'nurse' ){
        const nursesList = nurses.slice(page*10, page*10+10 );
        console.log(nursesList)
        return new Promise((res)=>{
            setTimeout(() => {
                res({ data: nursesList , count:22 })
            }, 1000); 
        });
    }
    else if(searchFor === 'blood donator'){
        const requestList = donationRequests.slice(page*limit, page*limit + limit )
        return new Promise((res)=>{
            setTimeout(() => {
                res({data:requestList, count:22 })
            }, 1000);
        });
    }else { //donation request
        const doctorsList = donationRequests.slice(page*limit, page*limit + limit )
        return new Promise((res)=>{
            setTimeout(() => {
                res({data: doctorsList,limit, page: page, count:22 })
            }, 1000);
        });
    }

}
export const getProfileData = async ({ id, userType })=>{
    if(userType === 'doctor'){
        return new Promise((res)=>{
            setTimeout(() => {
                res({...doctors[0],clinics:[{id:'fsdkljfkdl',label:'New Cairo'}, {id:'fsdklssjfkdl', label:'Jahan Street'}]})
            }, 1000);
        });
    }else if( userType === 'nurse' ){
        return new Promise((res)=>{
            setTimeout(() => {
                res(nurses.find((doc=>doc.id ===id)))
            }, 1000); 
        });
    }
}
export const getClinic = async ({ clinicId, date })=>{
    return new Promise((res)=>{
        setTimeout(() => {
            res({
                shecheduleDay:[[
                { id: 1, number: 'sdlfk;fks', /* , periods: 2  */},
                { id: 2, number: 2, peroids:1 },
                { id: 3, number: '3', isReserved: true, peroids:1 },
                { id: 4, number: '4', peroids:1 },
                { id: 5, number: 5, peroids:1 },
                { id: 6, number: 6, peroids:1 },
            ],
            [
                { id: 7, number: 1, isReserved: true, peroids:1 },
                { id: 8, number: 2, isReserved: true, peroids:1 },
                { id: 9, number: '3', isReserved: true, peroids:1 },
                { id: 10, number: '4', peroids:1 },
                { id: 11, number: 5, peroids:1 },
                { id: 12, number: 6, peroids:1 }
            ],
            [
                { id: 13, number: 1, peroids:1 },
                { id: 14, number: 2, peroids:1 },
                { id: 15, number: 3, isReserved: true, peroids:1 },
                { id: 16, number: '4', peroids:1 },
                { id: 17, number: 5, peroids:1 },
                { id: 18, number: 6, peroids:1 }
            ],
            [
                { id: 19, number: 1, peroids:1 },
                { id: 20, number: 2, peroids:1 },
                { id: 21, number: 3, peroids:1 },
                { id: 22, number: '4', peroids:1 },
                null,
                { id: 23, number: 5, peroids:1 },
                { id: 24, number: 6, peroids:1 }
            ],
            [
                { id: 25, number: 1, isReserved: true, peroids:1 },
                { id: 26, number: 2, peroids:1 },
                null,
                { id: 27, number: '3', isReserved: true, peroids:1 },
                { id: 28, number: '4', peroids:1 },
                null,
                { id: 29, number: 5, peroids:1 },
                { id: 30, number: 6, isReserved: true, peroids:1 }
            
            ]
                ],
                initShecheduleDate:date,
                clinicId,
                clinicName:'new cairo',
                clinicLocation:'12 street - new cairo',
                appointmentPeriod:30,},
        )}, 1000);
    });
   
}

export const getDiagnosisPref = ({ selectedCategories, date, patientId})=>{
    return new Promise((res)=>{
        setTimeout(() => {
            res( diagnosis.filter(dia=>selectedCategories?.includes(dia.specializations)) )
        }, 1500);
    });
}
export const getDiagnosisById = ({patientId, id})=>{
    return new Promise((res)=>{
        setTimeout(() => {
            res( diagnosis.find(dia=>dia.id === id))
        }, 1000);
    });
}

export const getPatientMedicines = ()=>{
    return new Promise((res)=>{
        setTimeout(() => {
            res( medicines )
        }, 1000);
    });
}
export const getPatientDiagnosisCategoy = ({ patientId })=>{
    return new Promise((res)=>{
        setTimeout(() => {
            res( specializations )
        }, 1000);
    });
}
export const appointments = async ({ id })=>{
    
    const apppointmets = bookedAppointments;

    const result = apppointmets.map((app,i)=>{
        
        const doctor =doctors[i];
        if(doctor)return {  ...app, 
                        DoctorNurseId: doctor.id,
                        name: doctor.name, 
                        specialization:specializations[0].value, 
                        fees:doctor.fees, 
                        type:'doctor',
                        location: doctor.location,
                        img: doctor.imageURL,
                        rating: doctor.rating,
                        from:'8AM',
                        to:'3PM'}
    });
    return new Promise((res)=>{
        setTimeout(() => {
            res(result)
        }, 1000);
    });
}
export const createUser = async( user )=>{
    user.userType = user.userType.value
    if(user.userType ==='doctor'){
        
        const doctor = formate(user);
        return new Promise((res)=>{
            setTimeout(() => {
                res({accessToken:'token', refreshToken: 'refresh', user:doctor });
            }, 1000);
        });  
    }else if(user.userType ==='patient'){
        const patient = formate(user);
        return new Promise((res)=>{
            setTimeout(() => {
                res({accessToken:'token', refreshToken: 'refresh', user:patient });
            }, 1000);
        });  
    }
    else if(user.userType ==='nurse'){
        const nurse = formate(user);
        return new Promise((res)=>{
            setTimeout(() => {
                res({accessToken:'token', refreshToken: 'refresh', user:nurse });
            }, 1000);
        });  
    }else {
        const receptionist = formate(user);
        return new Promise((res)=>{
            setTimeout(() => {
                res({accessToken:'token', refreshToken: 'refresh', user: receptionist });
            }, 1000);
        });  
    }

}
export const getPatient = async( { patientId })=>{
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
export const doctorAppiontments = async({ doctorId, date}) =>{
    return new Promise((res)=>{
        setTimeout(() => {
            res(doctorApp.filter(app=>app.appointmentDate == date && app.doctorId === doctorId))
        }, 1000);
    });
}
export const DeleteAppointment = async(appointmentId) =>{
    return new Promise((res)=>{
        setTimeout(() => {
            res({ messege: 'appontintment deleted'})
        }, 1000);
    });
}
export const UpdateAppointment = async({id, date}) =>{
    const apps = await appointments({id:'dsjl'});
    const appointment = apps[0];
    appointment.bookingDate = date;
    return new Promise((res)=>{
        setTimeout(() => {
            res({ messege: 'appontintment updated', appointment})
        }, 1000);
    });
}
export const postDiagnosis = async({ description, medicines, patientId }) =>{
    return new Promise((res)=>{
        setTimeout(() => {
            res({ messege: 'diagnosis created' })
        }, 2000);
    });
}
export const PostDonation = async ({ bloodType, city, date })=>{
    return new Promise((res)=>{
        setTimeout(() => {
            res({ messege: 'Donation Request created' })
        }, 2000);
    });
}
export const PostBloodRequest = async ({ bloodType, city, date })=>{
    return new Promise((res)=>{
        setTimeout(() => {
            res({ messege: 'Donation Request created' })
        }, 2000);
    });
}
export const AddAppointment = async({id, date}) =>{
    return new Promise((res)=>{
        setTimeout(() => {
            res({ messege: 'appontintment created'})
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
/* 
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
} */
export const setDonationRequest = ( { patientId, governorate, city, bloodType, requiredDonaters } )=>{
    const request = formateDonationRequest( { patientId, governorate, city, bloodType, requiredDonaters } );
    donationRequests.push(request);
    return request;
}
export const createDoctorApointment = ( { doctorId, patientId, date } )=>{ //doctor of nure
    return new Promise((res)=>{
        setTimeout(() => {
            const appointment = formate({ doctorId, patientId, date })
            bookedAppointments.push(appointment);
            res({appointment ,messege: 'Donation Request created' })
        }, 1000);
    });
}
export const createNurseAppointment = ({ date, nurseId })=>{
    return new Promise((res)=>{
        setTimeout(() => {
            const appointment = formate({ nurseId, date })
            bookedAppointments.push(appointment);
            res({appointment ,messege: 'Donation Request created' })
        }, 1000);
    });
}
