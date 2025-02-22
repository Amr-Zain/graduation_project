import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/doctor/nav";
import Header from "../../components/doctor/header";
import Info from "../../components/doctor/total-appointments-info";

function DoctorSharedLayout() {
    return ( <Fragment>
                <Header />
                <div style={{display:'flex'}}>
                    <Navbar />
                    <div>
                        <div style={{display:'flex',gap:'3rem'}}>
                            <Info isTotal/>
                            <Info />
                        </div>  
                        <Outlet />
                    </div>
                </div>
            </Fragment>);
}

export default DoctorSharedLayout;