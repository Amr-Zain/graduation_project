
const doctors = [
    {
        id: 'dskkjoerpeww',
        name: 'عمرو ',
        email: 'amr@gmail.com',
        password: 1234,
        description: 'يمسب بيتسمنق سيب',
        phone: '01012121212',
        specialization: 2,
        fees: 299,
        city: 'المنصوره',
        governorate: 'الدقهليه',
        location: 'ش جهان',
        imageURL : '/images/avatars/default.png',
        rating: 4.3,
    },
    {
        id: 'kdfjfddfslk',
        name: 'زين علي',
        email: 'mohamed@gmail.com',
        description: 'يمسب بيتسمنق سيب',
        phone: '01012121212',
        city: 'المنصوره',
        governorate: 'الدقهليه',
        location: 'ش جهان',
        specialization: 3,
        fees: 599,
        imageURL : '/images/avatars/default.png',
        rating: 4.3,
    },
    {
        id: 'kdfjfddfdslslk',
        name: 'احمد محمد',
        email: 'ahmed@gmail.com',
        description: 'يمسب بيتسمنق سيب',
        phone: '01012121212',
        city: 'المنصوره',
        governorate: 'الدقهليه',
        location: 'ش جهان',
        specialization: 3,
        fees: 599,
        imageURL : '/images/avatars/default.png',
        rating: 4.3,
    },
    {
        id: 'kdfjfddfdsjkljslk',
        name: 'حسين',
        email: 'moh@gmail.com',
        description: 'يمسب بيتسمنق سيب',
        phone: '01012121212',
        city: 'المنصوره',
        governorate: 'الدقهليه',
        location: 'ش جهان',
        specialization: 3,
        fees: 599,
        imageURL : '/images/avatars/default.png',
        rating: 4.3,
    },
]

const specialization = {
    0:'عظام',
    1:'عظام',
    2:'جلديه',
    3:'عظام',
    4:'عظام',
    5:'عظام',
    6:'عظام',
}
const nurses = [
    {
        id: 'kdfjfddfslk',
        name: 'Mohamed Ahmed',
        email: 'mohamed@gmail.com',
        description: 'يمسب بيتسمنق سيب',
        phone: '01012121212',
        city: 'المنصوره',
        governorate: 'الدقهليه',
        specialization: 2,
        imageURL : '/images/avatars/default.png',
        fees: 99,
        rating: 4.3,
    },
    {
        id: 'kdfjfddfslk',
        name: 'Mohamed Ahmed',
        email: 'mohamed@gmail.com',
        description: 'يمسب بيتسمنق سيب',
        phone: '01012121212',
        city: 'المنصوره',
        governorate: 'الدقهليه',
        imageURL : '/images/avatars/default.png',
        fees: 99,
        rating: 4.3,
    }
]
const receptionists = [
    {
        doctorId: 'sdklsdf',
        id: "fdsdsf",
        email: 'dfsklfjs',
    },
    {
        doctorId: 'sdklsdf',
        id: "fdsdsf",
        email: 'dfsklfjs',
    },
]
const patients = [
    {
        id: 'dskfhkldsjklf',
        name: 'Ahmed mohamed',
        email: 'mohamed@gmail.com',
        city: 'المنصوره',
        governorate: 'الدقهليه',
        phone: '01012121212',
        imageURL : '/images/avatars/default.png',
        age: 30
    },
    {
        id: 'dfnvcmxcsdfs',
        name: 'Ahmed mohamed',
        email: 'mohamed@gmail.com',
        phone: '01012121212',
        imageURL : '/images/avatars/default.png',
        age: 30
    },
    {
        id: 'kdfjfddfslk',
        name: 'Ahmed mohamed',
        email: 'mohamed@gmail.com',
        phone: '01012121212',
        imageURL : '/images/avatars/default.png',
        age: 30
    },
]

const patientsData = {
    'dskfhkldsjklf': [
        {
            id: 'dskfl',
            PatientId: 'dskfhkldsjklf',
            doctorId: 'dskkjoerpeww',
            date: Date.now(),
            discription : 'يسب سيتنيتسبتتي ',
            medicine:[
                {
                    name: 'بنادول',
                    dose: 'قرص 3مرات يوما', 
                    duration: 'لمده اسبوع'
                },{
                    name: 'بنادول',
                    dose: 'قرص 3مرات يوما', 
                    duration: 'لمده اسبوع'
                },{
                    name: 'بنادول',
                    dose: 'قرص 3مرات يوما', 
                    duration: 'لمده اسبوع'
                },
                
            ]
        },
        {
            id: 'dskfl', 
            PatientId: 'dskfhkldsjklf',
            doctorId: 'kdfjfddfslk',
            date: Date.now(),
            discription : 'يسب سيتنيتسبتتي ',
            medicine:[
                {
                    name: 'بنادول',
                    dose: 'قرص 3مرات يوما', 
                    duration: 'لمده اسبوع'
                },{
                    name: 'بنادول',
                    dose: 'قرص 3مرات يوما', 
                    duration: 'لمده اسبوع'
                },{
                    name: 'بنادول',
                    dose: 'قرص 3مرات يوما', 
                    duration: 'لمده اسبوع'
                },
                
            ]
        },
    ],
    'dfnvcmxcsdfs': [
        {
            id: 'dskfl', 
            PatientId: 'dfnvcmxcsdfs',
            doctorId: 'dskkjoerpeww',
            date: Date.now(),
            discription : 'يسب سيتنيتسبتتي ',
            medicine:[
                {
                    name: 'بنادول',
                    dose: 'قرص 3مرات يوما', 
                    duration: 'لمده اسبوع'
                },{
                    name: 'بنادول',
                    dose: 'قرص 3مرات يوما', 
                    duration: 'لمده اسبوع'
                },{
                    name: 'بنادول',
                    dose: 'قرص 3مرات يوما', 
                    duration: 'لمده اسبوع'
                },
                
            ]
        },
        {
            id: 'dskfl', 
            PatientId: 'dfnvcmxcsdfs',
            doctorId: 'kdfjfddfslk',
            date: Date.now(),
            discription : 'يسب سيتنيتسبتتي ',
            medicine:[
                {
                    name: 'بنادول',
                    dose: 'قرص 3مرات يوما', 
                    duration: 'لمده اسبوع'
                },{
                    name: 'بنادول',
                    dose: 'قرص 3مرات يوما', 
                    duration: 'لمده اسبوع'
                },{
                    name: 'بنادول',
                    dose: 'قرص 3مرات يوما', 
                    duration: 'لمده اسبوع'
                },
                
            ]
        },
        
    ]
}
const donationRequests = [
   {
        id : 'sfdklfdasfl',
        patientId: 'dskfhkldsjklf',
        city: 'المنصوره',
        governorate: 'الدقهليه',
        bloodType: 'O-',
        requiredDonaters: 5,
        donators: ["dfnvcmxcsdfs",'kdfjfddfslk'],/* or just number */
        date :Date.now()
    },
    {
        id : 'sfdklfdasfl',
        patientId: 'kdfjfddfslk',
        city: 'المنصوره',
        governorate: 'الدقهليه',
        bloodType: 'O-',
        requiredDonaters: 5,
        donators: ["dfnvcmxcsdfs"],/* or just number */
        date :Date.now()
    }
]
const cities = [
    {id:1,value:'المنصوره'},
    {id:2,value:'القاهره'},
    {id:3,value:'الاسكندريه'},
    {id:4,value:'دمياط'},
    {id:5,value:'بورسعيد'},
    {id:6,value:'الاسمعيليه'},
]
//schedule of the doctor 
/* 
doctorId 
from 
to
day 0->6
*/

// shechedule doctor and nurse
const shechedule = { //days 0->6 
    'dskkjoerpeww':[{//doctorId
        day: 0,
        from: ' 9AM',
        to: ' 5PM'
    },{
        day: 2,
        from: ' 9AM',
        to: ' 5PM'
    },{
        day: 4,
        from: ' 9AM',
        to: ' 5PM'
    }],
    'kdfjfddfslk':[{//doctorId
        day: 0,
        from: ' 9AM',
        to: ' 5PM'
    },{
        day: 2,
        from: ' 9AM',
        to: ' 5PM'
    },{
        day: 3,
        from: ' 9AM',
        to: ' 5PM'
    }],
}
const bookedAppointments = [
    {
        //key it to get the doctor today's cases is (doctorId,bookingDate:today)
        id: 'dskkjodjkljerpeww',
        doctorId: 'dskkjoerpeww',
        bookingDate: new Date(1675780227259).toDateString(),
        bookedAte: Date.now(),
        patientId: 'dskfhkldsjklf',
    },
    {
        //key it to get the doctor today's cases is (doctorId,bookingDate:today)
        id: 'dskkjoesadrpeww',
        doctorId: 'kdfjfddfdslslk',
        bookingDate: new Date(1675780227259).toDateString(),
        bookedAte: Date.now(),
        patientId: 'dskfhkldsjklf',
    },
    {
        //key it to get the doctor today's cases is (doctorId,bookingDate:today)
        id: 'kdfjfdfsddfslk',
        doctorId: 'dskkjoerpeww',
        bookingDate: new Date(1675780227259).toDateString(),
        bookedAte: Date.now(),
        patientId: 'dskfhkldsjklf',
    },
    {
        //key it to get the doctor today's cases is (doctorId,bookingDate:today)
        id: 'kdfjfddfslk',
        doctorId: 'kdfjfddfdsjkljslk',
        bookingDate: new Date(1675780227259).toDateString(),
        bookedAte: Date.now(),
        patientId: 'sdjfds',
    },
]
const searchDoctorResult = {
    pageCount : 3,
    data: [
        {
            id: 'dskkjoerpeww',
            name: 'عمرو ',
            email: 'amr@gmail.com',
            password: 1234,
            description: 'يمسب بيتسمنق سيب',
            phone: '01012121212',
            specialization: 2,
            appointmentPrice: 299,
            city: 'المنصوره',
            governorate: 'الدقهليه',
            location: 'ش جهان',
            imageURL : '/images/avatars/default.png',
            rating: 4.3,
        },{
            id: 'dskkjoerpeww',
        name: 'عمرو ',
        email: 'amr@gmail.com',
        password: 1234,
        description: 'يمسب بيتسمنق سيب',
        phone: '01012121212',
        specialization: 2,
        appointmentPrice: 299,
        city: 'المنصوره',
        governorate: 'الدقهليه',
        location: 'ش جهان',
        imageURL : '/images/avatars/default.png',
        rating: 4.3,
        },{
            id: 'dskkjoerpeww',
            name: 'عمرو ',
            email: 'amr@gmail.com',
            password: 1234,
            description: 'يمسب بيتسمنق سيب',
            phone: '01012121212',
            specialization: 2,
            appointmentPrice: 299,
            city: 'المنصوره',
            governorate: 'الدقهليه',
            location: 'ش جهان',
            imageURL : '/images/avatars/default.png',
            rating: 4.3,
        }
    ]
}
const searchRequestResult = {
    pageCount : 3,
    data: [
        {
            id : 'sfdklfdasfl',
            patientId: 'dskfhkldsjklf',
            city: 'المنصوره',
            governorate: 'الدقهليه',
            bloodType: 'O-',
            requiredDonaters: 5,
            donators: ["dfnvcmxcsdfs",'kdfjfddfslk'],/* or just number */
            date :Date.now()
        },{
            id : 'sfdklfdasfl',
            patientId: 'dskfhkldsjklf',
            city: 'المنصوره',
            governorate: 'الدقهليه',
            bloodType: 'O-',
            requiredDonaters: 5,
            donators: ["dfnvcmxcsdfs",'kdfjfddfslk'],/* or just number */
            date :Date.now()
        },{
            id : 'sfdklfdasfl',
            patientId: 'dskfhkldsjklf',
            city: 'المنصوره',
            governorate: 'الدقهليه',
            bloodType: 'O-',
            requiredDonaters: 5,
            donators: ["dfnvcmxcsdfs",'kdfjfddfslk'],/* or just number */
            date :Date.now()
        }
    ]
}
const searchNurseResult = {
    pageCount : 3,
    data: [
        {
            id: 'kdfjfddfslk',
            name: 'Mohamed Ahmed',
            email: 'mohamed@gmail.com',
            description: 'يمسب بيتسمنق سيب',
            phone: '01012121212',
            city: 'المنصوره',
            governorate: 'الدقهليه',
            specialization: 2,
            imageURL : '/images/avatars/default.png',
            initialPrice: 99,
            rating: 4.3,
        },{
            id: 'kdfjfddfslk',
            name: 'Mohamed Ahmed',
            email: 'mohamed@gmail.com',
            description: 'يمسب بيتسمنق سيب',
            phone: '01012121212',
            city: 'المنصوره',
            governorate: 'الدقهليه',
            specialization: 2,
            imageURL : '/images/avatars/default.png',
            initialPrice: 99,
            rating: 4.3,
        },{
            id: 'kdfjfddfslk',
            name: 'Mohamed Ahmed',
            email: 'mohamed@gmail.com',
            description: 'يمسب بيتسمنق سيب',
            phone: '01012121212',
            city: 'المنصوره',
            governorate: 'الدقهليه',
            specialization: 2,
            imageURL : '/images/avatars/default.png',
            initialPrice: 99,
            rating: 4.3,
        }
    ]
}

export const popular_doctors =[
    {
        id: 'dskkjoerpeww',
        name: 'عمرو زين ',
        specialization: 'جراحه',
        imageURL : '/images/avatars/default.png',
        rating: 4.3,
    },
    {
        id: 'kdfjfddfslk',
        name: 'زين علي',
        specialization: 'جراحه',
        imageURL : '/images/avatars/default.png',
        rating: 4.3,
    },
    {
        id: 'kdfjfddfdslslk',
        name: 'احمد محمد',
        specialization: 'جراحه',
        imageURL : '/images/avatars/default.png',
        rating: 4.3,
    },
    {
        id: 'kdfjfddfdsjkljslk',
        name: 'حسين',
        specialization: 'جراحه',
        imageURL : '/images/avatars/default.png',
        rating: 4.3,
    }
]
export { doctors, specialization, nurses, patients, patientsData, 
    donationRequests, bookedAppointments, receptionists, shechedule,
    searchDoctorResult, searchRequestResult, searchNurseResult, cities }