import { useDispatch, useSelector } from 'react-redux';


function Dashboadrd() {
    const authedUser = useSelector(store=>store.authedUser);
    console.log('dashboard')
    console.log(authedUser)
    return <>
    <div>
    </div>
    </>;
}

export default Dashboadrd;