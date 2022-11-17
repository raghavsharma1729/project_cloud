import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { config } from '../config';
import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';

const UserVerificationPage = () => {
    const params = useParams();
    const [user, setUser] = React.useState(null);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        if (isEmpty(user) && isEmpty(error)) {
            axios.get(`${config.BASE_URL}/users/verify/${params.token}`, {})
                .then(function (response) {
                    setUser(response.data);
                })
                .catch(function (error) {
                    setError(error);
                });
        }
    });
    return (
        <>
            <Header />
            {isEmpty(user) && isEmpty(error) ?
                (<div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h2>Verifying ...</h2>
                        </div>
                    </div>
                </div>) :
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h2>
                                {isEmpty(user) ? `Something went wrong` : `Hi ${user?.firstName}, your email is Verified`}
                            </h2>
                        </div>
                    </div>
                </div>
            }
            <Footer />
        </>
    )
};

export default UserVerificationPage;
