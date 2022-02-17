import React,{ Component , useState} from 'react';
/* import pugin*/
import { Row, Col ,Divider,Table , Layout, Menu, Breadcrumb,Tabs,Card,Input,Radio,Button,Modal,Spin,Select} from 'antd';
import {tableStyle,columns} from '../component/tableComponent'
import logoApprove from '../Icon/logoApprove.png'
import {DownloadOutlined} from '@ant-design/icons'
import moment from 'moment'
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    HomeOutlined,
    CrownTwoTone,
    SketchOutlined,
    RadarChartOutlined,
    createFromIconfontCN,
    RedoOutlined
  } from "@ant-design/icons";
import '../App.css';
  
/* import API */
import APPROVEAPI from '../api/approveApi'
import Swal from 'sweetalert2';
const approveapi = new APPROVEAPI();
const { Column, ColumnGroup } = Table;
const { Header, Content, Footer, Sider } = Layout;
const Option = Select;
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});
const { SubMenu } = Menu;
const { TabPane } = Tabs;
const styleQ = {
    fontWeight : 'bold',
    fontSize : '12px',
    marginTop : '4px',
    color : '#800080'
}
const styleA = {
    fontWeight : 'bold',
    fontSize : '12px',
    marginTop : '4px'
}
const styleAHiLingth = {
    fontWeight : 'bold',
    fontSize : '12px',
    marginTop : '4px',
    background : '#FFDEAD'
}
const styleDivCardSearch = {
    width: '100%', borderRadius: '5px', textAlign:'left',background:'#D8BFD8',padding:'4px 0 14px 14px'
}
const styleDivModal = {
    width: '100%', 
    borderRadius: '5px', 
    textAlign:'left',
    background:'#fff',
    padding:'4px 0 14px 14px',
    border : '1px #D8BFD8 solid'
}
const styleDivModalSecond = {
    width: '100%', 
    borderRadius: '5px', 
    textAlign:'left',
    background:'GhostWhite',
    marginTop : '16px',
    padding:'4px 0 14px 14px',
}
const styleDivModalSecondTop = {
    width: '100%', 
    borderRadius: '5px', 
    textAlign:'left',
    background:'GhostWhite',
    whiteSpace: 'initial',
    // marginBottom : '16px',
    padding:'4px 0 14px 14px',
}
const styleDivModalHistory = {
    width: '100%', 
    borderRadius: '5px', 
    textAlign:'left',
    background:'GhostWhite',
    marginBottom : '16px',
    padding:'4px 0 14px 14px',
}
const styleDivCardSecond = {
    width: '100%', 
    borderRadius: '5px', 
    background:'GhostWhite',
    // padding:'4px 0 14px 14px',
    textAlign : 'center'
}
const styleButtomPrimary = {
    background :'#800080' , 
    color : 'white'
}
const styleButtomPrimarySecond = {
    background :'#9370DB' , 
    color : 'white'
}
const styleButtomSuccess = {
    background :'green' , 
    color : 'white'
}
const styleButtomDanger = {
    background :'red' , 
    color : 'white'
}
const styleButtomRe = {
    background :'CornflowerBlue' , 
    color : 'white'
}
const styleHeadQ = {
    color : '#800080',
    fontWeight : 'bold'
}

class PageListApprove extends Component {
    constructor(props){
        super(props);
        this.state = {
            collapsed: true,
            loading : false,
            accSearch  :"",
            accSearchWaiting  :"",
            accSearchApprove  :"",
            reason :"",
            reasonId :"",
            show : {
                modalDetailAcc : false,
                modalBeforAction : false,
                modalHistoryAcc : false
            },
            dataSourceWaiting : [],
            dataSourceApproved : [],
            dataSourceWaitingAll : [],
            dataSourceApprovedAll : [],
            dataHistory : [],
            detailData : {
                detail : {},
                account : {},
                record : {}
            },
            dataBeforeAction : {},
            type : 0,
            count  : {
                countSVIP :'0',
                countPVIP : '0',
                countVIP : '0'
            },
            countWaiting  : {
                countSVIP :'0',
                countPVIP : '0',
                countVIP : '0'
            },
            countAppoved  : {
                countSVIP :'0',
                countPVIP : '0',
                countVIP : '0'
            },
            selectVIP : 4,
            tabKey : "จำนวนรออนุมัติ",
            reasonSelect : [],
            spanNewdata : '11'

        }
        this.baseState = this.state
        this.callGetWaitingAp = this.callGetWaitingAp.bind(this)
    }
    componentDidMount() {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let acc = params.get('acc');  // ชื่อตัวแปรที่รับมา เก็บค่าไว้ let
        this.setState({accSearchWaiting : acc})
        this.callGetWaitingAp()
        this.callGetApprovedAp()
        this.callGetDetailReason()
    }
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    };
    callback = (key) => {
        console.log(key);
        const {accSearch , accSearchWaiting , accSearchApprove , dataSourceWaitingAll , dataSourceApprovedAll} = this.state
        if(key==='1'){
            const {countSVIP,countPVIP,countVIP} = this.state.countWaiting
            this.setState({
                count  : {
                    countSVIP : countSVIP,
                    countPVIP : countPVIP,
                    countVIP : countVIP
                },
                tabKey : "จำนวนรออนุมัติ"
            })
            if(accSearchWaiting!=="" && accSearchWaiting!==null){
                this.setState({accSearch : accSearchWaiting, selectVIP : 4,})
            }
            else{
                this.setState({accSearch : accSearchWaiting, selectVIP : 4,dataSourceWaiting : dataSourceWaitingAll})
            }
           
        }
        else{
            const {countSVIP,countPVIP,countVIP} = this.state.countAppoved
            this.setState({
                count  : {
                    countSVIP : countSVIP,
                    countPVIP : countPVIP,
                    countVIP : countVIP
                },
                tabKey : "พิจารณาแล้ว"
            })
            if(accSearchApprove!=="" && accSearchApprove!==null){
                this.setState({accSearch : accSearchApprove, selectVIP : 4,})
            }
            else{
                this.setState({accSearch : accSearchApprove, selectVIP : 4, dataSourceApproved : dataSourceApprovedAll})
            }
        }
    }
    onChangeVip = e => {
        console.log('radio checked', e.target.value);
        const {dataSourceApprovedAll, dataSourceWaitingAll,tabKey} = this.state
        this.setState({
            selectVIP : e.target.value,
            accSearch : ""
        }) 
        if(e.target.value === 1){
            if(tabKey==="จำนวนรออนุมัติ"){
                const filterWa = dataSourceWaitingAll.filter(function(filter){
                    return filter.info.custGroup === 'SVIP'
                })
                if(filterWa){
                    this.setState({
                        dataSourceWaiting: filterWa
                    })
                }
            }
            else{
                const filterAp = dataSourceApprovedAll.filter(function(filter){
                    return filter.info.custGroup === 'SVIP'
                })
                if(filterAp){
                    this.setState({
                        dataSourceApproved : filterAp,
                    })
                }
                
            }

        }
        else if(e.target.value === 2){
            if(tabKey==="จำนวนรออนุมัติ"){
                const filterWa = dataSourceWaitingAll.filter(function(filter){
                    return filter.info.custGroup === 'PVIP'
                })
                if(filterWa){
                    this.setState({
                        dataSourceWaiting: filterWa
                    })
                }
            }
            else{
                const filterAp = dataSourceApprovedAll.filter(function(filter){
                    return filter.info.custGroup === 'PVIP'
                })
                if(filterAp){
                    this.setState({
                        dataSourceApproved : filterAp,
                    })
                }
                
            }
        }
        else if(e.target.value === 3){
            if(tabKey==="จำนวนรออนุมัติ"){
                const filterWa = dataSourceWaitingAll.filter(function(filter){
                    return filter.info.custGroup === 'VIP'
                })
                if(filterWa){
                    this.setState({
                        dataSourceWaiting: filterWa
                    })
                }
            }
            else{
                const filterAp = dataSourceApprovedAll.filter(function(filter){
                    return filter.info.custGroup === 'VIP'
                })
                if(filterAp){
                    this.setState({
                        dataSourceApproved : filterAp,
                    })
                }
                
            }
        }
        else if(e.target.value === 4){
            this.setState({
                dataSourceApproved : dataSourceApprovedAll,
                dataSourceWaiting: dataSourceWaitingAll
            })
        }
    };
    showDetailAcc = (record , text) => {
        console.log('record', record);
        console.log('text', text);
        if(record.info.newData){
            if(record.info.oldData.refType){
                this.setState({
                    spanNewdata : '11'
                })
            }
            else{
                this.setState({
                    spanNewdata : '24'
                })
            }
            // this.callGetDetailAcc(record.info.accountNum , record.info , record)
            this.setState({
                detailData : {
                    detail : record.info,
                    record : record
                }
            })
            this.setState(prevState =>({show:{...prevState.show,
                modalDetailAcc : true
            }})) 
        }
        else{
            Swal.fire({    
                // title:  '<div style="font-size:16px;text-align :  left;background-color : #FFA07A"><span>EventID : '+data.equipment[0].eventId+'</span></div>',                    
                icon:'warning',
                text: 'ไม่พบรายละเอียดของหมายเลข '+record.info.accountNum+' กรุณาลองใหม่อีกครั้งภายหลังค่ะ',            
                showConfirmButton: true,
                confirmButtonText: 'รับทราบ',
                confirmButtonColor : "orchid",
                showCancelButton:false,
                // cancelButtonText:'ยกเลิก',
            })
        }
    } 
    setInputApprove = (record , text , type) => {
        this.setState({
            dataBeforeAction : record,
            type : type
        })
        this.setState(prevState =>({show:{...prevState.show,
            modalBeforAction : true
        }})) 
    }
    clickApprove = () => {
        const {reqappId} = this.state.dataBeforeAction
        let input = {
            reqappId:reqappId,
            considerId: '1',
            reason: this.state.reason,
            reasonId : this.state.reasonId
        }
        this.callPostSubmit(input)
    }
    clickNoApprove = () => {
        const {reqappId} = this.state.dataBeforeAction
        let input = {
            reqappId:reqappId,
            considerId: '0',
            reason: this.state.reason,
            reasonId : this.state.reasonId
        }
        this.callPostSubmit(input)
    }
    clicNewApprove = () => {
        const {reqappId} = this.state.dataBeforeAction
        let input = {
            reqappId:reqappId,
            considerId: '2',
            reason: this.state.reason,
            reasonId : this.state.reasonId
        }
        this.callPostSubmit(input)
    }
    
    setValueAccSearch = ({ target }) =>{
        this.setState({accSearch : target.value.replace(/ +/g, "")})
        const {dataSourceApprovedAll, dataSourceWaitingAll} = this.state
        if(this.state.tabKey === "จำนวนรออนุมัติ"){
            this.setState({accSearchWaiting : target.value.replace(/ +/g, "")})
            if(target.value.length===0){
                this.setState({
                    dataSourceWaiting: dataSourceWaitingAll,
                })
            }
        }
        else{
            this.setState({accSearchApprove : target.value.replace(/ +/g, "")})
            if(target.value.length===0){
                this.setState({
                    dataSourceApproved : dataSourceApprovedAll,
                })
            }
        }
    }
    setValueReason = ({ target }) =>{
        this.setState({reason : target.value})
    }
    selectReasonId = target => {
        this.setState({reasonId : target})
    }
    searchTable = () =>{
        const {accSearch,selectVIP ,accSearchWaiting ,accSearchApprove,tabKey} = this.state
        const {dataSourceApprovedAll, dataSourceWaitingAll} = this.state 
        if(accSearch){
            if(tabKey==="จำนวนรออนุมัติ"){
                const filterWa = dataSourceWaitingAll.filter(function(filter){
                    if(selectVIP===1){
                        return filter.info.accountNum === accSearch && filter.info.custGroup === 'SVIP'
                    }
                    else if(selectVIP===2){
                        return filter.info.accountNum === accSearch && filter.info.custGroup === 'PVIP'
                    }
                    else if(selectVIP===3){
                        return filter.info.accountNum === accSearch && filter.info.custGroup === 'VIP'
                    }
                    else{
                        return filter.info.accountNum === accSearch
                    }
                })
                if(!filterWa){
                    Swal.fire({    
                        // title:  '<div style="font-size:16px;text-align :  left;background-color : #FFA07A"><span>EventID : '+data.equipment[0].eventId+'</span></div>',                    
                        icon:'warning',
                        text: 'ไม่พบเลขที่บัญชีที่ท่านกำลังค้นหา',            
                        showConfirmButton: true,
                        confirmButtonText: 'ตกลง',
                        confirmButtonColor : "#FFA07A",
                        showCancelButton:false,
                        // cancelButtonText:'ยกเลิก',
                    })
                    this.setState({
                        accSearch : "",
                        dataSourceWaiting: dataSourceWaitingAll
                    })
                }
                else{
                    this.setState({
                        dataSourceWaiting: filterWa
                    })
                }
            }
            else{
                const filterAp = dataSourceApprovedAll.filter(function(filter){
                    if(selectVIP===1){
                        return (filter.info.accountNum === accSearch && filter.info.custGroup === 'SVIP')
                    }
                    else if(selectVIP===2){
                        return (filter.info.accountNum === accSearch && filter.info.custGroup === 'PVIP')
                    }
                    else if(selectVIP===3){
                        return (filter.info.accountNum === accSearch && filter.info.custGroup === 'VIP')
                    }
                    else{
                        return filter.info.accountNum === accSearch
                    }
                })
                if(!filterAp){
                    Swal.fire({    
                        // title:  '<div style="font-size:16px;text-align :  left;background-color : #FFA07A"><span>EventID : '+data.equipment[0].eventId+'</span></div>',                    
                        icon:'warning',
                        text: 'ไม่พบเลขที่บัญชีที่ท่านกำลังค้นหา',            
                        showConfirmButton: true,
                        confirmButtonText: 'ตกลง',
                        confirmButtonColor : "#FFA07A",
                        showCancelButton:false,
                        // cancelButtonText:'ยกเลิก',
                    })
                    this.setState({
                        accSearch : "",
                        dataSourceApproved : dataSourceApprovedAll,
                    })
                }
                else{
                    this.setState({
                        dataSourceApproved : filterAp,
                    })
                }
            }
            // console.log('filterWa',filterWa)
            // console.log('filterAp',filterAp)
            // console.log('filterAp',accSearch)
        }
    }
    refresh = () => {
        if(this.state.tabKey === 'จำนวนรออนุมัติ'){
            this.setState(this.baseState)
        }
        else{
            this.setState(this.baseState)
            this.setState({tabKey : 'พิจารณาแล้ว'})
        }
        this.callGetWaitingAp()
        this.callGetApprovedAp()
        this.callGetDetailReason()
        this.setState({selectVIP : 4})
    }
    deleteSearch = () => {
        const {dataSourceWaitingAll , dataSourceApprovedAll} = this.state
        this.setState({accSearch : ''})
        if(this.state.tabKey === "จำนวนรออนุมัติ"){
            this.setState({
                dataSourceWaiting: dataSourceWaitingAll,
                accSearchWaiting : ''
            })
           
        }
        else{
            this.setState({
                dataSourceApproved : dataSourceApprovedAll,
                accSearchApprove : ''
            })
            
        }
    }
    // -----------------------------API---------------------------------------------
    callGetWaitingAp() {
        this.setState({loading : true})
        approveapi.getWaitingAp().then(ans => {
            console.log('getWaitingAp ==> result : ', ans);
            if(ans){
                let sorterDate = ans.sort(function(a, b) {
                    let aTimeString = a.requestDtm;
                    let bTimeString = b.requestDtm;
                    let aTime = new Date(aTimeString).getTime();
                    let bTime = new Date(bTimeString).getTime();
                    return bTime-aTime;
                });
                if(sorterDate){
                    this.setState({
                        dataSourceWaiting : sorterDate, 
                        dataSourceWaitingAll : sorterDate
                    },
                    ()=>{
                        const {accSearchWaiting} = this.state
                        if(accSearchWaiting!=="" && accSearchWaiting!==null){
                            let filteracc = this.state.dataSourceWaitingAll.filter(function(filter){
                                return accSearchWaiting === filter.info.accountNum
                            });
                            if(filteracc){
                                this.setState({
                                    dataSourceWaiting : filteracc, 
                                    accSearch  : accSearchWaiting
                                })
                            }
                        }
                    }
                    )
                }
                else{
                    this.setState({
                        dataSourceWaiting : ans, 
                        dataSourceWaitingAll : ans
                    })
                }
                const countSVIP = ans.filter(function(filter){
                    return filter.info.custGroup === 'SVIP'
                })
                const countPVIP = ans.filter(function(filter){
                    return filter.info.custGroup === 'PVIP'
                })
                const countVIP = ans.filter(function(filter){
                    return filter.info.custGroup === 'VIP'
                })
                this.setState({
                    countWaiting  : {
                        countSVIP : countSVIP.length,
                        countPVIP : countPVIP.length,
                        countVIP : countVIP.length
                    }
                },
                ()=>{
                    if(this.state.tabKey === "จำนวนรออนุมัติ"){
                        this.setState({
                            count  : {
                                countSVIP : countSVIP.length,
                                countPVIP : countPVIP.length,
                                countVIP : countVIP.length
                            },
                        })
                    }
                    this.setState({loading : false})
                }
                )
            }
            
            
        })
    }
    callGetApprovedAp() {
        this.setState({loading : true})
        approveapi.getApprovedAp().then(ans => {
            console.log('getApprovedAp ==> result : ', ans);
            if(ans){
                const result = ans.map((item,index) => (
                    {...item, key: index}
                ))
                let sorterDate = result.sort(function(a, b) {
                    let aTimeString = a.requestDtm;
                    let bTimeString = b.requestDtm;
                    let aTime = new Date(aTimeString).getTime();
                    let bTime = new Date(bTimeString).getTime();
                    return bTime-aTime;
                });
                if(sorterDate){
                    this.setState({
                        dataSourceApproved : sorterDate,
                        dataSourceApprovedAll : sorterDate,
                    })
                }
                else{
                    this.setState({
                        dataSourceApproved : result,
                        dataSourceApprovedAll : result,
                    })
                }
                const countSVIP = result.filter(function(filter){
                    return filter.info.custGroup === 'SVIP'
                })
                const countPVIP = result.filter(function(filter){
                    return filter.info.custGroup === 'PVIP'
                })
                const countVIP = result.filter(function(filter){
                    return filter.info.custGroup === 'VIP'
                })
                this.setState({
                    countAppoved  : {
                        countSVIP : countSVIP.length,
                        countPVIP : countPVIP.length,
                        countVIP : countVIP.length
                    }
                },
                ()=>{
                    if(this.state.tabKey === "พิจารณาแล้ว"){
                        this.setState({
                            count  : {
                                countSVIP : countSVIP.length,
                                countPVIP : countPVIP.length,
                                countVIP : countVIP.length
                            },
                        })
                    }
                    this.setState({loading : false})
                }
                )
               
                
            }
        })
    }
    callPostSubmit = (input) => {
        this.setState(prevState =>({show:{...prevState.show,
            modalBeforAction : false,
        }}))
        approveapi.postSubmit(input).then(result => {
            console.log('postSubmit ==> result : ', result);
            if(result!==undefined){
                let text = ""
                if(input.considerId==='1'){
                    text = "ระบบได้ดำเนินการอนุมัติรายการดังกล่าวสำเร็จเรียบร้อย"
                }
                else if(input.considerId==='2'){
                    text = "ระบบได้ดำเนินการส่งกลับข้อมูลพิจารณาใหม่สำเร็จเรียบร้อย"
                }
                else{
                    text = "ระบบได้ดำเนินการไม่อนุมัติรายการดังกล่าวสำเร็จเรียบร้อย"
                }
                Swal.fire({    
                    // title:  '<div style="font-size:16px;text-align :  left;background-color : #FFA07A"><span>EventID : '+data.equipment[0].eventId+'</span></div>',                    
                    icon:'success',
                    text: text,            
                    showConfirmButton: true,
                    confirmButtonText: 'ตกลง',
                    confirmButtonColor : "green",
                    showCancelButton:false,
                    // cancelButtonText:'ยกเลิก',
                })
                this.callGetWaitingAp()
                this.callGetApprovedAp()
                this.setState({
                    reason : "",
                    reasonId : ""
                })
            }
        })
    }
    
    callGetDetailReason = () => {
        approveapi.getDetailReason().then(ans => {
            console.log('callGetDetailReason ==> result : ', ans);
            if(ans){
                this.setState({reasonSelect : ans})
            }
        })
    }
    callDownload = () => {
        let input = {
            workNum : this.state.detailData.detail.newData.uploadFileId,
            accountNum : this.state.detailData.detail.accountNum,
            fileGroupCode : ''
        }
        if(this.state.detailData.detail.newData.uploadFileId!=='' && this.state.detailData.detail.newData.uploadFileId !== undefined && this.state.detailData.detail.newData.uploadFileId !== null){
            approveapi.getdownloadFile(input).then(data => {
                console.log('callDownload ==> result : ', data);
                if(data.status===200){
                    if(data.data){
                        let fileNum = data.data[0].fileNum
                        approveapi.downloadFile(fileNum).then(ans => {
                            console.log('callDownload ==> result : ', ans);
                            if(ans.status===200){
                                window.open(ans.data.url);
                            }
                        })
                    }
                    
                }
            })
        }
        
    }
    callShowHistoryAcc = (record , text) => {
        console.log('record',record)
        console.log('text',text)
        let approveKey = record.approveKey
        approveapi.getHistory(approveKey).then(data => {
            console.log('data',data)
            if(data){
                let sorterDate = data.sort(function(a, b) {
                    let aTimeString = a.requestDtm;
                    let bTimeString = b.requestDtm;
                    let aTime = new Date(aTimeString).getTime();
                    let bTime = new Date(bTimeString).getTime();
                    return bTime-aTime;
                });
                if(sorterDate){
                    this.setState({dataHistory : sorterDate})
                }
                this.setState(prevState =>({show:{...prevState.show,
                    modalHistoryAcc : true
                }}))
            }
            else{
                Swal.fire({    
                    // title:  '<div style="font-size:16px;text-align :  left;background-color : #FFA07A"><span>EventID : '+data.equipment[0].eventId+'</span></div>',                    
                    icon:'warning',
                    text: 'ไม่พบประวิติขอพิจารณาของหมายเลข '+approveKey+' เนื่องจากเป็นการขอพิจารณาครั้งแรก',            
                    showConfirmButton: true,
                    confirmButtonText: 'รับทราบ',
                    confirmButtonColor : "orchid",
                    showCancelButton:false,
                    // cancelButtonText:'ยกเลิก',
                })
            }
        })
    }
    render() {
        console.log('this.state',this.state)
        const { collapsed ,accSearch ,reason ,reasonSelect,reasonId,selectVIP} = this.state;
        const {accountName , accountNum ,newData , oldData ,custGroup,offeringId,mobileNum,offeringName} = this.state.detailData.detail
        const {responseReasonNote , responseReasonName ,approveStatusName, info} = this.state.detailData.record
        const {countSVIP,countPVIP,countVIP} = this.state.count
        const {dataSourceWaiting , dataSourceApproved , dataHistory} = this.state
        const operations = <Button icon={<RedoOutlined />} onClick={this.refresh.bind(this)}>โหลดข้อมูลใหม่</Button>;
        return(
            <div style={{padding : '0'}}> 
            <Spin spinning={this.state.loading} tip="Loading..."> 
                <Layout style={{ minHeight: "100vh" }}>
                    <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse} style={{background : '#800080'}}>
                        <div className="logo">
                            <img src={logoApprove}/>
                            {/* <span style={{fontSize : "32px"}}>A</span> */}
                            <span> pprove  v.{process.env.REACT_APP_VERSION}</span>
                        </div>
                        <Menu defaultSelectedKeys={["1"]} mode="inline" style={{background : '#800080',color : 'white'}}>
                            <Menu.Item key="1" icon={<HomeOutlined />}>
                            หน้าแรก
                            </Menu.Item>
                            {/* <Menu.Item key="2" icon={<DesktopOutlined />}>
                            Option 2
                            </Menu.Item>
                            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="9" icon={<FileOutlined />}>
                            Files
                            </Menu.Item> */}
                        </Menu>
                    </Sider>
                    <Layout className="site-layout">
                        <Header className="site-layout-background" style={{ padding: 0,fontWeight : 'bold',fontSize:'large' }}>ระบบจัดการอนุมัติสิทธิ์การเข้าถึงข้อมูลลูกค้ากลุ่มพิเศษ</Header>
                        <Content style={{ margin: "0 16px" }}>
                            <div>
                                <Row justify="space-between" style={{padding : '16px 0 16px 0' }}>
                                    <Col span={13}>
                                        <div style={styleDivCardSearch}>
                                            <span style={{fontWeight:'bold'}}>ค้นหาข้อมูลลูกค้ากลุ่มพิเศษ</span>
                                            <Row justify="space-between" style={styleQ}>
                                                <Col span={10}>
                                                    ค้นหา : เลขที่บัญชีลูกค้า
                                                </Col>
                                                <Col span={12} >
                                                    กรองข้อมูล : กลุ่มลูกค้าพิเศษ
                                                </Col>
                                            </Row>
                                            <Row justify="space-between" >
                                                <Col span={10}>
                                                    <Input value={accSearch} onChange={this.setValueAccSearch.bind(this)} placeholder="เลขที่บัญชีลูกค้า" style={{ width: '50%' }}/>
                                                    <Button style={styleButtomPrimary} onClick={this.searchTable.bind(this)}>ค้นหา</Button>
                                                    <Button style={styleButtomPrimarySecond} onClick={this.deleteSearch.bind(this)}>เคลียร์</Button>
                                                </Col>
                                                <Col span={12} >
                                                    <Radio.Group onChange={this.onChangeVip.bind(this)} value={selectVIP}>
                                                        <Radio value={1}>SVIP</Radio>
                                                        <Radio value={2}>PVIP</Radio>
                                                        <Radio value={3}>VIP</Radio>
                                                        <Radio value={4}>ทั้งหมด</Radio>
                                                    </Radio.Group>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                    <Col span={10}>
                                        <Row justify="space-between" style={{textAlign : 'center'}}>
                                            <Col span={7} style={styleDivCardSecond}>
                                                <CrownTwoTone style={{color : 'yellow',fontSize : '20px'}} twoToneColor="yellow" />
                                                <Row>
                                                    <Col span = {24}>
                                                        <span className="boxSVIP">&nbsp; SVIP &nbsp;</span>
                                                    </Col>
                                                    <Col span = {24} style={{fontSize : '11px'}}>{this.state.tabKey}</Col>
                                                </Row>
                                                <Row style={{fontSize:'20px'}}><Col span={24}>{countSVIP}</Col></Row>
                                            </Col>
                                            <Col span={7} style={styleDivCardSecond}>
                                                <SketchOutlined style={{color : 'blue',fontSize : '20px'}}/>
                                                <Row>
                                                    <Col span = {24}><span className="boxPVIP">&nbsp; PVIP &nbsp;</span></Col>
                                                    <Col span = {24} style={{fontSize : '11px'}}>{this.state.tabKey}</Col>
                                                </Row>
                                                <Row style={{fontSize:'20px'}}><Col span={24}>{countPVIP}</Col></Row>
                                            </Col>
                                            <Col span={7} style={styleDivCardSecond}>
                                                <RadarChartOutlined style={{color : 'green',fontSize : '20px'}} />
                                                <Row>
                                                    <Col span = {24}><span className="boxVIP">&nbsp;&nbsp; VIP &nbsp;</span></Col>
                                                    <Col span = {24} style={{fontSize : '11px'}}>{this.state.tabKey}</Col>
                                                </Row>
                                                <Row style={{fontSize:'20px'}}><Col span={24}>{countVIP}</Col></Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                            <div
                            className="site-layout-background"
                            style={{ padding: 24, minHeight: 360 }}
                            >
                           
                                <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)} tabBarExtraContent={operations}>
                                    <TabPane tab="รออนุมัติ" key="1">
                                        <Table 
                                            dataSource={dataSourceWaiting} 
                                            components={tableStyle}
                                            locale={{ emptyText: 'ไม่มีข้อมูลรออนุมัติ' }}
                                            // scroll={{ x: 1500 }}
                                            // columns={columns} 
                                        >
                                            <Column title="กลุ่มลูกค้าพิเศษ" dataIndex="custGroup" key="reqappId" render={(text, record) => (
                                                    <div>
                                                        <span>{record.info.custGroup} </span>
                                                    </div>
                                                )}
                                            />
                                            <Column title="บัญชีลูกค้า" dataIndex="accountNum" key="reqappId" render={(text, record) => (
                                                    <span title={`${record.info.accountNum} : ${String(record.info.accountName)}`}>
                                                        {record.info.accountNum} : {String(record.info.accountName)} 
                                                    </span>
                                                )}
                                            />
                                            {/* <Column title="ชื่อบัญชีลูกค้า" dataIndex="accountName" key="accountName" render={(text, record) => (
                                                    <span title={String(record.info.accountName)}>
                                                        {String(record.info.accountName)} 
                                                    </span>
                                                )}
                                            /> */}
                                            <Column title="offering" dataIndex="offeringId" key="reqappId"  render={(text, record) => (
                                                    <div>
                                                        <span>{record.info.offeringId} : {record.info.offeringName}</span>
                                                    </div>
                                                )}
                                            />
                                            <Column title="วันที่ขออนุมัติ" dataIndex="requestDtm" key="reqappId" render={(text, record) => (
                                                    <div>
                                                        <span>{moment(record.requestDtm).format('DD/MM/YYYY  HH:mm')}</span>
                                                    </div>
                                                )}
                                            />
                                            <Column title="ผู้ที่ขออนุมัติ" dataIndex="requestUserName" key="reqappId" weight= {500} />
                                            <Column title="รายละเอียดบัญชี" dataIndex="requestUserName" key="reqappId"
                                                render={(text, record) => (
                                                    <div>
                                                        <Button onClick={() => this.showDetailAcc(record,text)} style={styleButtomPrimary}>รายละเอียด</Button>
                                                        <Button onClick={() => this.callShowHistoryAcc(record,text)} style={styleButtomPrimarySecond}>ประวัติการขอพิจารณา</Button>
                                                    </div>
                                                )}
                                            />
                                            <Column title="จัดการข้อมุล" dataIndex="reqappId" key="reqappId"
                                                render={(text, record) => (
                                                    <div>
                                                        <Button onClick={() => this.setInputApprove(record,text,1)} style={styleButtomSuccess} block>อนุมัติ</Button>
                                                        <Button onClick={() => this.setInputApprove(record,text,2)} style={styleButtomDanger} block>ไม่อนุมัติ</Button>
                                                        <Button onClick={() => this.setInputApprove(record,text,4)} style={styleButtomRe} block>พิจารณาใหม่</Button>
                                                    </div>
                                                )}
                                            />
                                            {/* <Column title="รายละเอียดบัญชี" dataIndex="itemCode"  weight= {500} /> */}
                                            {/* <Column title="จัดการข้อมุล" dataIndex="itemCode"  weight= {500} /> */}
                                        </Table>
                                    </TabPane>
                                    <TabPane tab="พิจารณาแล้ว" key="2">
                                    <Table 
                                            dataSource={dataSourceApproved} 
                                            components={tableStyle}
                                            locale={{ emptyText: 'ไม่มีข้อมูลพิจารณาแล้วแล้ว' }}
                                            // columns={columns} 
                                        >
                                            <Column title="กลุ่มลูกค้าพิเศษ" dataIndex="custGroup"  key="reqappId" render={(text, record) => (
                                                    <div>
                                                        <span>{record.info.custGroup} </span>
                                                    </div>
                                                )}
                                            />
                                            {/* <Column title="เลขที่บัญชีลูกค้า" dataIndex="accountNum"  render={(text, record) => (
                                                    <div>
                                                        <span>{record.info.accountNum} </span>
                                                    </div>
                                                )}
                                            /> */}
                                            <Column title="บัญชีลูกค้า" dataIndex="accountName"  key="reqappId" render={(text, record) => (
                                                    <span title={`${record.info.accountNum} : ${String(record.info.accountName)}`}>
                                                        {record.info.accountNum} : {String(record.info.accountName)} 
                                                    </span>
                                                )}
                                            />
                                            <Column title="offering" dataIndex="offeringId"  key="reqappId"  render={(text, record) => (
                                                    <div>
                                                        <span>{record.info.offeringId} : {record.info.offeringName}</span>
                                                    </div>
                                                )}
                                            />
                                            <Column title="สถานะ" dataIndex="approveStatusName"  key="reqappId" 
                                                 render={(text, record) => (
                                                    <div>
                                                        {record.approveStatusId===3 && <span style={{color : 'red'}}>{record.approveStatusName}</span>}
                                                        {record.approveStatusId===2 && <span style={{color : 'green'}}>{record.approveStatusName}</span>}
                                                        {record.approveStatusId!==2 && record.approveStatusId!==3 && <span style={{color : 'green'}}>{record.approveStatusName}</span>}
                                                    </div>
                                                )}
                                            />
                                            <Column title="วันที่พิจารณา" dataIndex="responseDtm"  key="reqappId"  render={(text, record) => (
                                                    <div>
                                                        <span>{moment(record.responseDtm).format('DD/MM/YYYY  HH:mm')}</span>
                                                    </div>
                                                )}
                                            />
                                            <Column title="ผู้ขออนุมัติ" dataIndex="requestUserName"  key="reqappId" />
                                            {/* <Column title="ผู้อนุมัติ" dataIndex="responseUserName"  key="reqappId"  /> */}
                                            <Column title="รายละเอียดบัญชี" dataIndex="requestUserName"  key="reqappId"
                                                render={(text, record) => (
                                                    <div>
                                                        <Button onClick={() => this.showDetailAcc(record,text)} style={styleButtomPrimary}>รายละเอียด</Button>
                                                        <Button onClick={() => this.callShowHistoryAcc(record,text)} style={styleButtomPrimarySecond}>ประวัติการขอพิจารณา</Button>
                                                    </div>
                                                )}
                                            />
                                            {/* <Column title="จัดการข้อมุล" dataIndex="reqappId" 
                                                render={(text, record) => (
                                                    <div>
                                                        <Button onClick={record => this.clickApprove(record)} style={styleButtomSuccess}>อนุมัติ</Button>
                                                        <Button onClick={record => this.clickNoApprove(record)} style={styleButtomDanger}>ไม่อนุมัติ</Button>
                                                    </div>
                                                )}
                                            /> */}
                                            {/* <Column title="รายละเอียดบัญชี" dataIndex="itemCode"  weight= {500} /> */}
                                            {/* <Column title="จัดการข้อมุล" dataIndex="itemCode"  weight= {500} /> */}
                                        </Table>
                                    </TabPane>
                                </Tabs>
                            </div>
                        </Content>
                        <Footer style={{ textAlign: "center" }}>
                            หากพบปัญหาระหว่างการใช้งานระบบ กรุณาติดต่อที่ Support BCS เบอร์โทรศัพท์ 02-100-2727
                        </Footer>
                    </Layout>
                </Layout>
                <Modal
                    visible={this.state.show.modalDetailAcc}
                    closable={false}
                    width="65%"
                    footer={
                        <Button style={{background : '#D8BFD8'}} onClick={()=>{
                            this.setState(prevState =>({show:{...prevState.show,
                                modalDetailAcc : false,
                                
                            }}))}}>
                            ปิดหน้าต่างข้อมูล
                        </Button>
                    }
                    // onOk={this.handleOk}
                    // onCancel={()=>this.setState({mainPage : true})}
                    // okButtonProps={false}
                    >
                        <div>
                            <span style={styleHeadQ}>รายละเอียดข้อมูลลูกค้า</span>
                            <div style={styleDivModal}>
                                <Row justify="space-between">
                                    <Col span={20} style={{fontWeight : 'bolder'}}>
                                        <span>{accountNum} : {accountName}</span> 
                                    </Col>
                                    <Col span={3} style={{textAlign : 'center', fontSize : '11px'}}>
                                        {custGroup==='SVIP' && <div>
                                            <CrownTwoTone style={{color : 'yellow',fontSize : '20px'}} twoToneColor="yellow" />
                                            <Row>
                                                <Col span = {24}>
                                                    <span className="boxSVIP">&nbsp; SVIP &nbsp;</span>
                                                </Col>
                                            </Row>
                                        </div> }
                                        {custGroup==='PVIP' && <div>
                                            <SketchOutlined style={{color : 'blue',fontSize : '20px'}}/>
                                            <Row>
                                                <Col span = {24}>
                                                    <span className="boxPVIP">&nbsp; PVIP &nbsp;</span>
                                                </Col>
                                            </Row>
                                        </div> }
                                        {custGroup==='VIP' && <div>
                                            <RadarChartOutlined style={{color : 'green',fontSize : '20px'}} />
                                            <Row>
                                                <Col span = {24}>
                                                    <span className="boxVIP">&nbsp; VIP &nbsp;</span>
                                                </Col>
                                            </Row>
                                        </div> }
                                    </Col>
                                </Row>
                                {info && <div>
                                    <Row justify="space-between" >
                                        <Col span={24}>
                                            <span style={styleQ}> ข้อมูล Offering :</span> 
                                            <span style={styleA}> {info.offeringId} : {info.offeringName}</span>
                                        </Col>
                                    </Row>
                                    <Row justify="space-between" >
                                        <Col span={24}>
                                            <span style={styleQ}> ข้อมูล Promotion :</span> 
                                            <span style={styleA}> {info.promotionId} : {info.promotionName}</span>
                                        </Col>
                                    </Row>
                                    <Row justify="space-between" >
                                        <Col span={24}>
                                            <span style={styleQ}>  เบอร์โทรหลัก :</span> 
                                            <span style={styleA}> {info.mobileNum ? info.mobileNum:'-'}</span>
                                        </Col>
                                    </Row>
                                    <Row justify="space-between" >
                                        <Col span={24}>
                                            <span style={styleQ}>  สถานที่ติดตั้ง :</span> 
                                            <span style={styleA}> {info.installAddress ? info.installAddress:'-'}</span>
                                        </Col>
                                    </Row>
                                    <Row justify="space-between" >
                                        <Col span={24}>
                                            <span style={styleQ}>  วันที่ขออนุมัติ :</span> 
                                            <span style={styleA}> {moment(info.reqDtm).format('DD/MM/YYYY  HH:mm')}</span>
                                        </Col>
                                    </Row>
                                </div>}
                            </div>
                            <div>
                                <Row style={styleDivModal} justify="space-between">
                                    {oldData && oldData.refType !== undefined && newData && <Col span={11}>
                                        <span style={{fontWeight:'bold'}}>ข้อมูลพิจารณาครั้งล่าสุด</span>
                                        <div style={styleDivModalSecondTop}>
                                            <span style={{fontWeight:'bold'}}>ข้อมูลเปลี่ยนแปลงชื่อบัญชีลูกค้า</span>
                                            <Row justify="space-between" >
                                                <Col span={24}>
                                                    <span style={styleQ}> Account Name change :</span> 
                                                    <span style={oldData.accountTitleChange !== newData.accountTitleChange || oldData.accountFirstNameChange !== newData.accountFirstNameChange || oldData.accountLastNameChange !== newData.accountLastNameChange  ? styleAHiLingth : styleA}> {oldData.accountTitleChange ? oldData.accountTitleChange : '-'} {oldData.accountFirstNameChange}  {oldData.accountLastNameChange}</span>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div style={styleDivModal}>
                                            <span style={{fontWeight:'bold'}}>ข้อมูลดำเนินการ</span>
                                            <div>
                                                <Row justify="space-between" >
                                                    <Col span={24}>
                                                        <span style={styleQ}> ประเภท :</span> 
                                                        <span style={oldData.refType!== newData.refType ? styleAHiLingth:styleA}> {oldData.refType ? oldData.refType : '-'}</span>
                                                    </Col>
                                                </Row>
                                                <Row justify="space-between" >
                                                    <Col span={24}>
                                                        <span style={styleQ}> สถานะ :</span> 
                                                        <span style={oldData.refStatus!== newData.refStatus ? styleAHiLingth:styleA}> {oldData.refStatus === 'PE' ?'รออนุมัติ' : oldData.refStatus === 'OK' ? 'อนุมัติ' : oldData.refStatus === 'CA' ? 'ไม่อนุมัติ' : oldData.refStatus === 'RC' ? 'พิจารณาใหม่' : '-'}</span>
                                                    </Col>
                                                </Row>
                                                <Row justify="space-between" >
                                                    <Col span={24}>
                                                        <span style={styleQ}> เหตุผล :</span> 
                                                        <span style={oldData.resReasonIdDesc !== newData.resReasonIdDesc ? styleAHiLingth:styleA}> {oldData.resReasonIdDesc ? oldData.resReasonIdDesc:'-'}</span>
                                                    </Col>
                                                </Row>
                                                <Row justify="space-between" >
                                                    <Col span={24}>
                                                        <span style={styleQ}> เหตุผลเพิ่มเติม :</span> 
                                                        <span style={oldData.resReasonNote !== newData.resReasonNote ? styleAHiLingth:styleA}> {oldData.resReasonNote ? oldData.resReasonNote:'-'}</span>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                        <div style={styleDivModal}>
                                            <span style={{fontWeight:'bold'}}>ข้อมูลผู้ใช้บริการจริง</span>
                                            <div>
                                                <Row justify="space-between">
                                                    <Col span={24}>
                                                        <span style={styleQ}>ชื่อ-นามสกุล : </span> 
                                                        <span style={oldData.accountTitle !== newData.accountTitle || oldData.accountFirstName !== newData.accountFirstName || oldData.accountLastName !== newData.accountLastName  ? styleAHiLingth : styleA}>{oldData.accountTitle}  {oldData.accountFirstName}   {oldData.accountLastName}</span> 
                                                    </Col>
                                                </Row>
                                                <Row justify="space-between" >
                                                    <Col span={24}>
                                                        <span style={styleQ}>ตำแหน่ง : </span> 
                                                        <span style={oldData.accountPosition !== newData.accountPosition ? styleAHiLingth : styleA}>{oldData.accountPosition? oldData.accountPosition:'-'}</span> 
                                                    </Col>
                                                </Row>
                                                <Row justify="space-between" >
                                                    <Col span={24}>
                                                        <span style={styleQ}>หน่วยงาน : </span> 
                                                        <span style={oldData.accountDepartment !== newData.accountDepartment ? styleAHiLingth : styleA}>{oldData.accountDepartment? oldData.accountDepartment:'-'}</span> 
                                                    </Col>
                                                </Row>
                                                <Row justify="space-between" >
                                                    <Col span={24}>
                                                        <span style={styleQ}>ความสัมพันธ์ต่อเจ้าของบัญชี : </span> 
                                                        <span style={oldData.accountRelationship !== newData.accountRelationship ?  styleAHiLingth:styleA}>{oldData.accountRelationship? oldData.accountRelationship:'-'}</span> 
                                                    </Col>
                                                </Row>
                                                <Row justify="space-between" >
                                                    <Col span={24}>
                                                        <span style={styleQ}>เบอร์โทรติดต่อ1 : </span> 
                                                        <span style={oldData.accountTel !== newData.accountTel ? styleAHiLingth:styleA}>{oldData.accountTel? oldData.accountTel:'-'}</span> 
                                                    </Col>
                                                </Row>
                                                <Row justify="space-between" >
                                                    <Col span={24}>
                                                        <span style={styleQ}>เบอร์โทรติดต่อ2 : </span> 
                                                        <span style={oldData.accountTel2 !== newData.accountTel2 ? styleAHiLingth:styleA}>{oldData.accountTel2? oldData.accountTel2:'-'}</span> 
                                                    </Col>
                                                </Row>
                                                <Row justify="space-between" >
                                                    <Col span={24}>
                                                        <span style={styleQ}>E-mail : </span> 
                                                        <span style={oldData.accountEmail !== newData.accountEmail ? styleAHiLingth:styleA}>{oldData.accountEmail? oldData.accountEmail:'-'}</span> 
                                                    </Col>
                                                </Row>
                                                <Row justify="space-between" >
                                                    <Col span={24}>
                                                        <span style={styleQ}>remark : </span> 
                                                        <span style={oldData.remark !== newData.remark ? styleAHiLingth:styleA}>{oldData.remark? oldData.remark:'-'}</span> 
                                                    </Col>
                                                </Row>
                                                <Row justify="space-between" >
                                                    <Col span={24}>
                                                        <span style={styleQ}>ไฟล์แนบ : </span> 
                                                        <a onClick={this.callDownload.bind(this)}> <span style={oldData.uploadFileId !== newData.uploadFileId ? styleAHiLingth:styleA}>{oldData.uploadFileId? oldData.uploadFileId:'-'} {oldData.uploadFileId !== ''&& <DownloadOutlined style={{ fontSize: '16px', color: '#08c' }} title="ดาวน์โหลด"/>}</span> </a>
                                                    
                                                    </Col>
                                                </Row>
                                                <Row justify="space-between" >
                                                    <Col span={24}>
                                                        <span style={styleQ}>  วันที่เริ่มต้น :</span> 
                                                        <span style={oldData.refStartDate !== newData.refStartDate ? styleAHiLingth:styleA}> {moment(oldData.refStartDate).format('DD/MM/YYYY  HH:mm')}</span>
                                                    </Col>
                                                </Row>
                                                <Row justify="space-between" >
                                                    <Col span={24}>
                                                        <span style={styleQ}>  วันที่สิ้นสุด :</span> 
                                                        {oldData.refEndDate !=='' && <span style={oldData.refEndDate !== newData.refEndDate ? styleAHiLingth:styleA}> {moment(oldData.refEndDate).format('DD/MM/YYYY  HH:mm')} </span>}
                                                        {oldData.refEndDate ==='' && <span style={oldData.refEndDate !== newData.refEndDate ? styleAHiLingth:styleA}> - </span>}
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                        <div style={styleDivModalSecond}>
                                            <span style={{fontWeight:'bold'}}>ผู้รับเรื่องแทน(ตัวแทนผู้ใช้งานจริง)</span>
                                            <Row justify="space-between">
                                                <Col span={24}>
                                                    <span style={styleQ}>ชื่อ-นามสกุล : </span> 
                                                    <span style={oldData.contactorTitle !== newData.contactorTitle || oldData.contactorFirstname !== newData.contactorFirstname || oldData.contactorLastname !== newData.contactorLastname ? styleAHiLingth:styleA}>{oldData.contactorTitle} {oldData.contactorFirstname} {oldData.contactorLastname}</span> 
                                                </Col>
                                            </Row>
                                            <Row justify="space-between" >
                                                <Col span={24}>
                                                    <span style={styleQ}>ตำแหน่ง : </span> 
                                                    <span style={oldData.contactorJobTitle !== newData.contactorJobTitle ? styleAHiLingth:styleA}>{oldData.contactorJobTitle? oldData.contactorJobTitle:'-'}</span> 
                                                </Col>
                                            </Row>
                                            <Row justify="space-between" >
                                                <Col span={24}>
                                                    <span style={styleQ}>หน่วยงาน : </span> 
                                                    <span style={oldData.contactorDepartment !== newData.contactorDepartment ? styleAHiLingth:styleA}>{oldData.contactorDepartment? oldData.contactorDepartment:'-'}</span> 
                                                </Col>
                                            </Row>
                                            <Row justify="space-between" >
                                                <Col span={24}>
                                                    <span style={styleQ}>ความสัมพันธ์ต่อเจ้าของบัญชี : </span> 
                                                    <span style={oldData.contactorRelationship !== newData.contactorRelationship  ? styleAHiLingth:styleA}>{oldData.contactorRelationship? oldData.contactorRelationship:'-'}</span> 
                                                </Col>
                                            </Row>
                                            <Row justify="space-between" >
                                                <Col span={24}>
                                                    <span style={styleQ}>เบอร์โทรติดต่อ1 : </span> 
                                                    <span style={oldData.contactorTel !== newData.contactorTel ? styleAHiLingth:styleA}>{oldData.contactorTel? oldData.contactorTel:'-'}</span> 
                                                </Col>
                                            </Row>
                                            <Row justify="space-between" >
                                                <Col span={24}>
                                                    <span style={styleQ}>เบอร์โทรติดต่อ2 : </span> 
                                                    <span style={oldData.contactorTel2 !== newData.contactorTel2 ? styleAHiLingth:styleA}>{oldData.contactorTel2? oldData.contactorTel2:'-'}</span> 
                                                </Col>
                                            </Row>
                                            <Row justify="space-between" >
                                                <Col span={24}>
                                                    <span style={styleQ}>E-mail : </span> 
                                                    <span style={oldData.contactorEmail !== newData.contactorEmail ? styleAHiLingth:styleA}>{oldData.contactorEmail? oldData.contactorEmail:'-'}</span> 
                                                </Col>
                                            </Row>
                                        </div>
                                        <div style={styleDivModalSecond}>
                                            <span style={{fontWeight:'bold'}}>พนักงานดูแลบัญชี (หลัก)</span>
                                            <Row justify="space-between">
                                                <Col span={24}>
                                                    <span style={styleQ}>ชื่อ-นามสกุล : </span> 
                                                    <span style={oldData.refCareEmpId !== newData.refCareEmpId ? styleAHiLingth:styleA}>{oldData.refCareEmpId} {oldData.refCareFirstname} {oldData.refCareLastname}</span> 
                                                </Col>
                                            </Row>
                                            <Row justify="space-between" >
                                                <Col span={24}>
                                                    <span style={styleQ}>ตำแหน่ง : </span> 
                                                    <span style={oldData.refCarePosition !== newData.refCarePosition ? styleAHiLingth:styleA}>{oldData.refCarePosition ? oldData.refCarePosition:'-'}</span> 
                                                </Col>
                                            </Row>
                                            <Row justify="space-between" >
                                                <Col span={24}>
                                                    <span style={styleQ}>เบอร์โทรศัพท์พนักงาน : </span> 
                                                    <span style={oldData.refCareContactTel !== newData.refCareContactTel  ? styleAHiLingth:styleA}>{oldData.refCareContactTel ? oldData.refCareContactTel:'-'}</span> 
                                                </Col>
                                            </Row>
                                            <Row justify="space-between" >
                                                <Col span={24}>
                                                    <span style={styleQ}>E-mail : </span> 
                                                    <span style={oldData.refCareEmail !== newData.refCareEmail || oldData.refCareEmail2 !== newData.refCareEmail2 ? styleAHiLingth:styleA}>{oldData.refCareEmail?oldData.refCareEmail:'-'} {oldData.refCareEmail2!=="" && ','} {oldData.refCareEmail2}</span> 
                                                </Col>
                                            </Row>
                                            <Row justify="space-between" >
                                                <Col span={24}>
                                                    <span style={styleQ}>Token Line Notidy : </span> 
                                                    <span style={oldData.refCareLineToken !== newData.refCareLineToken ? styleAHiLingth:styleA}>{oldData.refCareLineToken ? oldData.refCareLineToken:'-'}</span> 
                                                </Col>
                                            </Row>
                                        </div>
                                        <div style={styleDivModalSecond}>
                                            <span style={{fontWeight:'bold'}}>พนักงานดูแลบัญชี (สำรอง)</span>
                                            <Row justify="space-between">
                                                <Col span={24}>
                                                    <span style={styleQ}>ชื่อ-นามสกุล : </span> 
                                                    <span style={oldData.refCareSubEmpId !== newData.refCareSubEmpId ? styleAHiLingth:styleA}>{oldData.refCareSubEmpId?oldData.refCareSubEmpId:'-'} {oldData.refCareSubFirstname} {oldData.refCareSubLastname}</span> 
                                                </Col>
                                            </Row>
                                            <Row justify="space-between" >
                                                <Col span={24}>
                                                    <span style={styleQ}>ตำแหน่ง : </span> 
                                                    <span style={oldData.refCareSubPosition !== newData.refCareSubPosition ? styleAHiLingth:styleA}>{oldData.refCareSubPosition?oldData.refCareSubPosition:'-'}</span> 
                                                </Col>
                                            </Row>
                                            <Row justify="space-between" >
                                                <Col span={24}>
                                                    <span style={styleQ}>เบอร์โทรศัพท์พนักงาน : </span> 
                                                    <span style={oldData.refCareSubContactTel !==newData.refCareSubContactTel ? styleAHiLingth:styleA}>{oldData.refCareSubContactTel?oldData.refCareSubContactTel:'-'}</span> 
                                                </Col>
                                            </Row>
                                            <Row justify="space-between" >
                                                <Col span={24}>
                                                    <span style={styleQ}>E-mail : </span> 
                                                    <span style={oldData.refCareSubEmail !== newData.refCareSubEmail || oldData.refCareSubEmail2 !== newData.refCareSubEmail2 ? styleAHiLingth:styleA}>{oldData.refCareSubEmail?oldData.refCareSubEmail:'-'} {oldData.refCareSubEmail2!=="" && ','} {oldData.refCareSubEmail2}</span> 
                                                </Col>
                                            </Row>
                                            <Row justify="space-between" >
                                                <Col span={24}>
                                                    <span style={styleQ}>Token Line Notidy : </span> 
                                                    <span style={oldData.refCareSubLineToken !== newData.refCareSubLineToken ? styleAHiLingth:styleA}>{oldData.refCareSubLineToken?oldData.refCareSubLineToken:'-'}</span> 
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>}
                                    {newData && oldData && <Col span={this.state.spanNewdata}>
                                        <span style={{fontWeight:'bold'}}>ข้อมูลพิจารณาใหม่</span>
                                        <div style={styleDivModalSecondTop}>
                                            <span style={{fontWeight:'bold'}}>ข้อมูลเปลี่ยนแปลงชื่อบัญชีลูกค้า</span>
                                            <Row justify="space-between" >
                                                <Col span={24}>
                                                    <span style={styleQ}> Account Name change :</span> 
                                                    <span style={oldData.accountTitleChange !== undefined && (oldData.accountTitleChange !== newData.accountTitleChange || oldData.accountFirstNameChange !== newData.accountFirstNameChange || oldData.accountLastNameChange !== newData.accountLastNameChange)  ? styleAHiLingth : styleA}> {newData.accountTitleChange ? newData.accountTitleChange : '-'} {newData.accountFirstNameChange}  {newData.accountLastNameChange}</span>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div style={styleDivModal}>
                                            <span style={{fontWeight:'bold'}}>ข้อมูลดำเนินการ</span>
                                            <div>
                                                <Row justify="space-between" >
                                                    <Col span={24}>
                                                        <span style={styleQ}> ประเภท :</span> 
                                                        <span style={oldData.refType !== undefined && oldData.refType!== newData.refType ? styleAHiLingth:styleA}> {newData.refType ? newData.refType : '-'}</span>
                                                    </Col>
                                                </Row>
                                                <Row justify="space-between" >
                                                    <Col span={24}>
                                                        <span style={styleQ}> สถานะ :</span> 
                                                        <span style={oldData.refStatus !== undefined && oldData.refStatus!== newData.refStatus ? styleAHiLingth:styleA}> {newData.refStatus === 'PE' ?'รออนุมัติ' : newData.refStatus === 'OK' ? 'อนุมัติ' : newData.refStatus === 'CA' ? 'ไม่อนุมัติ' : newData.refStatus === 'RC' ? 'พิจารณาใหม่' : '-'}</span>
                                                    </Col>
                                                </Row>
                                                <Row justify="space-between" >
                                                    <Col span={24}>
                                                        <span style={styleQ}> เหตุผล :</span> 
                                                        <span style={oldData.resReasonIdDesc !== undefined && oldData.resReasonIdDesc !== newData.resReasonIdDesc ? styleAHiLingth:styleA}> {newData.resReasonIdDesc ? newData.resReasonIdDesc:'-'}</span>
                                                    </Col>
                                                </Row>
                                                <Row justify="space-between" >
                                                    <Col span={24}>
                                                        <span style={styleQ}> เหตุผลเพิ่มเติม :</span> 
                                                        <span style={oldData.resReasonIdDesc !== undefined && oldData.resReasonNote !== newData.resReasonNote ? styleAHiLingth:styleA}> {newData.resReasonNote ? newData.resReasonNote:'-'}</span>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                        <div style={styleDivModal}>
                                            <span style={{fontWeight:'bold'}}>ข้อมูลผู้ใช้บริการจริง</span>
                                            <div>
                                                {/* <Row justify="space-between" >
                                                    <Col span={24}>
                                                        <span style={styleQ}> Account Name change :</span> 
                                                        <span style={oldData.accountTitleChange !== undefined && (oldData.accountTitleChange !== newData.accountTitleChange || oldData.accountFirstNameChange !== newData.accountFirstNameChange || oldData.accountLastNameChange !== newData.accountLastNameChange)  ? styleAHiLingth : styleA}> {newData.accountTitleChange ? newData.accountTitleChange : '-'} {newData.accountFirstNameChange}  {newData.accountLastNameChange}</span>
                                                    </Col>
                                                </Row> */}
                                                <Row justify="space-between">
                                                    <Col span={24}>
                                                        <span style={styleQ}>ชื่อ-นามสกุล : </span> 
                                                        <span style={oldData.accountTitle!==undefined && (oldData.accountTitle !== newData.accountTitle || oldData.accountFirstName !== newData.accountFirstName || oldData.accountLastName !== newData.accountLastName ) ? styleAHiLingth : styleA}>{newData.accountTitle}  {newData.accountFirstName}   {newData.accountLastName}</span> 
                                                    </Col>
                                                </Row>
                                                <Row justify="space-between" >
                                                    <Col span={24}>
                                                        <span style={styleQ}>ตำแหน่ง : </span> 
                                                        <span style={oldData.accountPosition !== undefined && (oldData.accountPosition !== newData.accountPosition) ? styleAHiLingth:styleA}>{newData.accountPosition? newData.accountPosition:'-'}</span> 
                                                    </Col>
                                                </Row>
                                                <Row justify="space-between" >
                                                    <Col span={24}>
                                                        <span style={styleQ}>หน่วยงาน : </span> 
                                                        <span style={oldData.accountDepartment !== undefined && (oldData.accountDepartment !== newData.accountDepartment)? styleAHiLingth:styleA}>{newData.accountDepartment? newData.accountDepartment:'-'}</span> 
                                                    </Col>
                                                </Row>
                                                <Row justify="space-between" >
                                                    <Col span={24}>
                                                        <span style={styleQ}>ความสัมพันธ์ต่อเจ้าของบัญชี : </span> 
                                                        <span style={oldData.accountRelationship !== undefined && (oldData.accountRelationship !== newData.accountRelationship) ? styleAHiLingth:styleA}>{newData.accountRelationship? newData.accountRelationship:'-'}</span> 
                                                    </Col>
                                                </Row>
                                                <Row justify="space-between" >
                                                    <Col span={24}>
                                                        <span style={styleQ}>เบอร์โทรติดต่อ1 : </span> 
                                                        <span style={oldData.accountTel !== undefined && (oldData.accountTel !== newData.accountTel) ? styleAHiLingth:styleA}>{newData.accountTel? newData.accountTel:'-'}</span> 
                                                    </Col>
                                                </Row>
                                                <Row justify="space-between" >
                                                    <Col span={24}>
                                                        <span style={styleQ}>เบอร์โทรติดต่อ2 : </span> 
                                                        <span style={oldData.accountTel2 !== undefined && (oldData.accountTel2 !== newData.accountTel2) ? styleAHiLingth:styleA}>{newData.accountTel2? newData.accountTel2:'-'}</span> 
                                                    </Col>
                                                </Row>
                                                <Row justify="space-between" >
                                                    <Col span={24}>
                                                        <span style={styleQ}>E-mail : </span> 
                                                        <span style={oldData.accountEmail !== undefined && (oldData.accountEmail !== newData.accountEmail) ? styleAHiLingth:styleA}>{newData.accountEmail? newData.accountEmail:'-'}</span> 
                                                    </Col>
                                                </Row>
                                                <Row justify="space-between" >
                                                    <Col span={24}>
                                                        <span style={styleQ}>remark : </span> 
                                                        <span style={oldData.remark !== undefined &&  (oldData.remark !== newData.remark) ? styleAHiLingth:styleA}>{newData.remark? newData.remark:'-'}</span> 
                                                    </Col>
                                                </Row>
                                                <Row justify="space-between" >
                                                    <Col span={24}>
                                                        <span style={styleQ}>ไฟล์แนบ : </span> 
                                                        <a onClick={this.callDownload.bind(this)}> <span style={oldData.uploadFileId !== undefined && (oldData.uploadFileId !== newData.uploadFileId) ? styleAHiLingth:styleA}>{newData.uploadFileId? newData.uploadFileId:'-'} {newData.uploadFileId !== ''&& <DownloadOutlined style={{ fontSize: '16px', color: '#08c' }} title="ดาวน์โหลด"/>}</span> </a>
                                                    
                                                    </Col>
                                                </Row>
                                                <Row justify="space-between" >
                                                    <Col span={24}>
                                                        <span style={styleQ}>  วันที่เริ่มต้น :</span> 
                                                        <span style={oldData.refStartDate !==undefined && (oldData.refStartDate !== newData.refStartDate) ? styleAHiLingth:styleA}> {moment(newData.refStartDate).format('DD/MM/YYYY  HH:mm')}</span>
                                                    </Col>
                                                </Row>
                                                <Row justify="space-between" >
                                                    <Col span={24}>
                                                        <span style={styleQ}>  วันที่สิ้นสุด :</span> 
                                                        {newData.refEndDate !=='' && <span style={oldData.refEndDate !== undefined && (oldData.refEndDate !== newData.refEndDate) ? styleAHiLingth:styleA}> {moment(newData.refEndDate).format('DD/MM/YYYY  HH:mm')} </span>}
                                                        {newData.refEndDate ==='' && <span style={oldData.refEndDate !== undefined && (oldData.refEndDate !== newData.refEndDate) ? styleAHiLingth:styleA}> - </span>}
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                        <div style={styleDivModalSecond}>
                                            <span style={{fontWeight:'bold'}}>ผู้รับเรื่องแทน(ตัวแทนผู้ใช้งานจริง)</span>
                                            <Row justify="space-between">
                                                <Col span={24}>
                                                    <span style={styleQ}>ชื่อ-นามสกุล : </span> 
                                                    <span style={oldData.contactorTitle !== undefined && (oldData.contactorTitle !== newData.contactorTitle || oldData.contactorFirstname !== newData.contactorFirstname || oldData.contactorLastname !== newData.contactorLastname)  ? styleAHiLingth : styleA}>{newData.contactorTitle} {newData.contactorFirstname} {newData.contactorLastname}</span> 
                                                </Col>
                                            </Row>
                                            <Row justify="space-between" >
                                                <Col span={24}>
                                                    <span style={styleQ}>ตำแหน่ง : </span> 
                                                    <span style={oldData.contactorJobTitle!== undefined && (oldData.contactorJobTitle !== newData.contactorJobTitle) ? styleAHiLingth:styleA}>{newData.contactorJobTitle? newData.contactorJobTitle:'-'}</span> 
                                                </Col>
                                            </Row>
                                            <Row justify="space-between" >
                                                <Col span={24}>
                                                    <span style={styleQ}>หน่วยงาน : </span> 
                                                    <span style={oldData.contactorDepartment !== undefined && (oldData.contactorDepartment !== newData.contactorDepartment) ? styleAHiLingth:styleA}>{newData.contactorDepartment? newData.contactorDepartment:'-'}</span> 
                                                </Col>
                                            </Row>
                                            <Row justify="space-between" >
                                                <Col span={24}>
                                                    <span style={styleQ}>ความสัมพันธ์ต่อเจ้าของบัญชี : </span> 
                                                    <span style={oldData.contactorRelationship !== undefined && (oldData.contactorRelationship !== newData.contactorRelationship) ? styleAHiLingth:styleA}>{newData.contactorRelationship? newData.contactorRelationship:'-'}</span> 
                                                </Col>
                                            </Row>
                                            <Row justify="space-between" >
                                                <Col span={24}>
                                                    <span style={styleQ}>เบอร์โทรติดต่อ1 : </span> 
                                                    <span style={oldData.contactorTel !== undefined && oldData.contactorTel !== newData.contactorTel ? styleAHiLingth:styleA}>{newData.contactorTel? newData.contactorTel:'-'}</span> 
                                                </Col>
                                            </Row>
                                            <Row justify="space-between" >
                                                <Col span={24}>
                                                    <span style={styleQ}>เบอร์โทรติดต่อ2 : </span> 
                                                    <span style={oldData.contactorTel2 !== undefined &&  oldData.contactorTel2 !== newData.contactorTel2 ? styleAHiLingth:styleA}>{newData.contactorTel2? newData.contactorTel2:'-'}</span> 
                                                </Col>
                                            </Row>
                                            <Row justify="space-between" >
                                                <Col span={24}>
                                                    <span style={styleQ}>E-mail : </span> 
                                                    <span style={oldData.contactorEmail !== undefined && oldData.contactorEmail !== newData.contactorEmail ? styleAHiLingth:styleA}>{newData.contactorEmail? newData.contactorEmail:'-'}</span> 
                                                </Col>
                                            </Row>
                                        </div>
                                        <div style={styleDivModalSecond}>
                                            <span style={{fontWeight:'bold'}}>พนักงานดูแลบัญชี (หลัก)</span>
                                            <Row justify="space-between">
                                                <Col span={24}>
                                                    <span style={styleQ}>ชื่อ-นามสกุล : </span> 
                                                    <span style={oldData.refCareEmpId !== undefined && (oldData.refCareEmpId !== newData.refCareEmpId) ? styleAHiLingth:styleA}>{newData.refCareEmpId} {newData.refCareFirstname} {newData.refCareLastname}</span> 
                                                </Col>
                                            </Row>
                                            <Row justify="space-between" >
                                                <Col span={24}>
                                                    <span style={styleQ}>ตำแหน่ง : </span> 
                                                    <span style={oldData.refCarePosition !== undefined && oldData.refCarePosition !== newData.refCarePosition ? styleAHiLingth:styleA}>{newData.refCarePosition ? newData.refCarePosition:'-'}</span> 
                                                </Col>
                                            </Row>
                                            <Row justify="space-between" >
                                                <Col span={24}>
                                                    <span style={styleQ}>เบอร์โทรศัพท์พนักงาน : </span> 
                                                    <span style={oldData.refCareContactTel !== undefined && oldData.refCareContactTel !== newData.refCareContactTel ? styleAHiLingth:styleA}>{newData.refCareContactTel ? newData.refCareContactTel:'-'}</span> 
                                                </Col>
                                            </Row>
                                            <Row justify="space-between" >
                                                <Col span={24}>
                                                    <span style={styleQ}>E-mail : </span> 
                                                    <span style={oldData.refCareEmail !== undefined && (oldData.refCareEmail !== newData.refCareEmail || oldData.refCareEmail2 !== newData.refCareEmail2) ? styleAHiLingth:styleA}>{newData.refCareEmail?newData.refCareEmail:'-'} {newData.refCareEmail2!=="" && ','} {newData.refCareEmail2}</span> 
                                                </Col>
                                            </Row>
                                            <Row justify="space-between" >
                                                <Col span={24}>
                                                    <span style={styleQ}>Token Line Notidy : </span> 
                                                    <span style={oldData.refCareLineToken !== undefined && oldData.refCareLineToken !== newData.refCareLineToken ? styleAHiLingth:styleA}>{newData.refCareLineToken ? newData.refCareLineToken:'-'}</span> 
                                                </Col>
                                            </Row>
                                        </div>
                                        <div style={styleDivModalSecond}>
                                            <span style={{fontWeight:'bold'}}>พนักงานดูแลบัญชี (สำรอง)</span>
                                            <Row justify="space-between">
                                                <Col span={24}>
                                                    <span style={styleQ}>ชื่อ-นามสกุล : </span> 
                                                    <span style={oldData.refCareSubEmpId !== undefined && oldData.refCareSubEmpId !== newData.refCareSubEmpId ? styleAHiLingth:styleA}>{newData.refCareSubEmpId?newData.refCareSubEmpId:'-'} {newData.refCareSubFirstname} {newData.refCareSubLastname}</span> 
                                                </Col>
                                            </Row>
                                            <Row justify="space-between" >
                                                <Col span={24}>
                                                    <span style={styleQ}>ตำแหน่ง : </span> 
                                                    <span style={oldData.refCareSubPosition !== undefined && oldData.refCareSubPosition !== newData.refCareSubPosition ? styleAHiLingth:styleA}>{newData.refCareSubPosition?newData.refCareSubPosition:'-'}</span> 
                                                </Col>
                                            </Row>
                                            <Row justify="space-between" >
                                                <Col span={24}>
                                                    <span style={styleQ}>เบอร์โทรศัพท์พนักงาน : </span> 
                                                    <span style={oldData.refCareSubContactTel !== undefined && oldData.refCareSubContactTel !== newData.refCareSubContactTel ? styleAHiLingth:styleA}>{newData.refCareSubContactTel?newData.refCareSubContactTel:'-'}</span> 
                                                </Col>
                                            </Row>
                                            <Row justify="space-between" >
                                                <Col span={24}>
                                                    <span style={styleQ}>E-mail : </span> 
                                                    <span style={oldData.refCareSubEmail !== undefined && (oldData.refCareSubEmail !== newData.refCareSubEmail || oldData.refCareSubEmail2 !== newData.refCareSubEmail2) ? styleAHiLingth:styleA}>{newData.refCareSubEmail?newData.refCareSubEmail:'-'} {newData.refCareSubEmail2!=="" && ','} {newData.refCareSubEmail2}</span> 
                                                </Col>
                                            </Row>
                                            <Row justify="space-between" >
                                                <Col span={24}>
                                                    <span style={styleQ}>Token Line Notidy : </span> 
                                                    <span style={oldData.refCareSubLineToken !== undefined && oldData.refCareSubLineToken !== newData.refCareSubLineToken ? styleAHiLingth:styleA}>{newData.refCareSubLineToken?newData.refCareSubLineToken:'-'}</span> 
                                                </Col>
                                            </Row>
                                        </div>
                                        {/* <div style={styleDivModalSecond}>
                                            <span style={{fontWeight:'bold'}}>ผู้อนุมัติ</span>
                                            <Row justify="space-between">
                                                <Col span={24}>
                                                    <span style={styleQ}>ชื่อ-นามสกุล : </span> 
                                                    <span style={styleA}>{newData.approveEmpId} : {newData.approveFirstName} {newData.approveLastName}</span> 
                                                </Col>
                                            </Row>
                                            <Row justify="space-between" >
                                                <Col span={24}>
                                                    <span style={styleQ}>วันที่อนุมัติ : </span> 
                                                    {newData.approveDate!==''&&<span style={styleA}>{moment(newData.approveDate).format('DD/MM/YYYY')}</span>}
                                                    {newData.approveDate===''&&<span style={styleA}>-</span>}
                                                </Col>
                                            </Row>
                                            <Row justify="space-between" >
                                                <Col span={24}>
                                                    <span style={styleQ}>E-mail : </span> 
                                                    <span style={styleA}>{newData.approveBy?newData.approveBy:'-'}</span> 
                                                </Col>
                                            </Row>
                                        </div> */}
                                    </Col>}
                                </Row>
                            </div>
                        </div>
                </Modal>
                <Modal
                    visible={this.state.show.modalBeforAction}
                    // footer={null}
                    closable={false}
                    title={<span style={{fontWeight : 'bold'}}>กรุณาตรวจสอบข้อมูลบัญชีลูกค้า</span>}
                    footer={
                        <div>
                            {this.state.type===1 &&<Button size="smaill" style={{background : 'green',color:'white'}} onClick={this.clickApprove.bind(this)}>
                                ยืนยันอนุมัติ
                            </Button>}
                            {this.state.type===2 &&<Button size="smaill" style={{background : 'red',color:'white'}} onClick={this.clickNoApprove.bind(this)} disabled={this.state.reasonId===""}>
                                ยืนยันไม่อนุมัติ
                            </Button>}
                            {this.state.type===4 &&<Button size="smaill" style={{background : 'CornflowerBlue',color:'white'}} onClick={this.clicNewApprove.bind(this)}>
                                ยืนยันพิจารณาใหม่
                            </Button>}
                            <Button size="smaill" style={{background : '#D8BFD8'}} onClick={()=>{
                                this.setState(prevState =>({show:{...prevState.show,
                                    modalBeforAction : false,
                                    
                                }}))
                                this.setState({
                                    reason : "",
                                    reasonId : ""
                                })
                                }}>
                                ปิดหน้าต่าง
                            </Button>
                        </div>
                    }
                        
                    
                    // onOk={this.handleOk}
                    // onCancel={()=>this.setState({mainPage : true})}
                    // okButtonProps={false}
                    >
                        {this.state.dataBeforeAction.info!==undefined &&<div>
                            <Row justify="space-between">
                                <Col span={24}>
                                    <span  style={{fontWeight : 'bold' , color : '#800080'}}>บัญชีลูกค้า : </span>
                                    <span style={{fontWeight : 'bold'}}>{this.state.dataBeforeAction.info.accountNum} {this.state.dataBeforeAction.info.accountName} </span>
                                </Col>
                            </Row>
                            <Row justify="space-between">
                                <Col span={24}>
                                    <span style={{fontWeight : 'bold' , color : '#800080'}}>Offering : </span>
                                    <span style={{fontWeight : 'bold'}}>{this.state.dataBeforeAction.info.offeringId} : {this.state.dataBeforeAction.info.offeringName}</span>
                                </Col>
                            </Row>
                            {this.state.type===2 && <Row justify="space-between" style={{marginBottom : '4px'}}>
                                <Col span={24}>
                                    <span style={{fontWeight : 'bold' , color : '#800080'}}>เหตุผล <span style={{color  : "red"}}>*</span> : </span>
                                    <Select style={{ width: '90%' }} 
                                        onChange={this.selectReasonId.bind(this)}
                                        placeholder="กรุณาเลือกเหตุผลในการไม่อนุมัติ"
                                        value={reasonId}
                                        // options={option}
                                    >
                                        {reasonSelect.map((item,inx)=>{
                                            return (
                                                <Select.Option key={inx} value={item.resReasonId} item={item}>
                                                    {item.resReasonName}
                                                </Select.Option>
                                            )
                                        })}
                                    </Select>   
                                </Col>
                            </Row>}
                            <Row justify="space-between">
                                <Col span={24}>
                                    <span style={{fontWeight : 'bold' , color : '#800080'}}>เหตุผลเพิ่มเติม : </span>
                                    <Input value={reason} onChange={this.setValueReason.bind(this)} placeholder="เหตุผลเพิ่มเติม" style={{ width: '70%' }}/>
                                </Col>
                            </Row>
                        </div>}
                </Modal>
                <Modal
                    visible={this.state.show.modalHistoryAcc}
                    closable={false}
                    title={<span style={{fontWeight : 'bold'}}>ประวัติการขอพิจารณา</span>}
                    footer={
                        <Button style={{background : '#D8BFD8'}} onClick={()=>{
                            this.setState(prevState =>({show:{...prevState.show,
                                modalHistoryAcc : false,
                                
                            }}))}}>
                            ปิดหน้าต่างข้อมูล
                        </Button>
                    }
                >
                    <div style={{padding : 0}}>
                        {dataHistory && dataHistory.map((item,i)=>{
                            return (
                                <div style={styleDivModalHistory}>
                                    <Row justify="space-between">
                                        <Col span={24}>
                                            <span style={styleQ}>ประเภทที่ขอ : </span> 
                                            <span style={styleA}>{item.approveTypeName}</span> 
                                        </Col>
                                    </Row>
                                    <Row justify="space-between">
                                        <Col span={24}>
                                            <span style={styleQ}>วันที่ขอพิจารณา : </span> 
                                            <span style={styleA}>{item.requestDtm===null ? '-' : moment(item.requestDtm).format('DD/MM/YYYY  HH:mm')}</span> 
                                        </Col>
                                    </Row>
                                    <Row justify="space-between">
                                        <Col span={24}>
                                            <span style={styleQ}>ผู้ขอพิจารณา : </span> 
                                            <span style={styleA}>{item.requestUserName ? item.requestUserName : '-'}</span> 
                                        </Col>
                                    </Row>
                                    <Row justify="space-between">
                                        <Col span={24}>
                                            <span style={styleQ}>สถานะพิจารณา : </span> 
                                            <span style={styleA}>{item.approveStatusName ? item.approveStatusName : '-'}</span> 
                                        </Col>
                                    </Row>
                                    <Row justify="space-between">
                                        <Col span={24}>
                                            <span style={styleQ}>เหตุผล : </span> 
                                            <span style={styleA}>{item.responseReasonName ? item.responseReasonName : '-'}</span> 
                                        </Col>
                                    </Row>
                                    <Row justify="space-between">
                                        <Col span={24}>
                                            <span style={styleQ}>เหตุผลเพิ่มเติม : </span> 
                                            <span style={styleA}>{item.responseReasonNote ? item.responseReasonNote : '-'}</span> 
                                        </Col>
                                    </Row>
                                    <Row justify="space-between">
                                        <Col span={24}>
                                            <span style={styleQ}>ชื่อผู้พิจารณา : </span> 
                                            <span style={styleA}>{item.responseUserName ? item.responseUserName : '-'}</span> 
                                        </Col>
                                    </Row>
                                    <Row justify="space-between">
                                        <Col span={24}>
                                            <span style={styleQ}>วันที่พิจารณา : </span> 
                                            <span style={styleA}>{item.responseDtm === null ? '-' : moment(item.responseDtm).format('DD/MM/YYYY  HH:mm')}</span> 
                                        </Col>
                                    </Row>
                                </div>
                            )
                        })}
                    </div>

                </Modal>
            </Spin>
            </div>
        );
    }
}

export default PageListApprove;
