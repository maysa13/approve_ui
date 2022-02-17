import axios from "axios";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { getCookie } from './UtilityFunctionCookie';

let instance = axios.create();
instance.interceptors.request.use( (config) => {
    document.body.classList.add('loading-indicator');
    if (getCookie('accessToken') !== null) {
        config.headers = { 
            accessToken: getCookie('accessToken'), 
            'Content-Type': 'application/json',
            ipClient:'0.0.0.0',
        }; 
    }
    return config;
});

instance.interceptors.response.use( (response) => {
    document.body.classList.remove('loading-indicator');
    console.log('response',response)
    if(response.data.resultCode==='1'||response.data.result==='success'){
        return response;
    }
    else{
        Swal.fire({
            icon: 'error',
            title: response.config.name+' ผิดพลาด  ',
            text: response.data.result,
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonText: 'ปิด',
            cancelButtonColor: '#394a44',
            allowEscapeKey: false,
            allowOutsideClick: false
        })
        return Promise.reject(response);
    }
}, function (error) {
    console.log("error.response : ", error.response);
    try {
        document.body.classList.remove('loading-indicator');
        if (error.response.status === 401) { //ผู้ใช้งานไม่มีสิทธ์เข้าใช้งานหรือ accessToken ใช้งานไม่ได้แล้ว
            Swal.fire({
                icon: 'error',
                title: error.response.config.name+' HTTP Status ' + error.response.status + ' ' + error.response.statusText,
                text: 'ผู้ใช้งานไม่มีสิทธ์เข้าใช้งาน หรือ ปัจจุบันผู้ใช้งาน Login เกินเวลาที่กำหนด กรุณา Login เข้าใช้งานใหม่อีกครั้ง',
                confirmButtonText: 'รับทราบ',
                confirmButtonColor: '#1f8f6b',
                allowEscapeKey: false,
                allowOutsideClick: false
            }).then((result) => {
                if (result.value) {
                    window.location = './';
                }
            })
            localStorage.removeItem('accessToken');
            return Promise.reject(error);
        }
        else if (error.response.status === 404) { //ไม่พบ api ในระบบ
            Swal.fire({
                icon: 'error',
                title: error.response.config.name+' '+error.response.status + ' ' + error.response.statusText,
                text: error.response.data.result,
                showConfirmButton: false,
                showCancelButton: true,
                cancelButtonText: 'ปิด',
                cancelButtonColor: '#394a44',
                allowEscapeKey: false,
                allowOutsideClick: false
            })
            return Promise.reject(error);
        }
        else { // อื่นๆ //http status = 4XX, 5XX 
            Swal.fire({
                icon: 'error',
                title: error.response.config.name+' '+error.response.status+' '+error.response.statusText,
                text: error.response.data.result,
                showConfirmButton: false,
                showCancelButton: true,
                cancelButtonText: 'ปิด',
                cancelButtonColor: '#394a44',
                allowEscapeKey: false,
                allowOutsideClick: false
            })
            return Promise.reject(error);
        }
        
    }
    catch (error) {
        // console.log('error=========================',error)
        if(error === "TypeError: Cannot read property 'status' of undefined"){
            console.log('error=========================',error)
            return Promise.reject(error);
        }
        // Swal.fire({
        //     icon: 'error',
        //     title:' Error',
        //     text: error,
        //     showConfirmButton: false,
        //     showCancelButton: true,
        //     cancelButtonText: 'ปิด',
        //     cancelButtonColor: '#394a44',
        //     allowEscapeKey: false,
        //     allowOutsideClick: false
        // })
        // return Promise.reject(error);
    }
});

export const httpClientBcs = instance;