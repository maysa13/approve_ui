import React, { useState, useContext, useEffect } from "react"

/* Plugin */
import NewWindow from "react-new-window";

/*Image*/
import jasLogo from "../Icon/jaslogo.gif";

/* Store */
import {
    AuthContext
} from '../store/AuthContext'

function LoginPage() {

    const [loginWindowOpened, setLoginWindowOpened] = useState(false);

    const {
        logoutJasWindowOpened,
        closeLogoutJasWindow
    } = useContext(AuthContext);
    
    const urlJasLogin = "https://api.jasmine.com/authen1/oauth/authorize?response_type=token&client_id=" + process.env.REACT_APP_JASMINE_OAUTH_CLIENT_ID + "&redirect_uri=" + process.env.REACT_APP_JASMINE_OAUTH_REDIRECT_URI + "&scope=user-information";
    const urlJasLogout =  process.env.REACT_APP_JASMINE_OAUTH_JAS_LOGOUT_URI;

    const newWindowUnloaded = () => {
        setLoginWindowOpened(false);
        closeLogoutJasWindow();
    };

    const openLoginWindow = () => {
        setLoginWindowOpened(true);
    };

    useEffect(() => {
        window.addEventListener('message', function (ev) {
            if (ev.data.loginStatus === "SUCCESS") {
                window.location = './';
            }
        });
    }, []);

    return (
        <>
            <div className="container-fluid h-100" style={{background : 'BlanchedAlmond'}}>
                <div className="row align-items-center h-100">
                    <div className="col-md-4 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">ระบบจัดการอนุมัติสิทธิ์การเข้าถึงข้อมูลลูกค้ากลุ่มพิเศษ</h5>
                                <h2 className="card-title-smale text-center mb-4">Version {process.env.REACT_APP_VERSION} </h2>
                                <div className="form-signin">
                                    <img className="mx-auto mb-4 d-block" src={jasLogo} alt="Jasmine Logo" />
                                    <button className="btn btn-lg btn-primary btn-block text-uppercase" title="เข้าสู่ระบบ" onClick={() => openLoginWindow()}>Login With JAS Sign-On</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {(loginWindowOpened) && (
                    <NewWindow
                        url={urlJasLogin}
                        onUnload={() => newWindowUnloaded()}
                        features={{ left: 200, top: 200, width: 650, height: 520 }}
                    />
                )}
                {logoutJasWindowOpened && (
                    <NewWindow
                        url={urlJasLogout}
                        onUnload={() => newWindowUnloaded()}
                        features={{ left: 200, top: 200, width: 650, height: 520 }}
                    />
                )}
            </div>
        </>
    )
}

export default LoginPage;