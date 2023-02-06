//import crypto from 'crypto';

const formate = ( user) =>{
    return {
        ...user,
        id: Date.now(),
    }
}

const formateWithDate = (obj) =>{
    return {
        ...obj,
        id: Date.now(),
        date: Date.now()
    }
}
const formateDonationRequest = ({ patientId, city, governorate,bloodType,requiredDonaters }) =>{
    const request = {
        id :  Date.now(),
        patientId,
        city,
        governorate,
        bloodType,
        requiredDonaters,
        donators: [],
        date :Date.now()
    }
}

export { formate, formateWithDate, formateDonationRequest} 