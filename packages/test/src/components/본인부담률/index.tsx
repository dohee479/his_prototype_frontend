import { useState } from 'react';
import './selfpay.css';
import InsuranceType from './보험유형';
import RecordAndSetting from './이력&설정';

function SelfPay(props : any) {

  const [inty, setInty] = useState({
    inty_lcls: '',
    inty_type_asst_1: '',
    inty_type_asst_2: ''
  })

  return (
    <>
      <div className="selfpay-frame">
        <div className="selfpay-container">
          <div><InsuranceType setInty={setInty} /></div>
          <div><RecordAndSetting inty={inty} /></div>
        </div>
      </div>
    </>
  );  
}

export default SelfPay;