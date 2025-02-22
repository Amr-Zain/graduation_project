import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bloodType } from '../../constants/utilites'
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getCitiesAndSpecializations } from "../../features/cities-specializations";
import { PostDonation, PostBloodRequest } from "../../api/data";
import { Button, Spinner,Form } from "react-bootstrap";
import { toast } from "react-toastify";

function BloodBankForm({ isRequest }) {
    const { cities } = useSelector(store => store.citiesAndSpecializations);
    const dispatch = useDispatch();
    const { city } = useSelector(store => store.authedUser.user);
    const [formState, setFormState] = useState({ 
        bloodType: null, 
        city: null, 
        date: null 
    });
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        if (!formState.bloodType || !formState.city || !formState.date) {
            toast.error('Please fill all required fields');
            return false;
        }
        return true;
    };

    const submit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        
        try {
            if(isRequest){
                await toast.promise(
                    PostBloodRequest({ 
                        bloodType: formState.bloodType.value,
                        city: formState.city.value,
                        date: formState.date
                    }),
                    {
                        pending: 'Creating blood request...',
                        success: 'Blood request created successfully!',
                        error: {
                            render({ data }) {
                                return data?.message || 'Failed to create blood request';
                            }
                        }
                    });}
            else{
                await toast.promise(
                    PostDonation({ 
                        bloodType: formState.bloodType.value,
                        city: formState.city.value,
                        date: formState.date
                    }),
                    {
                        pending: 'Creating Blood Donation Request...',
                        success: 'Blood Donation Created Successfully!',
                        error: {
                            render({ data }) {
                                return data?.message || 'Failed to create blood request';
                            }
                        }
                    });
            }
        } catch (error) {
            console.error('Submission error:', error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(()=>{
        if(cities.length === 0)dispatch(getCitiesAndSpecializations('cities'))
    },[ ]);
    return (  <Form onSubmit={submit} className="border p-4 rounded-3 shadow-sm"style={{backgroundColor:'#fff'}}>
        <h2 className="mb-4 text-center">{isRequest?'Donation Request':'Blood Donation'} </h2>

        <Form.Group className="mb-4">
            <DatePicker
                selected={formState.date}
                onChange={(date) => setFormState(prev => ({ ...prev, date }))}
                minDate={new Date()}
                className="form-control"
                placeholderText="Select Date"
                showIcon
                required
            />
        </Form.Group>

        <Form.Group className="mb-4">
            <Select
                options={bloodType}
                placeholder="Select Blood Type"
                onChange={(item) => setFormState(prev => ({ ...prev, bloodType: item }))}
                classNamePrefix="react-select"
                value={formState.bloodType}
                required
            />
        </Form.Group>

        <Form.Group className="mb-4">
            <Select
                options={cities}
                placeholder="Select City"
                onChange={(item) => setFormState(prev => ({ ...prev, city: item }))}
                defaultValue={city}
                classNamePrefix="react-select"
                value={formState.city}
                required
            />
        </Form.Group>

        <div className="d-grid">
            <Button 
                variant="primary" 
                type="submit" 
                disabled={isLoading}
                size="lg"
            >
                {isLoading ? (
                    <>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        <span className="ms-2">Submitting...</span>
                    </>
                ) : (
                    'Submit Request'
                )}
            </Button>
        </div>
    </Form> );
}

export default BloodBankForm;