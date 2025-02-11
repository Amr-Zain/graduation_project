import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/header";

function SharedLayout() {
    return ( <Fragment>
                <Header />
                <Outlet />
                <Footer />
            </Fragment>);
}

export default SharedLayout;