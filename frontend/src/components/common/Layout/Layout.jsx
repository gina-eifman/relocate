import Header from './../Header/Header';
import Footer from './../Footer/Footer';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function Layout () {
    const location = useLocation();

    useEffect(() => {
        const defaultBg = '/images/bg_def.png';
        if (!location.pathname.startsWith('/country/')) {
            document.body.style.background = `url(${defaultBg}) top/cover no-repeat`;
        }
    }, [location]);

    return (
        <>
            <Header />
                <Outlet />
            <Footer />
        </>
    );
};

export default Layout;