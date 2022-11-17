import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const NotFound = () => {
    return (
        <>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h2>Page not found</h2>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
};

export default NotFound;
