import React,{ Component , useState} from 'react';
import styled from 'styled-components';
import { Row, Col ,Divider,Table , Layout, Menu, Breadcrumb,Tabs,Card,Input,Radio,Button,Modal} from 'antd';
export const columns = [
    {
        title: 'กลุ่มลูกค้าพิเศษ',
        // dataIndex: 'info.custGroup',
        // key: 'itemCode',
        weight : '500',
        render: (text, record) =>{
          return(
            <div>
              <span>{record.info.custGroup} </span>
            </div>
          )
        }
    },
    {
        title: 'เลขที่บัญชีลูกค้า',
        render: (text, record) =>{
          return(
            <div>
              <span>{record.info.accountNum} </span>
            </div>
          )
        }
    },
    {
        title: 'ชื่อบัญชีลูกค้า',
        render: (text, record) =>{
          return(
            <div>
              <span>{record.info.accountName} </span>
            </div>
          )
        }
    },
    {
        title: 'offering',
        // render: (text, record) =>{
        //   return(
        //     <div>
        //       <span>{record.info.offeringId} : {record.info.offeringName}</span>
        //     </div>
        //   )
        // }
    },
    {
      title: 'วันที่ขออนุมัติ',
      // render: (text, record) =>{
      //   return(
      //     <div>
      //       <span>{moment(record.requestDtm).format('DD/MM/YYYY')}</span>
      //     </div>
      //   )
      // }
    },
    {
      title: 'ผู้ที่ขออนุมัติ',
      dataIndex: 'requestUserName',
      // key: 'uomTypeCode',
    },
    {
      title: 'รายละเอียดบัญชี',
      // render: (text, record) =>{
      //   return(
      //     <div>
      //       <Button onClick={() => this.showDetailAcc(record,text)} style={styleButtomPrimary}>รายละเอียด</Button>
      //     </div>
      //   )
      // }
    },
    {
      title: 'จัดการข้อมุล',
      // render: (text, record) =>{
      //   return(
      //     <div>
      //       <Button onClick={() => this.setInputApprove(record,text,1)} style={styleButtomSuccess} block>อนุมัติ</Button>
      //       <Button onClick={() => this.setInputApprove(record,text,2)} style={styleButtomDanger} block>ไม่อนุมัติ</Button>
      //     </div>
      //   )
      // }
    },
];

export const data = [
    {
      key: '1',
      roCluster: '530F064BB',
      area: 'OPTIVAL FIBER DROP CABLE 1C, OUTDOOR, FLAT TYPE',
      team: '414',
      date: 'ML',
      name : 'คุณศักดฺืดา วิชัยบรรเทา',
      phoneNumber : '0981128989'
    },
    {
      key: '2',
      roCluster: '530F064BB',
      area: 'OPTIVAL FIBER DROP CABLE 1C, OUTDOOR, FLAT TYPE',
      team: '414',
      date: 'Drum',
      name : 'คุณแทฮยอง บังทันโซยอนดัน',
      phoneNumber : '0981128989'
    },
    {
      key: '3',
      roCluster: '530F064BB',
      area: 'OPTIVAL FIBER DROP CABLE 1C, OUTDOOR, FLAT TYPE',
      team: '2',
      date: 'SET',
      name : 'คุณจองกุก บังทันโซยอนดัน',
      phoneNumber : '0981128989'
    },
    {
        key: '4',
        roCluster: '530F064BB',
        area: 'OPTIVAL FIBER DROP CABLE 1C, OUTDOOR, FLAT TYPE',
        team: '2',
        date: 'SET',
        name : 'คุณจองกุก บังทันโซยอนดัน',
        phoneNumber : '0981128989'
    },
    {
        key: '5',
        roCluster: '530F064BB',
        area: 'OPTIVAL FIBER DROP CABLE 1C, OUTDOOR, FLAT TYPE',
        team: '2',
        date: 'SET',
        name : 'คุณจองกุก บังทันโซยอนดัน',
        phoneNumber : '0981128989'
    },
    {
        key: '6',
        roCluster: '530F064BB',
        area: 'OPTIVAL FIBER DROP CABLE 1C, OUTDOOR, FLAT TYPE',
        team: '2',
        date: 'SET',
        name : 'คุณจองกุก บังทันโซยอนดัน',
        phoneNumber : '0981128989'
    },
];

const CellLabel = styled.th`
  color: black !important;
  font-weight: bold !important;
  position: relative !important;
  padding: 8px 4px 6px 6px !important;
  overflow-wrap: break-word !important;
`;

const CustomHeaderRow = styled.tr`
  color : black !important;

  `
;
const CustomRow = styled.tr`
  position: relative;
`;

const CustomCell = styled.td`
  position: relative !important;
  padding: 8px 4px 6px 6px !important;
  overflow-wrap: break-word !important;
`;

export const tableStyle = {
  header: {
    row: CustomHeaderRow,
    cell: CellLabel,
  },
  body: {
    cell: CustomCell,
    row: CustomRow
  }
};