import {httpClientAp} from '../helper/HttpClientAp';
import {httpClientBcs} from '../helper/HttpClientBcs'

class APPROVEAPI {
    constructor() {
    }
// api ดึงรายการรออนุมัติ
    async getWaitingAp() {
        return httpClientAp.get(process.env.REACT_APP_DOMIAN_APPROVE+'/approve-api/v1/custtype/waiting')
            .then(response => {
                return response.data;
            })
            .catch(error => {
                this.handleError(error);
            });
    }
    //api ดึงรายการอนุมัติแล้ว 
    async getApprovedAp() {
        return httpClientAp.get(process.env.REACT_APP_DOMIAN_APPROVE+'/approve-api/v1/custtype/approve')
            .then(response => {
                return response.data;
            })
            .catch(error => {
                this.handleError(error);
            });
    }
    //api ดึงประวัติรายการขอพิจารณา 
    async getHistory(approveKey) {
        return httpClientAp.get(process.env.REACT_APP_DOMIAN_APPROVE+'/approve-api/v1/custtype/history?approveKey='+approveKey)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                this.handleError(error);
            });
    }
    //api บันทึกผลอนุมัติ/ไม่อนุมัติ
    async postSubmit(input) {
        return httpClientAp.post(process.env.REACT_APP_DOMIAN_APPROVE+'/approve-api/v1/custtype/consider',input)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                this.handleError(error);
            });
    }
    // ดึงรายละเอียดข้อมูล
    async getDetailAcc(input) {
        return httpClientBcs.get(process.env.REACT_APP_DOMIAN_BCS+'/bcs-acc-vip-api/resources/account/search.json?accountNum='+input.accountNum)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                this.handleError(error);
            });
    }
    // ดาวน์โหลด
    async downloadFile(fileNum) {
        return httpClientAp.get(process.env.REACT_APP_DOMIAN_APPROVE+'/ums-api/v1/file?fileNum='+fileNum)
            .then(response => {
                return response;
            })
            .catch(error => {
                this.handleError(error);
            });
    }
    // ดาวน์โหลด
    async getdownloadFile(input) {
        return httpClientAp.get(process.env.REACT_APP_DOMIAN_APPROVE+'/ums-api/v1/doc?accountNum='+input.accountNum+'&workNum='+input.workNum+'&fileGroupCode='+input.fileGroupCode)
            .then(response => {
                return response;
            })
            .catch(error => {
                this.handleError(error);
            });
    }
    // ดึงรายละเอียดข้อมูล VIP
    async getDetailVIPAcc(input) {
        return httpClientBcs.get(process.env.REACT_APP_DOMIAN_BCS+'/bcs-acc-vip-api/resources/account/vip/search.json?accountNum='+input.accountNum)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                this.handleError(error);
            });
    }
    // ดึงรายละเอียดข้อมูลเหตุผลการไม่อนุมัติ
    async getDetailReason() {
        return httpClientAp.get(process.env.REACT_APP_DOMIAN_APPROVE+'/approve-api/v1/custtype/consider/reason')
            .then(response => {
                return response.data;
            })
            .catch(error => {
                this.handleError(error);
            });
    }
    handleResponseError(response) {
        console.log("handleResponseError ==> response : ",response);
    }
    handleError(error) {
        console.log("handleErrorr ==> error.message : ", error.message);
    }
}

export default APPROVEAPI;