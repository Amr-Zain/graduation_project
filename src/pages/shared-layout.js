import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Chat from "../components/chat";
import Footer from "../components/Footer/Footer";
import Header from "../components/header";

function SharedLayout() {
    return ( <Fragment>
                <Chat />
                <Header />
                <Outlet />
                <Footer />
            </Fragment>);
}

export default SharedLayout;