import React from 'react';

import '../../css/home.scss';
import Header from '../layout/Header';
import HomeContainer from '../containers/Home';
// import Footer from '../layout/footer1';

const HomePage = () => {
    return (
        <>
            <Header />
            <HomeContainer />
            {/* <Footer /> */}
        </>
    );
};

export default HomePage;
