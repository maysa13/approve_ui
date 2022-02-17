import React, { useEffect, useContext, useCallback } from 'react';

/* Plugin */
import { Route } from 'react-router-dom';
import axios from 'axios';

/* Store */
import {
    AuthContext
} from '../store/AuthContext'

/* Component */
import LoginPage from '../page/LoginPage'
import { getCookie } from './UtilityFunctionCookie';

function verifyToken() {
    return new Promise(function (resolve, reject) {
        axios.request({
            method: "get",
            baseURL: process.env.REACT_APP_DOMIAN_APPROVE,
            url: "/approve-api/v1/authorization/me",
            headers: {
                Authorization: 'Bearer ' + getCookie('accessToken')
            }
        }).then(
            (response) => {
                //console.log('token verify Success !!!! ==> response : ', response);
                resolve(response.data[0]);
            }
        ).catch(
            (error) => {
                //console.log('token verify Error !!!! ==> error.response : ', error.response);
                if (error.response) {
                    /*
                     * The request was made and the server responded with a
                     * status code that falls out of the range of 2xx
                     */
                    if (error.response.status === 401) {
                        localStorage.removeItem('accessToken');
                    }
                } else if (error.request) {
                    /*
                     * The request was made but no response was received, `error.request`
                     * is an instance of XMLHttpRequest in the browser and an instance
                     * of http.ClientRequest in Node.js
                     */
                    console.log(error.request);

                } else {
                    // Something happened in setting up the request and triggered an Error
                    console.log('Error', error.message);

                }
                console.log(error.config);
                reject('User not logged in');
            }
        );
    });
}


function PrivateRoute({ component: Component, ...rest }) {

    const {
        isAuthenticated,
        loginSuccess,
        loginFail
    } = useContext(AuthContext);

    const stableLoginSuccess = useCallback(loginSuccess, []); 
    const stableLoginFail = useCallback(loginFail, []); 

    useEffect(() => {
        if (getCookie('accessToken') === null) {
            console.log('Access Token Not Found !!!');
            stableLoginFail();
        } else {
            console.log("Access Token Found :) ==> localStorage['accessToken'] : ", localStorage['accessToken']);
            verifyToken().then((result) => {
                stableLoginSuccess();
            }, (error) => {
                stableLoginFail();
            });

        }
    }, [isAuthenticated, stableLoginFail, stableLoginSuccess]);

    return (
        <Route 
            {...rest} 
            render={(props) => 
                isAuthenticated === true ? (
                    <Component {...props} />
                ) : (
                    <LoginPage {...props} />
                )
            }
        />
    );
}

export default PrivateRoute;